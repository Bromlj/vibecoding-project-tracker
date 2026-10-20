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

See [NON_FUNCTIONAL_REQUIREMENTS.md](NON_FUNCTIONAL_REQUIREMENTS.md) for 13 requirements (NFR-01–13).

## Data requirements

See [DATA_REQUIREMENTS.md](DATA_REQUIREMENTS.md) for 10 requirements (DR-01–10) and the implemented data dictionary, sources and persistence rules.

## Expanded acceptance audit

[CHECKLIST.md](CHECKLIST.md) retains the 199 supplied acceptance points, all unchecked. [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) separately records code inspection, actual checks, gaps and provisional scope. Fresh quota tests expose incomplete draft recovery, failed-delete visibility and timestamp durability despite the existing warning messages; long insertion is silently clipped by maxlength. These are open issues, not completed NFR acceptance.

## Verification routes and limits
- `npm test`: date boundaries/validation, schema fixtures, timestamps, context formatting/review hints, URL rules and demo validity (10 tests at this checkpoint).
- `npm run build`: actual production compilation, not proof of deployment or usability.
- Browser checks conducted locally: CRUD/movement/reload/cancellation/delete; handoff/context persistence; clipboard success/denial; URLs; review; invalid-storage preservation; demo isolation; keyboard focus; cross-tab protection; selected contrast/reflow checks.
- Private screenshots, browser scripts/results and per-stage rationale are retained in the subject workspace, outside this public code repository. They contain no invented participant evidence. A separate coursework evaluation must distinguish intention, code and observed results.
- Public deployment, Firefox, screen-reader evaluation, representative-user study and performance measurements remain unverified. These are different kinds of outstanding evidence; they are not all prerequisites for an initial hosted demo. There is no formal presentation or mandatory rehearsal, following the student's latest clarification.

## Decisions still requiring reconciliation
The locked starter explains the implemented hackathon boundary; it does not erase S1/S4 or establish that every wider assessment requirement is met. Resolve multiple boards, actual roster/metadata, explicit project milestones and palette preference against the client record before treating the entire coursework baseline as fulfilled. Team identity remains unprovided; do not invent members or interviews. The live portal's exact markers supersede old starter marker spellings.
