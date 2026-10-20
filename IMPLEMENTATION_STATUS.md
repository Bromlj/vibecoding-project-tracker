# Implementation status and gaps

**Historical checkpoint:** this document retains its original observations and decisions. Its completion/pending statements are not the latest status. Consult [CURRENT_ACCEPTANCE.md](CURRENT_ACCEPTANCE.md) before using it in report preparation; identify the checkpoint when citing earlier screenshots or measurements.

**Current local product audit and milestone replay:** [MILESTONE_PROGRESS.md](MILESTONE_PROGRESS.md) records the latest M1–M13 interpretation and the student's webhook repair.  [RELEASE_READINESS.md](RELEASE_READINESS.md) supersedes the status notices and historical point-by-point gaps below. It records current coverage of all 17 checklist groups, the guided demo, updated dependency/tooling checks, 23 Node tests, three-browser checks and fresh performance measurements. Hosted collaboration and public access remain the next phase.

**Earlier checkpoint — design adaptation, 20 October 2026:** [DESIGN_REVIEW.md](DESIGN_REVIEW.md) records current design decisions and final evidence; [WORKSPACE_WORKFLOW.md](WORKSPACE_WORKFLOW.md) describes the current product. Functional/non-functional/data category tables have been reconciled with this checkpoint. Build, 18 Node tests, 14 scenarios each in Chrome/Edge/Firefox and 24 automated accessibility scans pass within their stated scope. Failed save/delete, over-limit paste, draft review, roster/boards/milestones/palettes gaps below have been implemented and rechecked.

**Everything below this notice is the historical b685ad7 audit**, retained for traceability. Its gap statuses and statement of then-unperformed checks must not be read as a new audit. Live Supabase configuration, public deployment, named screen-reader and participant evaluation remain pending. No entire-checklist or coursework-completion claim is made.

Recorded 20 October 2026. Runtime code audited at commit **b685ad7**. Documentation added after that commit does not alter the audited runtime. This is an engineering status record, not assessed report prose or a full accessibility/usability certification.

**Position at the historical audit checkpoint:** a working initial hackathon prototype exists. M2 documentation and M3–M12 code checkpoints are pushed. M13 local preparation is committed, but public deployment/access verification is pending. The student clarified there is no formal presentation; at most an informal 30-second app demonstration if requested. A presentation or rehearsal is not a blocker. Milestone tags do not establish that every detailed acceptance condition is satisfied.

The [199-point checklist](CHECKLIST.md) remains unchecked by design. This file records its current coverage separately; no overall completion percentage is calculated because provisional and optional scope would distort it.

## Audit basis

- Read current App, TaskEditor, storage, context, CopyContext, BriefingReview, AnchorBoard, data, deadline and demo source.
- Reviewed existing private stage screenshots/results and public project documents. Earlier production checks recorded Chrome 155.0.8059.82 and Edge 155.0.4283.45, selected keyboard/reflow/contrast, cross-tab and copy behaviour.
- Fresh isolated Chrome checks reproduced failed-save, failed-delete and long-paste behaviour. No real user data was altered. Exact JSON/scripts/screenshots retained privately under Milestone evidence.
- Re-ran the existing 10 Node tests: all passed. These tests do not cover all 199 checklist points and their passing result does not cancel the new gaps.
- No new slide-by-slide review, assessment re-marking, user study, screen-reader session or performance benchmark is claimed in this pass.

The statement above describes the earlier 199-point runtime audit. The subsequent progress review on 20 October re-read the Assessment 1 DOCX, original starter PRD and all 16 supplied client screenshot images (including a duplicate M9), and reconsulted the existing teaching-review records. It did not replay every lecture recording or newly inspect every slide image in the teaching decks. No new runtime or participant test was performed for the documentation reorganisation.

## M1–M13 checkpoint review — 20 October 2026

