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
| M13 | pitch-done (reserved; deployment and student rehearsal still pending) |

M1's correct pushed commit has not yet been recognised by the portal. No webhook is configured. Do not rewrite historical tags to hide fixes; later commits document corrections.

## Deployment and demo
Import this fork into Vercel as a Vite project. Build: `npm run build`; output: `dist`. There are no secrets/environment variables. Test the resulting public URL without registration. Deployment is pending; the lecturer's hackathon portal is separate.

See [DEMO.md](DEMO.md) for the demonstration walkthrough and remaining live-pitch steps.

## CM6312 working fork
Working repository: https://github.com/Bromlj/vibecoding-project-tracker
