import type { EvidenceStatus } from "./schema";

/**
 * What is allowed into a build.
 *
 * Defaults: development shows everything (labelled), production shows only
 * verified + directional metrics and no demo content. Override per deploy:
 *
 *   PORTFOLIO_SHOW_DEMO=true        include demo case studies (e.g. Vercel preview)
 *   PORTFOLIO_SHOW_UNVERIFIED=true  include unverified metrics, labelled
 */
const isDev = process.env.NODE_ENV !== "production";

function flag(name: string, fallback: boolean) {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  return v === "true" || v === "1";
}

export const policy = {
  showDemo: flag("PORTFOLIO_SHOW_DEMO", isDev),
  showUnverified: flag("PORTFOLIO_SHOW_UNVERIFIED", isDev),
} as const;

export function isStatusAllowed(status: EvidenceStatus) {
  switch (status) {
    case "verified":
    case "directional":
      return true;
    case "unverified":
      return policy.showUnverified;
    case "demo":
      return policy.showDemo;
  }
}