| Stage | Exact portal marker | Git checkpoint | Current meaning / limit |
|---|---|---|---|
| M1 | git-linked | 9a8ac09 | Correct commit/tag pushed and repository URL saved. Portal recognition remained pending at the last supplied observation; not rechecked now. No webhook, by student choice. |
| M2 | prd-done | 77e5eb2 | Reviewed PRD and all three requirements categories committed together. Separate navigation commits now provide functional, non-functional and data documents without moving this tag. |
| M3 | design-done | b797494 | Design/tokens/typography/interaction principles documented; preview captured. |
| M4 | data-model | 8c15710 | Locked task model and four-column board implemented, seeded and inspected. |
| M5 | crud-modal | 3a9900a | Normal modal create/edit/delete and reload implemented/checked. Failure recovery has the open gaps below; later button/focus fixes are preserved in later commits. |
| M6 | tag-style | 40f6b47 | Type labels/icons/colours implemented; primary-button correction included. |
| M7 | task-owner | 4f41704 | Owner badges and handoff implemented for the configured example roster; not authenticated collaboration. |
| M8 | due-tint | ade28a6 | Written/coloured deadline states and automatic recalculation implemented; documented gap policy for 24–48 hours. |
| M9 | task-context | 60ea98b | Context/tool/template/freshness implemented; failed-write freshness remains a known limitation. |
| M10 | copy-context | 2169cfe | Card/editor copying and manual fallback implemented/checked. |
| M11 | project-deliverables | 240fa82 | Four persistent URL slots and link-presence states implemented/checked. Presentation is a required slot label, not evidence of a formal coursework presentation. |
| M12 | secret-sauce | 3c1ba9a | Optional exact briefing review and missing-section hints implemented/checked. Draft review remains a detailed acceptance gap. |
| M13 | pitch-done | No completion tag; local preparation e12a376 | Isolated 12-task demo and walkthrough prepared. Vercel account created; public deployment/access check pending. No formal presentation/rehearsal prerequisite. |

The twelve M1–M12 tags are checkpoint evidence. They do not award participation marks, prove portal synchronisation or certify the full coursework requirements. The 199-point checklist includes provisional extensions and optional suggestions; all 199 are not automatically mandatory for a first deployment. See [functional](FUNCTIONAL_REQUIREMENTS.md), [non-functional](NON_FUNCTIONAL_REQUIREMENTS.md), and [data requirements](DATA_REQUIREMENTS.md) for retained IDs and scope.

## Findings needing attention before claiming checklist completion

| Finding | Evidence and practical effect | Checklist references |
|---|---|---|
| Save commits working state before durable storage succeeds | App.save updates task state and closes editor; storage writes in an effect. Fresh quota test preserved original disk JSON, but closed editor and retained the new text only in memory. Reload risks losing that text. Reopening/resaving is an indirect retry; there is no clear task retry control. | C03-03/05/06/07; C04-01 |
| Failed deletion changes visible board | App.remove filters task before storage effect succeeds. Fresh rejected-write test removed card from current board while original disk record remained. | C03-08 |
| Freshness can imply an unsuccessful save succeeded | withContextTimestamp executes before durable write. Fresh failed-save test advanced the displayed in-memory timestamp despite unchanged stored record. Exact timestamp is only in attributes/title, not persistently displayed. | C05-01/04 |
| Input limit is silent | Fresh insertion of 30,001 characters yielded 30,000 and no visible limit explanation. maxlength prevents larger entry; the app does not disclose or reject the omitted tail with an explanation. | C01-07/08 |
| Protected deletion needs task identity | Confirmation says Delete this task? without naming title/ID. The surrounding editor does show the title, but confirmation itself does not identify it. | C02-16 |
| Review supports saved/in-memory cards, not editor drafts | BriefingReview receives task from card. Editor has Copy but no draft Review/return-to-editor path. Empty context gives generic missing-section suggestions rather than a dedicated notice. | C10-03/04/07 |
| Demo prompt/outcome completeness | Synthetic fixtures include an example prompt and Other, while explicitly stating no actual outcome is claimed. A useful observed outcome must be recorded honestly rather than fabricated. | C01-10; C16-02 |
| Evaluation and delivery remain incomplete | No named screen-reader session, Firefox run, actual 200% text-resize check, representative-user evidence, workload performance measurements or public deployment check. | C08; C16; C17-09/10 |

Sources: [App.save/remove](src/App.jsx), [storage hook](src/storage.js), [editor limits/confirmation](src/TaskEditor.jsx), [timestamp policy](src/context.js), [review](src/BriefingReview.jsx), [synthetic demo](src/demo.js). These are observed/inspected implementation facts, not predictions about research participants.

## Reading the point-by-point record

