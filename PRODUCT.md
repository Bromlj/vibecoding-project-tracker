# Vibecoding Project Tracker

Product truth recorded on 20 October 2026. This is an engineering reference for maintaining the prototype, not an assessed report or a record of user research.

The product keeps project tasks, curated AI working context and handover information together. Its scope is one workspace and one team, with multiple independent project boards. A team member's saved name, email or GitHub/GitLab details are metadata; adding a member does not create an authenticated collaborator.

The primary workflow is to open a project, create or edit a task, choose a stage and assignee, record useful prompts and actual outcomes, then review or copy the exact briefing for use elsewhere. Details, AI context and Attempts & lessons share one editable draft. Copying does not save or send a task, and the app makes no AI service request. Optional context-heading suggestions check presence, not truth or quality.

Implemented local features include first-use setup; project creation and editing; task creation, editing, deletion and assignment; search, owner and type filters; mobile stage selection; editable milestones; four deliverable links per project; team metadata; three task palettes; browser accessibility preferences; JSON backup and validated restore; separate synthetic demo data; and storage-error recovery. A deliverable URL does not prove completion. Milestone completion is an explicit user choice.

How to use provides the complete workflow before or after setup. Demo mode adds eight instructional steps, direct practice actions, hide/show and a protected reset of example data only. Optional navigation shortcuts and local-device read aloud supplement the baseline semantic/keyboard interface. Current evidence and hosting boundaries are recorded in RELEASE_READINESS.md.

Local workspace data is stored in this browser and origin. Save errors preserve the current draft; invalid persisted data is preserved for recovery. Manual backup downloads are available. Local data is not automatically synchronized between people, devices or hosting origins.

Cloud support code is prepared, but hosted database schema, OAuth configuration and live shared-workspace verification remain pending. The Vercel prototype is public and its registration-free access was verified on 20 October 2026. Authenticated collaboration remains unverified. The local/demo path remains usable without an account.

The design direction is a restrained white sidebar, pale grey workspace and teal actions, using system UI fonts. Readable text, labels, visible focus and color-independent meaning are baseline behavior; accessibility preferences add user control. Preserve useful existing behavior when changing the visual system. See [DESIGN.md](DESIGN.md) for extracted tokens and component guidance.

The supplied `product-design` package provides 14 visual references and JSON specifications. It informs composition and interaction, while stored data and tested behavior determine product claims. The supplied teaching material and assessment brief were inspected to understand the prototype context; this file does not generate a persona, elicitation result or student evaluation. Real stakeholder feedback, broader assistive-technology testing and live service checks remain separate evidence.

Appearance & settings offers strong boundaries, independent type palettes, colour-vision alternatives and saved Light/Dark/System appearance. Overdue tasks use a distinct alarm fill (red by default); tasks due within 48 hours use a warning fill (amber), with a specific within-24-hours label. More than 48 hours is calm; undated tasks and completed tasks are neutral. Done overrides overdue status. Completion is neutral grey in every palette; labels, type badges, icons and solid/dashed/double borders remain. M8 was corrected to match the client slide; see M8_SPECIFICATION_DECISION.md. Real shared account setup remains deferred.

Current M12 refinement: each task now has an Attempts & lessons tab alongside Details and AI context. Manual editable records retain successive prompts, results, reasons and self-reported authors. Selected attempts append to the next briefing without replacing the current context. This extends M9/M10; no market-wide novelty claim is made. The new team example demonstrates collaboration through assignments, handovers and attributed work, with live accounts deferred. No member switcher is included, following the student's correction.
