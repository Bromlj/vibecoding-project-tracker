# Keyboard navigation, reading and text alternatives

20 October 2026. Engineering decisions and verification evidence for the student's own evaluation. This extends the [design checkpoint](DESIGN_REVIEW.md); it does not claim full WCAG conformance or replace testing with people who use assistive technology.

## Request and scope

The student requested easier navigation for people with limited hand mobility, speech/screen-reader support and text alternatives throughout. These are selected product improvements, not newly discovered client statements. They extend FR-21/22 and NFR-01/02/05/06; the browser preference is recorded as DR-11.

**Navigation & reading** is available from the desktop sidebar or mobile Menu, including before workspace setup. It offers direct section buttons, optional shortcuts, a guide and Read page aloud. Task AI context and Review briefing also offer Read briefing aloud. Reading controls appear before the long shortcut list to reduce scrolling to the requested action.

## Keyboard decisions

Single-key shortcuts reduce the need to hold several keys together. They are **off by default**, can be disabled at any time and are stored only for this browser. The help checkbox saves immediately; Accessibility preferences uses its existing explicit Save action. Older preference records without the new field remain valid and start with shortcuts off.

| Key | Action when enabled |
|---|---|
| P | Projects |
| B | Current project board |
| T | Team |
| M | Current project's milestones |
| S | Appearance & settings |
| A | Accessibility preferences |
| H | Navigation & reading |
| N | Add task, while on the board |
| F | Focus task search, while on the board |
| 1–4 | Reveal/focus To Do, In Progress, Review or Done |
| J / K | Next / previous visible task |

Shortcuts ignore text entry, native choices, editable content, tab widgets, open dialogs, modifier combinations, repeated keydown events and input composition. They never save, delete, mark work complete or bypass discard protection. Before setup, only help and accessibility shortcuts apply. Task navigation respects filters and visible mobile stages.

Standard Tab/Shift+Tab, Enter/Space, native select arrows and dialog Escape remain available. Help includes direct labelled buttons so its use does not depend on remembering shortcuts. Navigation moves focus to the destination heading; help closes before it focuses a destination, avoiding a focus trap. The skip link targets the main landmark. Existing editor tabs retain their own arrow/Home/End behaviour.

The off switch follows [WCAG 2.2 Character Key Shortcuts](https://www.w3.org/WAI/WCAG22/Understanding/character-key-shortcuts.html): character shortcuts can otherwise conflict with dictation or screen-reader commands. This design chooses opt-in/off rather than a custom remapping interface. Focus placement follows the [WAI keyboard-interface guidance](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/).

## Reading and speech decisions

Read aloud is an optional convenience, separate from a device's screen reader. It does not inspect or control another app and does not listen to a microphone. Visible/programmatic control names support use with the device's existing voice-control software; actual dictation/switch-device operation still needs human testing.

- Read page aloud uses a snapshot of the current main content when help opens.
- Task reading uses the same complete plain-text briefing serializer as review/copy. In the editor it includes the visible draft; it does not save it.
- A user explicitly starts reading. Pause, Resume and Stop are visible controls, alongside a local voice and speed selector.
- Only voices that the browser reports as `localService` are offered. There is no automatic fallback to a remote voice. See the [SpeechSynthesisVoice.localService definition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService).
- No voice/API available produces an explanatory text fallback; keyboard access and the task's text remain available.
- Text is spoken in bounded chunks to avoid common platform utterance limits. Speech whitespace is normalised; stored/copied context and Unicode remain unchanged.
- Reading stops on exit, a changed briefing, a hidden page or Escape. It never continues across a closed editor. Focus moves to Pause when reading starts and back to Read when the reading controls disappear; it does not pull focus away from another field after completion.
- Errors explain the problem without removing the draft or claiming successful reading.

This adds no package, AI service or hosted speech dependency. Voice availability and pronunciation depend on the browser/device. No claim of audible output quality or OS privacy guarantees beyond the browser-reported local voice flag is made.

## Text alternatives and screen-reader semantics

The current interface has no meaningful raster images. Decorative SVGs and owner initials duplicate adjacent text, so they are hidden from assistive technology instead of announced twice. SVGs are not keyboard focus targets. If meaningful images are added later, provide an equivalent description; purely decorative images need empty alternatives. This follows the [WAI alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/).

Task actions identify both the action and task: for example, “Copy context for Capture a new feature” and “Review briefing for Capture a new feature”. Visible labels remain part of the accessible names. Headings, landmarks, persistent input labels, owner/type/deadline text and live save/error messages supply the meaning throughout the workflow. There is no switch that disables these baseline semantics.

## Verification and limits

The private evidence folder contains `mobility-access-check.cjs`, `mobility-regression.cjs`, `Mobility*-access-results.json`, `Mobility-regression*-flow-results.json` and screenshots. Tests use isolated synthetic workspaces and do not change the student's records.

| Check | Observed result |
|---|---|
| Production build / Node tests | Build passed; 21 tests passed, including shortcut guards and complete Unicode speech chunking |
| New navigation/reading browser checks | Eight grouped checks in Chrome 155.0.8059.82, Edge 155.0.4283.45 and Playwright Firefox 153.0 |
| Existing workspace regression | 14 scenario groups passed in each browser, including create/edit/reload, failure recovery and keyboard dialog protection |
| Automated accessibility | Five new screen/state scans per browser; zero violations returned |
| Enlarged text | Navigation/reading dialog had no horizontal overflow at 320, 768 and 1280 CSS pixels with a 32px root font |
| Device voice discovery | Three local voices reported in Chrome/Edge; five in Firefox on this Windows machine |
| Speech controls | Lifecycle/error/chunk behaviour verified using a deterministic speech API stand-in; no microphone or audible speech test performed |

The first repeated Chrome check asserted focus before the navigation animation frame had completed. The test was corrected to wait for the destination focus. Two preliminary browser selections used lowercase names and consequently ran Chrome; they are excluded from the cross-browser evidence. Named Edge/Firefox results above come from the corrected engine selections.

Actual spoken output, a named screen-reader/browser session, representative users with motor/visual access needs, switch input, dictation, real mobile devices and actual browser zoom remain to be checked. CSS text sizing and automatic scans do not establish those results.

Suggested human checks: navigate and edit with keyboard only; use the screen reader's headings/landmarks to find a task; start/pause/stop a long briefing; verify pronunciation and focus announcements; disable shortcuts while dictating; compare the experience with shortcuts enabled. Record observations rather than assuming these changes improve speed or satisfaction.
