# Vibecoding Project Tracker

A local-first Kanban workspace for AI-assisted development. Track tasks, retain prompts and outcomes, select useful attempts for a briefing, and keep deliverable links with each project.

## Prototype

- App: https://vibecoding-project-tracker-umber.vercel.app/
- Populated demo: https://vibecoding-project-tracker-umber.vercel.app/?demo=1

Local and demo modes require no account, environment variables or database setup. Demo records are fictional and stored separately from the user's own work. The public prototype was checked on 20 October 2026; recheck assessor access before submission. Live shared accounts remain deferred.

## Documentation authority — 23 October 2026

Requirements now use the numbering and MVP priorities in the student's report. See [alignment and legacy-ID translation](REPORT_ALIGNMENT.md), [requirements sources and scope](REQUIREMENTS.md), [functional requirements](FUNCTIONAL_REQUIREMENTS.md), [non-functional requirements](NON_FUNCTIONAL_REQUIREMENTS.md), [data requirements](DATA_REQUIREMENTS.md), and [current acceptance](CURRENT_ACCEPTANCE.md).

Older dated design/release notes retain their checkpoint wording and legacy requirement IDs. Translate those IDs through REPORT_ALIGNMENT.md; do not confuse them with the current report numbering. Original updated documents are retained in [the history folder](docs/history/2026-10-20/) and Git history. This reconciliation changes documentation only, not the application or recorded results.

## Run

Node.js 22.12+ and npm are required; the recorded checks used Node 24.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

React 18, Vite 8.3.4 and Tailwind 4.3.3 form the existing build. package.json/package-lock.json are authoritative. Optional shared access is described in [CLOUD_SETUP.md](CLOUD_SETUP.md). See [TOOLS.md](TOOLS.md) for the existing development-tool inventory.

## Workflow

1. Name the local workspace, add yourself and create the first project. Projects keeps separate boards, milestones and deliverable links.
2. Add or edit a task. Details, AI context and Attempts & lessons share a draft. Save explicitly; cancelling does not silently save.
3. Change the stage or hand off to a roster member. Names and optional contact/GitHub/GitLab fields are manual metadata, not connected accounts.
4. Keep current context and successive attempts. Select which attempts enter the next briefing. Review and copy use saved card data or the visible editor draft, without saving or sending to an AI provider. Blocked clipboard access provides selectable text.
5. Set milestone achievement criteria and explicitly mark Pending/Reached. The four deliverable slots indicate whether a URL exists, not whether work is complete.
6. Use search, filters, mobile stage selection, appearance/preferences, optional shortcuts and device reading as needed. Settings offers explicit backup and validated restore.
7. Explore demo/How to use provides isolated synthetic practice. Reset demo affects examples only; Back to my workspace returns to actual local work.

The StudySprint team example demonstrates fictional owners, handovers and attempts. It does not simulate real connected users or establish research outcomes. See [PROTOTYPE_DEMO.md](PROTOTYPE_DEMO.md) and [WORKSPACE_WORKFLOW.md](WORKSPACE_WORKFLOW.md), applying the legacy-ID translation where needed.

## Persistence and limits

Data is stored in this browser and origin. Export a backup before clearing browser data or changing origin. Failed saves preserve drafts and previous data; invalid stored records remain available for recovery; stale-tab writes are blocked. This is not cross-device synchronisation.

Newly saved tasks record an ISO creation date-time as well as the existing local creation date (DR-07 update, 25 October 2026). Older backups and tasks retain their original date-only record; the app does not invent a time they never stored. The 20 October test evidence predates this change.

Date-only deadlines end at the end of the local calendar day. Overdue work has a distinct alarm presentation; work due within 48 hours has warning styling, with a specific within-24-hours label. The 24–48-hour interval is a documented design interpretation. Later/undated tasks are calm; completed tasks are neutral in every palette. Text, icons and border patterns accompany colour. See [M8_SPECIFICATION_DECISION.md](M8_SPECIFICATION_DECISION.md) for the historical correction.

There is no automatic AI execution, repository integration, live push collaboration or automatic milestone completion. Optional shared-service code requires separate configuration and real-account verification. Prototype checks do not establish complete WCAG conformance, security certification or representative-user satisfaction.

## Evidence and delivery

[EVIDENCE.md](EVIDENCE.md) links the stored Node/build, workflow, accessibility and synthetic performance records with checkpoint limitations. Browser harnesses and full screenshots remain outside this public repository. The 23 October documentation revision does not rerun those checks.

[MILESTONE_PROGRESS.md](MILESTONE_PROGRESS.md) retains the M1–M13 record. Historical tags are unchanged. The repository uses pitch-done following the supplied portal instruction, while the slide says pitch-ready; portal recognition is not independently verified. Replayed progress commits are notifications, not newly implemented stages. Participation is separate from tag existence.

The prototype is deployed with Vite, repository root ./, npm run build and dist output. Local/demo hosting needs no environment variables. Shared-mode browser configuration must never contain server secrets; see CLOUD_SETUP.md. The student's clarification was no formal presentation, at most a short informal demo. The M11 Presentation slot remains an app requirement, not proof of a separate assessment submission.
