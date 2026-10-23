# Non-functional requirements — report-aligned specification

23 October 2026. Targets are not automatically verified results. IDs retain their numbers; NFR-12/13 are now beyond MVP to match the report. See REPORT_ALIGNMENT.md for wording/prioritisation changes and the original specification. No new tests are asserted.

| ID | Quality target / constraint | MVP | Recorded evidence and limitation |
|---|---|---|---|
| NFR-01 | Support keyboard operation, visible focus and predictable dialog focus/exit. | Yes | Scoped keyboard/draft/focus checks; no named human screen-reader session. |
| NFR-02 | Provide programmatic labels and relationships for assistive technology. | Yes | Labels/roles and automated checks; actual announcements unverified. |
| NFR-03 | Convey type and urgency without colour alone. | Yes | Text, icons and border cues; participant comprehension unmeasured. |
| NFR-04 | Meet applicable contrast ratios: ordinary text 4.5:1; qualifying large text and essential non-text cues 3:1. | Yes | Calculations and scoped scans, with WCAG exceptions; not a full manual audit. |
| NFR-05 | Remain usable at 320 CSS-pixel width and 200% text size. | Yes | Emulated viewport/CSS text resizing checked; actual zoom and physical devices unverified. |
| NFR-06 | Meet WCAG's 24 x 24 CSS-pixel target/spacing criterion and exceptions; prefer 44-pixel main-control height. | Yes | Main control-height styling present; complete target/exception and touch audit not recorded. |
| NFR-07 | Explain errors and preserve unsaved work for correction. | Yes | Controlled failed-write/delete/copy checks; success follows actual save/copy. |
| NFR-08 | Preserve invalid stored data for recovery; block stale-tab overwrites. | Yes | Stored local recovery/relationship/conflict checks; no live cloud-access verification. |
| NFR-09 | Keep labels and control placement consistent. | Yes | Shared controls and developer inspection. Earlier proposed representative-user observations remain outstanding. |
| NFR-10 | Keep context inert; allow HTTP(S) links; never transmit prompts automatically. | Yes | Inert text and URL validation; explicit copy/review. Not security certification. |
| NFR-11 | Support Chrome, Edge and Firefox, including narrow/landscape layouts. | Yes | Named historical developer/browser checks; not every later feature retested in all browsers or physical devices. |
| NFR-12 | Provide reproducible setup instructions. | No | package lock and documented Node/npm commands; student understanding remains a separate obligation. |
| NFR-13 | With five boards, 100 tasks and ten members, target p95 modal-opening/project-opening/save times below 200 ms; post-asset restoration below two seconds. | No | Recorded local synthetic benchmark, 30 repetitions: p95 41.4/58.5/51.0 ms; restoration 113.8 ms. Not INP, a network benchmark, all-interaction coverage or participant performance. |

Accessibility requirements draw on S5; recovery/performance policies are developer selections (D), not invented client guarantees. EVIDENCE.md identifies original checkpoints. Human speech, screen-reader use, physical devices and representative-user outcomes remain unverified. Documentation alignment neither removes these limitations nor supplies new evidence.
