# Bugs & Quirks Discovered on SauceDemo

SauceDemo intentionally seeds known defects into specific user accounts so QA candidates can practice exploratory testing. This doc treats those as if they were real production bugs and walks through how a tester would investigate, document, and triage each one.

> The goal of this document isn't to "find" the bugs (they're well known) — it's to demonstrate how I structure a bug report and how I'd advocate for fixes if these surfaced in real production.

---

## BUG-001 · `problem_user` — product images all render as the same dog photo

| Field | Value |
| --- | --- |
| Severity | High (visual integrity) |
| Repro user | `problem_user` / `secret_sauce` |
| Affected page | `/inventory.html` |
| Browsers | All |
| Steps | 1) Log in as `problem_user` → 2) Observe inventory grid |
| Expected | Each product shows its own image |
| Actual | Every product card shows the same generic dog image |
| Impact | Customers cannot visually distinguish products → cart abandonment risk |
| Recommendation | Investigate image-resolution path in product service; add a snapshot test per product card |

---

## BUG-002 · `problem_user` — sort dropdown does not re-order products

| Field | Value |
| --- | --- |
| Severity | High |
| Repro user | `problem_user` |
| Affected | Inventory sort feature |
| Steps | 1) Log in as `problem_user` → 2) Change sort to "Price (low to high)" → 3) Observe |
| Expected | Products re-order ascending by price |
| Actual | Order is unchanged |
| Recommendation | Confirm sort handler is wired to user state, not just default state |

---

## BUG-003 · `problem_user` — "Add to cart" buttons on selected items do not respond

| Field | Value |
| --- | --- |
| Severity | Critical (revenue-blocking) |
| Repro user | `problem_user` |
| Steps | 1) Log in as `problem_user` → 2) Click "Add to cart" on Sauce Labs Bolt T-Shirt and Sauce Labs Onesie → 3) Observe cart badge |
| Expected | Cart badge increments to 2 |
| Actual | Buttons appear clicked but cart badge does not increment |
| Recommendation | Treat as a P0; verify event handler binding for affected SKUs |

---

## BUG-004 · `performance_glitch_user` — login latency exceeds acceptable threshold

| Field | Value |
| --- | --- |
| Severity | Medium |
| Repro user | `performance_glitch_user` |
| Steps | 1) Submit valid credentials → 2) Time until inventory page renders |
| Expected | Login completes in < 2s under normal conditions |
| Actual | Login takes ~5s consistently |
| Test coverage | Asserted in `tests/smoke/login.spec.ts` as a budget of 10s with annotation |
| Recommendation | Add server-side performance instrumentation; investigate login query plan |

---

## BUG-005 · `error_user` — checkout overview crashes on click of Finish

| Field | Value |
| --- | --- |
| Severity | Critical |
| Repro user | `error_user` |
| Steps | 1) Add any item to cart → 2) Proceed through checkout → 3) Click Finish |
| Expected | Order confirmation screen renders |
| Actual | JavaScript exception; user lands on a broken state |
| Recommendation | Add error boundary on checkout overview; surface failures via Sentry |

---

## BUG-006 · `visual_user` — UI elements shifted off baseline

| Field | Value |
| --- | --- |
| Severity | Low (cosmetic) |
| Repro user | `visual_user` |
| Steps | 1) Log in → 2) Compare inventory layout against `standard_user` |
| Expected | Layout matches design |
| Actual | Subtle visual offsets — burger icon shifted, product card spacing inconsistent |
| Test coverage | Caught by `tests/regression/visual.spec.ts` snapshot diffs |
| Recommendation | Align CSS variables to design tokens; lock visual baselines per release |

---

## How I'd file these in a real environment

Each bug above would become a ClickUp / Jira ticket with:

- Severity + Priority justified against business impact
- Reproducible steps + screenshots / Jam.dev recordings
- Sentry trace ID where applicable
- Suggested test coverage to prevent regression
- Owner team tagged based on the affected service

The pattern is the same one I use day-to-day at Wilson Works.
