# Expanded requirements checklist

Added 20 October 2026 from the student's supplied checklist. This supplements [REQUIREMENTS.md](REQUIREMENTS.md), retaining the earlier FR/NFR/DR identifiers and adding detailed acceptance points.

**All boxes are intentionally unchecked.** This is a requirements checklist, not a claim of 199 completed tests. Current coverage and actual checks are recorded in [RELEASE_READINESS.md](RELEASE_READINESS.md); [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) preserves the historical audit. Cxx-yy IDs identify checklist points without replacing FR/NFR/DR IDs.

The original checklist treated multiple boards, editable teammates, project milestones and palettes as provisional. The student's subsequent full-product instruction adopted these, and they are implemented along with search/filtering. Their original source labels are retained below for history; they are no longer deferred implementation work. This change in scope is user authorization, not retrospective confirmation of every detail by the client.

Source provenance follows the supplied checklist and working notes; this update does not claim a fresh slide-by-slide or assessment-document re-review. No new slide numbers, quotations or participant findings are introduced.

## 1. Prompt and outcome recording

Confirmed mission detail; engineering acceptance points. Sources: initial client mission, starter context requirements, working decisions.

- [ ] **C01-01** Provide a clearly identifiable place to record useful prompts within task context.
- [ ] **C01-02** Provide a place to record the result or outcome of those prompts.
- [ ] **C01-03** Record previous attempts and what remains to be done.
- [ ] **C01-04** Include the optional AI-tool selector; allow its value to remain empty.
- [ ] **C01-05** Allow users to replace or modify the context template.
- [ ] **C01-06** Allow unfinished context and blank template sections.
- [ ] **C01-07** Preserve line breaks, Unicode characters, pasted code, and meaningful whitespace.
- [ ] **C01-08** Avoid silently truncating saved context.
- [ ] **C01-09** Treat pasted code or HTML as text rather than executing it.
- [ ] **C01-10** Include a demonstration task containing a useful prompt, selected tool, and recorded outcome.

## 2. Task creation, validation, and protected editing

Sources: M4/M5/M7 client material and chosen validation/editing policies.

- [ ] **C02-01** Generate a stable task ID automatically.
- [ ] **C02-02** Keep the task ID unchanged when editing, reassigning, or moving the task.
- [ ] **C02-03** Generate the creation date automatically.
- [ ] **C02-04** Require a title containing something other than whitespace.
- [ ] **C02-05** Default new tasks to Feature and To Do.
- [ ] **C02-06** Allow users to change those defaults before saving.
- [ ] **C02-07** Allow an empty description.
- [ ] **C02-08** Allow a task without a due date.
- [ ] **C02-09** Accept legitimate dates in the past, including existing overdue work.
- [ ] **C02-10** Reject impossible or malformed dates with an explanation.
- [ ] **C02-11** Preserve entered information when validation fails.
- [ ] **C02-12** Commit edits only when the user saves.
- [ ] **C02-13** Leave the saved task unchanged when editing is cancelled.
- [ ] **C02-14** Warn before discarding unsaved changes when closing the editor.
- [ ] **C02-15** Close without a discard warning when nothing has changed.
- [ ] **C02-16** Confirm deletion and identify the task being deleted.
- [ ] **C02-17** Leave the task unchanged when deletion is cancelled.

## 3. Reliable saving and recovery from failures

The starter specifically chooses localStorage, narrowing the earlier localStorage-or-backend alternative. Error warnings alone do not establish all recovery behaviours.

