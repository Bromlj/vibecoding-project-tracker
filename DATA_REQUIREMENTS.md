# Data requirements — report-aligned specification

Original report-ID reconciliation: 23 October 2026. DR-08 identifies milestone data and DR-09 deliverable links. Follow-up DR-07 implementation correction: 25 October 2026. New task saves now record a full creation instant; older date-only records are kept intact. The original identifier remapping was documentation-only; the follow-up adds an optional task field without changing workspace schemaVersion 2 or storage keys. The original validation limits/dictionary remain in docs/history/2026-10-20/DATA_REQUIREMENTS.md and Git history. The 27 October DR-14 addendum documents the existing frontend-only login; it changes no runtime code or storage schema.

| ID | Required data and source | MVP | Current implementation / meaning |
|---|---|---|---|
| DR-01 | Generate immutable task IDs. | Yes | App-generated UUIDs; explicitly synthetic IDs in examples. |
| DR-02 | Store required titles, optional descriptions/dates and selected type/status. | Yes | Title 1–160; description up to 4,000; Feature/Bug and four stages; date or null. |
| DR-03 | Store project names/descriptions with generated IDs. | Yes | Board ID and unique name; separate nested tasks, links and milestones. |
| DR-04 | Store generated member IDs, names and optional email/GitHub/GitLab details. | Yes | Manual roster metadata; stable assignments or null, not authenticated identity. |
| DR-05 | Retain user-entered context, prompts and outcomes as plain text. | Yes | Current context up to 30,000 saved characters; over-limit drafts are not silently truncated. |
| DR-06 | Retain optional AI-tool labels, never provider credentials. | Yes | Enum/null records association, not API access. |
| DR-07 | Generate task-creation timestamps and timestamps for successfully saved context. | Yes | New tasks save ISO `createdAt` plus local `createdDate`; pre-existing tasks may only have the date. `contextUpdatedAt` records successful context/selected-briefing saves, or null before the first such save. |
| DR-08 | Store milestone IDs, titles, criteria, optional dates, states and reached timestamps. | Yes | Formerly DR-09. Pending has null reachedAt; Reached records an app timestamp. |
| DR-09 | Retain user-entered HTTP(S) links for four fixed deliverable slots. | No; required milestone | Formerly DR-08. Presentation/Demo/Report/Documentation; nullable safe URLs; presence is derived, not completion. |
| DR-10 | Retain selected workspace palette identifiers. | No | Workspace palette/cardPalette IDs; browser preferences remain separate. |
| DR-11 | Retain browser accessibility preferences; obtain voices from the device. | No | Theme/colour vision/text/contrast/motion/effects/shortcuts; voice/rate choices are transient. |
| DR-12 | Keep authored guidance and fictional practice records separate from real work. | No | Bundled guide and separate demo snapshot; no research answers, analytics or automatic learning-completion record. |
| DR-13 | Retain attempt IDs, prompts/results/outcomes/lessons, optional tools/authors, briefing selections and timestamps. | No | Up to 50 editable records; self-reported authors/outcomes; selected-only serialization. |
| DR-14 | Use authored example account IDs, names and emails, with a transient selected preview identity; do not persist or transmit entered sample passwords. | Yes for the simulated team-entry journey | Bundled fictional accounts are demonstration data, not authenticated users. Preview identity is held in React state and clears on sign-out or reload. Entered sample passwords are transient form input, not credentials retained in workspace data or backups. |

## Persistence and validation

Workspace data uses vibetracker.workspace.v2; examples use vibetracker.demo.workspace.v2; preferences use vibetracker.accessibility. Legacy arrays can be validated/migrated without deleting their source. Invalid/unsupported data is retained for recovery. Backup/restore uses the validated workspace snapshot. Clearing browser/origin storage can remove local records; no automatic cross-device synchronisation is implied.

Task.contextTool accepts Claude, ChatGPT, Codex, Cursor, Lovable, Replit, Other or null. Task.assigneeId references an existing member or is null. Each board retains its own four link slots and milestones. Generated clocks are not trusted external audit times. The optional task `createdAt` field was added on 25 October 2026 for newly created records, retaining older `createdDate`-only backups without fabricating historical times.

Attempts require a non-blank prompt (up to 12,000 characters), outcome (4,000), lesson (2,000), result worked/partial/failed and includeInBrief boolean; tool is nullable and author is optional up to 100 characters. IDs and createdAt/updatedAt persist. Existing tasks without attempts remain valid. Records are editable, not append-only audit evidence. User outcomes and fictional demonstration records are never represented as validated research.

## Frontend login boundary

DR-14 supports FR-27. The sample password `demo-only` is publicly displayed and cannot protect data. The preview neither authenticates an account nor changes roster assignments, access permissions or connected devices. The real Shared access integration is separate and remains dependent on service configuration. Actions run 40512554461 records example validation, two preview identities, sign-out, reload clearing, guest bypass and no request/localStorage change during sign-in. This is a frontend interaction check, not a security test.

The feature-level report now has 54 identifiers: 27 FRs, 13 NFRs and 14 DRs. Original identifiers remain unchanged. Optional shared-service validation is prepared separately; live schema/provider activation and real-account verification remain deferred. No schema change or SQL execution accompanies this revision.
