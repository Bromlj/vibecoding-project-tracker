# Product readiness evidence history — 20 October 2026

**Current record:** public prototype hosting/access is verified; the latest recorded suite has 28 tests. M12 is Attempts & lessons. M8 remains a documented specification variance. See [CURRENT_ACCEPTANCE.md](CURRENT_ACCEPTANCE.md). The sections below are dated development checkpoints, retained chronologically; earlier “pending”, 23-test, neutral-Done or Review-only statements are historical, not current status.

Engineering evidence, not assessed report prose. This record supersedes the runtime gap statuses in the historical b685ad7 audit in IMPLEMENTATION_STATUS.md. Source history and milestone tags remain intact.

**Ready for local use and the student's walkthrough:** one team with multiple projects, editable member records, task CRUD/handoff/stages, saved prompt/tool/outcome context, exact briefing review/copy, project milestones, deliverable links, search/filtering, palette/accessibility preferences, backup/restore and protected saving. The demo now includes an eight-step guide using the real controls, a full How to use page, and a confirmed reset confined to demo data.

**Separate next phase:** live Supabase schema/provider setup, real multi-account verification, Vercel deployment and public assessor-access check. The connected Supabase project's public/private application schemas were checked read-only and contain no tracker tables. No cloud schema, provider setting, webhook or production deployment was changed by this local product pass. The student separately reports repairing the webhook. Member email/GitHub/GitLab fields are contact metadata until real shared sign-in is configured.

## Historical local-release checkpoint decisions

| Change | Reason and limits | Traceability |
|---|---|---|
| Discoverable How to use page, available before setup | Gives a complete workflow without requiring recall of a demonstration. Eight focused steps lead to real views/editors; no decorative action controls. | FR-23; C09-08–13, C15-06 |
| Guided demo with explicit checks, hide/show and protected reset | Supports practice without replacing a real workspace. Step navigation is instructional, not an automatic assessment of completion. Progress is transient and resets on reload. | FR-13/23; C03-13 |
| Concrete synthetic prompt and outcome example | Shows how to record both parts. It explicitly describes practice content; it is not presented as an actual AI run, client answer or usability result. | FR-09; C01-10 |
| Same-name members disambiguated consistently | Optional contact data distinguishes people where possible; a stable ID distinguishes remaining duplicates. Assignments still store IDs, not names. | FR-06/18; C12-07/08 |
| Native date-input validity checked before task saving | Incomplete/out-of-range entries receive an explanation instead of silently becoming an undated task. Past valid dates remain accepted. | FR-02; C02-09/10 |
| Pending clipboard feedback and duplicate-click protection | Success appears only after the operation resolves. An unavailable/denied API keeps a full selectable briefing. Visible/accessible names agree while waiting. | FR-12; C04-08–11, C09-12 |
| Vite 8.3.4, React plugin 6.1.2 and Tailwind 4.3.3 | Replaces the starter's vulnerable build dependencies. Reviewed official migration guidance, kept React 18 and design tokens, used Tailwind's Vite integration and checked the rendered UI after migration. No forced audit fix. | NFR-12; TOOLS.md |
| Strong whole-card colours and independent type badges | Student requested visible red Now, amber Next and green Done. Done supersedes the earlier neutral-Done policy. Blue/amber/purple and greys are alternatives; text and solid/dashed/double borders remain. No manual-priority field is implied. | FR-14/15/20; DR-10 |
| Light/Dark/System appearance | Browser-specific setting, not imposed on teammates. System follows live device changes. Explicit save, compatible older preferences, dark native controls/dialogs and higher-contrast combinations. | NFR-05; DR-11 |
| Narrow enlarged-text wrapping correction in guide | First tests found long guide words could overflow at 320px/32px root text. Wrapping was corrected and all three browsers passed the recheck. | NFR-05; C08-16/17 |