- [ ] **C03-01** Use localStorage for the current starter-based scope.
- [ ] **C03-02** Explain that data is stored in the current browser and is not automatically shared with teammates.
- [ ] **C03-03** Show success only after saving actually succeeds.
- [ ] **C03-04** Show a clear, actionable error when saving fails.
- [ ] **C03-05** Preserve the unsaved draft after a failed save.
- [ ] **C03-06** Preserve the previously saved record after a failed save.
- [ ] **C03-07** Provide a way to retry a failed save.
- [ ] **C03-08** Keep a task present if its deletion cannot be saved.
- [ ] **C03-09** Detect malformed or unsupported saved data without silently overwriting it.
- [ ] **C03-10** Prevent another open tab's changes from being silently overwritten.
- [ ] **C03-11** Seed demonstration data only when no saved state exists.
- [ ] **C03-12** Keep an intentionally emptied board empty after reloading.
- [ ] **C03-13** Clearly identify demonstration tasks and teammate names as examples.

## 4. More precise Copy Context behaviour

Sources: M10, current copy policy, technical clipboard guidance.

- [ ] **C04-01** Copy saved task information when using the card's Copy Context button.
- [ ] **C04-02** Copy the currently visible draft when using Copy Context inside the editor.
- [ ] **C04-03** Explain when copied text includes unsaved edits.
- [ ] **C04-04** Keep copying independent of saving.
- [ ] **C04-05** Include the selected AI tool in the briefing when available.
- [ ] **C04-06** Include useful task metadata, such as status, owner, and dates, consistently.
- [ ] **C04-07** Preserve the full context and its formatting in the copied output.
- [ ] **C04-08** Show copy success only after the clipboard operation succeeds.
- [ ] **C04-09** Explain when clipboard access is denied or unavailable.
- [ ] **C04-10** Provide selectable text for manual copying when automatic copying fails.
- [ ] **C04-11** Keep the briefing available after a failed copy.
- [ ] **C04-12** Keep copying local; do not automatically submit the content to an AI service.

## 5. Context freshness

Latest recorded M9 policy updates on context OR AI-tool change. Earlier text-only rule is superseded; durable-save failure remains an acceptance issue.

- [ ] **C05-01** Show an exact saved timestamp as well as a relative last-updated hint.
- [ ] **C05-02** Avoid changing the timestamp merely because a task was opened or copied.
- [ ] **C05-03** Avoid changing it for unrelated task edits.
- [ ] **C05-04** Avoid updating it when changes are cancelled or saving fails.
- [ ] **C05-05** Apply one documented rule for changes to the AI-tool selection.

## 6. Complete deadline rules

Sources: M8 and DEC-08. Date-only values use the selected local day's end; the 24–48-hour interval needs an explicit state.

- [ ] **C06-01** Treat a due date as a calendar date, without requiring a time.
- [ ] **C06-02** Keep a task due through the end of its selected local calendar day.
- [ ] **C06-03** Mark it overdue at the following local midnight.
- [ ] **C06-04** Preserve the selected date without accidental UTC conversion shifts.
- [ ] **C06-05** Show Due soon / Due within 48 hours for the previously undefined 24–48-hour interval.
- [ ] **C06-06** Retain a more specific Due within 24 hours label.
- [ ] **C06-07** Show No due date with neutral styling for undated tasks.
- [ ] **C06-08** Recalculate urgency at least once per minute while the app is visible.
- [ ] **C06-09** Recalculate when returning to the app.
- [ ] **C06-10** Handle month boundaries, leap years, and daylight-saving changes correctly.
- [ ] **C06-11** Keep feature/bug identity visible independently of deadline urgency.
- [ ] **C06-12** Keep the task-type badge when completed tasks lose the overdue alarm. Latest student request uses a green Done card (or selected alternative), superseding neutral Done.

## 7. Deliverable-link behaviour

Sources: M11 and deliverable decisions. Link presence does not mean the deliverable is complete.

- [ ] **C07-01** Allow deliverable slots to remain empty.
- [ ] **C07-02** Allow an existing link to be changed or cleared.
- [ ] **C07-03** Validate non-empty entries as absolute HTTP or HTTPS URLs.
- [ ] **C07-04** Reject executable schemes, malformed addresses, and credential-bearing URLs.
- [ ] **C07-05** Preserve the entered value while displaying a validation error.
- [ ] **C07-06** Provide an explicit action to open a saved link.
- [ ] **C07-07** Open external content only after a user action.
- [ ] **C07-08** Describe the indicator as link present, rather than claiming the deliverable is complete.
- [ ] **C07-09** Accompany the empty/filled dot with understandable text.
- [ ] **C07-10** Keep the banner above the board without covering content when zoomed or viewed on a small screen.

