# Event Guide

Target file: `app.js`

## Event Naming Rule
- Use `snake_case`.
- Prefix by section when needed: `header_`, `fv_`, `mid_`, `footer_`, `sticky_`.
- Action suffix should be explicit: `_click`, `_change`, `_view`.

## Implemented Events
- `lp_view`
- `header_cta_web_click`
- `header_cta_tel_click`
- `fv_cta_web_click`
- `fv_cta_tel_click`
- `mid_cta_web_click`
- `footer_cta_web_click`
- `footer_cta_tel_click`
- `sticky_cta_web_click`
- `sticky_cta_tel_click`
- `area_select_change`

## Parameters
- `event`: event name
- `page_type`: `ad_lp`
- `cta_text`: clicked text
- `cta_type`: `web` / `tel` / `none`

## Conversion Handling
- Google Ads: `conversion` event with `send_to: AW-XXXX/label`
- Meta Pixel: `Lead` event with `{ source: "web"|"tel" }`
