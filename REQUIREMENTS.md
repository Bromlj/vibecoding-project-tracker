# Engineering requirements — CM6312 working baseline

Version 2.1, reorganised 20 October 2026. This is a development specification, not assessed report prose. It retains IDs from the earlier working baseline and reconciles them with the supplied starter. A documented requirement is not necessarily implemented or verified.

## Sources and interpretation
- **S1 — Initial client description:** intuitive project management for vibe-coding; track tasks over time, important information and key milestones; record useful prompts/results; include Kanban. Supplied in the lecturer announcement.
- **S2 — Client milestone slides:** M4 task model/columns; M5 modal CRUD/persistence; M6 type distinction; M7 ownership; M8 deadlines; M9 context; M10 copy; M11 deliverable anchors; M12 chosen extension; M13 demo. Screenshots supplied by the student; no invented slide/page numbers.
- **S3 — Supplied starter PRD/scaffold:** React/Vite/Tailwind, locked Task/Anchor fields, localStorage and fixed roster; excludes accounts, backend and real-time/multi-team collaboration. Original version remains in Git history. Current reconciliation: [PRD.md](PRD.md).
- **S4 — Student's client-discussion notes:** reported general developers, one team/multiple boards, optional manual team setup, identity metadata and customisable task colours. These are reported answers, not verbatim transcripts. Wider scope needs reconciliation with S3 before being claimed complete.
- **S5 — Consulted technical guidance:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **D — Chosen implementation policy:** explicit decisions in [DESIGN.md](DESIGN.md), not attributed to the client or fabricated research.

MVP flags retain the earlier baseline's priorities. “No — required milestone” is still required for the final hackathon build. “Implemented” describes code, while the verification column limits the evidence actually obtained. Deferred items have not been deleted from the baseline merely because they are absent from the app.

## Functional requirements

See [FUNCTIONAL_REQUIREMENTS.md](FUNCTIONAL_REQUIREMENTS.md) for 20 requirements (FR-01–20).

## Non-functional requirements

| ID | Quality / constraint and how to check it | MVP | Origin | Evidence / remaining work |
|---|---|---|---|---|
| NFR-01 | Core interactions support keyboard use, visible focus, logical dialog entry/return and modal Tab/Shift+Tab containment; Escape permits exit or asks about unsaved edits. | Yes | S5; accessibility teaching/user instruction | Production Chrome/Edge keyboard checks passed after explicit initial focus/boundary fixes. Named screen-reader evaluation still needed. |
| NFR-02 | Programmatic names/relationships explain field, action, owner, status and date purpose. | Yes | S5 | Semantic labels/headings/time elements and text owner names implemented. Browser lookup checks passed; screen-reader announcements not personally verified. |
| NFR-03 | Task type, urgency and link status convey meaning without colour alone. | Yes when applicable | S5 | Type text/icon, written urgency, Link added/No link yet implemented and inspected. Participant comprehension not measured. |
| NFR-04 | Applicable ordinary text contrast at least 4.5:1; qualifying large text 3:1; meaningful control boundaries at least 3:1, respecting WCAG exceptions. | Yes | S5 | Selected computed primary control 7.58:1; selected placeholder and input border checks passed. Full state-by-state/page audit pending; no conformance claim. |
| NFR-05 | Operate at 320 CSS-pixel width and with 200% text resizing, without clipped controls or unjustified page-wide scrolling. | Yes | S5; D | 320/768/1280px production page overflow checks passed; 390px screenshots retained. Actual 200% text resizing and real-device checks pending. |
| NFR-06 | Targets meet applicable WCAG 24x24px minimum/spacing exceptions; use 44px main controls as chosen comfort target. | Yes | S5; D | Main control styles use min-height 44px, selected primary measured >=44px. Full target/exception audit pending. 44px is not labelled an AA minimum. |
| NFR-07 | Text errors identify recovery; failed storage/copy must not silently claim durable success; user input remains available. | Yes | S5; D | Damaged storage preserved; rejected storage warns unsaved; rejected clipboard offers manual copy. Update feedback describes the current session, not durable storage; Link added describes presence. Rejected-write checks confirmed no Task saved claim and an explicit unsaved warning. Full assistive-technology announcement evaluation remains pending. |
| NFR-08 | Preserve IDs/relationships; do not replace invalid storage silently or overwrite a newer cross-tab version. | Yes | D | Invalid-data preservation and cross-tab stale-write protection passed. Wider entity relations deferred with FR-07/17/18. No multi-user synchronisation claim. |
| NFR-09 | Use consistent terminology/actions and evaluate the core workflow with real observations. | Yes | Usability teaching; D | Shared components and developer walkthrough exist. Representative-user completion/errors/help requests not collected. A demo is not automatically a user study. |
| NFR-10 | Treat context as inert text, accept only allowed HTTP(S) links, and do not transmit prompt content automatically. | Yes | S3/S5; D | No HTML execution/AI API; URI tests reject executable schemes and credentials. Links open only on user action. Not a full security audit. |
| NFR-11 | Verify Chrome, Edge and Firefox desktop; inspect 320/768/1280 layouts and relevant orientations. Name real mobile/assistive combinations separately. | Yes | Earlier chosen compatibility scope | Chrome 155.0.8059.82 / Edge 155.0.4283.45 checked. Firefox, real mobile devices and assistive combinations untested. Responsive viewport emulation is not a real-device test. |
| NFR-12 | Student can explain code/data/save/copy/date behaviour; dependencies have a purpose and setup is reproducible. | Yes | User instruction; S3 | Small modules, supplied stack, no added runtime packages, Node tests and tool inventory. Student explanation/reproduction still to be demonstrated; current audit findings remain separate review work. |
| NFR-13 | Verify the earlier chosen performance targets against their defined workload, keeping them separate from INP or a client SLA. | Yes | Earlier D | Not measured. Earlier DEC-16 proposal: five boards, 100 tasks total, ten roster members and serialized state <=1 MiB; p95 visible-update <=200ms over 30 measured repetitions after warm-up for modal opening, board switching and successful local status saving; restore <=2s after required assets are available. Fixture's multi-board scope exceeds current build, so amend workload before measuring. Never invent timings. |

## Data requirements

| ID | Data needed, source and purpose | MVP | Current schema / status |
|---|---|---|---|
| DR-01 | Stable task ID; generated by app to identify the same task through edits/movement. | Yes | Task.id: generated UUID on create; demo IDs explicitly synthetic. Implemented. |
| DR-02 | User title/description, selected type/status and optional calendar due date support task work. | Yes | Task fields in dictionary below; implemented/validated. |
| DR-03 | App-generated board IDs, user names and task-board relationship support multiple projects. | Yes | Not present in locked starter; deferred with FR-07. Demo storage namespace is not a board entity. |
| DR-04 | Roster names and stable references; optional user-supplied email/GitHub metadata if scope retained. | Yes | Current assignee is one configured name string. No member IDs/email/handles/accounts. Deferred fuller roster, FR-18. |
| DR-05 | User-entered current context, prompts and outcomes support handover/resumption. | Yes | Task.context plain string; template provided by app, not research evidence. Implemented. |
| DR-06 | Optional user-selected AI tool records association, not API access. | Yes | Task.contextTool enum or null. Implemented. |
| DR-07 | App clock supplies creation/freshness metadata. | Yes | Amendment: supplied Task.createdDate is a local YYYY-MM-DD calendar date, not earlier proposed creation instant; contextUpdatedAt is ISO instant/null. Implemented; durability subject to storage error. |
| DR-08 | Four user-entered deliverable URLs and fixed slot labels locate deliverables; presence is derived. | No — required milestone | Anchor id/label/url implemented for current workspace; per-project relation deferred. |
| DR-09 | User-entered project milestone title/criteria/date/status plus generated ID/reached timestamp. | Yes | No such entity in current build; interpretation/scope deferred with FR-17. |
| DR-10 | User-selected palette identifier and configured safe defaults. | No — earlier selected scope | Only design tokens exist; no saved palette preference. Deferred with FR-20. |

