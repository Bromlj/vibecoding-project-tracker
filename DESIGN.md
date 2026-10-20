# Vibecoding Project Tracker — Design

## 1. Direction
A quiet, practical workspace that makes the next task and its AI handover easy to understand. The Kanban board is the main surface. Retain the descriptive product name; no invented team brand.

References consulted: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for legibility, keyboard operation, reflow and status messages; [WAI modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) for protected editing and focus; supplied M3–M11 slides for board/editor/anchor composition. These are functional references, not evidence of user preference. Avoid decorative blur, gradients, sound effects and icon-only controls.

## 2. Tokens
| Token | Hex | Purpose |
|---|---|---|
| brand-primary | #115E59 | Main actions, wordmark, focus |
| brand-accent | #0F766E | Hover |
| surface-page | #F5F7F6 | Workspace |
| surface-card | #FFFFFF | Tasks/editor |
| ink-primary | #172D2A | Main text |
| ink-muted | #536762 | Secondary text |
| type-feature | #1D4ED8 | Feature badge |
| type-bug | #9F1239 | Bug badge |
| due-safe | #F0F7F4 | Calm task |
| due-warning | #FFF4D6 | Within 48 hours |
| due-overdue | #FFF0F0 | Overdue |
| due-neutral | #FFFFFF | Done/undated |

Deadline tint is independent of type. Include written states and labelled dates: colour alone cannot communicate meaning (WCAG 1.4.1). Done overrides overdue. Resolve the slide's undefined 24–48 hour interval as "Due soon"; retain "Due within 24 hours". Date-only deadlines mean end of the selected local day. This is an explicit implementation policy, not a client quotation.

## 3. Typography/layout
Heading/body use the system UI stack (Segoe UI on Windows): familiar rendering without a font download. Code/context uses system monospace. Body/controls 16px, secondary text 14px, title 28–32px. Use rem units and browser zoom. Four desktop columns, two medium, one narrow, preserving reading order without page-wide horizontal scrolling. Aim for 44px action height, exceeding WCAG 2.5.8 minimum.

## 4. Components
- Cards: 1px border, text title button, separate copy action; no nested buttons.
- Buttons: explicit verbs, solid teal primary, visible 2px focus outline with separation.
- Editor: native named dialog; initial focus, Escape, focus return, explicit save/cancel, deletion confirmation.
- Empty states: "No tasks here yet." plus Add task.
- Movement: status dropdown; no drag dependency.
- Feedback: polite live status for success; persistent actionable storage errors. No animation needed.
- Feature/bug: labelled badge with a simple consistent SVG icon as well as colour.

## 5. Voice
Add task. Context copied. Paste it into your AI tool. Delete this task? This cannot be undone. Task assigned to {name}.

## 6. Identity/scope
Product name: Vibecoding Project Tracker, text wordmark. One light theme. No additional runtime dependencies, accounts, AI calls or backend. Teammate placeholders remain explicitly labelled until the real roster is supplied. No claim of full WCAG conformance.

M12 candidate: briefing review before copying, showing exact output and missing context headings. Human review assistance, not automated judgement of correctness.
