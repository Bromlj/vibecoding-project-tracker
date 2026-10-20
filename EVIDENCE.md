# Developer verification evidence

Published 20 October 2026 to make the report's numerical claims inspectable. These are developer checks, not representative-user research, independent certification or full accessibility conformance.

The original browser records are retained with their original limitations. Publishing a stored result is not a new test run. They cover different checkpoints; do not describe every measurement as a test of the latest deployment.

| Record | Result and scope | Checkpoint |
|---|---|---|
| [Node tests](evidence/node-tests.txt) | 28 tests passed, 0 failed. Date/state boundaries, validation, context, attempts, persistence contracts, navigation and palettes. Reproduce with `npm ci` then `npm test`. | Fresh run on 20 October 2026 during report-evidence reconciliation; application source unchanged from the M8 correction. |
| [Production build](evidence/production-build.txt) | Vite production build passed. Build success does not establish deployment or usability. Reproduce with `npm run build`. | Same fresh reconciliation run; Vite 8.3.4. |
| [Design audit](evidence/design-audit.json) | 24 named automated accessibility scans, zero reported violations; nine interaction check groups; no recorded page errors or overflow in the tested states. Chrome 155.0.8059.82 / axe 4.14.0. | Stored 20 October audit from the local readiness review, before the final M8 colour correction. Capture commit was not embedded; no exact commit is retroactively assigned. |
| [Workspace workflows](evidence/workspace-workflows.json) | 14 developer scenario groups, including fresh setup, task creation, assignment/reload, separate boards, milestones, failed saves/deletes and malformed data. | Stored local readiness review; capture commit not recorded. Distinct from the nine groups in the design audit. |
| [Synthetic performance](evidence/performance.json) | 5 boards, 100 tasks, 10 members; 30 repetitions. p95: task modal 41.4 ms, project opening 58.5 ms, save 51.0 ms. Post-asset restoration 113.8 ms. Method and raw timings are included. | Earlier local release measurement. Not a new hosted benchmark, network load time, INP or participant completion time. |
| [Hosted M8 correction](evidence/m8-hosted.json) | Warning distinct from overdue alarm; neutral completed tasks; three palettes in light/dark; preview cancellation and strong borders. Two scoped automated scans, no reported violations/errors. | Public Vercel demo, 20 October 2026, 16:22 UTC, after application commit `bd6f9bc`. |

The nine design-audit groups are clipboard/draft behaviour; editor keyboard/draft/error behaviour; backup/restore; mobile stage selection; landscape editor; mobile navigation; denied clipboard fallback; decorative icons/image labelling; and cross-tab stale-write protection. Each group contains several assertions. They are not nine participants or nine complete usability studies.

The performance range of approximately 41–59 ms spans different instrumented actions. It is not a confidence interval, a before/after improvement or a guarantee for other devices.

## Evidence boundaries

- Automated scans can report no violations while manual accessibility problems remain.
- Browser emulation and CSS text enlargement do not establish actual browser zoom or physical-device usability.
- The available records do not establish representative-user satisfaction, learnability, productivity, named human screen-reader performance, audible speech or switch-device operation.
- The local synthetic workflow records and the hosted M8 record must not be merged into a claim that every workflow was freshly checked on production.
- Prepared cloud code is not evidence of functioning shared accounts or remote collaboration.
- Attendance was confirmed by the student; the attendance register itself has not been inspected here. Milestone tags do not prove marks or portal recognition.

## Provenance and reproduction

[Provenance](evidence/provenance.json) identifies original local result filenames and SHA-256 hashes. The performance copy omits the hardware-description section; raw timings, sample size and method are retained. Browser harnesses and full screenshots remain in the coursework evidence folder; these public records improve inspectability but are not a fully portable browser-test suite. Node tests and the production build are reproducible from the repository.

For a stable report citation, link to this file at the evidence commit rather than relying on a moving branch. A source reference and a concise result/limitation belong together; a URL alone does not explain a result.
