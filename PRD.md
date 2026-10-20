# Vibecoding Project Tracker — working PRD

## Status and provenance
M2 engineering requirements are recorded in [REQUIREMENTS.md](REQUIREMENTS.md): functional, non-functional and data requirements, stable IDs, MVP flags, sources, checks and honest implementation gaps. This is a reviewed development specification, not proof that all requirements are satisfied.

Category documents: [functional](FUNCTIONAL_REQUIREMENTS.md), [non-functional](NON_FUNCTIONAL_REQUIREMENTS.md), [data and dictionary](DATA_REQUIREMENTS.md). They were separated in three documentation commits after the original combined `prd-done` checkpoint; the original history is preserved.

Based on the supplied hackathon starter PRD and client material. The unmodified starter is retained in Git history. This working version corrects reused semester/module language and outdated marker spellings rather than attributing new text to the lecturer.

## Product and users
Track AI-assisted development tasks from intent to ship, retaining useful prompts/results and context for resumption. Initial client description requires Kanban, project information and key milestones. General developers are the audience reported in the client's discussion; the three roster slots are a starter implementation constraint, not invented research about users.

Current prototype: one local workspace, a four-column board, a task editor and four deliverable anchors. Context is a current curated briefing, not automatic AI chat capture, immutable prompt history or verified results. No comparative claim about Jira/Linear/Notion is treated as independently researched.

## Workflow
1. Open the workspace; recover saved local tasks/anchors or show an actionable error.
2. Add a task; enter title, description, type, status, assignee, optional date and context/tool.
3. Save explicitly, change status as work progresses, or hand off through the assignee dropdown.
4. Review or copy context for use in another tool. Copying does not save a draft or call AI.
5. Record deliverable URLs; saved-link presence does not imply completed work.

## Locked starter data model
Implementation remains Task and Anchor as supplied; see [implemented dictionary](DATA_REQUIREMENTS.md#implemented-dictionary).

Task fields: id, title, description, type, status, assignee, dueDate, createdDate, context, contextTool, contextUpdatedAt.
Anchor fields: id, label, url.

Exact stages: To Do (todo), In Progress (in-progress), Review (review), Done (done). Do not add entities/change identity without a deliberate requirements/schema decision. Earlier proposals for board IDs, member entities and project milestones remain explicit gaps in REQUIREMENTS.md.

## Stack and storage
React 18 via Vite 5, Tailwind 3, React state and a localStorage hook. No backend/database, accounts, AI or GitHub API integration. Retain supplied stack. See [tool purposes](TOOLS.md). Vercel is the suggested host; this tracker is not the lecturer's portal.

## Team and identity
Repository owner: Bromlj. Real team name, roster and role allocation have not been supplied. UI Teammate A/B/C remain explicitly synthetic/configuration placeholders; no classmates, handles or email addresses are invented.

Product name: Vibecoding Project Tracker.
Chosen interface line: From intent to ship. Keep the task and its context together.
Public tracker URL: pending deployment.
This repository: https://github.com/Bromlj/vibecoding-project-tracker

## Checkpoints
| Stage | Exact live portal marker | Current state |
|---|---|---|
| M1 | git-linked | Correct commit/tag pushed; portal recognition pending |
| M2 | prd-done | Requirements documentation checkpoint; broader gaps remain explicit |
| M3 | design-done | Design documented/tokens pushed |
| M4 | data-model | Board/model pushed |
| M5 | crud-modal | Modal CRUD/storage pushed |
| M6 | tag-style | Type markers pushed; primary-button correction recorded |
| M7 | task-owner | Owner/handoff pushed |
| M8 | due-tint | Deadline states pushed |
| M9 | task-context | Context/tool/freshness pushed |
| M10 | copy-context | Copy/manual fallback pushed |
| M11 | project-deliverables | Anchor board pushed |
| M12 | secret-sauce | Briefing review/hints pushed |
| M13 | pitch-done | Local demo prepared; public deployment check pending; no formal presentation requirement |

M2 was initially understood as omitted; latest student instruction requires these requirements saved/pushed. Add this checkpoint now without rewriting earlier milestone history or claiming it preceded implementation.

## Scope and verification
Starter exclusions remain accounts/authentication, real GitHub integration, shared backend/database, multi-team/real-time collaboration. Responsive layout is a chosen quality improvement although the starter allows desktop-only. Multiple projects for one team are a separate reported need, not the same as multi-team support; its current absence is recorded, not concealed.

M12 extension: review the exact copied briefing with optional missing-template hints. Hints do not certify truth or completeness.

Local build, regression and named browser checks are recorded; screen-reader/user-study/performance/public deployment evidence is not invented. A classroom demo is not automatically a user test. The student clarified that there is no formal presentation; at most an informal 30-second app demonstration if requested. No rehearsal is a completion condition. [DEMO.md](DEMO.md) is an optional operational walkthrough, not a presentation assignment. The M11 Presentation anchor remains a specified app feature and does not establish a CM6312 presentation submission.

Completion means the actual required behaviour and delivery checks are satisfied, not simply that tags exist. Wider coursework requirements and prototype/evaluation marks require further evidence beyond the hackathon checkpoint list.