## 8. Accessibility requirements

Teaching anchor: ACCESSIBILITY.pptx. Numeric criteria are the recorded WCAG 2.2 targets, not a declaration of conformance. Original technical sources: WCAG and WAI dialog guidance linked below.

- [ ] **C08-01** Make every core action operable using a keyboard.
- [ ] **C08-02** Keep keyboard focus clearly visible.
- [ ] **C08-03** Use a logical tab order.
- [ ] **C08-04** Move focus into an opened modal.
- [ ] **C08-05** Keep focus within the modal while it is open.
- [ ] **C08-06** Support closing the modal with Escape, respecting unsaved-change protection.
- [ ] **C08-07** Return focus to the opening control, or another sensible control if it was deleted.
- [ ] **C08-08** Give every input a persistent, programmatically associated label.
- [ ] **C08-09** Give buttons meaningful accessible names.
- [ ] **C08-10** Make task owner, status, type, and date purpose understandable to screen readers.
- [ ] **C08-11** Announce relevant save, copy, reassignment, and error messages.
- [ ] **C08-12** Communicate type, urgency, and link presence using text or icons alongside color.
- [ ] **C08-13** Provide useful alternative text for meaningful images; hide decorative imagery from assistive technology.
- [ ] **C08-14** Meet recorded text-contrast targets: 4.5:1 ordinary text and 3:1 qualifying large text.
- [ ] **C08-15** Check contrast for meaningful control boundaries and states.
- [ ] **C08-16** Keep text and controls usable at 200% text resizing.
- [ ] **C08-17** Support the 320 CSS-pixel reflow reference, with any applicable exception justified.
- [ ] **C08-18** Meet the recorded 24 × 24 CSS-pixel target-size requirement or applicable exception.
- [ ] **C08-19** Prefer approximately 44-pixel main controls where practical.

## 9. Responsive layout and understandable navigation

Teaching anchors: Web Usability.pptx and Usability on Small Screen Devices.pptx. Starter permits desktop-only; DESIGN.md adopts responsive layout. These points need purpose-specific verification.

- [ ] **C09-01** Adapt the board layout to available width while preserving column order.
- [ ] **C09-02** Keep task editors usable on narrow screens.
- [ ] **C09-03** Allow long editor content to scroll without losing access to controls.
- [ ] **C09-04** Wrap long task titles, descriptions, and links.
- [ ] **C09-05** Avoid unnecessary page-wide horizontal scrolling.
- [ ] **C09-06** Preserve editing state when the viewport changes.
- [ ] **C09-07** Keep controls sufficiently separated to reduce accidental taps.
- [ ] **C09-08** Keep labels and action placement consistent.
- [ ] **C09-09** Group related information so users can scan it easily.
- [ ] **C09-10** Keep the primary action clear in each interaction.
- [ ] **C09-11** Show helpful empty states, such as No tasks here yet, with an appropriate next action.
- [ ] **C09-12** Show progress feedback when an operation takes perceptible time.
- [ ] **C09-13** Use visible labels and familiar controls to reduce memory demands.
- [ ] **C09-14** Keep status-dropdown movement available if drag and drop is added.

## 10. Selected M12 feature: Review Brief

Chosen extension from DEC-14. Some implementation exists; see the separate audit rather than interpreting these unchecked boxes as absence.

