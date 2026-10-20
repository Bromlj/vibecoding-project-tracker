# Vibecoding Project Tracker — working PRD

## Status and provenance
M2 engineering requirements are recorded in [REQUIREMENTS.md](REQUIREMENTS.md): functional, non-functional and data requirements, stable IDs, MVP flags, sources, checks and honest implementation gaps. This is a reviewed development specification, not proof that all requirements are satisfied.

Category documents: [functional](FUNCTIONAL_REQUIREMENTS.md), [non-functional](NON_FUNCTIONAL_REQUIREMENTS.md), [data and dictionary](DATA_REQUIREMENTS.md). They were separated in three documentation commits after the original combined `prd-done` checkpoint; the original history is preserved.

Based on the supplied hackathon starter PRD and client material. The unmodified starter is retained in Git history. This working version corrects reused semester/module language and outdated marker spellings rather than attributing new text to the lecturer.

## Product and users
Track AI-assisted development tasks from intent to ship, retaining useful prompts/results and context for resumption. Initial client description requires Kanban, project information and key milestones. General developers are the audience reported in the client's discussion; the original three roster slots were starter examples, not research about users. Fresh work now creates a real user-entered roster.

Current prototype: one local team workspace, Projects home, multiple four-column boards, per-project milestones/anchors, editable team metadata and Appearance/accessibility settings. Context is a current curated briefing, not automatic AI chat capture, immutable prompt history or verified results. No comparative claim about Jira/Linear/Notion is treated as independently researched.

## Workflow
1. Set up or reopen the workspace, then choose a project on Projects. Recover validated saved data or show an actionable error.
2. Add a task; enter title, description, type, status, assignee, optional date and context/tool.
3. Save explicitly, change status as work progresses, or hand off through the assignee dropdown.
4. Review or copy context for use in another tool. Copying does not save a draft or call AI.
5. Record deliverable URLs; saved-link presence does not imply completed work.

## Data model and deliberate scope expansion
Version 2 extends the starter with Workspace, Board, Member and Milestone entities. Task ownership uses stable member IDs, not mutable name strings. Each project owns tasks, four anchors and milestones. Legacy arrays migrate without deletion. See the [implemented dictionary](DATA_REQUIREMENTS.md#implemented-dictionary).

Exact stages remain To Do (todo), In Progress (in-progress), Review (review), Done (done). The student explicitly requested the wider client-discussion functionality; starter exclusions do not silently override that later authorization.

## Stack and storage
React 18.3.1, Vite 8.3.4, Tailwind CSS 4.3.3 and browser localStorage form the current local foundation. Node.js 22.12+ is required; Node 24 was used for checks. package.json and package-lock.json are the version authority. Optional Supabase client/Auth/PostgreSQL code is prepared for genuine shared access; its live schema/providers are not ready. See [CLOUD_SETUP.md](CLOUD_SETUP.md). No automatic AI execution or repository access is added. Vercel hosts the public prototype; this tracker is separate from the lecturer's portal.

## Team and identity
Repository owner: Bromlj. Real team name, roster and role allocation have not been supplied. Teammate A/B/C are explicitly synthetic demo/import examples; fresh setup accepts the user's own members. No classmates, handles or email addresses are invented.

Product name: Vibecoding Project Tracker.
Chosen interface line: From intent to ship. Keep the task and its context together.
Public tracker URL: https://vibecoding-project-tracker-umber.vercel.app/
Public demo: https://vibecoding-project-tracker-umber.vercel.app/?demo=1
This repository: https://github.com/Bromlj/vibecoding-project-tracker

## Checkpoints
| Stage | Marker from supplied portal text | Current state |
|---|---|---|
| M1 | git-linked | Correct commit/tag pushed; portal recognition not independently verified |
| M2 | prd-done | Requirements documentation checkpoint; broader gaps remain explicit |
| M3 | design-done | Design documented/tokens pushed |
| M4 | data-model | Board/model pushed |
| M5 | crud-modal | Modal CRUD/storage pushed |
| M6 | tag-style | Type markers pushed; primary-button correction recorded |
| M7 | task-owner | Owner/handoff pushed |
| M8 | due-tint | Slide semantics restored: warning for upcoming work, alarm for overdue and neutral Done; local/public checks recorded |
| M9 | task-context | Context/tool/freshness pushed |
| M10 | copy-context | Copy/manual fallback pushed |
| M11 | project-deliverables | Anchor board pushed |
| M12 | secret-sauce | Attempts & lessons implemented; Review briefing remains a supporting interaction |
| M13 | pitch-done | Public demo and registration-free access verified; no formal presentation requirement in the supplied assessment brief |

M2 was initially understood as omitted; the updated instruction was completed in the combined requirements commit and later category-specific commits. Historic tags remain unchanged. The pasted portal text uses pitch-done while the slide/starter uses pitch-ready; this records the chosen marker, not verified portal acceptance.

## Scope and verification
The current scope includes one team with multiple project boards and optional separately configured shared sign-in. Repository integration, automatic AI calls, simultaneous multi-team administration and live push synchronisation are outside this build. Responsive/accessibility improvements are deliberate quality decisions. See DESIGN_REVIEW.md for adaptation rationale and verification boundaries.

Current M12 extension: Attempts & lessons retains successive prompts, outcomes and reasons, with selected records carried into the next briefing. Review and optional template hints remain supporting interactions. This supersedes the earlier Review-only choice; see PROTOTYPE_DEMO.md.

Local build, regression, named browser checks, synthetic performance measurements and public deployment checks are recorded in [EVIDENCE.md](EVIDENCE.md). Representative-user and named human screen-reader evaluations remain unperformed; developer results do not replace them. A classroom demo is not automatically a user test. The student clarified that there is no formal presentation; at most an informal 30-second app demonstration if requested. No rehearsal is a completion condition. [DEMO.md](DEMO.md) is an optional operational walkthrough, not a presentation assignment. The M11 Presentation anchor remains a specified app feature and does not establish a CM6312 presentation submission.

Completion means the actual required behaviour and delivery checks are satisfied, not simply that tags exist. Wider coursework requirements and prototype/evaluation marks require further evidence beyond the hackathon checkpoint list.
