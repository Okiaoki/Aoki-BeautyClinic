# Release QA Checklist

## A. Visual (Desktop / Mobile)
- [ ] FV heading and CTA are visible at first view.
- [ ] Section spacing is consistent (`menu`, `reasons`, `case`, `pricing`, `faq`, `flow`, `cta`).
- [ ] Sticky CTA appears bottom-right on desktop.
- [ ] Sticky CTA appears full-width bottom bar on mobile.
- [ ] No text overlap or clipping in any section.

## B. Navigation / CTA
- [ ] Header phone CTA opens dialer.
- [ ] Header web CTA transitions to reservation URL.
- [ ] FV/mid/footer/sticky web CTA transitions correctly.
- [ ] FAQ opens/closes correctly.
- [ ] Area select can be changed without layout break.

## C. Tracking
- [ ] `lp_view` received in GA4 DebugView.
- [ ] Web CTA click events received in GA4/GTM.
- [ ] Tel CTA click events received in GA4/GTM.
- [ ] Google Ads `conversion` sent for web/tel CTA.
- [ ] Meta `Lead` event fired for web/tel CTA.

## D. Performance
- [ ] First view loads without long blank period on 4G.
- [ ] Main visual shift is not noticeable (no major CLS).
- [ ] No blocking script errors in browser console.

## E. Browser Matrix
- [ ] iOS Safari latest
- [ ] Android Chrome latest
- [ ] Desktop Chrome latest
- [ ] Desktop Edge latest

## Sign-off
- Reviewer:
- Date:
- Result: Pass / Fail
- Notes:
