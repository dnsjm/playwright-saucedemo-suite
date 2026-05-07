# 🧪 Playwright SauceDemo Suite

[![Playwright Tests](https://github.com/dnsjm/playwright-saucedemo-suite/actions/workflows/playwright.yml/badge.svg)](https://github.com/dnsjm/playwright-saucedemo-suite/actions/workflows/playwright.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![Node](https://img.shields.io/badge/Node-20.x-339933?logo=nodedotjs&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A production-style end-to-end test suite for [SauceDemo](https://www.saucedemo.com), built as a portfolio reference for QA Lead / SDET work. Demonstrates the patterns I use day-to-day on a Playwright suite covering thousands of test cases at [Wilson Works Trading Inc.](https://wilsonworksph.com)

> **Why SauceDemo?** It's the community-standard practice site for end-to-end automation. Every QA hiring manager has seen it, so they can read this code in 60 seconds and judge the shape of the work.

---

## ✨ Highlights

- **TypeScript + Page Object Model** — strict mode, path aliases, zero `any`
- **Custom Playwright fixtures** — `loggedIn` fixture eliminates auth boilerplate from tests
- **Data-driven tests** — `INVALID_LOGINS` array drives parameterized scenarios
- **Tagged suites** — `@smoke` for must-pass critical path, `@regression` for full coverage
- **Cross-browser matrix** — Chromium, Firefox, WebKit, and Mobile Chrome (Pixel 7)
- **Visual regression** — pixel-diff snapshots on critical screens
- **Performance assertion** — explicit budget for `performance_glitch_user`
- **GitHub Actions CI** — runs on push, PR, and a nightly cron; uploads HTML report + traces as artifacts
- **Real bug reports** — see [`docs/BUGS-DISCOVERED.md`](docs/BUGS-DISCOVERED.md) for how I'd file the issues SauceDemo intentionally seeds

---

## 📁 Project Structure

```
playwright-saucedemo-suite/
├── pages/                    # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── fixtures/
│   ├── users.ts              # Test data: users, products, shipping info
│   └── test-fixtures.ts      # Custom Playwright fixtures
├── tests/
│   ├── smoke/                # Tagged @smoke — critical path
│   │   ├── login.spec.ts
│   │   └── cart.spec.ts
│   └── regression/           # Tagged @regression — broader coverage
│       ├── checkout.spec.ts
│       ├── sorting.spec.ts
│       └── visual.spec.ts
├── docs/
│   ├── TEST-PLAN.md          # Formal test plan (entry/exit, scope, risks)
│   └── BUGS-DISCOVERED.md    # Curated bug reports against seeded defects
├── .github/workflows/
│   └── playwright.yml        # CI matrix + nightly run
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm ci

# 2. Install browsers
npx playwright install --with-deps

# 3. Run all tests
npm test

# 4. View the HTML report
npm run report
```

### Targeted runs

```bash
npm run test:smoke         # only @smoke
npm run test:regression    # only @regression
npm run test:chromium      # one browser
npm run test:headed        # see the browser
npm run test:ui            # Playwright UI mode (interactive)
npm run test:debug         # step through with the inspector
```

---

## 🧭 Test Coverage Matrix

| Area | Tests | Tag |
| --- | --- | --- |
| Login (happy path) | 1 | `@smoke` |
| Locked-out user | 1 | `@smoke` |
| Logout flow | 1 | `@smoke` |
| Login validation (4 negative cases) | 4 | `@regression` |
| Performance threshold | 1 | `@regression` |
| Cart add / remove / count | 4 | `@smoke` |
| Inventory sort (4 modes) | 4 | `@regression` |
| Checkout happy path | 1 | `@regression` |
| Checkout field validation | 3 | `@regression` |
| Cart persistence into checkout | 1 | `@regression` |
| Visual regression | 2 | `@regression` |

Run on every push **across 3 desktop browsers + 1 mobile profile**.

---

## 🔬 What this suite demonstrates

- **Maintainable architecture**: page objects keep tests readable; fixtures keep them DRY.
- **Tester instinct, not just automation**: [`docs/BUGS-DISCOVERED.md`](docs/BUGS-DISCOVERED.md) treats SauceDemo's seeded defects as if they were real bugs and shows the report format I'd use in a real ticket.
- **Production-style CI**: matrix-sharded across browsers, retries on flake, traces on failure, nightly cron — the exact shape of pipeline I run at work.
- **Clear separation of smoke vs regression**: critical tests run on every push; broader coverage runs nightly.

---

## 📜 License

[MIT](LICENSE) © 2026 JM Dionisio

---

## 👤 Author

**JM Dionisio** — QA Lead & SDET
[GitHub @dnsjm](https://github.com/dnsjm) · [LinkedIn](https://linkedin.com/in/jm-dionisio/) · [Portfolio](https://jm-dionisio.vercel.app)