- [ ] **C10-01** Provide an optional Review Brief action.
- [ ] **C10-02** Show the exact Markdown/plain text that Copy Context will produce.
- [ ] **C10-03** Include the current draft where applicable.
- [ ] **C10-04** Allow returning to editing.
- [ ] **C10-05** Allow copying from the review.
- [ ] **C10-06** Keep direct Copy Context available without requiring a review first.
- [ ] **C10-07** Show a notice when context is empty.
- [ ] **C10-08** Avoid implying that the app has verified the briefing's correctness.
- [ ] **C10-09** Ensure previewing does not save, modify, or transmit the task.

## 11. Provisional extension: multiple project boards

Reported client discussion: one team with multiple boards. Detailed behaviours are the proposed interpretation; not automatically confirmed hackathon scope.

- [ ] **C11-01** Create multiple boards for one team.
- [ ] **C11-02** Give each board a stable ID.
- [ ] **C11-03** Give each board a name.
- [ ] **C11-04** Rename boards without changing their identity.
- [ ] **C11-05** Switch between boards.
- [ ] **C11-06** Clearly identify the currently selected board.
- [ ] **C11-07** Reject blank board names.
- [ ] **C11-08** Reject duplicate names after trimming whitespace and ignoring letter case.
- [ ] **C11-09** Treat each board as one project.
- [ ] **C11-10** Keep each board's tasks separate.
- [ ] **C11-11** Keep each board's deliverable links separate.
- [ ] **C11-12** Keep each board's project milestones separate.
- [ ] **C11-13** Preserve these relationships after reloading.

## 12. Provisional extension: teammate management

Changes the starter's three-fixed-name model. Metadata entry does not imply accounts, invitations or remote requests.

- [ ] **C12-01** Add teammates manually.
- [ ] **C12-02** Edit teammate details.
- [ ] **C12-03** Give each teammate a stable ID.
- [ ] **C12-04** Require a display name.
- [ ] **C12-05** Allow optional email and GitHub-handle metadata.
- [ ] **C12-06** Validate a supplied email's basic format.
- [ ] **C12-07** Keep teammates with identical names distinguishable.
- [ ] **C12-08** Preserve task assignments when a teammate's name changes.
- [ ] **C12-09** Make the roster available across the team's boards.
- [ ] **C12-10** Support an explicit Unassigned task state.
- [ ] **C12-11** Keep metadata entry independent of account creation, invitations, and external requests.

## 13. Provisional extension: project milestones

Achievements within a tracked project, separate from hackathon M1–M13. Detailed entity model remains provisional.

- [ ] **C13-01** Add a project milestone.
- [ ] **C13-02** Edit a project milestone.
- [ ] **C13-03** Delete a project milestone with confirmation.
- [ ] **C13-04** Give each milestone a stable ID.
- [ ] **C13-05** Require a milestone title.
- [ ] **C13-06** Require an achievement criterion explaining what reached means.
- [ ] **C13-07** Allow an optional target date.
- [ ] **C13-08** Support Pending and Reached states.
- [ ] **C13-09** Allow users to mark a milestone reached.
- [ ] **C13-10** Record when it was marked reached.
- [ ] **C13-11** Allow returning it to Pending and clear the reached timestamp.
- [ ] **C13-12** Persist milestone changes.
- [ ] **C13-13** Keep achievement user-controlled; task completion or adding a link must not silently mark a milestone reached.

## 14. Provisional extension: color preferences

Later student instruction adopts palette customization. Three type palettes and three stronger whole-card palettes are implemented; Light/Dark/System is a browser preference. Keep urgency independent of type palettes.

- [ ] **C14-01** Offer a small selection of predefined feature/bug accent palettes.
- [ ] **C14-02** Provide a documented default palette.
- [ ] **C14-03** Provide Reset to default.
- [ ] **C14-04** Persist the selected palette.
- [ ] **C14-05** Apply it consistently across task displays.
- [ ] **C14-06** Preserve readable contrast for every offered palette.
- [ ] **C14-07** Preserve text labels and icons.
- [ ] **C14-08** Keep deadline urgency independent of the selected task-type palette.

## 15. Optional improvements suggested by the teaching

