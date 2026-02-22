# QA Report (Local)

Date: 2026-02-22
Scope: `lp/ad-lp-v1`

## 1. Structure/Link Checks
- Pass: Main section IDs exist (`top`, `menu`, `reasons`, `case`, `pricing`, `faq`, `flow`, `cta`).
- Pass: Internal anchor links resolve (`#top` target exists).
- Pass: All local asset references resolve (`styles.css`, `app.js`, `tracking-config.js`, images).

## 2. CTA/Flow Checks (Source-level)
- Pass: Web CTA links exist in header/FV/mid/footer/sticky.
- Pass: Tel CTA links exist in header/FV/footer/sticky.
- Pass: FAQ uses native `details/summary` for open/close behavior.
- Pass: Event attributes attached (`data-track`, `data-conversion`) for CTA and area select.

## 3. Responsive Checks (CSS-level)
- Pass: Breakpoint defined at `980px` (layout collapse for hero/cards).
- Pass: Breakpoint defined at `700px` (header CTA hidden, sticky CTA bottom full-width).
- Pass: Sticky CTA button split on SP (`.sticky-cta .btn { flex: 1; }`).

## 4. Tracking Checks (Pre-ID)
- Pass: Config file split implemented (`tracking-config.js`).
- Pass: GA4/GTM/Ads/Meta hooks implemented in `app.js`.
- Pending: Real event ingestion verification after production IDs are set.

## 5. Remaining Manual QA (Required)
- Manual real-device visual check:
  - iOS Safari (latest)
  - Android Chrome (latest)
  - Desktop Chrome/Edge
- Manual click path check on hosted URL:
  - All CTA transitions
  - Conversion events in actual dashboards

## Result
- Local static QA: Completed
- Final device QA: Pending (external environment required)
