# Engineering requirements — report-aligned baseline

Version 5, 23 October 2026. Current identifiers and MVP priorities follow the student's report requirement lists. This is an engineering specification, not evidence of new elicitation, code changes or completed evaluation. See [REPORT_ALIGNMENT.md](REPORT_ALIGNMENT.md) for the exact legacy-ID translation and preserved history.

## Sources

- S1: Initial client description — task progress, useful prompts/results, project information and key milestones for AI-assisted development.
- S2: Supplied hackathon slides — task model/four stages (M4), editing/persistence (M5), type distinction (M6), ownership (M7), deadlines (M8), context (M9), copying (M10), deliverable anchors (M11), selected extension (M12).
- S3: Starter PRD/scaffold — React/Vite/Tailwind and localStorage; the starter excluded accounts and real-time collaboration. Original material remains in Git history.
- S4: Consolidated client-discussion notes — general developers, one team/multiple boards, manual roster metadata and customisable colours. These are reported summaries, not verbatim transcripts or representative-user research.
- S5: Consulted technical guidance — WCAG 2.2, WAI interaction patterns and browser API documentation.
- D: Developer-selected interpretations/extensions, including the 24–48-hour deadline rule, explicit achievement criteria, recovery policies, appearance/navigation choices and Attempts & lessons.

## Current specification

- [24 functional requirements](FUNCTIONAL_REQUIREMENTS.md): FR-01–24. FR-01–15 are MVP; FR-16–24 are delivered beyond the minimum baseline. Beyond MVP does not mean every item is optional: FR-16–18 are supplied hackathon features.
- [13 non-functional requirements](NON_FUNCTIONAL_REQUIREMENTS.md): NFR-01–11 are MVP; NFR-12/13 are beyond MVP in the report. The changed priorities are explicitly recorded, not backdated.
- [13 data requirements](DATA_REQUIREMENTS.md): DR-01–08 are MVP; DR-09–13 are beyond MVP.
- [Current acceptance](CURRENT_ACCEPTANCE.md) separates implemented behaviour, recorded developer checks and unverified outcomes.

The report can use these concise definitions without requiring the assessor to consult GitHub. Code/schema details and earlier, richer acceptance descriptions remain available in the preserved 20 October documents. Historical source labels/claims are not evidence that the client approved every developer-selected interpretation.

## Scope and outstanding evidence

The delivered prototype is a browser-local workspace with multiple project boards and a separate synthetic demo. Manual ownership and handover do not authenticate or notify another user. Prepared cloud sharing remains deferred; there is no verified live remote collaboration, repository integration or automatic AI execution.

Existing developer records include 28 Node tests, production build success, named workflow checks, automated accessibility scans and a defined synthetic benchmark. Their original checkpoints and limitations remain in EVIDENCE.md. No test results have been created or rerun by this documentation alignment. Human screen-reader use, audible speech, physical-device use and representative-user outcomes remain unverified.

CHECKLIST.md and other dated design/release notes preserve their original checkpoint wording and legacy identifiers. Use REPORT_ALIGNMENT.md to interpret them. The current documentation does not claim all acceptance points pass, full accessibility conformance, user satisfaction or improved productivity. AI-use disclosure and the assessment's written-work rules remain separate from prototype-generation permission.
