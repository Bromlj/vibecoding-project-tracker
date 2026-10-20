# Vibecoding Project Tracker

A local-first Kanban workspace for AI-assisted development. Track tasks, keep curated prompts/outcomes, copy a briefing to another tool, and pin deliverable links.

**20 October design checkpoint:** Projects home, sidebar/mobile navigation, compact board/anchors, protected Details/AI context editor, exact briefing review, team management and visible appearance/accessibility settings now follow the supplied design reference. See [design decisions and verified checks](DESIGN_REVIEW.md), [design system](DESIGN.md) and [workflow](WORKSPACE_WORKFLOW.md).

## Run
Requires Node.js 20.19+ (this build checked with Node 24) and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Open the URL printed by Vite. Local/demo mode requires no accounts, environment variables or database setup. Optional shared access is prepared separately in [CLOUD_SETUP.md](CLOUD_SETUP.md). React 18, Vite 5 and Tailwind 3 are retained from the supplied starter. See [TOOLS.md](TOOLS.md), [DESIGN.md](DESIGN.md) and [REQUIREMENTS.md](REQUIREMENTS.md). Detailed acceptance points are in [CHECKLIST.md](CHECKLIST.md); current coverage and known gaps are in [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

Requirements are separated for navigation: [functional](FUNCTIONAL_REQUIREMENTS.md), [non-functional](NON_FUNCTIONAL_REQUIREMENTS.md), and [data with dictionary](DATA_REQUIREMENTS.md). The shared source/scope record stays in REQUIREMENTS.md.

## Use
- Set up your workspace and first project, then open a board from Projects. Create additional projects from New project.
- Add task or select a task title. Details holds type/status/owner/date; AI context holds useful prompts, actual outcomes, errors and next steps. Tab changes preserve the draft.
- Save explicitly. Status moves the task through To Do, In Progress, Review and Done. Hand off to assigns a real roster member or Unassigned.
- Copy context uses the saved card or the current editor draft. Review briefing shows the exact output; neither action saves or calls AI. Blocked clipboard access offers selectable text.
- Team manages names and optional email/GitHub/GitLab metadata. Contact details alone do not connect accounts or invite people.
- Project Milestones records achievement criteria; four deliverable links remain above each board. Neither a saved link nor a task count automatically marks a milestone reached.
- Appearance & settings includes palette preview, accessibility preferences and backup download/restore. Accessibility is also reachable before setup.
- Explore demo opens separate synthetic examples without replacing your local work. On mobile choose a stage or View all stages.

## Data and limits
Local data lives in this browser/origin's localStorage. Download a workspace backup before changing origin or clearing browser data; validated restore is explicit. Saving errors retain drafts and previous saved data. Invalid records are preserved with recovery download. Stale writes from another tab are blocked.

Date-only deadlines end at 23:59:59.999 in the local timezone. More than 48h is calm; 24–48h is Due soon; under 24h is warning; overdue begins after the selected day; Done is neutral. Text labels accompany colours.

Optional authentication/database code needs live Supabase configuration before shared use. There is no automatic AI execution, repository integration, real-time push collaboration, simultaneous multi-team administration or automatic milestone completion. Prototype checks are not a full WCAG conformance or user-study claim. Current dependency audit findings still require separate review; do not run forced major upgrades blindly.

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
The student has created a Vercel account; importing/deploying the app is still pending. Choose GitHub under Import Git Repository, then import Bromlj/vibecoding-project-tracker. Use the Vite preset, repository root `./`, build `npm run build`, and output `dist`. Local/demo-only hosting needs no environment variables. Shared sign-in uses the public variables and live configuration described in CLOUD_SETUP.md; server secrets must never enter the frontend. Use the free Hobby option for this personal coursework prototype; no paid trial or add-on is required. See [Vercel Git deployment guidance](https://vercel.com/docs/git) and [Hobby plan](https://vercel.com/docs/plans/hobby).

Test the resulting production URL in a private browser window without Vercel login or app registration. The lecturer's hackathon portal is separate. Browser storage on the new hosted origin starts separately from localhost; hosting does not add shared storage.

The student's latest class clarification is that there is no formal presentation; at most an informal 30-second app demonstration if requested. Rehearsal is not a delivery prerequisite. See [DEMO.md](DEMO.md) for the optional walkthrough.

## CM6312 working fork
Working repository: https://github.com/Bromlj/vibecoding-project-tracker