The build now targets modern browsers supported by Vite/Tailwind 4. Use Node 22.12+ (Node 24 checked). Older browsers outside that toolchain baseline are not promised. Sources: [Vite migration](https://vite.dev/guide/migration), [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

## Historical local-release checkpoint coverage

The 199 CHECKLIST.md items remain a specification, not 199 asserted test passes. This table covers every checklist group. “Implemented” includes source inspection; the evidence column names the actual check scope. Research, assistive-technology and deployment checks remain explicit.

| Checklist group | Current implementation and evidence |
|---|---|
| C01-01–10: prompts/outcomes | Editable context and optional tool, incomplete/custom templates, visible limits, inert code/HTML. New browser checks preserve Unicode, whitespace and code through save/reload/copy. Demo contains a labelled synthetic prompt/tool/outcome. |
| C02-01–17: task editing | Stable IDs/dates, title validation, optional description/date, protected cancellation/deletion and explicit saving. Node and browser CRUD/failure/keyboard flows pass. Header Add task defaults Feature/To Do; an empty-column Add intentionally starts in that column. Native malformed-date handling plus application validation is implemented; not every browser's partial-date entry UI is exhaustively tested. |
| C03-01–13: saving/recovery | Versioned localStorage, clear browser-only status, success after durable save, retained drafts with retry, failed-delete protection, invalid-data recovery, stale-tab rejection and independent demo. Failure, reload, empty-board and reset-isolation checks pass. Browser-specific permission policies beyond the injected failure scenarios need separate verification. |
| C04-01–12: copying | Saved-card versus current-draft semantics, metadata/full context, independent copy, pending/success/error states and manual fallback. Exact preview/clipboard equality, delayed completion, denial and missing API checked. No automatic AI request. |
| C05-01–05: freshness | Exact/relative saved time; only successfully saved context or tool changes update it. Opening/copying/unrelated edits/cancellation/failure do not. Node and failed-save checks pass. |
| C06-01–12: deadlines | Local calendar dates, midnight boundary, complete 24/48h rules, neutral undated tasks and coloured Done override, independent task-type meaning, minute/visibility recalculation. Date tests now include leap/month/year and UK daylight-saving transition dates. |
| C07-01–10: links | Four independent project slots, editable/clearable safe HTTP(S), explained validation, explicit opening and textual link status. URL tests, project isolation, clearing and layout checks pass. Link presence never certifies completion. |
| C08-01–19: accessibility | Native labelled controls, focus management, colour-independent states, text alternatives, visible settings, optional shortcuts/read aloud and responsive layouts. Automated/keyboard/contrast/reflow checks pass within the scope below. Human screen-reader output, actual browser zoom, physical touch/switch/dictation and a complete manual conformance audit remain unverified. |
| C09-01–14: navigation/layout | Projects/Team/Settings hierarchy, board/milestones, task tabs, mobile stage selection, wrapping, empty states, explicit actions and loading feedback. Narrow/landscape/draft-resize checks pass. Status dropdown remains available; drag-and-drop is not required or implemented. Real-device reachability/accidental-tap evaluation remains pending. |
| C10-01–09: Review Brief | Saved and draft review, return to editing, direct copy, empty-context notice and advisory headings. Exact-output/no-save and keyboard-return checks pass. No assertion that a briefing is correct. |
| C11-01–13: multiple boards | Adopted by the student's later full-product request and implemented. Required unique names, stable IDs, clear selected board, separate tasks/anchors/milestones. Browser and schema checks pass. |
| C12-01–11: teammates | Editable names/optional contacts, validation, stable assignments, shared roster and Unassigned. Duplicate-name/duplicate-contact ID handling has a new Node test. Add/rename/handoff/removal code is implemented; roster metadata does not create an account. |
| C13-01–13: project milestones | Required title/criterion, optional date, stable ID, protected edit/delete, Pending/Reached with explicit timestamp. Node and browser create/reached/pending/isolation workflows pass. |
| C14-01–08: colours | Three type palettes plus three strong whole-card palettes, default/reset/save, labelled urgency and Light/Dark/System appearance. Palette tests and focused standard/high-contrast light/dark scans pass. No claim of a participant colour-perception study. |
| C15-01–06: finding/help | Task search, owner/type filters, stage view, active/reset controls, no-results states, context hints and How to use. Search/reset/mobile navigation checked. These are chosen improvements, not invented client quotes. |
| C16-01–15: evaluation | Current automated/browser/keyboard/performance evidence below. Fix/recheck evidence retained. Named human screen-reader test and representative-user completion/errors/help/feedback remain to be collected. Developer inspection is not participant research. |
| C17-01–12: delivery | FR/NFR/DR IDs, priorities, sources/data dictionary, component mapping, selected extensions, tool inventory and engineering rationale exist. Local interactions work without registration. Public URL/access verification, student's own report/coversheet/screenshots selection/references/AI declaration and final submission remain separate. |

## Historical local-release checkpoint verification

| Check | Result / exact boundary |
|---|---|
| Node tests | 23 passed: model/relationships, context, dates, URLs, cloud revision contract, public-key rules, shortcuts/speech chunking and duplicate member labels. |
| Production build | Pass: 88 modules; JS 469.02 kB / 132.48 kB gzip; CSS 39.42 kB / 8.82 kB gzip. Size is not a network load-time claim. |
| Dependency audit | Updated lockfile audit: zero reported vulnerabilities, 20 October 2026. Earlier scan reported nine (six high/three moderate). This is npm advisory coverage, not a security certification. |
| Main workflow | 14 scenario groups pass in Chrome 155.0.8059.82, Edge 155.0.4283.45 and Playwright Firefox 153.0. Includes setup, tasks, members, projects, links, milestones, settings, failed save/delete, long paste, invalid storage and reflow. |
| Guided workflow | Six groups and six automated accessibility scans pass in each browser: real controls, Unicode/code persistence, pending copy, guide reflow, protected reset and return to untouched local data. |
| Navigation/reading | Eight groups and five automated scans pass in each browser. Keyboard opt-in/suppression/direct navigation and local-voice lifecycle/fallback checked. Speech lifecycle uses a platform stand-in; no human audio verification. |
| Broader design audit | 24 automated screen/state scans return zero violations; nine additional workflow groups pass, including exact clipboard equality, backup/restore, cross-tab conflict, mobile/landscape and decorative-icon semantics. |
| Keyboard-only journey | Chrome: setup → task/context → review/manual copy → save → add member → handoff/status → milestone → links → protected deletion → empty-board reload. UI operated with keyboard events; deleted opener returns focus to the heading. No physical assistive device used. |
| Latest appearance pass | Focused Chrome 155 check: 11 screen/state scans, zero automated violations; Light/Dark persistence, System live changes, old preferences, palette persistence/reset and 320px layout pass. Light/dark board captures visually inspected. Earlier three-browser/broader checks predate this appearance patch; not repeated exhaustively at the student's request. |
| Performance | Synthetic 5 boards/100 tasks/10 members/36,584-byte snapshot; 1280×900; two warm-ups then 30 samples. p95 modal 41.4 ms, project opening 58.5 ms, save 51.0 ms; post-asset project restoration 113.8 ms. Meets chosen 200 ms/2 s targets on the recorded machine. Not INP, human completion time, a public-network result or a client SLA. |

Private reproducible scripts, JSON and screenshots are in the subject workspace's `Milestone evidence` folder. Key records: Release-{Chrome,Edge,Firefox}-guide-results.json, Mobility[-Edge/-Firefox]-results.json, Mobility-regression-{browser} results, Release-design-accessibility-results.json, Release-keyboard-results.json and Release-performance-results.json and Release-appearance-results.json. Some repeated checks overlap; their counts are not independent evidence of whole-product certification.

## Next release gate

1. Student opens and tries the real local workspace and guided demo.
2. Activate Supabase schema and a supported OAuth provider, then test owner/member/outsider access and save conflicts with real accounts.
3. Deploy the reviewed Git revision to Vercel with public browser configuration only; verify HTTPS clipboard and registration-free local/demo access in a private window.
4. Keep remaining participant/assistive-technology evidence honest. The local ready state does not by itself complete coursework or justify an accessibility-conformance claim.

M1–M12 historical commits/tags are preserved. Fresh progress commits replay M1–M13 following the student's webhook repair; M13's `pitch-done` denotes the prepared local demo and informal walkthrough, not a hosted release or delivered speech. See MILESTONE_PROGRESS.md. Hosting remains the separate next phase.


## Live accessibility preview and clearer boundaries — 20 October 2026

Direct user feedback requested immediate appearance/accessibility previews, colour-blind options in Accessibility, and thicker borders on similar-colour surfaces. This supersedes the earlier save-before-appearance-applies interaction.

- Appearance, text size, contrast, reduced motion/effects and shortcuts preview across the interface immediately. Save writes browser preferences; Cancel restores the saved choice. Protected Close/Escape still offers discard confirmation. Settings-page workspace palettes preview too, with a separate Cancel. Nested accessibility dialogs temporarily take precedence and restore an underlying settings draft on cancellation. Failed saving keeps the draft/preview and previously stored values intact.
- Colour vision support is visible in both Accessibility entry points. Personal alternatives replace both Feature/Bug badge colours and all Now/Next/Done card fills: blue/amber/purple avoids the default red/green pairing; greys keeps meaning available through text, icons and solid/dashed/double borders. This is a selectable alternative, not a promise that a particular palette suits every form of colour blindness. No colour-vision participant study is claimed. Shared workspace palette data is unchanged; old browser preferences default to workspace colours.
- Card, column, panel, editor and control outlines are 2px with clearer neutral boundaries in light/dark modes; Higher contrast uses 3px. The 5px state-specific leading borders are retained. Visual inspection caught a CSS specificity interaction that weakened those leading borders; an explicit rule and computed-style assertion correct it.
- Verification: 25 Node tests pass; focused Chrome155.0.8059.82 checks cover immediate preview without writes, Cancel, nested preview restoration, workspace palette rollback, saved/reloaded colour choices, failed save preservation, border widths and320px reflow. Three automated accessibility scans return zero violations. Evidence: Milestone evidence/live-preferences-check.cjs, Live-preferences-results.json and Live-preferences-grey-board.png. These are developer checks, not full accessibility certification.

Traceability: FR-20 colour customization; NFR accessibility/readability; DR-11 browser preferences now include colourVision, with transient preview state excluded from persistence. No database/schema change is required.

## Later attempts and team prototype checkpoint — 20 October 2026

The student challenged Review briefing as too similar to required context/copy behaviour, then requested a stronger extension and a fully populated example project. M12 now adds Attempts & lessons (FR-24 / DR-13): manually recorded successive prompts/tools/results/outcomes/lessons, optional self-reported authors, saved timestamps and explicit inclusion in the next copied briefing. Review remains a supporting control. No claim of market-wide uniqueness or immutable history.

StudySprint demonstrates 12 tasks across four stages, three fictional teammates, attributed attempts, handovers, three milestones and four working bundled sample deliverable links. Fresh demos include it; existing demos can add it without replacing saved work. Team collaboration is simulated through content and assignment. The student explicitly rejected a member switcher and deferred proper multiple-user implementation. There is no switcher, simulated login or fabricated online presence.

The target is now explicitly a finished clickable prototype for demonstration. The existing local interactions remain real: edits, save/reload, copying, handoff, milestones, settings, accessibility and navigation. Live Supabase/shared accounts and Vercel remain a later phase. SQL JSON validation was updated as prepared source only; no live changes or SQL execution claim for this revision.

Checks: 28 Node tests pass; production build passes (93 modules). Focused Chrome walkthrough passes add/save/reload, selected briefing, handoff, protected cancellation, return focus, sample links and milestones. One timeline axe scan reports zero findings; 320px modal reflow and desktop/mobile screenshots inspected. These are developer checks, not participant research or full accessibility conformance. Evidence: attempts-demo-check.cjs, attempts-demo-results.txt and attempts-demo desktop/mobile screenshots. Public decisions and demo route: PROTOTYPE_DEMO.md.

## Public prototype verified — 20 October 2026

Live application: https://vibecoding-project-tracker-umber.vercel.app/
Direct demo: https://vibecoding-project-tracker-umber.vercel.app/?demo=1

The student deployed the GitHub project to Vercel. A fresh unauthenticated Chrome context opened the HTTPS homepage and demo without a Vercel login or account registration. The StudySprint example loaded 12 tasks. Hosted checks passed: reviewed briefing equals actual HTTPS clipboard contents; add/save/reload an attempt; handoff persists; cancelling removal preserves the saved timeline; keyboard return focus; project milestones and bundled sample deliverable links. No page errors. One timeline axe scan returned zero violations and a 320px dialog reflow check passed. These are focused developer checks, not participant evaluation or full accessibility certification.

This supersedes earlier statements that public prototype hosting was pending. Actual simultaneous collaboration, authenticated shared accounts and live Supabase activation remain deferred. Each visitor's demo/local records are browser/origin-specific. Tests used isolated browser data and did not change the student's records. Evidence: Milestone evidence/hosted-demo-check.cjs, hosted-demo-results.txt and hosted-demo desktop/mobile screenshots. Application code checked corresponds to b2b9760.
