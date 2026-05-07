# Test Plan — SauceDemo E2E Suite

## 1. Objective

Validate the end-to-end purchase flow of [SauceDemo](https://www.saucedemo.com) — a Selenium/Playwright community reference site — across desktop and mobile browsers. The suite serves as a portfolio reference for QA Lead / SDET work and as a reusable scaffold for similar e-commerce checkout flows.

## 2. Scope

### In scope

- Authentication (valid, locked-out, invalid credentials, empty fields)
- Product inventory (load, sort by name and price)
- Cart management (add, remove, badge accuracy, persistence)
- Checkout flow (shipping info validation, order completion, summary integrity)
- Visual regression on critical pages
- Cross-browser compatibility: Chromium, Firefox, WebKit, Mobile Chrome (Pixel 7)
- Performance threshold for `performance_glitch_user`

### Out of scope

- Backend API tests (covered separately in `restful-booker-api-tests`)
- Load / stress testing
- Accessibility audit (planned as a follow-up using `@axe-core/playwright`)
- Security testing

## 3. Test design strategy

| Layer | Approach |
| --- | --- |
| Architecture | Page Object Model + custom Playwright fixtures |
| Data | Centralized in `fixtures/users.ts` — typed, single source of truth |
| Tagging | `@smoke` for must-pass critical path, `@regression` for full coverage |
| Failure artifacts | Trace, video, screenshot — retained on failure for triage |
| Assertions | Web-first (`expect.toHave...`) with explicit timeouts |
| Parallelism | Per-project parallel; CI shards by browser |

## 4. Entry / Exit criteria

**Entry**: SauceDemo is reachable; CI environment has Node 20+ and Playwright browsers installed.

**Exit**:
- 100% of `@smoke` tests pass on Chromium, Firefox, and WebKit.
- ≥95% of `@regression` tests pass; any failure is triaged and either fixed or documented in `BUGS-DISCOVERED.md`.
- HTML report and traces archived as CI artifacts.

## 5. Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| Public site flakiness | CI retries (×2) and `retain-on-failure` traces |
| Test data drift | All test data centralized in `fixtures/` |
| Visual regressions on platform-specific font rendering | `maxDiffPixelRatio: 0.02` tolerance |
| Slow CI feedback | Browser matrix runs in parallel; smoke separated from regression |

## 6. Reporting

- HTML report (`playwright-report/`)
- JSON results (`test-results/results.json`)
- GitHub Actions summary via `github` reporter
- Failure traces uploaded as artifacts
