# Tool inventory
| Tool | Role | Reason / limits |
|---|---|---|
| React 18 | Runtime UI library | Supplied scaffold; components/local state, not a backend. |
| Vite 8.3.4 + React plugin 6.1.2 | Dev server/build tool | Updated from starter Vite 5 after advisory review; production build and browser flows rechecked. |
| Tailwind CSS 4.3.3 + Vite plugin | Build-time styling | Keeps existing JS design tokens via @config; responsive/focus utilities. Replaces old PostCSS/autoprefixer setup; rendered layouts rechecked. |
| Browser localStorage | Local persistence | Supplied PRD choice; browser/origin specific, no database or shared access. |
| Browser Clipboard API | User-triggered copy | Secure context; rejection offers manual copy. No AI API. |
| Browser SpeechSynthesis API | Optional user-started page/briefing reading | Browser-reported local voices only; pause/resume/stop, device availability fallback. No new dependency, microphone or AI service. Human audible-output evaluation pending. |
| Native dialog/forms | Editing/input | Browser semantics without a UI library. |
| Node.js/npm | Development/dependencies | Reproduce using npm ci and package-lock.json. |
| Git/GitHub | Version history/remote fork | Exact milestone marker in commit message and Git tag. Student reports webhook configured; progress markers replayed without moving historical tags. |
| Supabase JS 2.118 / PostgreSQL / Auth | Optional shared persistence and provider sign-in | Code/schema prepared; live schema/provider configuration and verification pending. |
| axe-core / Playwright 4.14 integration | Development accessibility scans | 24 design-checkpoint scans plus five navigation/reading states in each of three browsers; automatic rules do not certify accessibility. |
| Node test runner | Development checks | 28 tests in the latest recorded suite, including attempts and example-project validation; not shipped. |
| Playwright (bundled environment) | Development checks | Browser smoke tests/screenshots; not an app dependency. |
| Codex | Development assistance | Student reviews/explains the implementation; assessment AI declaration remains required. |

Vercel hosts the public prototype at https://vibecoding-project-tracker-umber.vercel.app/. Registration-free access and the demo workflow were verified on 20 October 2026; see CURRENT_ACCEPTANCE.md. Import the existing GitHub fork as Vite; build npm run build, output dist, root ./; use Node 24. Local/demo mode needs no environment variables; shared mode uses only the public configuration from CLOUD_SETUP.md. Local/demo mode needs no hosted database. Prepared shared-mode code targets the selected Supabase project but live activation is deferred; no external font service or automatic AI integration is used. The reviewed dependency migration reduced npm audit from nine advisories to zero on 20 October 2026. See RELEASE_READINESS.md for the test boundaries.

The Impeccable design workflow assisted reference adaptation, an independent finish review and documentation. Its context loader/design detector were unavailable; no detector pass is claimed. Its private metadata is excluded from Git. All implementation/evidence still requires student review and accurate AI-use disclosure.
