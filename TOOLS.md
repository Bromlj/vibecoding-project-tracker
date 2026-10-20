# Tool inventory
| Tool | Role | Reason / limits |
|---|---|---|
| React 18 | Runtime UI library | Supplied scaffold; components/local state, not a backend. |
| Vite 5 | Dev server/build tool | Supplied scaffold. |
| Tailwind CSS 3 | Build-time styling | Shared tokens/responsive/focus utilities. |
| Browser localStorage | Local persistence | Supplied PRD choice; browser/origin specific, no database or shared access. |
| Browser Clipboard API | User-triggered copy | Secure context; rejection offers manual copy. No AI API. |
| Native dialog/forms | Editing/input | Browser semantics without a UI library. |
| Node.js/npm | Development/dependencies | Reproduce using npm ci and package-lock.json. |
| Git/GitHub | Version history/remote fork | Exact milestone marker in commit message and Git tag. No webhook. |
| Node test runner | Development checks | Data/date/context regression tests; not shipped. |
| Playwright (bundled environment) | Development checks | Browser smoke tests/screenshots; not an app dependency. |
| Codex | Development assistance | Student reviews/explains the implementation; assessment AI declaration remains required. |

Vercel is the suggested hosting platform, not an already deployed service. No hosted database, font service, paid API or AI integration is required. Existing audit findings need a separate dependency review; no forced major upgrades here.
