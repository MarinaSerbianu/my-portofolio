# Deployment (Vercel)

## First deploy
1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, go to **Add New → Project**, import the repo and keep the framework preset **Next.js** (zero config).
3. Set these environment variables:

| Variable                     | Production            | Preview                    |
| ---------------------------- | --------------------- | -------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | `https://your-domain` | *(optional)*               |
| `PORTFOLIO_SHOW_DEMO`        | *(unset)*             | `true` while building out  |
| `PORTFOLIO_SHOW_UNVERIFIED`  | *(unset)*             | `true` for internal review |

4. Deploy. `npm run build` runs `next build`, then the content guard:
   - It **always** fails if confidential strings are found in the build output.
   - On `VERCEL_ENV=production` it **also** fails while placeholders remain in `site.ts` or the case studies.

## Behaviour by environment
- **Production:** no demo content and no unverified metrics. Robots allow indexing.
- **Preview:** `noindex` via both the `robots` metadata and `robots.txt`. Demo content only if enabled.
- **Local:** everything is visible and labelled, with a banner at the top.

## Custom domain
Under Vercel **Settings → Domains**, add the domain and update `NEXT_PUBLIC_SITE_URL`, then redeploy.

## Before each release
Run `npm run qa` locally (or in CI) and work through [QA-CHECKLIST.md](QA-CHECKLIST.md).

## CI (optional)
```yaml
# .github/workflows/qa.yml
name: QA
on: [pull_request]
jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run qa
```
