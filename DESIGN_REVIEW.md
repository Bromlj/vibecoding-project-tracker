# Design adaptation and verification — 20 October 2026

**Historical checkpoint:** this document retains its original observations and decisions. Its completion/pending statements are not the latest status. Consult [CURRENT_ACCEPTANCE.md](CURRENT_ACCEPTANCE.md) before using it in report preparation; identify the checkpoint when citing earlier screenshots or measurements.

Engineering evidence for later student evaluation, not assessed report prose. This records the finished local design checkpoint; it does not certify the whole coursework or a live shared deployment.

**Subsequent accessibility work:** [ACCESSIBILITY_NAVIGATION.md](ACCESSIBILITY_NAVIGATION.md) records opt-in single-key navigation, direct destination buttons, device-voice read aloud and clearer repeated action names. It includes the later 21-test/build checkpoint and additional Chrome/Edge/Firefox evidence. The design results below remain the earlier checkpoint, not a claim that every scan was repeated after every extension.

## Evidence and scope

The student approved the supplied `product-design` package as a visual reference and requested reasoned adaptation, recorded decisions and accessibility checks. All fourteen reference screens were inspected, including projects, task details/context, review, team, milestones, links, settings, mobile and exceptional states. Existing functional requirements remain authoritative where a visual example differs.

The Assessment 1 DOCX was reread, along with extracted text from the teaching decks. Relevant sources include ACCESSIBILITY, UX-TheUser, Web Usability, Usability on Small Screen Devices, Evaluation Techniques, Qualitative Analysis and Quantitative Analysis. This was not a claim of freshly rendering every image-only lecture diagram or replaying recordings. The client milestone screenshots and existing source-labelled requirements also inform the implementation.

The assessment calls for working interactions, requirement-to-component justification, explanatory screenshots and access without registration. Local/demo mode preserves that access path; the public URL still needs deployment and verification. Prototype-generation assistance is recorded in TOOLS.md. The student's assessed explanation remains their own work.

## Decisions and traceability

| Decision | Reason and trade-off | Implementation / requirements |
|---|---|---|
| Projects landing page, desktop sidebar and labelled mobile Menu | Makes the one-team/multiple-project structure visible. Project counts are computed from saved records. This introduces a deliberate project-selection step; refresh returns to Projects, not a deep-linked editor. | Projects, WorkspaceApp; FR-07/17/18, NFR-09 |
| Project heading plus Board/Milestones navigation and All projects action | Keeps project identity and location visible. Milestones remain distinct from task stages and hackathon Git checkpoints. No redundant breadcrumb hierarchy for this shallow app. | WorkspaceApp; FR-01/07/17 |
| White cards, light grey page, restrained teal main actions | Surface separation and repeated alignment group related controls. Teal is a consistent action cue, not an untested claim about emotional effects. The app retains a practical identity rather than copying every reference decoration. | index.css, ui.js, DESIGN.md; NFR-03/04/09 |
| System UI heading/body fonts and monospace context | Avoids an external font request; uses familiar local rendering and distinguishes pasted code/Markdown. Font preference or speed benefit was not measured with participants. | index.css, tailwind.config.js; NFR-04/05/12 |
| Task title, type, owner and deadline lead each card | Reduces repeated detail in the board. Full description and stable ID remain in the editor/data. Required Copy Context remains on every card. | TaskBoard, TaskEditor; FR-01/06/12/14/15 |
| Separate type badge and deadline pill | Feature/Bug identity survives urgency changes and palette selection. Done urgency stays neutral as required by M8, rather than copying the reference's green completed card. Written labels/icons accompany colours. | TypeBadge, TaskBoard.Deadline; FR-14/15, NFR-03 |
| Four compact deliverable summaries above the board; explicit edit dialog | Preserves all four M11 anchors while reducing permanent form density. Empty/filled dots have text. Link presence never asserts completion; opening a link is an explicit action. | AnchorBoard; FR-16, NFR-02/05/10 |
| Details and AI context tabs share one draft and a visible task-title header | Groups task administration separately from lengthy prompts/outcomes. Switching tabs retains edits. The title remains visible to prevent loss of orientation. A validation failure opens and focuses the relevant field. | TaskEditor, Dialog; FR-02/03/08–11, NFR-01/02/07 |
| Exact briefing review remains optional; copy can use the visible draft | Supports inspection before handing context to another tool, without forcing extra steps. It neither saves nor judges correctness. Clipboard failure retains selectable text. | TaskEditor, BriefingReview, CopyContext; FR-12/19 |
| Mobile stage selector with View all stages; fullscreen editor | Reduces travel through long stacked columns, while preserving the four stages and an all-stage view. Desktop shows all columns. Status dropdown remains available; no drag-only dependency. | TaskBoard, Dialog, index.css; FR-01/05, NFR-01/05/06 |
| Team page retains editable contact/profile metadata and task assignment | The reference's roster pattern is adapted to existing stable member IDs. Task handoff stays in the task editor with its context, avoiding a second competing assignment form. Profile details do not grant sign-in access. | WorkspaceForms, TaskEditor; FR-06/18, DR-04 |
| Three existing validated type palettes, preview and explicit save/reset | Retains tested colour pairs instead of substituting reference colours without checking. Deadline meaning is independent. Palette preview contains labelled examples, not non-working task controls. | WorkspaceSettings, workspace.js; FR-20, NFR-03/04 |
| Accessibility preferences are visible; baseline access always works | Text size, contrast, reduced motion/effects are browser preferences. Keyboard operation, labels and colour-independent meaning are not optional modes. Native labelled controls are retained instead of cosmetic switches. | preferences, WorkspaceSettings, Dialog; NFR-01–06 |
| Keep search, filters, backups and honest shared-access status | These supported functions remain despite not appearing in every reference. No fake analytics, automatic project completion, decorative ellipses or unconfigured provider buttons were copied. | TaskBoard, WorkspaceSettings, CloudAccess; FR-13, NFR-07/08/10 |

