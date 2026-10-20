# Tool inventory
| Tool | Role | Reason / limits |
|---|---|---|
| React 18 | Runtime UI library | Supplied scaffold; components/local state, not a backend. |
| Vite 5 | Dev server/build tool | Supplied scaffold. |
| Tailwind CSS 3 | Build-time styling | Shared tokens/responsive/focus utilities. |
| Browser localStorage | Local persistence | Supplied PRD choice; browser/origin specific, no database or shared access. |
| Browser Clipboard API | User-triggered copy | Secure context; rejection offers manual copy. No AI API. |
| Browser SpeechSynthesis API | Optional user-started page/briefing reading | Browser-reported local voices only; pause/resume/stop, device availability fallback. No new dependency, microphone or AI service. Human audible-output evaluation pending. |
| Native dialog/forms | Editing/input | Browser semantics without a UI library. |
| Node.js/npm | Development/dependencies | Reproduce using npm ci and package-lock.json. |
| Git/GitHub | Version history/remote fork | Exact milestone marker in commit message and Git tag. No webhook. |
| Supabase JS 2.118 / PostgreSQL / Auth | Optional shared persistence and provider sign-in | Code/schema prepared; live schema/provider configuration and verification pending. |
| axe-core / Playwright 4.14 integration | Development accessibility scans | 24 design-checkpoint scans plus five navigation/reading states in each of three browsers; automatic rules do not certify accessibility. |
| Node test runner | Development checks | 21 data/date/context/navigation/speech-chunk tests; not shipped. |
| Playwright (bundled environment) | Development checks | Browser smoke tests/screenshots; not an app dependency. |
| Codex | Development assistance | Student reviews/explains the implementation; assessment AI declaration remains required. |

Vercel is the student's selected hosting platform and an account has been created. No deployed tracker URL has yet been verified. Import the existing GitHub fork as Vite; build npm run build, output dist, root ./; local/demo mode needs no environment variables, optional shared mode uses only the public configuration from CLOUD_SETUP.md. Local/demo mode needs no hosted database. Optional shared mode uses the selected free Supabase project; no external font service or automatic AI integration is used. Existing audit findings need a separate dependency review; no forced major upgrades here.

The Impeccable design workflow assisted reference adaptation, an independent finish review and documentation. Its context loader/design detector were unavailable; no detector pass is claimed. Its private metadata is excluded from Git. All implementation/evidence still requires student review and accurate AI-use disclosure.
