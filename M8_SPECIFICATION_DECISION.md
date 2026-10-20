# M8 specification reconciliation

## M8 correction — 20 October 2026

The student explicitly requested correction to meet the client specification after reviewing the mismatch. The slide requires separate warning/alarm presentations and neutral completed tasks. Earlier red/amber/green decisions below are superseded, not evidence of client approval.

Overdue tasks use a distinct alarm fill (red by default); tasks due within 48 hours use a warning fill (amber), with a specific within-24-hours label. More than 48 hours is calm; undated tasks and completed tasks are neutral. Done overrides overdue status. Completion is neutral grey in every palette; labels, type badges, icons and solid/dashed/double borders remain.

The 24–48-hour interval remains a documented interpretation because the slide leaves it undefined: extend the warning presentation with “Due soon”. Date-only end-of-local-day semantics and stable stored task/palette IDs are retained. Existing data and demo tasks adopt the corrected styling without resetting anything. Appearance and accessibility previews and the legend now explain the same rules.

Validation: 28 Node tests passed, including strengthened warning/alarm and completed-state regression assertions and palette contrast checks; production build passed. Focused local Chrome 155.0.8059.82 check passed: today versus overdue, neutral Done with task-type badge, three palettes in both themes, preview cancellation and strong borders. Two tested automated accessibility scans reported zero violations; no browser JavaScript errors. Screenshot inspected. Evidence: M8-restored-local-results.json and M8-restored-local-board.png in Milestone evidence. These are developer checks, not participant evaluation or complete accessibility conformance. Hosted verification after push bd6f9bc: the same focused Chrome check passed at the public Vercel URL on 20 October 2026 at 16:22 UTC. Warning/alarm/neutral completion, all palettes in both themes, cancellation and borders passed; both scoped scans reported zero violations and no JavaScript errors. Evidence: M8-restored-hosted-results.json and M8-restored-hosted-board.png. Existing saved data did not need a reset.

## Historical decision — superseded by the correction above


Recorded 20 October 2026. This is a development decision record, not final report prose or client approval.

## Current decision

Retain the interface explicitly requested by the student: stronger whole-card colours, red Now, amber Next and green Done, with alternative palettes and text/border cues. No code change is made in this reconciliation. **Literal conformance to client slide M8 remains open.** A test that the adaptation works does not establish that the client agreed to it.

| Situation | Supplied M8 slide | Current default implementation |
|---|---|---|
| More than two days | Calm | Neutral surface with On track text |
| 24–48 hours | Not specified | Amber Next / Due soon; a documented gap-filling decision |
| Within 24 hours | Warning | Red Now, with Due within 24 hours text |
| Overdue | Alarm | Same red Now fill, with Overdue text |
| Done | Neutral, including formerly overdue tasks | Green Complete; prior overdue alarm removed |
| Undated | Not specified | Neutral surface with No due date |

The warning/alarm text remains distinct, but the default card fill groups them together. The Done fill is green rather than neutral. An internal `id: neutral` in deadline logic does not make the visible completed card neutral: `card: complete` selects the coloured fill. No manual-priority field or per-card colour picker exists.

## Rationale and trade-off

The recorded trigger was the student's feedback that pale surfaces were difficult to distinguish and their request for red Now, amber important/next and green Done. The implementation makes card states more visible and uses selected alternative palettes, text and border patterns so meaning does not rely on colour alone. These are design intentions and implementation facts, not measured evidence of user preference or improved productivity.

Trade-off: grouping warning and alarm loses one visual distinction requested in the slide, and green completion changes its neutral-Done instruction. Stronger borders/contrast could have been applied while retaining the slide's categories; changing the categories was a separate choice. No verified client agreement or target-user study currently supports that semantic change.

## Evidence and closure

- Source: supplied M8 screenshot `Screenshot 2026-10-20 091944.png`, retained in the client slides evidence folder.
- Request/decision history: Stage 3 notes and DESIGN.md, later whole-card colour entry.
- Implementation: src/deadlines.js, src/TaskBoard.jsx, card palettes in src/workspace.js and CSS.
- Technical checks: deadline unit tests, Release-colour-results.json and Live-preferences-results.json. These check implementation, not client acceptance.
- Current sign-off: **implemented adaptation / specification variance unresolved**.
- Closure options: record an actual client agreement to the adaptation, or restore the slide semantics and recheck the affected UI. No agreement is invented and no future decision is marked complete.

The report evidence can accurately state both the original requirement and the subsequent design choice. It must not say M8 is literally satisfied or client-approved on the present evidence.
