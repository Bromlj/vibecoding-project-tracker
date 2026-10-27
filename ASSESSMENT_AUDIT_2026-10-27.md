# CM6312 frontend evidence audit — 27 October 2026

This audit supports an expanded editorial report, not a guarantee of marks or a claim of representative-user validation. The report is designed to be self-contained: the assessor should not have to inspect this repository.

## Product and specification

No product/runtime source was changed during this audit. The existing local/demo frontend represents the substantial M3–M12 workflow. The report explicitly records three deviations from a literal slide reading:

- M4: populated fictional demo projects are separate from a blank new personal workspace, and contain more than 3–4 examples.
- M9: freshness identifies the last successful context save, not each unsaved keystroke.
- M11: the four deliverable fields are edited in a dialog rather than permanently inline on each card.

These are design interpretations requiring honest justification; the audit does not claim the client formally approved each deviation. Optional M7 activity strip and M9 rendered Markdown preview are not treated as compulsory. M12 requests a distinctive interaction, not every illustrative example. M3's `#5 microcopy` refers to a section number, not five mandatory lines.

The original FR-01–24, NFR-01–13 and DR-01–13 identities remain intact. The expanded inventory adds two IDs for already-existing frontend behaviour:

| ID | Existing behaviour made explicit | Priority and origin |
|---|---|---|
| FR-25 | Search tasks; filter by owner/type; show matching counts and recover from no results by clearing filters. | Beyond-MVP retrieval extension; not an explicit client-slide requirement. |
| FR-26 | Set up a local workspace and navigate projects, team, settings, help and responsive menus without requiring sign-in. | MVP access/navigation; extra guided/help controls remain extensions. |

There are therefore 52 identifiers in the expanded editorial specification. The additions do not imply new runtime features. Existing requirements sometimes contain a client core plus a safeguard/extension; the report separates those priorities rather than relabelling every clause as client-requested.

## Fresh evidence

1. [Frontend capture run](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40494877900), source snapshot `ce81b84d1bee0c81a53cba3eac5f03e265388cb6`: npm install, 29 Node tests passed, zero failed, and production build succeeded. Thirty live screenshots were exported. Two browser checkpoints initially used incorrect task selectors; their raw failures remain recorded rather than being called passes.
2. [Interaction supplement](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40496007443), harness snapshot `c108df8b938d530d010f55b7b8b4434815cafeed`: corrected accessible-name selectors verified task/context creation, draft persistence across editor tabs, owner/status changes after reload, cancelled/confirmed deletion, clipboard content and denied-copy fallback, cross-tab conflict, malformed-storage preservation, and milestone lifecycle. Seventeen screenshots were exported.
3. [Final targeted states](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40497956587), harness snapshot `2d71c6eefaed8988cd0fb259d0318beb33780ebb`: controlled failed-write test verified that the visible draft was retained and the stored snapshot remained byte-for-byte unchanged. Accessibility lower controls, unconfigured shared access and unsaved-close protection were also captured. Four screenshots were exported.

The combined raw set contains 51 screenshots; the report selects 50. Every screenshot is from the running public application in an isolated browser. Crops remove irrelevant margins only. Browser storage/clipboard faults and simulated speech capability are explicitly labelled. The scripts do not sign in or alter a user's real personal workspace.

Four fresh scoped axe scans (desktop board, task editor, settings, 320px board) reported no violations. Some checks require manual review. The 320px measured state had document width 320px. These results do not establish complete WCAG conformance, full keyboard/screen-reader accessibility, or real-device usability.

## Speech boundary

The headless browser had no usable local voice. The genuine unavailable-voice state is captured. A controlled stand-in speech service supplied capability to the actual frontend component so Start/Pause/Resume/Stop states could be captured. This is a simulated browser dependency, not fabricated UI, and not evidence of audible speech quality.

## Open acceptance work

- Complete a valid backup replacement in a disposable workspace; the fresh run checked validation/confirmation and cancelled replacement.
- Edge and Firefox checks; fresh live capture used Chromium only.
- Real-device speech, comprehensive keyboard/screen-reader evaluation and browser zoom/target-size coverage.
- A fresh performance measurement for the precise NFR-13 scale/percentiles. The 20 October benchmark remains historical and must not be presented as today's hosted timing.
- Portal/webhook recognition and any changed administrative submission arrangements are not newly independently verified.

A successful Actions job only means the capture script completed; individual manifests can contain NOT VERIFIED checkpoints. The supplemental/final checks supersede the identified harness problems, not the raw records.

## Report-use boundary

The student supplied a second-hand account of the lecturer Q&A: exhaustive requirement mapping, quality design reasoning and frontend-only demonstration are reported. That account is not a verbatim statement from the lecturer and contains no word-limit waiver. The published brief states 2,000 words; retain written clarification before submitting an expanded report. The brief permits AI-generated prototyping but restricts generated report prose. The expanded document is an AI-assisted editorial master for independent review/rewrite, not an unchanged submission copy or a declaration that assistance was limited to proofreading.
