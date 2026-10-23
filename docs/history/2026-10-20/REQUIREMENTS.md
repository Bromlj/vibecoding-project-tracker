# Engineering requirements — CM6312 working baseline

Version 4, reconciled for report preparation on 20 October 2026. Current acceptance evidence and limitations are consolidated in [CURRENT_ACCEPTANCE.md](CURRENT_ACCEPTANCE.md). This is a development specification, not assessed report prose. It retains IDs from the earlier working baseline and reconciles them with the supplied starter. A documented requirement is not necessarily implemented or verified.

## Sources and interpretation
- **S1 — Initial client description:** intuitive project management for vibe-coding; track tasks over time, important information and key milestones; record useful prompts/results; include Kanban. Supplied in the lecturer announcement.
- **S2 — Client milestone slides:** M4 task model/columns; M5 modal CRUD/persistence; M6 type distinction; M7 ownership; M8 deadlines; M9 context; M10 copy; M11 deliverable anchors; M12 chosen extension; M13 demo. Screenshots supplied by the student; no invented slide/page numbers.
- **S3 — Supplied starter PRD/scaffold:** React/Vite/Tailwind, locked Task/Anchor fields, localStorage and fixed roster; excludes accounts, backend and real-time/multi-team collaboration. Original version remains in Git history. Current reconciliation: [PRD.md](PRD.md).
- **S4 — Student's client-discussion notes:** reported general developers, one team/multiple boards, optional manual team setup, identity metadata and customisable task colours. These are reported answers, not verbatim transcripts. The student's subsequent explicit full-product instruction adopts multiple boards, editable members, project milestones and palettes. These are no longer indefinitely deferred; shared access remains a separately configured extension.
- **S5 — Consulted technical guidance:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- **D — Chosen implementation policy:** explicit decisions in [DESIGN.md](DESIGN.md), not attributed to the client or fabricated research.

MVP flags retain the earlier baseline's priorities. “No — required milestone” is still required for the final hackathon build. “Implemented” describes code, while the verification column limits the evidence actually obtained. Deferred items have not been deleted from the baseline merely because they are absent from the app.

## Functional requirements

See [FUNCTIONAL_REQUIREMENTS.md](FUNCTIONAL_REQUIREMENTS.md) for 24 requirements (FR-01–24), including the later accessibility and guided-learning extensions.

## Non-functional requirements

See [NON_FUNCTIONAL_REQUIREMENTS.md](NON_FUNCTIONAL_REQUIREMENTS.md) for 13 requirements (NFR-01–13).

## Data requirements

See [DATA_REQUIREMENTS.md](DATA_REQUIREMENTS.md) for 13 requirements (DR-01–13) and the implemented data dictionary, sources and persistence rules.

## Expanded acceptance audit

[CHECKLIST.md](CHECKLIST.md) retains the 199 supplied acceptance points, all unchecked. [RELEASE_READINESS.md](RELEASE_READINESS.md) reconciles all 17 groups with current code and checks; IMPLEMENTATION_STATUS.md is historical. Earlier quota/long-input failures were repaired and rechecked: drafts and prior data survive failed saves, failed deletion leaves the task, and over-limit text is retained with an error. The entire checklist has not been certified.

## Verification routes and limits
- `npm test`: date boundaries/validation, schema fixtures, timestamps, context formatting/review hints, URLs, demo validity, cloud contracts, shortcuts and same-name members (28 tests at the latest recorded checkpoint; no new tests run for this documentation reconciliation).
- `npm run build`: actual production compilation, not proof of deployment or usability.
- Browser checks conducted locally: CRUD/movement/reload/cancellation/delete; handoff/context persistence; clipboard success/denial; URLs; review; invalid-storage preservation; demo isolation; keyboard focus; cross-tab protection; selected contrast/reflow checks.
- Private screenshots, browser scripts/results and per-stage rationale are retained in the subject workspace, outside this public code repository. They contain no invented participant evidence. A separate coursework evaluation must distinguish intention, code and observed results.
- Current checks include Chrome, Edge and Firefox, the 24-state design audit plus guide/navigation scans, keyboard/reflow/failure scenarios and fresh performance measurements. Public prototype access was verified on 20 October 2026. Named human screen-reader evaluation and representative-user study remain unrecorded. These are different kinds of outstanding evidence; they are not all prerequisites for an initial hosted demo. There is no formal presentation or mandatory rehearsal, following the student's latest clarification.

## Current scope decision
The student explicitly requested the fuller local workspace after reviewing the starter-only gap. Version 2 implements editable members, multiple projects, project milestones, safe saving, palettes and visible accessibility preferences. This supersedes starter fixed-roster/single-board restrictions while preserving the four task stages and prompt/context workflow. The chosen schemas remain implementation decisions, not verbatim client statements.

Supabase Auth/PostgreSQL is a later user-authorized optional sharing extension; local/demo access stays registration-free. Live configuration and verification remain separate from code readiness. The student's pasted portal instruction uses pitch-done; the slide/starter uses pitch-ready. The repository uses pitch-done. Portal acceptance has not been independently verified; historic tags are preserved.

Latest M12 addition: FR-24 / DR-13, Attempts & lessons, is a student-selected extension beyond the client's current-context and copy requirements. See PROTOTYPE_DEMO.md for decisions, prototype scope and checks.
