# Vibecoding Project Tracker

A local-first Kanban workspace for AI-assisted development. Track tasks, keep curated prompts/outcomes, copy a briefing to another tool, and pin deliverable links.

## Run
Requires Node.js 20.19+ (this build checked with Node 24) and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Open the URL printed by Vite. No accounts, environment variables or database setup required. React 18, Vite 5 and Tailwind 3 are retained from the supplied starter. See [TOOLS.md](TOOLS.md), [DESIGN.md](DESIGN.md) and [REQUIREMENTS.md](REQUIREMENTS.md). Detailed acceptance points are in [CHECKLIST.md](CHECKLIST.md); current coverage and known gaps are in [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

Requirements are separated for navigation: [functional](FUNCTIONAL_REQUIREMENTS.md), [non-functional](NON_FUNCTIONAL_REQUIREMENTS.md), and [data with dictionary](DATA_REQUIREMENTS.md). The shared source/scope record stays in REQUIREMENTS.md.

## Use
- Add task or select a task title to edit. Save explicitly. Status moves the task between To Do, In Progress, Review and Done.
- Hand off to changes a local assignee label. Teammate A/B/C are demo placeholders, not authenticated collaborators.
- Record prompts, actual outcomes, constraints and next steps in Context. Optional AI tool records metadata; no AI request is made.
- Copy context from the card/editor. Editor copy uses the current draft without saving. Blocked clipboard offers manual copy.
- Review briefing shows exact copied text and optional missing-template hints. It cannot validate correctness.
- Save four HTTP(S) deliverable URLs above the board. A link is not proof of completion.
- Open demo workspace uses separate storage keys and three synthetic examples per column. Return to your workspace without replacing real data.

## Data and limits
Data lives in this browser/origin's localStorage. It does not synchronise or create backups; clearing browser data removes it. Save errors remain visible. Invalid stored data is preserved, not silently reset. If it cannot be read, export the original key using browser developer tools before deliberately removing/resetting it. Cross-tab writes are blocked if a newer saved version is detected; reload before continuing.

Date-only deadlines end at 23:59:59.999 in the local timezone. More than 48h is calm; 24–48h is Due soon; under 24h is warning; overdue begins after the selected day; Done is neutral. Text labels accompany colours.

No authentication, backend, AI integration, GitHub integration, real-time collaboration, multi-team support or automatic milestone completion. Prototype checks are not a full WCAG conformance or user-study claim. Current dependency audit findings still require separate review; do not run forced major upgrades blindly.

## Milestone checkpoints
Each completed code stage has its exact live portal marker in its commit message and as a Git tag. Markers may differ from the original starter README.

| Stage | Marker |
|---|---|
| M1 | git-linked |
| M2 | prd-done (requirements documented after updated class instruction) |
| M3 | design-done |
| M4 | data-model |
| M5 | crud-modal |
| M6 | tag-style |
| M7 | task-owner |
| M8 | due-tint |
| M9 | task-context |
| M10 | copy-context |
| M11 | project-deliverables |
| M12 | secret-sauce |
| M13 | pitch-done (reserved; local demo prepared, public deployment check pending) |

M1's correct pushed commit was not recognised at the last supplied portal observation. No webhook is configured, following the student's choice. Current portal recognition has not been rechecked. Do not rewrite historical tags to hide fixes; later commits document corrections.

## Deployment and demo
The student has created a Vercel account; importing/deploying the app is still pending. Choose GitHub under Import Git Repository, then import Bromlj/vibecoding-project-tracker. Use the Vite preset, repository root `./`, build `npm run build`, and output `dist`. There are no environment variables or database requirements. Use the free Hobby option for this personal coursework prototype; no paid trial or add-on is required. See [Vercel Git deployment guidance](https://vercel.com/docs/git) and [Hobby plan](https://vercel.com/docs/plans/hobby).

Test the resulting production URL in a private browser window without Vercel login or app registration. The lecturer's hackathon portal is separate. Browser storage on the new hosted origin starts separately from localhost; hosting does not add shared storage.

The student's latest class clarification is that there is no formal presentation; at most an informal 30-second app demonstration if requested. Rehearsal is not a delivery prerequisite. See [DEMO.md](DEMO.md) for the optional walkthrough.

## CM6312 working fork
Working repository: https://github.com/Bromlj/vibecoding-project-tracker
