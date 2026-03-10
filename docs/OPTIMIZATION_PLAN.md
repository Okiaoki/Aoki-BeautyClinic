# Initial Optimization Plan

Updated: 2026-02-22
Target KPI: Counseling reservation CVR

## AB Test 1: FV Headline
- A: はじめての美容医療でも、納得して選べる。
- B: 迷ったまま決めない。医師と比較してから予約できる。
- Metric: `fv_cta_web_click / lp_view`

## AB Test 2: Primary CTA Text
- A: Webで無料カウンセリング予約
- B: 30秒でWeb予約する
- Metric: `*_web_click / lp_view`

## AB Test 3: Sticky CTA Order (SP)
- A: 左 電話 / 右 Web
- B: 左 Web / 右 電話
- Metric: `sticky_cta_web_click`, `sticky_cta_tel_click`

## Focus Areas by Funnel
- Menu section: add per-card CTA if click-through is low.
- Case section: add note for minimum-price conditions if hesitation is high.
- Final CTA section: test shorter support copy to reduce friction.

## Monthly Review
1. Week 1-2: Implement and run AB Test 1.
2. Week 3: Apply winner and run AB Test 2.
3. Week 4: Run AB Test 3 for SP traffic.
