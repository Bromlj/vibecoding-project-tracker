# Interactive prototype checkpoint — 20 October 2026

The current delivery target is a usable, clickable prototype for a short demonstration. The student explicitly deferred proper multi-user implementation and requested no demo member switcher. Real account setup, simultaneous remote collaboration and public hosting are not completion claims for this checkpoint.

## Selected M12 extension

**Attempts & lessons** retains successive approaches instead of repeatedly replacing one current context field. Each task can hold a prompt, optional AI tool, manually assessed result (Worked / Partly worked / Failed), actual outcome, lesson, optional self-reported author and saved timestamps for each attempt. Checkboxes select which attempts are appended to the next copied briefing.

This responds to the student's criticism that Review briefing alone overlapped with client-required M9/M10. Review is retained as a useful supporting interaction. The timeline is our selected extension beyond that baseline, not a claim of worldwide uniqueness. It supports remembering failed approaches, avoiding repetition and making a teammate handover more informative. These are design hypotheses; no participant study is claimed.

## Interaction and data decisions

- A third task tab keeps the normal Details form short. Expandable attempts show result, author and lesson first; newest records appear first.
- Save task commits the draft. Cancel/discard preserves previous saved data. Removing an attempt requires confirmation and still needs Save. Review and copying never save or call an AI.
- Only explicitly selected attempts enter the briefing. Existing context text remains independent. Selected-content changes update briefing freshness; excluded attempts have their own timestamps.
- Records are editable, not immutable history. Author labels are self-reported, not identity verification. No fabricated presence, messages or connected users.
- Existing tasks without attempts remain valid. Up to 50 records per task, with explicit field limits and no silent truncation. Backup/restore uses the same validated workspace model.
- Text labels, native fields, focus restoration, visible borders and wrapping tabs support keyboard and narrow-screen use. The timeline introduces no meaningful image requiring alt text.
- Fresh demos include the team example. Existing demos get an explicit Add team example project action; repeated opening does not overwrite practice edits. Actual workspace data is separate.

## Populated example

**StudySprint · team example** contains 12 tasks across all four stages, features and bugs, owned/unassigned work, deadline states, context, three fictional teammates, three milestones and four working links to bundled synthetic deliverable examples.

Start with **Build accessible study timer → Attempts & lessons**. Alex's failed timer approach, Sam's partial fix and Jordan's successful example show why retaining attempts helps. Select what to carry forward, review the briefing, return to Details and hand off. Save and reopen to demonstrate persistence.

Team names, emails, outcomes and dates are labelled examples. The sample deliverable page does not pretend to be submitted coursework or a real deployed StudySprint application. Use Appearance & settings, Accessibility, Team, Milestones and How to use to demonstrate the remaining screens. User preferences are not overwritten by loading sample data.

## Focused developer verification

- 28 Node tests pass, including legacy compatibility, exact text, selected-only copying, timestamp rules and non-destructive example creation.
- Production build succeeds.
- Chrome walkthrough: example opening; no member switcher; 12 cards; three original attempts; selected-only briefing; add attempt, save/reload; reassignment; cancellation retains saved history; keyboard focus returns from review; milestones and sample links work. No page errors.
- One automated accessibility scan of the timeline reports zero violations; a 320 CSS-pixel dialog check and desktop/mobile visual inspection pass. This is not full accessibility certification or representative-user evaluation.
- Prepared Supabase JSON validation was extended for the optional timeline and Codex selector. No live schema, authentication or permission change was made. Execution against Supabase is deferred with the shared-hosting phase.

Private repeatable check and screenshots: `Milestone evidence/attempts-demo-check.cjs`, `attempts-demo-results.txt`, `attempts-demo-desktop.png`, `attempts-demo-mobile.png` in the coursework workspace.

Historical milestone tags remain where they were. The new implementation commit includes `secret-sauce` for M12 traceability; it does not rewrite earlier progress evidence.