## Accessibility implementation and checks

- **Text alternatives:** the app currently contains no meaningful raster images. Redundant SVG symbols and initials are hidden from assistive technology; adjacent visible text carries the meaning. This avoids duplicate announcements. Any future meaningful image needs an appropriate equivalent, not a filename or decorative description.
- **Keyboard:** native controls, visible focus, labelled dialogs, containment, Escape/discard protection and focus restoration. Task-editor tabs use tab/tabpanel relationships and arrow/Home/End navigation.
- **Errors and feedback:** labels persist; validation associates errors with fields and focuses the affected task field. Save/copy feedback follows actual success. Failed saves preserve drafts and previously saved state. Deleted tasks remain visible if storage rejects the deletion.
- **Colour and readability:** text/icons accompany state; all three palette text pairs have contrast tests. Automatic scans include standard/high contrast, enlarged text and preview palettes. These checks do not constitute a complete human contrast or assistive-technology audit.
- **Reflow:** tested at 320, 768 and 1280 CSS pixels. A 32px root font exercises 200% CSS text sizing; this is recorded separately from actual browser zoom. A first-pass 320px enlarged-text overflow was traced to the header, project tabs and deliverable heading; wrapping fixes passed confirmation.
- **Motor/cognitive access:** main controls use a 44px minimum height, persistent names, predictable grouping and explicit confirmation. Required actions do not depend on dragging, colour perception, sound, hover or remembering a hidden icon's meaning.
- **Motion/effects:** no decorative blur or animation is introduced. Browser motion preferences and explicit reduced-motion/effects settings are supported.

Primary guidance consulted: [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/), [WAI tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [WAI dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [decorative images guidance](https://www.w3.org/WAI/tutorials/images/decorative/). Guidance supports the decisions; automated checks do not prove full conformance.

## Final local verification

| Check | Observed result | Boundary |
|---|---|---|
| Production build | Pass; 100 modules; JavaScript 455.98 kB / 129.11 kB gzip; CSS 26.25 kB / 6.30 kB gzip | Build size is not a load-time measurement |
| Node tests | 18 passed | Data, dates, context, URLs, workspace, revision handling and key/profile rules |
| Chrome 155.0.8059.82 | 14 scenario groups passed | Isolated synthetic data, local production preview |
| Edge 155.0.4283.45 | Same 14 groups passed | Same scope |
| Firefox 153.0 | Same 14 groups passed | Playwright-managed Firefox, not a real mobile device |
| axe-core 4.14 automated scans | 24 screen/state scans; zero violations returned | Applicable configured WCAG A/AA rules; not all accessibility criteria |
| Additional scripted interaction groups | Nine passed | Exact draft/clipboard equality without saving; tabs/error/focus; backup restore; mobile stages; landscape keyboard; menu Escape; clipboard denial; decorative SVG/image semantics; stale-tab protection |
| Layout checks | No page-wide overflow at tested widths with enlarged preferences and 200% CSS text sizing | No claim of actual 200% browser zoom, magnifier or physical device testing |
| Visual review | Projects, setup, board, details/context, review, validation, links, milestones, team, settings and mobile captures inspected | Developer inspection, not preference research |
| Independent finish review | One finding: task identity hidden on AI context. Fixed and scored resolved on desktop/mobile captures | Scoped confirmation; no whole-product certification |

The automated design detector could not run because its engine was unavailable. Source, browser and independent visual review were used; no detector pass is claimed.

Private evidence is indexed in the subject workspace's `Milestone evidence/README.md`: `Design-accessibility-results.json`, `Redesign-flow-results.json`, the Edge/Firefox result files and `Design-*.png`. Scripts and screenshots stay outside the public repository.

## Remaining evaluation and release work

Named screen-reader/browser testing, representative-user observations, actual browser zoom/real-device testing and public assessor-access verification remain outstanding. No participant findings, card-sorting study, facilitated SDDP session, statistical significance or improved completion-time claim is invented.

An earlier synthetic performance baseline exists for the pre-redesign workspace (five boards, 100 tasks, ten members, 30 measured repetitions). It is not a performance measurement of this changed navigation. The selected performance target therefore needs a new navigation-aware benchmark before being claimed for this design.

Shared-account code and SQL are prepared separately. The latest live setup probe found missing tracker tables and disabled social providers; OAuth/shared writes have not been verified live. See CLOUD_SETUP.md. Vercel deployment remains the next release step, alongside that configuration. M1–M12 history remains unchanged; no `pitch-done` completion tag or coursework-readiness claim is made here.
