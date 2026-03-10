# Delivery Guide

Date: 2026-02-22
Target folder: `lp/ad-lp-v1`

## Delivery Files
- `index.html`
- `reservation-options.html`
- `phone-options.html`
- `assets/css/styles.css`
- `assets/js/app.js`
- `assets/js/tracking-config.js`
- `assets/js/tracking-config.example.js`
- `assets/images/`
- `docs/TASK_TABLE.md`
- `docs/OPTIMIZATION_PLAN.md`
- `docs/QA_REPORT_LOCAL.md`
- `docs/PERFORMANCE_REPORT_LOCAL.md`
- `docs/EVENT_GUIDE.md`
- `docs/QA_CHECKLIST_RELEASE.md`
- `docs/CROWDWORKS_REPORT_TEMPLATE.md`

## Pre-Release Steps
1. Open `assets/js/tracking-config.example.js`, copy values into `assets/js/tracking-config.js`.
2. Fill production IDs:
   - GTM ID
   - GA4 ID
   - Google Ads ID + conversion labels
   - Meta Pixel ID (optional)
3. Upload all files to production path.
4. Verify:
   - Page rendering on PC/SP
   - CTA links and tel links
   - Event reception in GA4/GTM/Ads/Meta
   - Final checklist by `docs/QA_CHECKLIST_RELEASE.md`

## Rollback Plan
- Keep previous production files as backup archive.
- If post-release issue occurs, roll back by replacing with previous archive.

## Handover Note
- `assets/js/tracking-config.js` is intentionally separated for operational updates without editing `index.html`.
