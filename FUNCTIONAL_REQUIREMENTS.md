# Functional requirements — report-aligned specification

23 October 2026 baseline; frontend-inventory addendum 27 October 2026. Canonical IDs match the report requirement list. No runtime behaviour changes. Source labels are defined in REQUIREMENTS.md; the exact identifier mapping and preserved richer specification are linked in REPORT_ALIGNMENT.md. Evidence limits are in CURRENT_ACCEPTANCE.md and EVIDENCE.md. The dated [27 October audit](ASSESSMENT_AUDIT_2026-10-27.md) records fresh checks and the expanded editorial report's evidence boundaries.

| ID | Required behaviour | MVP | Origin | Implementation / boundary |
|---|---|---|---|---|
| FR-01 | Show titles and owners across To Do, In Progress, Review and Done. | Yes | S2 M4/M7 | Four ordered stages; mobile stage selector and View all. |
| FR-02 | Create tasks with a required title; default to Feature, Unassigned and To Do or the originating column. | Yes | S2 M5; D | Labelled editor, validation and explicit save. |
| FR-03 | Prefill edits; preserve drafts across tabs until explicit save or discard. | Yes | S2 M5; D | Details/context/attempts share one protected draft. Editor tabs, not synchronised unsaved browser-tab drafts. |
| FR-04 | Confirm the named task before deletion; retain it when saving fails. | Yes | S2 M5; D | Confirmation and durable-write-before-success behaviour. |
| FR-05 | Change a task's stage through a dropdown. | Yes | S2 M5 | No drag-only dependency. |
| FR-06 | Assign, hand off or leave tasks unassigned. | Yes | S2 M7; D | Stable roster IDs; not authentication or notification. |
| FR-07 | Create, rename and switch separate project boards. | Yes, chosen product baseline | S4; D | One local team, separate project records. M4 alone does not require multiple projects. |
| FR-08 | Edit a context template for continuing work. | Yes | S2 M9 | Current Markdown text, not executable HTML. |
| FR-09 | Retain prompts and manually recorded outcomes beside tasks. | Yes | S1/S2 mission; D | Outcome truth remains the user's responsibility. |
| FR-10 | Record an optional AI-tool name. | Yes | S2 M9 | Label only, including Other; no provider connection. |
| FR-11 | Show when context was last successfully saved. | Yes | S2 M9; D | Context/tool/selected-attempt briefing changes update freshness; unsaved edits remain separate. |
| FR-12 | Copy complete briefings; provide manual selection when clipboard access fails. | Yes; fallback is a safeguard | S2 M10; D | Saved card or current editor draft; no save/AI transmission. |
| FR-13 | Retain work after reload; export backups and validate restoration. | Yes for persistence; backup/restore extends it | S2 M5/M9; D | Versioned browser-local snapshot, recovery and stale-tab protection; not synchronisation. |
| FR-14 | Create, edit and delete milestones with criteria and Pending/Reached states. | Yes, chosen product baseline | S1; D | Formerly FR-17. Achievement is explicitly user-asserted; not the hackathon milestone list. |
| FR-15 | Maintain named members and optional contact details. | Yes for names/assignment; contacts optional | S4; D | Formerly FR-18. Roster metadata does not grant shared access. |
| FR-16 | Distinguish features and bugs with labels, icons and colours. | No; required milestone | S2 M6; S5 | Formerly FR-14. Type remains separate from urgency. |
| FR-17 | Automatically distinguish approaching deadlines, overdue tasks and neutral completed work. | No; required milestone | S2 M8; D | Formerly FR-15. <=48h warning, overdue alarm, neutral Done; 24–48h is an explicit interpretation. |
| FR-18 | Retain Presentation, Demo, Report and Documentation links per project. | No; required milestone | S2 M11; D | Formerly FR-16. Four slots; URL presence is not completion. Editing dialog is a documented layout variation. |
| FR-19 | Preview the exact briefing before copying. | No; extension | D | Optional review; hints do not certify accuracy. |
| FR-20 | Preview, save, cancel and reset appearance choices. | No; extension | S4; D | Workspace palettes and browser-specific preferences are distinct. |
| FR-21 | Offer optional shortcuts without interfering with typing. | No; extension | D | Opt-in, with typing/dialog suppression and visible navigation alternatives. |
| FR-22 | Offer user-controlled read aloud with pause/resume/stop and text fallback. | No; extension | D | Implemented; lifecycle checked using an explicitly labelled stand-in. Human audible use remains unverified. |
| FR-23 | Provide guidance and isolated practice data. | No for guide; M4 examples required | D; S2 M4 | Separate demo storage and protected reset; not a user study. |
| FR-24 | Create/edit/remove attempts and lessons; select which enter briefings. | No; M12 extension | D | Editable manual timeline; self-reported authors/results, not immutable audit history. |
| FR-25 | Search tasks, filter by owner/type, show matching counts and allow clearing filters after no results. | No; retrieval extension | D | Existing TaskBoard behaviour made explicit in the expanded report; filtering does not delete records. |
| FR-26 | Set up a local workspace and navigate projects, team, settings, help and responsive menus without sign-in. | Yes for access/navigation | D | Existing shell/setup behaviour made explicit; optional shared access is unconfigured and not claimed as completed collaboration. |

FR-25 and FR-26 were added to the specification on 27 October to describe already-existing frontend behaviour. Original identifiers were not renumbered. Together with the existing 13 NFRs and 13 DRs, the expanded inventory has 52 identifiers. A requirement's relationship to a milestone does not mean every safeguard or additional field was explicitly requested in the slides.

Code inspection and bounded developer checks support these implementation descriptions, not universal user acceptance. Original detailed acceptance wording is retained in docs/history/2026-10-20/FUNCTIONAL_REQUIREMENTS.md and at the pre-alignment commit. Historical results remain historical; see ASSESSMENT_AUDIT_2026-10-27.md for current capture runs, controlled simulations and open checks.