Recommendations if task volume justifies them, not recorded client requirements. No requirement to add them merely to fill the checklist.

- [ ] **C15-01** Search tasks by title or relevant text.
- [ ] **C15-02** Filter tasks by assignee, type, status, or deadline state.
- [ ] **C15-03** Clearly show active filters.
- [ ] **C15-04** Provide Clear filters.
- [ ] **C15-05** Distinguish No matching tasks from an empty board.
- [ ] **C15-06** Provide brief contextual help for unfamiliar concepts such as AI context.

## 16. Quality and evaluation checks

Teaching anchor: Evaluation Techniques.pptx. Completion/time/errors/learnability/memorability/satisfaction require actual observations, not invented results.

- [ ] **C16-01** Verify the complete create → edit → assign → move → save → reload workflow.
- [ ] **C16-02** Verify prompt/outcome recording → reopen → copy → paste.
- [ ] **C16-03** Test clipboard permission denial and unavailable clipboard access.
- [ ] **C16-04** Test blocked storage, storage capacity failure, and malformed saved data.
- [ ] **C16-05** Test empty fields, long text, Unicode, and legitimate overdue dates.
- [ ] **C16-06** Test deadline boundaries and completed overdue tasks.
- [ ] **C16-07** Complete core workflows using only a keyboard.
- [ ] **C16-08** Test with a named screen-reader/browser combination.
- [ ] **C16-09** Check layouts at 320, 768, and 1280 CSS pixels.
- [ ] **C16-10** Check relevant portrait and landscape layouts.
- [ ] **C16-11** Verify core workflows in recorded Chrome, Edge, and Firefox versions.
- [ ] **C16-12** Record observed task completion, errors, requests for help, and feedback.
- [ ] **C16-13** Fix identified problems and record recheck results.
- [ ] **C16-14** Distinguish developer inspection from testing with representative users.
- [ ] **C16-15** Record measured performance rather than assuming the app is fast.

## 17. Coursework delivery requirements

Assessment obligations rather than additional app screens. Working engineering records do not substitute for the student's assessed explanation.

- [ ] **C17-01** Give functional, non-functional, and data requirements unique identifiers.
- [ ] **C17-02** Mark which requirements belong to the MVP.
- [ ] **C17-03** Explain each requirement's purpose and evidence.
- [ ] **C17-04** Record where stored data comes from.
- [ ] **C17-05** Map interface components and interactions to requirements.
- [ ] **C17-06** Justify additional features.
- [ ] **C17-07** Deliver working interactions rather than decorative placeholder controls.
- [ ] **C17-08** Include the selected non-MVP requirements in the final prototype.
- [ ] **C17-09** Provide assessor access without registration or subscription.
- [ ] **C17-10** Provide a working prototype link and explanatory screenshots.
- [ ] **C17-11** Record which AI tools were used and how.
- [ ] **C17-12** Keep planned checks, implemented behaviour, and verified results distinguishable.

## Source record and performance caveat

Teaching/source files named in the supplied checklist: ACCESSIBILITY.pptx; Web Usability.pptx; Usability on Small Screen Devices.pptx; Evaluation Techniques.pptx; CM6312_2026-27_Assessment_1 (1) (1).docx; client mission/M4–M13 screenshots; the private Stage 3 requirements/milestone notes. These local teaching files are not copied into this repository.

Consulted original technical sources: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI modal pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [Clipboard.writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText), [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Cite the relevant original sources when explaining methods; a source title alone does not justify a design.

DEC-16 proposed a 200ms 95th-percentile interaction target across 30 measured repetitions after warm-up, plus restoration within two seconds after required assets are available. Its synthetic workload was five boards, 100 tasks total, ten roster members and serialized state <=1 MiB. This is an unmeasured engineering target, not a client guarantee or an INP result. Amend its workload deliberately if the provisional multi-board/roster scope is excluded.

Checklist contains 199 acceptance points across 17 topics; counts indicate inventory only, not completion or quality.