- **V — verified:** a specific recorded developer check supports the stated part; read the note for its limits.
- **I — implemented/inspected:** source supports the behaviour, but a dedicated acceptance test is not claimed.
- **P — partial:** some coverage exists, with a stated gap or missing verification.
- **G — gap:** absent behaviour or a directly observed failure.
- **U — unverified:** evaluation still required.
- **D — deferred/provisional:** not implemented, and not promoted to confirmed hackathon scope.
- **O — optional:** conditional suggestion, not an obligation to add a feature.

## 1. Prompt and outcome recording

| Point | Status | Evidence / limitation |
|---|---|---|
| C01-01 | I | Editable context template includes Prompts and outcomes. |
| C01-02 | I | Same context section accepts user-recorded outcomes; no automatic capture. |
| C01-03 | I | Tried so far and Pick up template headings exist. |
| C01-04 | V | Tool selection survived recorded reload check; empty option also exists in code. |
| C01-05 | I | Whole context textarea is editable, not a locked template. |
| C01-06 | I | Context has no required attribute; empty strings pass stored schema. |
| C01-07 | P | Serializer whitespace preservation tested; full Unicode/code storage round-trip not separately covered. |
| C01-08 | G | Fresh probe: 30,001-character insertion accepted 30,000 with no visible limit notice. |
| C01-09 | I | React text/textarea rendering, no HTML evaluation path in inspected source. |
| C01-10 | P | Demo has prompt and Other tool; fixture explicitly claims no real outcome. Useful recorded outcome example still needed. |

## 2. Task creation, validation, and protected editing

| Point | Status | Evidence / limitation |
|---|---|---|
| C02-01 | I | crypto.randomUUID generated for a new task; supplied fixture IDs are synthetic. |
| C02-02 | I | Existing id reused by save/movement/assignment code; no per-item identity stress test. |
| C02-03 | I | localDate generated on create; creation value preserved on edit. |
| C02-04 | I | required input and trim check implemented; whitespace-only rejection not separately browser-tested. |
| C02-05 | P | Header Add task uses Feature/To Do; empty-column Add intentionally uses that column. Record this exception. |
| C02-06 | I | Type/status dropdowns editable before Save. |
| C02-07 | I | Description optional. |
| C02-08 | I | Due date optional/null. |
| C02-09 | I | No today-based minimum; past calendar dates allowed. |
| C02-10 | P | Native date constraints and restored-date validation exist; malformed-input explanation needs direct UI check. |
| C02-11 | I | Validation does not reset React draft state. |
| C02-12 | V | Recorded create/edit Save and reload/cancel flows passed. |
| C02-13 | V | Dirty Escape/discard retained original task in recorded browser flow. |
| C02-14 | V | Dirty Escape produced a discard decision in recorded check. |
| C02-15 | V | Pristine dialog Escape/return checked in production flow. |
| C02-16 | P | Confirmation exists but fresh probe shows generic wording without task title/ID. |
| C02-17 | I | Continue editing cancels confirmation without invoking onDelete; explicit cancellation case not separately exercised. |

## 3. Reliable saving and recovery from failures

| Point | Status | Evidence / limitation |
|---|---|---|
| C03-01 | V | localStorage and successful ordinary reload checked. |
| C03-02 | I | README states browser-specific/no synchronisation; UI identifies local workspace. |
| C03-03 | P | Feedback now avoids false durable success, but state still commits before storage effect finishes. |
| C03-04 | V | Quota failure produced visible unsaved/recovery warning. |
| C03-05 | P | Fresh probe: draft text survives in task memory but editor closes; reload can lose it. |
| C03-06 | V | Fresh rejected-write probe: original persisted JSON unchanged. |
| C03-07 | P | Reopen/resave is possible after recoverable quota failure; no clear task-specific retry control. Conflict blocks require reload. |
| C03-08 | G | Fresh probe: rejected deletion still removes the task from the current board. |
| C03-09 | V | Recorded malformed JSON remained unchanged instead of being overwritten with seeds. |
| C03-10 | V | Recorded stale-second-tab case preserved newer stored value; no universal concurrency guarantee. |
| C03-11 | I | Hook seeds only when getItem returns null, never for an existing array. |
| C03-12 | I | Stored empty array validates and is restored; explicit empty-all/reload browser check still needed. |
| C03-13 | V | Demo banner, roster disclaimer and synthetic fixture labels inspected. |

## 4. More precise Copy Context behaviour

