# Current acceptance and evidence register

Reconciled 20 October 2026 for report preparation. This is an engineering register, not assessed report prose. It supersedes ambiguous current-status statements in older notes, while preserving their historical evidence.

**Current outcome:** publicly accessible interactive prototype, with working browser-local interactions and a populated team example. The identified M8 specification mismatch has been corrected; some self-imposed evaluation criteria remain unverified. There is enough material to begin writing, but this is not an assertion of complete client acceptance or assessment completion.

The earlier documentation-only reconciliation is followed by a scoped M8 code correction. Historical tags and priorities are unchanged. New checks are identified as E12; older evidence retains its original scope.

## Evidence key

Files are in the coursework `Milestone evidence` folder and copied under `Report/04 Evidence/Check results` unless stated otherwise. Tests at earlier checkpoints are not proof that every later feature was tested in every browser.

| ID | Record and scope |
|---|---|
| E1 | Latest recorded 28 Node tests and successful production build: PROTOTYPE_DEMO.md / later RELEASE_READINESS.md checkpoint; test sources in src/*.test.js. Not rerun for this documentation task. |
| E2 | Redesign-flow-results.json, Redesign-Edge-flow-results.json, Redesign-Firefox-flow-results.json: 14 synthetic developer workflow groups in each recorded browser, no recorded page errors. |
| E3 | Release-design-accessibility-results.json: 24 automated screen/state scans, zero reported violations in those states. Not a complete manual accessibility audit. |
| E4 | hosted-demo-results.txt: fresh Chrome public access, actual HTTPS clipboard equality, attempts save/reload, handoff, cancellation, focus return, one timeline scan, narrow dialog and sample links; no page errors. App checkpoint b2b9760. |
| E5 | Live-preferences-results.json: live preview, cancel/nesting, failed-save retention, colour choices, borders, three scans and 320px reflow. |
| E6 | Mobility-access-results.json and Edge/Firefox counterparts; Release-keyboard-results.json: navigation/keyboard and speech API stand-in checks. Not observed human screen-reader or audible/device testing. |
| E7 | Release-Chrome-guide-results.json and Edge/Firefox counterparts: guided demo and local-work isolation checks. |
| E8 | Release-performance-results.json: synthetic workload/timing only. Earlier benchmark is not a new hosted performance measurement. |
| E9 | Source implementation and FR/NFR/DR dictionaries: inspection/documentation, not independent user evidence. |
| E10 | Client screenshot collection, user-pasted portal instructions and repository tags: product/event inputs. Portal recognition and participation are not independently verified. |
| E12 | M8-restored-local-results.json and M8-restored-hosted-results.json / screenshots: fresh local and public Chrome checks after bd6f9bc of warning/alarm/neutral completion, light/dark and three palettes, cancellation and borders; two automated scans per run, zero reported violations. Fresh 28 Node tests and production build passed. |
| E11 | Latest supplied Assessment 1 DOCX, copied into Report/01 Assessment: submission and grading authority. |

## Status language

**Implemented / checked** means the stated implementation has scoped developer evidence. **Partial evidence** means the full acceptance wording is not established. **Variance open** means the implemented adaptation differs from the client specification. **Deferred** is outside the current agreed prototype scope, not secretly marked passed. All result counts above retain their original checkpoint scope.

## Functional requirements

| Requirement | Implementation | Evidence | Current status and remaining limitation |
|---|---|---|---|
| FR-01 | Four ordered Kanban stages; title/owner; mobile stage view | E2, E4 | Implemented / checked; viewport emulation is not a physical-device test. |
| FR-02 | Labelled task creation, defaults and validation | E1, E2 | Implemented / checked; not every browser-native partial-date state exhaustively tested. |
| FR-03 | Explicit save, shared draft and protected cancellation across task tabs | E2, E4 | Implemented / checked. |
| FR-04 | Named delete confirmation and durable removal | E2 | Implemented / checked, including simulated failed deletion. |
| FR-05 | Status dropdown changes board placement | E2 | Implemented / checked; drag and drop not required. |
| FR-06 | Stable optional assignee and handoff | E1, E2, E4 | Implemented / checked; assignment does not authenticate or notify another user. |
| FR-07 | Multiple separate project boards; create/name/rename/open | E1, E2 | Implemented / checked; one browser-local team. |
| FR-08 | Editable current Markdown context, saved as inert text | E1, E2 | Implemented / checked; no automatic AI integration. |
| FR-09 | User-recorded prompts/outcomes; labelled synthetic examples | E2, E4 | Implemented / checked; truth of outcomes is not verified by the app. |
| FR-10 | Optional AI tool selector, including Other and Codex | E1, E4 | Implemented / checked; a label, not a provider connection. |
| FR-11 | Exact/relative freshness; selected briefing changes update saved timestamp | E1, E2 | Implemented / checked; unselected attempts have their own timestamps. |
| FR-12 | Saved-card/current-draft copy and manual fallback | E1, E2, E4 | Implemented / checked; HTTPS success and local rejection cases have distinct evidence. |
| FR-13 | Versioned local persistence, migration, backup/restore and demo isolation | E1, E2, E7 | Implemented / checked; device/origin storage is not synchronised. |
| FR-14 | Feature/bug text, icon and palette distinction | E3, E5, E9 | Implemented / checked; no colour-perception participant study. |
| FR-15 / M8 | Distinct warning/alarm and neutral completed cards; calm future/undated | E1, E10, E12 | Implemented / checked against slide semantics; 24–48h warning is an explicit gap-resolution choice. See M8_SPECIFICATION_DECISION.md. |
| FR-16 / M11 | Four per-project safe URL slots above board, shared editing dialog | E1, E2, E4 | Implemented / checked; dialog is an interaction adaptation from inline fields; sample links are not actual submitted deliverables. |
| FR-17 | User-controlled project milestones, criteria and reached timestamp | E1, E2, E4 | Implemented / checked; achievement is manually asserted, not independently verified. |
| FR-18 | Editable roster and optional email/GitHub/GitLab metadata | E1, E2 | Implemented / checked; no connected-account or remote collaboration claim. |
| FR-19 | Exact optional briefing review and advisory hints | E1, E2, E4 | Implemented / checked; supporting feature, no longer sole M12 extension. |
| FR-20 | Palette/preferences, live preview, reset/save/cancel, colour-vision alternatives | E1, E5 | Implemented / checked; selected alternatives do not guarantee suitability for every colour-vision condition. |
| FR-21 | Optional shortcuts and visible navigation controls | E6 | Implemented / checked; no switch-device or motor-user validation. |
| FR-22 | User-started device read aloud and fallback | E6 | Partial evidence: lifecycle tested using stand-in; real audible output and assistive-user use unrecorded. |
| FR-23 | How-to guide, separate demo, protected reset | E7, E4 | Implemented / checked; learning effectiveness not measured with users. |
| FR-24 / M12 | Editable attempts and lessons; choose records for next briefing | E1, E4 | Implemented / checked; self-reported authors/results, not immutable audit history or market-wide uniqueness. |

## Non functional requirements

| Requirement | Implementation | Evidence | Current status and remaining limitation |
|---|---|---|---|
| NFR-01 | Keyboard, focus, dialog containment/escape | E2, E6, E4 | Scoped keyboard checks pass; no named human screen-reader session. |
| NFR-02 | Programmatic labels, roles, names and relationships | E3, E4, E6 | Partial evidence: automated checks pass, human announcement behaviour unverified. |
| NFR-03 | Meaning without colour alone | E3, E5 | Implemented / inspected; participant comprehension unmeasured. |
| NFR-04 | Text/control contrast targets | E1, E3, E5 | Calculated/scoped automated checks; not a full manual conformance audit. |
| NFR-05 | 320px reflow and enlarged text | E2, E5, E4 | CSS resizing/emulated viewport checked; actual browser zoom and physical devices unverified. |
| NFR-06 | Target size and spacing policy | E9 | Partial evidence: main-control sizing implemented; all exceptions/touch use not manually audited. |
| NFR-07 | Honest feedback and retained data on errors | E2, E4, E5 | Implemented / checked using controlled failure scenarios. |
| NFR-08 | Stable relationships, invalid storage and stale-tab protection | E1, E2 | Local checks recorded; live shared access and latest SQL revision execution deferred. |
| NFR-09 | Consistent controls and observed usability | E2, E9 | Partial evidence: developer review only; representative-user completion/help/feedback unrecorded. |
| NFR-10 | Inert context, safe URL rules, no automatic AI submission | E1, E2, E9 | Implemented / checked; no complete security-audit claim. |
| NFR-11 | Named desktop browser compatibility and responsive layouts | E2, E6, E7, E4 | Earlier Chrome/Edge/Firefox checks; latest hosted attempts flow checked in Chrome only; real devices pending. |
| NFR-12 | Explainable implementation and reproducible tool choices | E1, E9 | Documentation exists; student understanding/AI declaration still needs personal completion. |
| NFR-13 | Chosen performance targets under defined synthetic workload | E8 | Earlier measured workload, not production/INP/client SLA or participant productivity evidence. |

## Data requirements

| Requirement | Implementation | Evidence | Current status and remaining limitation |
|---|---|---|---|
| DR-01 | Stable task identity | E1, E2 | Implemented / checked. |
| DR-02 | Task text/type/status/dates and validation | E1, E2 | Implemented / checked. |
| DR-03 | Project IDs and separate nested records | E1, E2 | Implemented / checked. |
| DR-04 | Roster IDs/metadata and assignment references | E1, E2 | Implemented / checked; metadata is unverified, not account access. |
| DR-05 | Current context/prompts/outcomes as plain text | E1, E2 | Implemented / checked; user-authored accuracy not guaranteed. |
| DR-06 | Nullable AI-tool association | E1, E4 | Implemented / checked; no API credentials collected. |
| DR-07 | App-generated creation/freshness times | E1, E2 | Implemented / checked; local clock, not trusted audit time. |
| DR-08 | Four URL slots with fixed labels | E1, E2, E4 | Implemented / checked; presence does not prove deliverable completion. |
| DR-09 | Project milestone criteria/state/date/time | E1, E2, E4 | Implemented / checked; user controls reached state. |
| DR-10 | Workspace palette identifiers/defaults | E1, E5 | Implemented / checked; neutral completion across all palettes rechecked in E12. |
| DR-11 | Browser appearance/access preferences and transient previews | E1, E5, E6 | Implemented / checked; actual voice output remains unverified. |
| DR-12 | Guide and synthetic demo records | E7, E4 | Implemented / checked; examples are not actual client/research records. |
| DR-13 | Optional nested manual attempt records and selected briefing content | E1, E4 | Implemented / checked locally; prepared cloud validator not activated/tested live. |

## Client milestones and event evidence

| Item | Current position | Evidence / limitation |
|---|---|---|
| M1 / M2 | Repository marker and requirements documentation recorded | E9/E10; not proof of portal recognition or attendance |
| M3 / M4 / M5 | Design, model/board and CRUD implemented | FR-01–05, E1/E2/E9 |
| M6 / M7 | Task-type distinction and ownership/handoff implemented | FR-06/14/18, E2/E4/E5 |
| M8 | Slide semantics restored; local and public checks passed | FR-15; M8_SPECIFICATION_DECISION.md |
| M9 / M10 | Context and copy implemented | FR-08–12, E1/E2/E4 |
| M11 | Four links with dialog-based editing implemented | FR-16; link presence is not completion |
| M12 | Attempts & lessons implemented | FR-24/DR-13; Review is supporting behaviour |
| M13 | Public populated demo prepared and checked | E4; no formal presentation required in supplied assessment; at most 30-second demo per student clarification |
| M13 marker | Repository has pitch-done, following user-pasted portal text | Slide/starter uses pitch-ready; live leaderboard acceptance is unverified |
| Hackathon participation | Separate assessed 5% contribution | E11; attendance/active contribution must be supported by actual event records, not inferred from commits/tags |

## Outstanding evidence and assessment boundary

| Item | Required by supplied brief or chosen evaluation plan? | Position |
|---|---|---|
| Representative-user study | Not explicitly named as a compulsory submission in the supplied brief; relevant to chosen NFR-09 and evidence quality | No recorded study; do not claim target-user satisfaction, preference or productivity gains |
| Named screen-reader/browser test | Included in the project's own AC-16; no prescribed named session in the supplied brief | AC-16 remains partially evidenced, not passed in full |
| Browser zoom / physical mobile / audible speech / switch-device checks | Chosen accessibility/compatibility evidence beyond automated checks | Not recorded; keep distinct from CSS resizing and viewport emulation |
| Provisional persona | Persona is assessed; validation evidence remains limited | Use supported information and explicit unknowns; no invented quotes/biography |
| Final written submission | Compulsory individual report up to 2,000 words, screenshots/justification, coversheet and accessible prototype | Report prose, source reading/references, final figures, AI-use statement and official coversheet remain the student's work |
| M8 specification correction | Original slide semantics restored at the student’s request | Prior adaptation is superseded; no invented client approval. The unspecified 24–48-hour interval remains a documented design choice. |

The supplied assessment explicitly permits AI prototype creation and requires a tools/use statement. Its written-work rules remain separate. Relevant methods from teaching should be selected and explained; this register does not claim interviews, questionnaires, card sorting, SDDP, statistical significance testing or participant studies occurred.

CHECKLIST.md remains the original 199-point specification. Its empty boxes are not a count of failures, nor a completed test ledger. This register provides requirement-level acceptance evidence without fabricating item-by-item sign-off.