### Implemented dictionary

| Field | Type / rule | Origin and meaning |
|---|---|---|
| Task.id | non-empty string, unique within saved tasks | crypto.randomUUID on create; immutable/read-only; synthetic IDs for demo |
| Task.title | non-blank trimmed string, max 160 characters | User input; required |
| Task.description | string, max 4,000 characters | User input; may be empty |
| Task.type | feature / bug | User selection; default feature |
| Task.status | todo / in-progress / review / done | User selection; default To Do, or the originating empty column |
| Task.assignee | one configured TEAM name | User selection; default first slot; actual roster pending |
| Task.dueDate | valid YYYY-MM-DD or null | Optional user calendar date; end of local day for urgency |
| Task.createdDate | valid YYYY-MM-DD | App local calendar date at creation; not editable |
| Task.context | string, max 30,000 characters | User text or template; exact current briefing, not append-only history |
| Task.contextTool | Claude / ChatGPT / Cursor / Lovable / Replit / Other / null | Optional user selection |
| Task.contextUpdatedAt | ISO timestamp or null | Updated when context/tool change is saved; unrelated title edit leaves it unchanged |
| Anchor.id | presentation / demo / report / documentation | Fixed supplied slot IDs |
| Anchor.label | matching fixed human label | App configuration |
| Anchor.url | HTTP(S) URL without embedded username/password, or null | User input trimmed on Save; max 2,048 input characters; no remote validation |
| Deadline state | derived, not saved | Done/undated neutral; >48h calm; 24–48h due soon; <=24h warning; overdue after local day end |
| Owner initials | derived, not saved | Name display aid; full name remains available |
| Link presence | derived, not saved | url non-empty; does not assert completion |

Persistence uses JSON arrays under **vibetracker.tasks** and **vibetracker.anchors**; demo uses **vibetracker.demo.tasks** and **vibetracker.demo.anchors**. Storage is browser/origin-specific, without a hosted database, encryption promise, backup or synchronisation. Invalid data is retained instead of overwritten with fixtures. Clearing browser storage removes data. Schema migration for future entity changes needs a deliberate plan.

## Expanded acceptance audit

[CHECKLIST.md](CHECKLIST.md) retains the 199 supplied acceptance points, all unchecked. [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) separately records code inspection, actual checks, gaps and provisional scope. Fresh quota tests expose incomplete draft recovery, failed-delete visibility and timestamp durability despite the existing warning messages; long insertion is silently clipped by maxlength. These are open issues, not completed NFR acceptance.

## Verification routes and limits
- `npm test`: date boundaries/validation, schema fixtures, timestamps, context formatting/review hints, URL rules and demo validity (10 tests at this checkpoint).
- `npm run build`: actual production compilation, not proof of deployment or usability.
- Browser checks conducted locally: CRUD/movement/reload/cancellation/delete; handoff/context persistence; clipboard success/denial; URLs; review; invalid-storage preservation; demo isolation; keyboard focus; cross-tab protection; selected contrast/reflow checks.
- Private screenshots, browser scripts/results and per-stage rationale are retained in the subject workspace, outside this public code repository. They contain no invented participant evidence. A separate coursework evaluation must distinguish intention, code and observed results.
- Public deployment, student rehearsal, Firefox, screen-reader evaluation, representative-user study and performance measurements remain pending.

## Decisions still requiring reconciliation
The locked starter explains the implemented hackathon boundary; it does not erase S1/S4 or establish that every wider assessment requirement is met. Resolve multiple boards, actual roster/metadata, explicit project milestones and palette preference against the client record before treating the entire coursework baseline as fulfilled. Team identity remains unprovided; do not invent members or interviews. The live portal's exact markers supersede old starter marker spellings.
