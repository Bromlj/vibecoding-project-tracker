# Vibecoding Project Tracker

Product truth recorded on 20 October 2026. This is an engineering reference for maintaining the prototype, not an assessed report or a record of user research.

The product keeps project tasks, curated AI working context and handover information together. Its scope is one workspace and one team, with multiple independent project boards. A team member's saved name, email or GitHub/GitLab details are metadata; adding a member does not create an authenticated collaborator.

The primary workflow is to open a project, create or edit a task, choose a stage and assignee, record useful prompts and actual outcomes, then review or copy the exact briefing for use elsewhere. Details and AI context share one editable draft. Copying does not save or send a task, and the app makes no AI service request. Optional context-heading suggestions check presence, not truth or quality.

Implemented local features include first-use setup; project creation and editing; task creation, editing, deletion and assignment; search, owner and type filters; mobile stage selection; editable milestones; four deliverable links per project; team metadata; three task palettes; browser accessibility preferences; JSON backup and validated restore; separate synthetic demo data; and storage-error recovery. A deliverable URL does not prove completion. Milestone completion is an explicit user choice.

How to use provides the complete workflow before or after setup. Demo mode adds eight instructional steps, direct practice actions, hide/show and a protected reset of example data only. Optional navigation shortcuts and local-device read aloud supplement the baseline semantic/keyboard interface. Current evidence and hosting boundaries are recorded in RELEASE_READINESS.md.

Local workspace data is stored in this browser and origin. Save errors preserve the current draft; invalid persisted data is preserved for recovery. Manual backup downloads are available. Local data is not automatically synchronized between people, devices or hosting origins.

Cloud support code is prepared, but hosted database schema, OAuth configuration and live shared-workspace verification remain pending. Vercel deployment also remains pending. Do not describe authenticated collaboration or a public production URL as verified until the corresponding live checks have succeeded. The local/demo path remains usable without an account.

The design direction is a restrained white sidebar, pale grey workspace and teal actions, using system UI fonts. Readable text, labels, visible focus and color-independent meaning are baseline behavior; accessibility preferences add user control. Preserve useful existing behavior when changing the visual system. See [DESIGN.md](DESIGN.md) for extracted tokens and component guidance.

The supplied `product-design` package provides 14 visual references and JSON specifications. It informs composition and interaction, while stored data and tested behavior determine product claims. The supplied teaching material and assessment brief were inspected to understand the prototype context; this file does not generate a persona, elicitation result or student evaluation. Real stakeholder feedback, broader assistive-technology testing and live service checks remain separate evidence.

Appearance & settings now offers stronger whole-card colours and independent type palettes, plus saved Light/Dark/System appearance. Default red Now follows overdue/24h deadlines, amber Next covers the following day, and green Done overrides old alarms. Text/border cues and alternative palettes remain available. This latest student choice supersedes neutral completed-card styling. The guided demo is ready locally; public hosting and real shared account setup are separate next steps.
