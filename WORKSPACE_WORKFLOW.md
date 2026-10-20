# Workspace workflow — implementation checkpoint

20 October 2026. This extends the original hackathon board to cover the supplied client-discussion requirements. Original milestone commits/tags are preserved. These are engineering notes, not assessed report prose.

## Screens and workflow

1. **First-use setup:** name the workspace, name the first project, and add your own name with optional email/GitHub/GitLab usernames. No placeholder team is imposed on fresh work.
2. **Board:** create/edit tasks; assign a member or leave unassigned; change status; retain due date/context/tool; review/copy a draft or saved task. Search by title/description/context and filter by type/owner. Clear filters restores all tasks.
3. **Project management:** create, rename and switch boards. Each project keeps separate tasks, deliverable URLs and milestones. Names are required and unique after trimming/ignoring case.
4. **Members:** add/edit/remove names and optional contact/profile metadata. Stable member IDs preserve assignments after renaming. Removal explains how many tasks will become unassigned and updates all boards atomically. Profile links open only on user action. Metadata entry does not create accounts or send invitations.
5. **Milestones:** add/edit an achievement criterion and optional date; explicitly mark Reached or return to Pending. The reached timestamp is recorded/cleared accordingly. Delete requires confirmation. Task counts/links do not mark achievements automatically.
6. **Workspace settings:** rename the workspace, choose one of three prevalidated type palettes, or restore the default. Type labels/icons remain and deadline urgency is independent.
7. **Accessibility settings:** browser-specific Standard/Large/Extra large text, higher contrast, reduced motion and reduced modal effects, with reset and explicit save. Keyboard/semantic support stays enabled regardless of preferences. No decorative blur is introduced. Browser zoom/device preferences remain available.

## Data and recovery

Versioned workspace snapshot: `vibetracker.workspace.v2`; separate demo: `vibetracker.demo.workspace.v2`. Task ownership is an optional stable `assigneeId`; names are resolved for display/copy. Projects contain task/anchor/milestone arrays. Browser preferences use `vibetracker.accessibility` separately from team settings.

Legacy task/anchor arrays are validated and imported without deleting their original keys. Existing deliberately empty boards remain empty. Fresh work begins with setup; demo examples are separate. Unsupported/corrupt state is preserved and a recovery download is offered.

Saving validates and writes the entire candidate before replacing saved React state. Failed saves keep the editor/draft; retry is explicit. Failed deletion keeps the task on the board. Context freshness is committed only with the successful write. Other-tab changes block stale writes. The full pasted context remains in a draft even above the 30,000-character save limit; an explanation asks for shortening instead of silent clipping. Exact and relative saved timestamps are visible.

## Actual checks at this checkpoint

13 Node tests pass, including migration, stable member references, board isolation and durable/conflicting writes. Chrome 155.0.8059.82 isolated developer scenarios pass for setup, task/draft review/reload, member editing, duplicate project rejection, board switching, link isolation, milestone state, saved preferences, rejected saves/deletions, long context/discard, search empty state, 320/768/1280 reflow with large text, modal keyboard boundaries and corrupt-data preservation. Private scripts/results/screenshots are retained outside this repository.

Visual inspection identified stale success text after an injected failure and excessive narrow-screen anchor height; success feedback is now suppressed while a save error is present and anchors use two compact columns on narrow screens. Confirmation checks follow in the final regression pass. This is developer testing with synthetic data, not participant research or full accessibility conformance.

## Shared accounts

Local workspace workflows are implemented. The next checkpoint prepares Supabase authentication, shared database persistence, membership policies and explicit sharing. It requires a configured free Supabase project and provider settings before live verification. Hosting is deferred by the student. No local member record is described as an authenticated collaborator.
