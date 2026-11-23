import { defineConfig, devices } from "@playwright/test";

/**
 * E2E + accessibility tests run against a production build that includes
 * demo content (so the case-study template is exercised).
 * Build first: `npm run build:preview`, or run `npm run qa`.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3123", trace: "retain-on-failure" },
  webServer: {
    command: "PORTFOLIO_SHOW_DEMO=true npx next start -p 3123",
    url: "http://localhost:3123",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "mobile-320", use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 720 } } },
    { name: "tablet-768", use: { ...devices["Desktop Chrome"], viewport: { width: 768, height: 1024 } } },
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "wide-1920", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
  ],
});
