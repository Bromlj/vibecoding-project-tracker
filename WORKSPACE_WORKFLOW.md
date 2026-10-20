# Workspace workflow — implementation checkpoint

20 October 2026. This extends the original hackathon board to cover the supplied client-discussion requirements. Original milestone commits/tags are preserved. These are engineering notes, not assessed report prose.

## Screens and workflow

1. **First-use setup:** name the workspace, name the first project, and add your own name with optional email/GitHub/GitLab usernames. No placeholder team is imposed on fresh work.
2. **Projects home:** open, create and edit projects; see actual task/milestone counts and the next pending milestone. Desktop sidebar and mobile Menu lead to Projects, Team and Appearance & settings.
3. **Board:** create/edit tasks; assign a member or leave unassigned; change status; retain due date/context/tool; review/copy a draft or saved task. Details/AI context tabs retain one draft and show its task identity. Mobile Stage selection/View all avoids traversing every stage by default. Search by title/description/context and filter by type/owner. Clear filters restores all tasks.
4. **Project management:** create, rename and switch boards. Each project keeps separate tasks, deliverable URLs and milestones. Names are required and unique after trimming/ignoring case.
5. **Team:** add/edit/remove names and optional contact/profile metadata. Stable member IDs preserve assignments after renaming. Removal explains how many tasks will become unassigned and updates all boards atomically. Profile links open only on user action. Metadata entry does not create accounts or send invitations.
6. **Milestones:** add/edit an achievement criterion and optional date; explicitly mark Reached or return to Pending. The reached timestamp is recorded/cleared accordingly. Delete requires confirmation. Task counts/links do not mark achievements automatically.
7. **Appearance & settings:** rename the workspace, choose one of three prevalidated type palettes, or restore the default. Type labels/icons remain and deadline urgency is independent.
8. **Accessibility settings:** browser-specific Standard/Large/Extra large text, higher contrast, reduced motion and reduced modal effects, with reset and explicit save. Keyboard/semantic support stays enabled regardless of preferences. No decorative blur is introduced. Browser zoom/device preferences remain available.

## Data and recovery

Versioned workspace snapshot: `vibetracker.workspace.v2`; separate demo: `vibetracker.demo.workspace.v2`. Task ownership is an optional stable `assigneeId`; names are resolved for display/copy. Projects contain task/anchor/milestone arrays. Browser preferences use `vibetracker.accessibility` separately from team settings.

Legacy task/anchor arrays are validated and imported without deleting their original keys. Existing deliberately empty boards remain empty. Fresh work begins with setup; demo examples are separate. Unsupported/corrupt state is preserved and a recovery download is offered.

Saving validates and writes the entire candidate before replacing saved React state. Failed saves keep the editor/draft; retry is explicit. Failed deletion keeps the task on the board. Context freshness is committed only with the successful write. Other-tab changes block stale writes. The full pasted context remains in a draft even above the 30,000-character save limit; an explanation asks for shortening instead of silent clipping. Exact and relative saved timestamps are visible.

## Actual checks at the design checkpoint

18 Node tests, production build and 14 scenario groups each in Chrome 155.0.8059.82, Edge 155.0.4283.45 and Firefox 153.0 pass. Twenty-four axe screen/state scans returned zero violations. Nine additional scripted groups cover draft clipboard equality, tab/focus/validation, backup restore, mobile navigation/stages, landscape keyboard, clipboard denial, image semantics and stale-tab protection. Reflow checks pass at 320/768/1280, including 200% CSS text sizing after wrapping corrections.

See [DESIGN_REVIEW.md](DESIGN_REVIEW.md) for scope, limitations, source rationale and evidence index. These are synthetic developer checks, not participant research, screen-reader testing or full accessibility conformance.

## Shared accounts

Optional Supabase authentication, revision-checked shared persistence and membership policies are prepared. Local PostgreSQL tests exercised the schema with synthetic auth stand-ins; the last live probe found missing tracker tables and disabled social providers. Configuration and live sign-in/shared round trips remain pending. See CLOUD_SETUP.md. No local member record is described as an authenticated collaborator.
