# Vibecoding Project Tracker

A local-first Kanban workspace for AI-assisted development. Track tasks, keep curated prompts/outcomes, copy a briefing to another tool, and pin deliverable links.

**20 October deployed prototype checkpoint:** the browser-local workspace and guided demo are publicly accessible. See [current coverage and verification limits](CURRENT_ACCEPTANCE.md), [supporting developer evidence](EVIDENCE.md), [teaching considerations](TEACHING_APPLICATION.md), [design system](DESIGN.md) and [workflow](WORKSPACE_WORKFLOW.md).

## Run
Requires Node.js 22.12+ (this build checked with Node 24) and npm.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Open the URL printed by Vite. Local/demo mode requires no accounts, environment variables or database setup. Optional shared access is prepared separately in [CLOUD_SETUP.md](CLOUD_SETUP.md). React 18 is retained; Vite 8.3.4 and Tailwind 4.3.3 replace the starter build tools following dependency review. See [TOOLS.md](TOOLS.md), [DESIGN.md](DESIGN.md) and [REQUIREMENTS.md](REQUIREMENTS.md). Detailed acceptance points are in [CHECKLIST.md](CHECKLIST.md); [RELEASE_READINESS.md](RELEASE_READINESS.md) supersedes the historical gap audit.

Requirements are separated for navigation: [functional](FUNCTIONAL_REQUIREMENTS.md), [non-functional](NON_FUNCTIONAL_REQUIREMENTS.md), and [data with dictionary](DATA_REQUIREMENTS.md). The shared source/scope record stays in REQUIREMENTS.md.

## Use
- Set up your workspace and first project, then open a board from Projects. Create additional projects from New project.
- Add task or select a task title. Details holds type/status/owner/date; AI context holds useful prompts, actual outcomes, errors and next steps. Tab changes preserve the draft.
- Save explicitly. Status moves the task through To Do, In Progress, Review and Done. Hand off to assigns a real roster member or Unassigned.
- Copy context uses the saved card or the current editor draft. Review briefing shows the exact output; neither action saves or calls AI. Blocked clipboard access offers selectable text.
- Team manages names and optional email/GitHub/GitLab metadata. Contact details alone do not connect accounts or invite people.
- Project Milestones records achievement criteria; four deliverable links remain above each board. Neither a saved link nor a task count automatically marks a milestone reached.
- Appearance & settings previews changes immediately: Light/Dark/System, text size, contrast, effects and palettes. Save keeps changes; Cancel restores saved values. Colour vision support in Accessibility overrides both task badges and whole-card colours for your browser, with blue/amber/neutral grey or monochrome plus labels/borders. Cards and controls have stronger boundaries. Accessibility is also reachable before setup; backup/restore remains in settings.
- Navigation & reading provides direct section buttons, a shortcut guide and optional device-voice reading. Enable single-key shortcuts to use P for Projects, B for Board, T for Team, N for a new task and F for search. They stay inactive while typing or in dialogs. [Full access guide and verification](ACCESSIBILITY_NAVIGATION.md).
- Read briefing aloud is available in AI context and Review briefing, with pause/resume/stop. It uses available local device voices and does not save the task.
- How to use explains the full workflow. Explore demo opens an eight-step practice guide and separate synthetic examples. Hide/show the guide or confirm Reset demo practice to restore only example data. Back to my workspace returns to your own work. On mobile choose a stage or View all stages.

## Data and limits
Local data lives in this browser/origin's localStorage. Download a workspace backup before changing origin or clearing browser data; validated restore is explicit. Saving errors retain drafts and previous saved data. Invalid records are preserved with recovery download. Stale writes from another tab are blocked.

Date-only deadlines end at 23:59:59.999 in the local timezone. Overdue tasks use a distinct alarm fill (red by default); tasks due within 48 hours use a warning fill (amber), with a specific within-24-hours label. More than 48 hours is calm; undated tasks and completed tasks are neutral. Done overrides overdue status. Completion is neutral grey in every palette; labels, type badges, icons and solid/dashed/double borders remain. Blue/amber/grey and monochrome alternatives are available. Appearance follows the device by default, or a saved Light/Dark choice.

Optional authentication/database code needs live Supabase configuration before shared use. There is no automatic AI execution, repository integration, real-time push collaboration, simultaneous multi-team administration or automatic milestone completion. Prototype checks are not a full WCAG conformance or user-study claim. The reviewed lockfile reports zero npm audit advisories as of 20 October 2026; continue checking dependencies when maintaining the tool.

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
| M13 | pitch-done (public populated demo and access verified) |

The student reports that the webhook is now configured. Fresh marker commits replay the completed M1–M13 progress after that repair, with each marker pushed individually. Existing M1–M12 tags remain on their original checkpoints; pitch-done identifies the prepared local demo. Portal recognition has not been independently verified. See [current milestone record](MILESTONE_PROGRESS.md).

## Deployment and demo
The prototype is deployed at https://vibecoding-project-tracker-umber.vercel.app/. The deployment uses the GitHub fork Bromlj/vibecoding-project-tracker, Vite preset, repository root `./`, build `npm run build`, and output `dist`. Local/demo-only hosting needs no environment variables. Shared sign-in uses the public variables and live configuration described in CLOUD_SETUP.md; server secrets must never enter the frontend. Use the free Hobby option for this personal coursework prototype; no paid trial or add-on is required. See [Vercel Git deployment guidance](https://vercel.com/docs/git) and [Hobby plan](https://vercel.com/docs/plans/hobby).

Public access was verified in a fresh browser without Vercel login or app registration on 20 October 2026; recheck before submission. The lecturer's hackathon portal is separate. Browser storage on the new hosted origin starts separately from localhost; hosting does not add shared storage.

The student's latest class clarification is that there is no formal presentation; at most an informal 30-second app demonstration if requested. Rehearsal is not a delivery prerequisite. See [DEMO.md](DEMO.md) for the optional walkthrough.

## CM6312 working fork
Working repository: https://github.com/Bromlj/vibecoding-project-tracker

## Team example and Attempts & lessons
Open `?demo=1` and choose **Open team example** (or **Add team example project** for an existing demo). Open **Build accessible study timer → Attempts & lessons** to see three approaches attributed to fictional teammates. Record an attempt, choose which lessons to copy, and hand off the task from Details. The example includes working sample links and project milestones. There is no demo member switcher or simulated login. See [PROTOTYPE_DEMO.md](PROTOTYPE_DEMO.md).

## Live prototype

[Open the app](https://vibecoding-project-tracker-umber.vercel.app/) or [open the populated demo](https://vibecoding-project-tracker-umber.vercel.app/?demo=1). Public access and core demo interactions verified on 20 October 2026; see RELEASE_READINESS.md. Local records remain browser-specific; live shared accounts are deferred.
