#!/usr/bin/env node
/**
 * Content guard. Two checks:
 *
 * 1. LEAKS (requires a finished `next build`): every internal string from the
 *    case-study JSON — internalNotes, source.ref, non-public metric labels —
 *    must be absent from the build output (.next/server/app + .next/static).
 *
 * 2. PLACEHOLDERS: lists every "PLACEHOLDER" / "⟨…⟩" left in site content and
 *    case studies. Fails when VERCEL_ENV=production or --strict is passed.
 *
 * Usage:  node scripts/check-content.mjs [--strict] [--skip-leaks]
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const strict = args.has("--strict") || process.env.VERCEL_ENV === "production";
let failed = false;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (
      /\.(html|rsc|js|json|txt|body|meta|segment)$/.test(name) ||
      !path.extname(name)
    )
      out.push(p);
  }
  return out;
}

function collectStrings(value, out) {
  if (typeof value === "string") {
    if (value.length >= 8) out.add(value);
  } else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

// ── 1. Leak check ────────────────────────────────────────────────
const casesDir = path.join(root, "content", "case-studies");
const caseFiles = readdirSync(casesDir).filter(
  (f) => f.endsWith(".json") && !f.startsWith("_"),
);
const secrets = new Set();
for (const f of caseFiles) {
  const cs = JSON.parse(readFileSync(path.join(casesDir, f), "utf8"));
  collectStrings(cs.internalNotes, secrets);
  for (const finding of cs.research?.findings ?? [])
    if (finding.source?.ref) secrets.add(finding.source.ref);
  for (const m of cs.results?.metrics ?? []) {
    if (m.source?.ref) secrets.add(m.source.ref);
    if (m.publicVisibility === false) {
      secrets.add(m.label);
      secrets.add(m.source?.label);
    }
  }
}
secrets.delete(undefined);

if (!args.has("--skip-leaks")) {
  const buildDirs = [
    path.join(root, ".next", "server", "app"),
    path.join(root, ".next", "static"),
  ];
  const files = buildDirs.flatMap((d) => walk(d));
  if (!files.length) {
    console.error(
      "✗ No build output found. Run `next build` first (or pass --skip-leaks).",
    );
    process.exit(1);
  }
  const leaks = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    for (const s of secrets)
      if (text.includes(s)) leaks.push({ file: path.relative(root, file), s });
  }
  if (leaks.length) {
    failed = true;
    console.error(
      `✗ ${leaks.length} confidential string(s) found in build output:`,
    );
    for (const l of leaks.slice(0, 20))
      console.error(`   ${l.file}: "${l.s.slice(0, 60)}"`);
  } else {
    console.log(
      `✓ No leaks: ${secrets.size} internal strings checked across ${files.length} build files.`,
    );
  }
}

// ── 2. Placeholder check ────────────────────────────────────────
const placeholderSources = [
  path.join(root, "src", "content", "site.ts"),
  ...caseFiles.map((f) => path.join(casesDir, f)),
];
const hits = [];
for (const file of placeholderSources) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (/^\s*(\*|\/\*\*)/.test(line)) return;
      if (
        /PLACEHOLDER|⟨[^⟩]*⟩|example\.com|your-handle/.test(line) &&
        !/export const PLACEHOLDER/.test(line)
      )
        hits.push(
          `${path.relative(root, file)}:${i + 1}  ${line.trim().slice(0, 90)}`,
        );
    });
}
const demoCases = caseFiles.filter(
  (f) => JSON.parse(readFileSync(path.join(casesDir, f), "utf8")).isDemo,
);

if (hits.length || demoCases.length) {
  const log = strict ? console.error : console.warn;
  log(
    `${strict ? "✗" : "!"} ${hits.length} placeholder line(s) to replace before launch:`,
  );
  hits.forEach((h) => log("   " + h));
  if (demoCases.length)
    log(
      `   (${demoCases.length} demo case study file(s) present — excluded from production unless PORTFOLIO_SHOW_DEMO=true)`,
    );
  if (strict && hits.length) failed = true;
} else {
  console.log("✓ No placeholders left.");
}

process.exit(failed ? 1 : 0);