| Point | Status | Evidence / limitation |
|---|---|---|
| C04-01 | P | Card uses current in-memory task; after failed save it can copy an unpersisted edit rather than last stored version. |
| C04-02 | I | Editor passes draft directly to CopyContext; distinct unsaved-draft copy comparison still needed. |
| C04-03 | I | Editor explicitly says current draft and does not save. |
| C04-04 | I | Copy handler does not call task save. |
| C04-05 | I | Shared serializer includes selected tool or Not specified. |
| C04-06 | I | Shared serializer includes status, assignee and due date for both paths. |
| C04-07 | V | Node formatting test and production readback passed, normalising Windows clipboard line endings. |
| C04-08 | V | Success follows awaited writeText fulfilment; successful readback checked. |
| C04-09 | V | Injected denied write produced accurate failure text. |
| C04-10 | V | Denied-copy check found selectable full briefing fallback. |
| C04-11 | V | Manual fallback retained the briefing after rejected clipboard write. |
| C04-12 | I | No AI/network submission path in inspected copy source. |

## 5. Context freshness

| Point | Status | Evidence / limitation |
|---|---|---|
| C05-01 | P | Exact timestamp only in time datetime/title attributes; relative hint visible. Exact value is not persistently visible. |
| C05-02 | I | Open/copy code does not update timestamp. |
| C05-03 | V | Node test retains timestamp for unrelated title edit. |
| C05-04 | G | Fresh quota probe: in-memory timestamp advanced even though stored record was unchanged; cancellation path itself does not update it. |
| C05-05 | V | Latest context-or-tool policy documented and covered by Node change tests. |

## 6. Complete deadline rules

| Point | Status | Evidence / limitation |
|---|---|---|
| C06-01 | I | Native date-only input and YYYY-MM-DD field used. |
| C06-02 | V | Node end-of-local-day boundary case passed. |
| C06-03 | V | Following local-midnight case passed. |
| C06-04 | I | No UTC conversion used for date-only storage/display; multi-timezone UI check pending. |
| C06-05 | V | Exact 24/48-hour gap boundary cases passed. |
| C06-06 | V | Within-24-hour label covered by Node/browser checks. |
| C06-07 | V | Neutral undated state covered by Node test and demo fixture code. |
| C06-08 | I | 60,000ms interval implemented; elapsed-clock browser test not run. |
| C06-09 | I | visibilitychange listener implemented; hide/return test not run. |
| C06-10 | P | Leap-date validation covered; explicit month/year/DST urgency cases still needed. |
| C06-11 | V | Shared type badge remains independent of due-state surface; captured states inspected. |
| C06-12 | V | Completed cards retain their type badge while neutral; captured state inspected. |

## 7. Deliverable-link behaviour

| Point | Status | Evidence / limitation |
|---|---|---|
| C07-01 | V | Initial four null URL slots validated by Node test. |
| C07-02 | I | Explicit Save supports changed or cleared value; clear/reload case not separately checked. |
| C07-03 | V | HTTP(S) Node validation and browser invalid-scheme case passed. |
| C07-04 | V | Node rejects executable schemes/credentials; browser rejects javascript value. |
| C07-05 | I | Error state retains draft input; no reset on invalid submission. |
| C07-06 | V | Saved-link Open control appeared after reload. |
| C07-07 | I | Links use user-activated anchors; no preview/embed/fetch path. |
| C07-08 | V | UI says a link is a location, not completion; Link added wording inspected. |
| C07-09 | V | Empty/filled dot has No link yet/Link added text. |
| C07-10 | P | Above-board responsive placement checked; 200% resizing coverage still pending. |

## 8. Accessibility requirements

