---
name: Vibecoding Project Tracker
description: A clear workspace for project tasks, AI context and handovers.
colors:
  primary: "#115E59"
  primary-hover: "#104E4A"
  selected: "#E6F1EF"
  surface-page: "#F6F8F9"
  surface-card: "#FFFFFF"
  surface-column: "#EDF1F3"
  ink-primary: "#172333"
  ink-muted: "#526579"
  ink-control: "#253748"
  ink-placeholder: "#596C7A"
  border-control: "#7C8B98"
  border-surface: "#D6E0E4"
  secondary-hover: "#EDF3F3"
  feature-blue: "#1D4ED8"
  feature-blue-bg: "#EFF6FF"
  feature-blue-border: "#BFDBFE"
  bug-rose: "#9F1239"
  bug-rose-bg: "#FFF1F2"
  bug-rose-border: "#FECDD3"
  feature-violet: "#6D28D9"
  feature-violet-bg: "#F5F3FF"
  feature-violet-border: "#DDD6FE"
  bug-amber: "#9A3412"
  bug-amber-bg: "#FFF7ED"
  bug-amber-border: "#FED7AA"
  feature-forest: "#166534"
  feature-forest-bg: "#F0FDF4"
  feature-forest-border: "#BBF7D0"
  bug-berry: "#9D174D"
  bug-berry-bg: "#FDF2F8"
  bug-berry-border: "#FBCFE8"
  deadline-warning: "#854500"
  deadline-warning-bg: "#FFF3D6"
  deadline-overdue-bg: "#FFF0F2"
  deadline-safe: "#285B48"
  deadline-safe-bg: "#EDF6F0"
  deadline-neutral-bg: "#F2F5F7"
typography:
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.8rem, 2.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.5
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  context:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  input: "0.4rem"
  button: "0.45rem"
  badge: "0.375rem"
  panel: "0.5rem"
  project: "0.65rem"
  dialog: "1rem"
spacing:
  compact: "0.5rem"
  related: "0.75rem"
  group: "1rem"
  grid: "1.25rem"
  section: "1.5rem"
  page: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-card}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0.55rem 0.9rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface-card}"
  button-secondary:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink-control}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "0.55rem 0.9rem"
  text-input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.input}"
    padding: "0.6rem 0.75rem"
  navigation-selected:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.primary}"
    rounded: "{rounded.input}"
    padding: "0.85rem 0.75rem"
  type-feature:
    backgroundColor: "{colors.feature-blue-bg}"
    textColor: "{colors.feature-blue}"
    rounded: "{rounded.badge}"
    padding: "0.25rem 0.5rem"
  project-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.project}"
    padding: "1.5rem"
---

# Design System: Vibecoding Project Tracker

## Overview

**Creative North Star: "A quiet, practical workspace"**

Keep project identity, the current task and the next action easy to find. White navigation and content surfaces sit on a pale grey workspace; restrained teal identifies primary actions and selected navigation. Density supports scanning real work while task editing gives longer context room to breathe.

This is the implemented design as of 20 October 2026. It adapts the supplied 14-screen `product-design` package: Projects landing, persistent sidebar, board and milestones, two task-editor tabs, briefing review, and a narrow-screen stage selector. It retains the application's working data, editing and recovery behavior. The reference is design input, not evidence of user research or a requirement to reproduce invented metrics.

**Key Characteristics:**

- Stable workspace navigation and explicit project identity.
- White task surfaces with separate type and deadline labels.
- System typography, readable controls and visible keyboard focus.
- Human review of exact context, with saved and unsaved states distinguished.
- Local accessibility preferences and a visible palette preview.

The current code in `src/index.css`, `src/WorkspaceApp.jsx`, `src/TaskBoard.jsx`, `src/TaskEditor.jsx`, `src/Dialog.jsx`, `src/WorkspaceSettings.jsx` and `src/workspace.js` is the extraction source. Frontmatter captures reusable implemented values. Source CSS and documentation must be changed together. See [DESIGN_REVIEW.md](DESIGN_REVIEW.md) for the design decision record and verification evidence.

## Colors

The primary teal anchors actions; neutral surfaces preserve the distinction between task category and urgency.

### Primary

Use `primary` for the main save/create action, selected navigation, links and focus. Use `primary-hover` for solid-button hover. The pale `selected` surface supports an active item without filling the sidebar with strong color.

