# CM6312 frontend evidence audit — 27 October 2026

This audit supports an expanded editorial report, not a guarantee of marks or representative-user validation. The report is self-contained: the assessor should not have to inspect this repository.

## Product and specification

No product/runtime source was changed during this audit. Existing local/demo functionality represents the substantial M3–M12 workflow. Three differences from the literal slides remain documented rather than concealed:

- M4: fictional populated demo projects are separate from a blank new personal workspace, with more than 3–4 examples.
- M9: freshness identifies the last successful context save, not each unsaved keystroke.
- M11: the four deliverable fields are edited in a dialog rather than permanently inline.

These are design interpretations, not claims of formal client approval. The optional M7 activity strip and M9 rendered Markdown preview are not compulsory. M12 requests a distinctive interaction, not every illustrative example. M3's `#5 microcopy` is a section number, not five mandatory lines.

Original FR-01–24, NFR-01–13 and DR-01–13 identities remain intact. The expanded inventory adds two identifiers for existing frontend behaviour:

| ID | Existing behaviour made explicit | Priority/origin |
|---|---|---|
| FR-25 | Search tasks; filter owner/type; show matching counts; clear filters after no results. | Beyond-MVP retrieval extension, not explicitly requested by the slides. |
| FR-26 | Set up a local workspace and navigate projects, team, settings, help and responsive menus without sign-in. | MVP access/navigation; additional guide/help controls remain extensions. |

The expanded specification has 52 identifiers. No new runtime feature is implied. Requirements containing both a client core and a safeguard/extension distinguish those priorities.

## Fresh evidence runs

1. [Initial frontend capture](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40494877900), snapshot `ce81b84d1bee0c81a53cba3eac5f03e265388cb6`: npm install succeeded, **29 Node tests passed / 0 failed**, and production build succeeded. Thirty screenshots exported. Two task checkpoints initially used incorrect accessible-name selectors; raw NOT VERIFIED results remain recorded.
2. [Interaction supplement](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40496007443), harness snapshot `c108df8b938d530d010f55b7b8b4434815cafeed`: task/context creation, draft retention across editor tabs, owner/status after reload, cancelled/confirmed deletion, clipboard content and denied-copy fallback, stale-tab conflict, malformed-storage preservation and milestone lifecycle checked. Seventeen screenshots exported. One failed-save harness problem was corrected in the next run.
3. [Targeted recovery states](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40497956587), harness snapshot `2d71c6eefaed8988cd0fb259d0318beb33780ebb`: controlled failed write retained the visible draft and byte-for-byte previous stored snapshot; lower accessibility controls, unconfigured shared access and protected unsaved dismissal captured. Four screenshots exported.
4. [Clearer evidence panels](https://github.com/Bromlj/vibecoding-project-tracker/actions/runs/40499942348), harness snapshot `aa2fc8ebdbabf83ea939c2f04a902c9e48122f8a`: repeated the targeted checks and added the complete named deletion warning and full expanded attempt fields. Six screenshots exported, four of them updated equivalents of run 3.

The latest consolidated raw set contains **53 distinct capture names** (30 initial + 17 supplement + 6 final). The editorial report selects **50 numbered evidence figures containing 51 actual screenshots**, with F27 split into two panels. The earlier run remains retained for provenance. One initial handover capture showed only the board header; the report instead uses the reopened editor that visibly shows saved Review status and the changed assignee. These are screenshot-selection corrections, not product fixes.

All images are real browser captures of the running public site in isolated fictional demo storage. Crops remove margins only. Storage/clipboard faults and simulated speech capability are labelled. No real account is used and no personal workspace is altered.

Four fresh scoped axe scans (desktop board, task editor, settings, 320px board) reported **zero violations**, with some incomplete checks requiring manual review. The measured 320px state had document width 320px. These are not full WCAG conformance, comprehensive keyboard/screen-reader or physical-device findings.

## Speech boundary

The headless browser had no usable local voice. Its genuine unavailable-voice state is captured. A controlled stand-in speech service supplied capability to the real frontend component so Start/Pause/Resume/Stop could be demonstrated. This is a labelled simulated dependency, not fabricated UI or evidence of audible speech quality.

## Open acceptance work

- Complete a valid backup replacement in a disposable workspace; fresh evidence checked validation/confirmation and cancelled replacement.
- Edge and Firefox checks; fresh live capture used Chromium only.
- Real-device speech, comprehensive keyboard/screen-reader evaluation, actual browser zoom and target-size coverage.
- Fresh NFR-13 scale/percentile measurements. The 20 October benchmark remains historical, not today's hosted timing.
- Portal/webhook recognition and revised administrative arrangements were not newly independently verified.

A successful Actions job means the script completed, not that every individual checkpoint passed. Raw manifests retain failures; later targeted checks identify what was resolved.

## Report-use boundary

The supplied recording transcript is a student's account of Fernando's Q&A: exhaustive mapping, quality design reasoning and frontend-only demonstration are reported. It is not a direct verbatim lecturer statement and contains no word-limit waiver. The published brief states 2,000 words; retain written clarification for an expanded submission. AI prototyping is permitted, but generated report prose is restricted. The expanded Word document is an AI-assisted editorial master for independent review/rewrite, not an unchanged submission or a claim that assistance was limited to proofreading.
