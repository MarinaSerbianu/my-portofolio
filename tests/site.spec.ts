import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/",
  "/work",
  "/work/demo-delivery-promise",
  "/about",
  "/contact",
  "/does-not-exist",
];

for (const path of PAGES) {
  test(`a11y + layout: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" }); // reveals render immediately
    await page.goto(path);
    await page.waitForLoadState("networkidle");

    // WCAG 2.2 AA automated checks
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    const summary = results.violations.map(
      (v) => `${v.id}: ${v.nodes.length}× ${v.help}`,
    );
    expect(summary, summary.join("\n")).toEqual([]);

    // No horizontal page scroll at any width
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);

    // Exactly one h1
    await expect(page.locator("h1")).toHaveCount(1);
  });
}

test("skip link moves focus to main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
});

test("work filter is keyboard operable and URL-synced", async ({ page }) => {
  await page.goto("/work");
  const cro = page.getByRole("button", { name: /CRO & Experimentation/ });
  await cro.focus();
  await page.keyboard.press("Enter");
  await expect(cro).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/category=cro/);
  await expect(page.getByRole("status")).toContainText(
    "in CRO & Experimentation",
  );

  await page.goto("/work?category=design-systems");
  await expect(page.getByRole("status")).toContainText("0 projects");
});

test("case study: evidence rules, slider, disclosure", async ({ page }) => {
  await page.goto("/work/demo-delivery-promise");

  // Demo is labelled loudly; confidential metric is absent
  await expect(page.getByRole("note").first()).toBeVisible();
  await expect(page.getByText("Demo data").first()).toBeVisible();
  await expect(page.getByText("Revenue impact")).toHaveCount(0);
  await expect(page.locator("body")).not.toContainText("INTERNAL-CANARY");

  // Before/after slider: keyboard
  const slider = page.getByRole("slider");
  await slider.focus();
  await page.keyboard.press("End");
  await expect(slider).toHaveValue("100");
  await page.keyboard.press("Home");
  await expect(slider).toHaveValue("0");

  // Disclosure
  const btn = page.getByRole("button", { name: /Why this hypothesis/ });
  await expect(btn).toHaveAttribute("aria-expanded", "false");
  await btn.click();
  await expect(btn).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Isolated to one change")).toBeVisible();
});

test("SEO: metadata and OG image", async ({ page, request }) => {
  await page.goto("/work/demo-delivery-promise");
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /noindex/,
  ); // demo never indexed
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
});
