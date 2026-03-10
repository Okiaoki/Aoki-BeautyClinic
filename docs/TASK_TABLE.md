# LP Task Table

Updated: 2026-02-22
Target: `lp/ad-lp-v1`

## Current File Scope
- `index.html`
- `styles.css`
- `app.js`
- `tracking-config.js`
- `tracking-config.example.js`
- `images/*.jpg`

## Task Status

| No | Task | Status | Action | Owner |
| --- | --- | --- | --- | --- |
| 1 | Template inventory | Done | Unused files removed; delivery scope reduced to 1 LP | Done |
| 2 | Required LP sections | Done | FV, menu, reasons, case, pricing, FAQ, flow, final CTA implemented | Done |
| 3 | Copy short rewrite | Done | Short copy reflected on the live LP source | Done |
| 4 | Medical ad expression audit | Pending (final) | Final legal/medical supervisor review on production text | Client/Medical supervisor |
| 5 | Wireframe finalization | Done | One-page conversion-first structure fixed | Done |
| 6 | Design finalization (PC/SP) | Done | Responsive design and fixed CTA finalized | Done |
| 7 | Image selection and optimization | Done | Lightweight case images selected and lazy-loaded | Done |
| 8 | Coding finalization | Done | Production-ready markup/CSS/JS organized | Done |
| 9 | Tracking tags (GA4/GTM/Ads/Meta) | In progress | Fill actual IDs in `tracking-config.js` and validate events | Client + Dev |
| 10 | QA (display/navigation/tracking/speed) | In progress | Local static QA completed, run real-device QA and post-ID tracking QA | Dev |
| 11 | Publish | Pending | Deploy files to hosting path and verify live URL | Client + Dev |
| 12 | Initial optimization proposal | Done | AB test plan documented | Dev |

## Immediate Next Actions
1. Fill actual IDs in `tracking-config.js` using `tracking-config.example.js` as template.
2. Validate events with Tag Assistant, GA4 DebugView, and Meta Test Events.
3. Execute final legal/medical ad wording check before release.
4. Run cross-browser checks: iOS Safari, Android Chrome, desktop Chrome/Edge.
5. Deploy and re-check CTA transitions and conversion events on the live URL.

## Operational References
- Event naming and payload: `EVENT_GUIDE.md`
- Release QA procedure: `QA_CHECKLIST_RELEASE.md`
- CrowdWorks submission text: `CROWDWORKS_REPORT_TEMPLATE.md`
