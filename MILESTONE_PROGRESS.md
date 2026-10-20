# M1–M13 current progress — 20 October 2026

The student reports fixing the webhook and explicitly requested fresh commits, including empty progress commits, to replay completed stages. Each marker is included verbatim in a commit message and pushed individually. Existing M1–M12 Git tags stay on their original checkpoint commits; a new `pitch-done` tag records the prepared local demo. These are progress notifications, not thirteen newly implemented versions or evidence that the leaderboard accepted them.

| Stage | Exact marker | Completed local work / boundary |
|---|---|---|
| M1 | git-linked | Fork connected and original commit/tag pushed. Webhook repair reported by the student; no webhook changes made in this pass. |
| M2 | prd-done | PRD and functional, non-functional and data requirements in the repository; separate named documents and navigation commits exist. |
| M3 | design-done | Documented typography, surfaces, components, interactions and rationale; now stronger colours and Light/Dark/System. |
| M4 | data-model | Persistent task model and four Kanban columns; multiple projects retain separate tasks/links/milestones. |
| M5 | crud-modal | Task create/edit/delete, draft protection, validation, durable saves and failure recovery. |
| M6 | tag-style | Feature/Bug labels, icons and independent selectable category palettes. |
| M7 | task-owner | Editable roster, stable assignments, owner badges and handoff. Contact/profile fields do not connect an account. |
| M8 | due-tint | Automatic date-based whole-card Now/Next/Done colours, alternative palettes and written/border cues. |
| M9 | task-context | Editable prompt/outcome/context template, optional tool, saved freshness metadata. |
| M10 | copy-context | Saved-card/current-draft copying, pending feedback and manual fallback; no automatic AI transmission. |
| M11 | project-deliverables | Four persistent URL slots above each board; safe explicit opening and labelled presence. |
| M12 | secret-sauce | Attempts & lessons timeline: retain successive prompts, tools, outcomes and lessons; select useful attempts for the next briefing. Review remains a supporting interaction. |
| M13 | pitch-done | Populated StudySprint team example with 12 tasks, three fictional members, three milestones, working sample deliverable links, attributed attempts and handovers; existing practice project retained. Eight-step guide and optional short walkthrough. No formal presentation or rehearsal required by the student's clarification. |

M13 means the local demonstration is prepared; it does not claim a delivered speech or deployed site. Public Vercel hosting, live Supabase schema/provider configuration and real-account checks remain the next release phase. See RELEASE_READINESS.md for verification and limits. Milestone records do not establish coursework completion or award marks.