### Secondary

Task-category palettes are existing product choices: Blue and rose, Violet and amber, and Forest and berry. Each has a feature and bug foreground, background and border. The palette changes these category badges only; written labels and authored icons remain present.

Deadline warning, overdue, safe and neutral labels retain their own meaning across all palettes. Done tasks use a neutral Complete label. A date means the end of that local calendar day; the written due state distinguishes the 24-hour and 48-hour intervals.

**The Independent Meaning Rule.** Keep task type and deadline urgency in separate labelled elements; changing a category palette must not change urgency.

### Neutral

Use `surface-page` for the workspace, `surface-card` for working surfaces, and `surface-column` for stage grouping. Primary ink carries headings and form values; muted ink carries supporting copy. Control borders are stronger than non-interactive surface dividers so the editable area remains identifiable.

Calculated source-color pairs: primary text on workspace 14.88:1; muted text on white 6.01:1; placeholder text on white 5.45:1; white on teal 7.58:1. The six category text/background pairs range from 6.16:1 to 7.30:1; the four deadline pairs range from 5.49:1 to 7.25:1. Control border on white is 3.50:1. These calculations cover the named opaque pairs, not every rendered state or full WCAG conformance.

Contrast, color-independent meaning, reflow and focus are informed by the [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/). Higher-contrast mode strengthens selected text and boundaries; it supplements the default presentation.

## Typography

Use the installed system UI stack throughout. This follows the agreed practical direction and avoids font downloads. Monospace is reserved for editable Markdown context and the exact briefing text.

- **Headline:** page identity, using the responsive headline token; narrow screens use 1.8rem.
- **Title:** project and settings headings; dialog titles use 1.25rem at weight 600.
- **Body:** ordinary explanation and form content. Supporting copy usually uses 0.875rem; project descriptions and desktop task titles use 0.9375rem.
- **Label:** action labels; small metadata uses 0.75–0.8125rem where implemented. Narrow-screen task titles increase to 1.05rem and deadline text to 0.875rem.
- **Context:** multiline text with a 1.6 line height. Preserve full input and line breaks rather than shortening content to match a mockup.

Page introductions and explanatory empty-state copy are constrained to 65ch. Numeric project counts use tabular figures. Browser zoom remains available; saved text-size preferences set the root to 18px or 20px.

## Layout

The desktop shell uses a fixed 14rem white sidebar, with workspace content offset by the same width. Content and footer have a maximum width of 1500px. Flexible page headings keep actions adjacent to the current project while allowing wrapping.

Projects are real navigable records in an auto-filling grid with a minimum card track of 19rem, capped by available width. Counts come from each board's tasks and milestones. The landing page makes multiple boards discoverable within one workspace; team metadata remains shared across those boards.

The board uses four columns at widths of 1280px and above, two below that threshold, and one at 700px and below. At 1000px and below a labelled Menu reveals the sidebar in document flow. At 700px and below a labelled Stage select chooses one column, with View all stages available; matching task counts always describe all stages.

The context editor uses a flexible text area and a 14rem tools column, collapsing to one column at 700px. Settings use a flexible form area and a 19rem preview until 1200px. The preview then becomes an ordinary flow element. Team rows reduce from four columns to two, then one.

Dialogs use available viewport space, with full-screen treatment at 700px and below. Their headers and action rows remain visible during ordinary scrolling; at viewport heights of 500px and below they return to normal flow to preserve usable editing space.

Spacing groups related labels and controls closely while separating navigation, filters and work. This applies proximity and chunking from the supplied *UX – The User* teaching material. Stable navigation and All projects apply orientation principles from *Web Usability*. These are design rationales to evaluate with users, not results from a user study.

## Elevation & Depth

Borders and surface tones provide most separation. Project cards use a soft `0 2px 5px #17233305` shadow; task cards use `0 2px 4px #17233305`. The native modal receives the stronger Tailwind `shadow-xl` and a slate backdrop to show protected editing focus.

Reduced-effects preferences remove card and modal shadows and replace the translucent modal backdrop with a solid backdrop. The interface has no authored entrance animation. Text selection and carets use the teal family; native scrollbars remain available.

**The Quiet Depth Rule.** Use elevation to distinguish an active dialog or working surface; do not introduce decorative glow, blur or animation into the work area.