| Point | Status | Evidence / limitation |
|---|---|---|
| C08-01 | P | Selected keyboard modal/review flows checked; every core workflow keyboard-only not yet exercised. |
| C08-02 | P | Focus styles and selected captures exist; complete state-by-state focus visibility audit pending. |
| C08-03 | I | DOM order and shared focus boundary reviewed; logical whole-workflow order needs walkthrough. |
| C08-04 | V | Initial title/briefing focus checked after explicit focus fix. |
| C08-05 | V | Recorded forward-Tab containment passed in Chrome/Edge; reverse boundary exists in code but needs separate check. |
| C08-06 | V | Dirty/pristine Escape cases covered in recorded flows. |
| C08-07 | P | Opening-control return checked; deleted-opener fallback exists in code, needs explicit focus assertion. |
| C08-08 | I | Inputs use persistent visible labels and programmatic names. |
| C08-09 | I | Visible action labels/aria names reviewed. |
| C08-10 | U | Names/date purposes exist in code; no actual named screen-reader session. |
| C08-11 | P | status/alert regions implemented; spoken announcements not verified with assistive technology. |
| C08-12 | V | Type, urgency and anchor text cues inspected alongside colour. |
| C08-13 | I | No meaningful bitmap images in current app; decorative SVG/initials marked aria-hidden. |
| C08-14 | P | Selected primary text measured 7.58:1; all text/states not audited. |
| C08-15 | P | Selected input boundary check passed; all interactive states not audited. |
| C08-16 | U | Actual 200% text-resizing check not recorded. |
| C08-17 | P | Page reflow at 320 checked; all editor/error states at that reference need checking. |
| C08-18 | P | Selected primary target >=44px measured; all targets/spacing exceptions not audited. |
| C08-19 | I | Main shared controls use min-height 44px; preferred design target documented. |

## 9. Responsive layout and understandable navigation

| Point | Status | Evidence / limitation |
|---|---|---|
| C09-01 | V | 4/2/1 responsive grid and recorded width checks preserve stage order. |
| C09-02 | P | Responsive editor CSS present; dedicated 320px editor interaction inspection pending. |
| C09-03 | V | Long dialog Save/control access exercised through browser scrolling on desktop. |
| C09-04 | P | Wrap/min-width classes implemented; exhaustive long/unbroken title/link/context cases pending. |
| C09-05 | V | Recorded page scrollWidth checks passed at 320/768/1280. |
| C09-06 | I | Draft is React state independent of media queries; resize-during-edit test pending. |
| C09-07 | P | Spacing/minimum control styles present; full touch-target audit pending. |
| C09-08 | I | Shared editor/control components and consistent action labels. |
| C09-09 | I | Board/editor/anchors grouped with headings and labelled controls. |
| C09-10 | I | Add/Save primary control visual hierarchy implemented; user understanding unmeasured. |
| C09-11 | I | Empty columns show No tasks here yet and Add task. |
| C09-12 | U | No latency measurement; copy has final feedback but no distinct pending indicator. Evaluate if perceptible waiting occurs. |
| C09-13 | I | Native labelled dropdowns/inputs and context helper text present. |
| C09-14 | I | Status dropdown exists; drag-and-drop not implemented or required. |

## 10. Selected M12 feature: Review Brief

| Point | Status | Evidence / limitation |
|---|---|---|
| C10-01 | V | Card Review briefing opens named dialog. |
| C10-02 | V | Production comparison matched reviewed text and clipboard, allowing OS line endings. |
| C10-03 | G | Review only receives a card task; editor has Copy but no draft review action. |
| C10-04 | P | Close review returns to card action; no direct Return to editing path. |
| C10-05 | V | Copy from review checked. |
| C10-06 | V | Direct card copy checked independently of review. |
| C10-07 | P | Missing-section hints and Not provided output exist, but no explicit empty-context notice. |
| C10-08 | V | Visible disclaimer states hints check text, not accuracy. |
| C10-09 | I | Review has no save callback and renders inert text; only copying is externally side-effecting to clipboard. |

## 11. Provisional extension: multiple project boards

| Point | Status | Evidence / limitation |
|---|---|---|
| C11-01 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-02 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-03 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-04 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-05 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-06 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-07 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-08 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-09 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-10 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-11 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-12 | D | Provisional extension; no implementation in the current locked starter model. |
| C11-13 | D | Provisional extension; no implementation in the current locked starter model. |

## 12. Provisional extension: teammate management

| Point | Status | Evidence / limitation |
|---|---|---|
| C12-01 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-02 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-03 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-04 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-05 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-06 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-07 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-08 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-09 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-10 | D | Provisional extension; no implementation in the current locked starter model. |
| C12-11 | D | Provisional extension; no implementation in the current locked starter model. |

## 13. Provisional extension: project milestones

| Point | Status | Evidence / limitation |
|---|---|---|
| C13-01 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-02 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-03 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-04 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-05 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-06 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-07 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-08 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-09 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-10 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-11 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-12 | D | Provisional extension; no implementation in the current locked starter model. |
| C13-13 | D | Provisional extension; no implementation in the current locked starter model. |

## 14. Provisional extension: color preferences

