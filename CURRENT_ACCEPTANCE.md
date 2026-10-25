# Current acceptance — report-aligned IDs

Documentation reconciled 23 October 2026. A 25 October 2026 DR-07 follow-up added exact creation timestamps for new tasks without rewriting older date-only tasks. The 20 October recorded tests and other numerical evidence have not been rerun for that subsequent code change. The original detailed evidence register is preserved in docs/history/2026-10-20/CURRENT_ACCEPTANCE.md. Translate legacy IDs using REPORT_ALIGNMENT.md. EVIDENCE.md and evidence/ remain unchanged.

## Evidence meaning

Implemented means the behaviour exists in source. Recorded developer checks are scoped technical evidence, not representative-user research, complete WCAG conformance or client sign-off. An unmet or unverified criterion is not made passed by changing its ID or MVP classification.

Existing records include 28 passing Node tests and a successful build; 14 developer workflow groups; 24 automated accessibility screen/state scans with no reported violations in those states; later focused hosted/appearance/attempt checks; and an earlier synthetic performance benchmark. These records cover different checkpoints. They must not be merged into a claim that every feature was tested on the latest deployment in every browser.

## Functional acceptance

| Current ID | Behaviour | Current boundary |
|---|---|---|
| FR-01 | Four stages/title/owner/mobile stage view | Implemented; recorded developer checks, not physical-device validation. |
| FR-02 | Creation/defaults/validation | Implemented; not every browser-native partial-date state exhaustively tested. |
| FR-03 | Explicit edit/save/cancel and protected drafts | Implemented; scoped developer checks recorded. |
| FR-04 | Confirmed durable deletion | Implemented; controlled failed-delete checks recorded. |
| FR-05 | Dropdown stage changes | Implemented; dragging not required. |
| FR-06 | Assignment/handoff/Unassigned | Implemented locally; not authentication, notification or remote collaboration. |
| FR-07 | Multiple separate boards | Implemented for one browser-local workspace. |
| FR-08 | Current inert-text context | Implemented; no automatic AI integration. |
| FR-09 | Manual prompts and outcomes | Implemented; truth of outcomes is not verified. |
| FR-10 | Optional AI-tool label | Implemented; not a provider connection. |
| FR-11 | Saved briefing freshness | Implemented; selected attempts affect briefing freshness, excluded attempts retain their own times. |
| FR-12 | Copy and manual fallback | Implemented; HTTPS success and local denial have distinct recorded checks. |
| FR-13 | Persistence/backup/recovery/demo isolation | Implemented; origin/device-specific, not synchronised. |
| FR-14 | Milestone criteria and Pending/Reached | Implemented; achievement is asserted by the user. Legacy FR-17. |
| FR-15 | Manual roster/contact metadata | Implemented; does not create shared accounts. Legacy FR-18. |
| FR-16 | Feature/bug label/icon/colour | Implemented; no participant colour-perception study. Legacy FR-14. |
| FR-17 | Warning/alarm/neutral deadline states | M8 correction recorded locally/publicly; 24–48h warning is a documented interpretation. Legacy FR-15. |
| FR-18 | Four safe deliverable URLs | Implemented; editing-dialog adaptation; link presence is not completion. Legacy FR-16. |
| FR-19 | Exact optional briefing review | Implemented; suggestions do not certify accuracy. |
| FR-20 | Appearance preview/save/cancel/reset | Implemented; alternatives do not guarantee suitability for every access need. |
| FR-21 | Optional keyboard shortcuts/navigation | Implemented; no switch-device or motor-user validation. |
| FR-22 | Read aloud and fallback | Implemented; API stand-in checks, but human audible/device output unverified. |
| FR-23 | Guide and isolated practice | Implemented; learning effectiveness not measured. |
| FR-24 | Attempts and selected lessons | Implemented; editable self-reported records, not immutable history. |

## Non-functional acceptance

| ID | Status / limitation |
|---|---|
| NFR-01 | Scoped keyboard/focus checks; named human screen-reader session unrecorded. |
| NFR-02 | Automated semantics checks; actual announcements unverified. |
| NFR-03 | Non-colour cues inspected; participant comprehension unmeasured. |
| NFR-04 | Contrast calculations/scoped scans; full manual conformance not established. |
| NFR-05 | Emulated reflow/CSS text resizing; actual browser zoom and physical-device use unrecorded. |
| NFR-06 | Main-control height present; complete target/spacing/exception audit unrecorded. |
| NFR-07 | Controlled error/recovery checks recorded; prior saved data/drafts protected. |
| NFR-08 | Local validation/recovery/stale-tab checks; live shared access unverified. |
| NFR-09 | Consistent shared controls/developer review; representative-user observation remains unperformed. |
| NFR-10 | Inert content, safe URLs and no automatic AI transmission; not complete security certification. |
| NFR-11 | Earlier Chrome/Edge/Firefox scenarios; later hosted attempts flow checked in Chrome only. |
| NFR-12 | Setup/package-lock documentation exists; beyond MVP in the report. Student understanding remains necessary. |
| NFR-13 | Earlier synthetic benchmark: 5 boards/100 tasks/10 members, 30 repetitions; p95 modal 41.4 ms, project opening 58.5 ms, save 51.0 ms; restoration 113.8 ms. Beyond MVP. Not human performance, INP or public-network latency. |

## Data acceptance

DR-01–07: implemented local IDs, fields, relationships, context and tool labels. New tasks now record an ISO `createdAt` instant when first saved (25 October implementation correction); older saved tasks remain valid with `createdDate` only. Saved context retains its own update instant. The creation-timestamp regression test was added but has not been executed as part of the 20 October evidence; runtime/browser re-verification remains outstanding. DR-08: implemented project milestone data (legacy DR-09); reached state is user-asserted. DR-09: implemented fixed deliverable URL slots (legacy DR-08); URL presence does not certify work. DR-10/11: workspace palettes and separate browser preferences implemented; voice output remains unverified. DR-12: authored guidance and labelled synthetic practice data implemented; not research records. DR-13: optional editable attempts and selected serialization implemented locally; prepared cloud validation is not live activation.

## Assessment and delivery boundaries

The prototype/report must not claim all elicited requirements have been fully validated, a representative-user study occurred, every accessibility criterion passed, or live multi-user sharing works. Public registration-free demo access was recorded on 20 October and should be rechecked before submission. Shared-service setup remains deferred.

The student worked individually; team-oriented hackathon administration is not fabricated. Attendance was reported by the student; the actual attendance register and portal recognition were not inspected. Historical milestone tags/replayed markers remain unchanged. Prototype-generation permission does not automatically authorise AI-generated written assessment. The final report needs an accurate assistance declaration and must remain self-contained without requiring repository access.