## Shapes

Use modest rounded rectangles: compact button and input corners, slightly softer project cards, and larger dialog corners. Borders define controls and containers. Task counts and member initials may use pills or circles because their small, repeated silhouette supports identification. A mobile full-screen editor has square edges.

## Components

### Buttons and fields

Actions use explicit verbs with a minimum height of 2.75rem for standard buttons and inputs. Primary actions are solid teal; supporting actions have a white surface and visible outline. Text actions use teal and an underline on hover. A global 3px focus outline with a 3px offset makes keyboard position visible.

Use visible labels and native text, date, select and checkbox controls. Validation preserves the draft, identifies the field, moves focus to it and presents a written error. Invalid inputs use a stronger error border. Busy saving changes the action label and disables relevant controls; save failures leave recovery available.

### Navigation and tabs

Sidebar labels remain present alongside icons. Current sections use `aria-current`, a pale surface and stronger text. Project Board and Milestones are navigation controls.

Details and AI context use a tab list, linked panels, selected state and roving keyboard focus. Left/Right, Home and End change the active tab. This follows the [WAI tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Keep the current task title in the shared dialog header so identity remains visible in both panels.

### Task cards and category badges

The title is a named edit button. Type, owner, deadline and context-save state are distinct groups. Copy context and Review briefing are separate actions; there are no nested buttons. Status changes use a native select, so moving work does not depend on dragging.

Type badges combine text, a small authored SVG and a pale palette surface. Deadline labels include written state and a date when relevant. Do not color the whole task by type or use a deadline tint as the only urgency cue.

### Editing and briefing review

The native dialog provides a named editing surface, focus containment, Escape handling and focus return. Unsaved edits require an explicit discard choice. Destructive actions require a separate confirmation. Save, Cancel and Close remain clearly labelled.

Details contains task metadata; AI context provides room for prompts, actual outcomes and next steps. Both panels edit one draft. Review briefing shows the complete serialized text that Copy context uses. Reviewing or copying does not save the task. Optional heading suggestions detect text presence and must never be presented as a quality score or AI judgement.

### Appearance, feedback and imagery

The settings preview demonstrates the selected task palette before saving. Browser accessibility choices remain distinct from workspace settings. Empty states offer a relevant action; filtering has its own no-results state. Save confirmation uses a polite live status; persistent failures use an alert and a recovery action.

No meaningful raster imagery is needed for this workflow. Small authored SVGs repeat adjacent labels and are excluded from assistive speech with `aria-hidden`; action meaning is carried by the text. This applies the principle behind [WAI decorative-image guidance](https://www.w3.org/WAI/tutorials/images/decorative/), without inventing descriptions for redundant decoration. Any future image that conveys unique information needs an appropriate text alternative.

### Navigation and reading assistance

Navigation & reading offers labelled section buttons and an opt-in single-key guide. Keep shortcuts off by default, suppress them in fields/dialogs/native choices, and retain ordinary keyboard navigation. This reduces simultaneous-key demands while allowing people using dictation/screen-reader commands to leave the shortcuts off. Focus the chosen heading, stage or task; do not invoke destructive actions through a shortcut.

Read-aloud controls sit before the long shortcut list. Task context and exact briefing review also offer reading, using available browser-reported local voices. Keep start/pause/resume/stop explicit, stop when the view closes, and retain text on failure. Read aloud complements semantic screen-reader access; it is not a screen-reader mode. Repeated Copy context and Review briefing accessible names include the task title. See [decision and verification record](ACCESSIBILITY_NAVIGATION.md).

## Do's and Don'ts

### Do:

- **Do** retain project and task identity when the user changes views.
- **Do** preserve visible labels, focus, keyboard operation and written status in every palette.
- **Do** use actual stored records for counts, milestones and deliverable state.
- **Do** preserve complete context, explicit saves, backup controls and recoverable error states.
- **Do** distinguish implementation evidence, calculated checks and pending user or live-service verification.

### Don't:

- **Don't** reproduce mockup analytics, completion states or collaboration claims without working data and verification.
- **Don't** combine category color and deadline urgency into one meaning.
- **Don't** hide essential actions behind hover, icons alone or dragging.
- **Don't** add decorative imagery or downloaded fonts to this agreed system.
- **Don't** present prototype checks as full WCAG conformance or invented user research.
