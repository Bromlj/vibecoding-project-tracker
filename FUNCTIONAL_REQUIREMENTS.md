# Functional requirements — report-aligned specification

23 October 2026. Canonical IDs match the report requirement list. No runtime behaviour changes. Source labels are defined in REQUIREMENTS.md; the exact identifier mapping and preserved richer specification are linked in REPORT_ALIGNMENT.md. Evidence limits are in CURRENT_ACCEPTANCE.md and EVIDENCE.md.

| ID | Required behaviour | MVP | Origin | Implementation / boundary |
|---|---|---|---|---|
| FR-01 | Show titles and owners across To Do, In Progress, Review and Done. | Yes | S2 M4/M7 | Four ordered stages; mobile stage selector and View all. |
| FR-02 | Create tasks with a required title; default to Feature, Unassigned and To Do or the originating column. | Yes | S2 M5; D | Labelled editor, validation and explicit save. |
| FR-03 | Prefill edits; preserve drafts across tabs until explicit save or discard. | Yes | S2 M5; D | Details/context/attempts share one protected draft. |
| FR-04 | Confirm the named task before deletion; retain it when saving fails. | Yes | S2 M5; D | Confirmation and durable-write-before-success behaviour. |
| FR-05 | Change a task's stage through a dropdown. | Yes | S2 M5 | No drag-only dependency. |
| FR-06 | Assign, hand off or leave tasks unassigned. | Yes | S2 M7; D | Stable roster IDs; not authentication or notification. |
| FR-07 | Create, rename and switch separate project boards. | Yes | S4; D | One local team, separate project records. |
| FR-08 | Edit a context template for continuing work. | Yes | S2 M9 | Current Markdown text, not executable HTML. |
| FR-09 | Retain prompts and manually recorded outcomes beside tasks. | Yes | S1/S2 mission; D | Outcome truth remains the user's responsibility. |
| FR-10 | Record an optional AI-tool name. | Yes | S2 M9 | Label only, including Other; no provider connection. |
| FR-11 | Show when context was last successfully saved. | Yes | S2 M9; D | Context/tool/selected-attempt briefing changes update freshness. |
| FR-12 | Copy complete briefings; provide manual selection when clipboard access fails. | Yes | S2 M10; D | Saved card or current editor draft; no save/AI transmission. |
| FR-13 | Retain work after reload; export backups and validate restoration. | Yes | S2 M5/M9; D | Versioned browser-local snapshot, recovery and stale-tab protection. |
| FR-14 | Create, edit and delete milestones with criteria and Pending/Reached states. | Yes | S1; D | Formerly FR-17. Achievement is explicitly user-asserted. |
| FR-15 | Maintain named members and optional contact details. | Yes | S4; D | Formerly FR-18. Roster metadata does not grant shared access. |
| FR-16 | Distinguish features and bugs with labels, icons and colours. | No; required milestone | S2 M6; S5 | Formerly FR-14. Type remains separate from urgency. |
| FR-17 | Automatically distinguish approaching deadlines, overdue tasks and neutral completed work. | No; required milestone | S2 M8; D | Formerly FR-15. <=48h warning, overdue alarm, neutral Done; 24–48h is an explicit interpretation. |
| FR-18 | Retain Presentation, Demo, Report and Documentation links per project. | No; required milestone | S2 M11; D | Formerly FR-16. Four slots; URL presence is not completion. |
| FR-19 | Preview the exact briefing before copying. | No; extension | D | Optional review; hints do not certify accuracy. |
| FR-20 | Preview, save, cancel and reset appearance choices. | No; extension | S4; D | Workspace palettes and browser-specific preferences are distinct. |
| FR-21 | Offer optional shortcuts without interfering with typing. | No; extension | D | Opt-in, with typing/dialog suppression and visible navigation alternatives. |
| FR-22 | Offer user-controlled read aloud with pause/resume/stop and text fallback. | No; extension | D | Implemented; lifecycle checked using a stand-in. Human audible use remains unverified. |
| FR-23 | Provide guidance and isolated practice data. | No; extension | D | Separate demo storage and protected reset; not a user study. |
| FR-24 | Create/edit/remove attempts and lessons; select which enter briefings. | No; M12 extension | D | Editable manual timeline; self-reported authors/results, not immutable audit history. |

Code inspection and stored developer checks support the implementation descriptions, not a claim of universal user acceptance. Original detailed acceptance wording is retained in docs/history/2026-10-20/FUNCTIONAL_REQUIREMENTS.md and at the pre-alignment commit.
