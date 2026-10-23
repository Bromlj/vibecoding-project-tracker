# Report and repository requirements alignment

Documentation revision: 23 October 2026. The student's report requirement-list numbering is now the canonical numbering in REQUIREMENTS.md, FUNCTIONAL_REQUIREMENTS.md, NON_FUNCTIONAL_REQUIREMENTS.md, DATA_REQUIREMENTS.md and CURRENT_ACCEPTANCE.md. The report's prose and figure references must use that same numbering. No application source, dependencies, storage format, milestone tags or test-result files are changed by this revision.

## Identifier translation

| Meaning | Legacy engineering ID (20 October) | Current report-aligned ID |
|---|---|---|
| Project milestones and achievement criteria | FR-17 | FR-14 |
| Manual member roster/contact metadata | FR-18 | FR-15 |
| Feature/bug visual distinction | FR-14 | FR-16 |
| Automatic deadline states | FR-15 | FR-17 |
| Four project deliverable links | FR-16 | FR-18 |
| Project milestone data | DR-09 | DR-08 |
| Deliverable-link data | DR-08 | DR-09 |

All other identifiers retain their meaning. A legacy range must be translated by its individual meanings, not by shifting the endpoints. For example, legacy FR-14–16 becomes current FR-16–18, while legacy FR-07/17/18 becomes current FR-07/14/15.

## Priority and wording reconciliation

- NFR-12 (reproducible setup) and NFR-13 (chosen synthetic performance target) are beyond the MVP, matching the report. This records a revised prioritisation, not a claim that the 20 October specification had these priorities.
- Current NFR-09 concerns label/control consistency. The earlier specification also proposed representative-user observations; those remain outstanding evaluation work, not retrospectively completed evidence.
- NFR-13 names modal opening, project opening and saving, the actions actually measured. It does not make a claim about every possible interaction or user productivity.
- NFR-06 separates the applicable 24 x 24 CSS-pixel target/spacing criterion and its exceptions from the implemented 44-pixel main-control height preference. It does not claim every control is 44 pixels in both dimensions.
- Optional description/date, tool and author fields remain optional. Roster metadata is not authentication, link presence is not completion, and local handoff is not remote collaboration.

## Historical documents and evidence

Original versions of the six updated existing documents are preserved byte-for-byte in docs/history/2026-10-20/. They also remain accessible at commit bfb4339028deff304d1e920ab1c36b36863604c6. The archive preserves original relative links; use that commit for original link navigation.

Other dated engineering/design notes, including DESIGN.md, DESIGN_REVIEW.md, IMPLEMENTATION_STATUS.md, RELEASE_READINESS.md, PRD.md, M8_SPECIFICATION_DECISION.md and TEACHING_APPLICATION.md, retain their original IDs and checkpoint statements. Read their requirement IDs through the table above. They are historical rationale/evidence, not a second current numbering authority. Their original observations have not been rewritten to look contemporaneous with the report.

EVIDENCE.md and evidence/ are unchanged. This documentation revision does not rerun tests, create participant findings, certify accessibility or activate shared accounts. The report must remain self-contained for an assessor who does not inspect GitHub.