| Point | Status | Evidence / limitation |
|---|---|---|
| C14-01 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-02 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-03 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-04 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-05 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-06 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-07 | D | Provisional extension; no implementation in the current locked starter model. |
| C14-08 | D | Provisional extension; no implementation in the current locked starter model. |

## 15. Optional improvements suggested by the teaching

| Point | Status | Evidence / limitation |
|---|---|---|
| C15-01 | O | Optional search not implemented; no confirmed need established. |
| C15-02 | O | Optional filtering not implemented. |
| C15-03 | O | No filters exist; active-filter display is conditional on adding them. |
| C15-04 | O | No filters exist; clear action is conditional on adding them. |
| C15-05 | O | No filtered view exists; distinct no-match state is conditional on adding it. |
| C15-06 | I | Context helper text exists; further help should address observed confusion. |

## 16. Quality and evaluation checks

| Point | Status | Evidence / limitation |
|---|---|---|
| C16-01 | V | Recorded Chrome full functional sequence passed for normal storage. |
| C16-02 | P | Synthetic context/reopen/copy checked; useful actual prompt/outcome example still absent. |
| C16-03 | P | Rejected clipboard tested; API-unavailable branch code-reviewed but not separately executed. |
| C16-04 | P | Quota and malformed data checked; full blocked-read/permission matrix incomplete. New failure-recovery gaps observed. |
| C16-05 | P | 30,001-character clipping observed; remaining empty/Unicode/long/date variants not exhaustively tested. |
| C16-06 | P | Midnight/24/48h/Done cases covered; DST/month/year cases still needed. |
| C16-07 | P | Selected keyboard checks passed; end-to-end keyboard-only create/edit/delete not yet recorded. |
| C16-08 | U | No named screen-reader/browser test. |
| C16-09 | V | Recorded 320/768/1280 production page checks passed. |
| C16-10 | P | Portrait-like/narrow and landscape-like/desktop captures exist; targeted orientation changes not tested. |
| C16-11 | P | Chrome and Edge recorded; Firefox untested. |
| C16-12 | U | No representative-user completion/help/satisfaction evidence collected. |
| C16-13 | P | Earlier button/focus fixes rechecked; newly observed save/delete/length gaps remain open. |
| C16-14 | I | Developer inspection and synthetic fixtures labelled explicitly in notes. |
| C16-15 | U | No responsiveness/restoration benchmark measurements collected. |

## 17. Coursework delivery requirements

| Point | Status | Evidence / limitation |
|---|---|---|
| C17-01 | V | FR-01–20 / NFR-01–13 / DR-01–10 saved; uniqueness checked. |
| C17-02 | V | MVP flags recorded in REQUIREMENTS.md. |
| C17-03 | P | Purpose/source entries recorded; provisional scope remains unresolved. |
| C17-04 | I | Data dictionary records user/app/configuration origins. |
| C17-05 | P | Requirement table names several components; full acceptance-point-to-component/test traceability not complete. |
| C17-06 | I | DESIGN and working notes explain selected M12 purpose/trade-offs. |
| C17-07 | P | Normal flows work; failure-recovery requirements remain incomplete. |
| C17-08 | P | Selected milestone extensions and review present; palette/broader non-MVP scope not yet finalised. |
| C17-09 | P | Local app has no registration; public assessor access not yet deployed/checked. |
| C17-10 | P | Screenshots exist; public prototype URL pending. |
| C17-11 | P | TOOLS and private notes record assistance/tool purposes; student's formal assessment declaration remains separate. |
| C17-12 | I | Checklist, code inspection and actual results explicitly separated in this status record. |

## Next order of work

1. Resolve transactional save/delete behaviour, keeping recoverable drafts and retry available; advance freshness only after durable commit.
2. Make input limits and exact freshness understandable, identify the task in delete confirmation, and complete the agreed draft-review interaction.
3. Expand checks to the uncovered boundary, keyboard, screen-reader, resizing and browser cases. Record actual outcomes; gather representative feedback only when real participants exist.
4. Resolve provisional scope against client/starter evidence separately. Do not add boards, members, project milestones, palette settings or search merely to increase feature count.
5. Import the existing fork into Vercel and check public access without login. Hosting can proceed alongside refinement; account creation alone is not deployment. Complete the held M13 marker only when the actual hosted-demo check is recorded. No formal presentation or rehearsal is required.

These are recommendations from this audit, not a claim that any fix was implemented during it. Application code is unchanged by the checklist/status update.
