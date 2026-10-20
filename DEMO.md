# Demo preparation — M13

This file is an operational walkthrough, not assessed report text or a pitch script.

## Open the demo
Run `npm ci`, then `npm run dev`. Open the printed localhost URL and choose **Explore demo**.
Demo mode uses separate localStorage keys, with 12 synthetic tasks (three per column) and example prompt/outcome context. The normal workspace remains intact. Return using **Back to my workspace**. No fake deliverable links are preloaded.

**Learn with the demo** offers eight steps with actual navigation/editing actions. Select a step, practise it and use its written check. The guide does not claim to detect completion. Hide/show it as needed, or choose **Reset demo practice** and confirm to restore examples. This removes only demo changes. **How to use** provides the whole guide before or after workspace setup. Guide position resets when the page reloads; saved demo work persists until explicitly reset.

## Optional 30-second walkthrough
The student clarified on 20 October 2026 that there is no formal presentation; at most a brief app demonstration if requested. This sequence is a menu of things to show, not a requirement to fit every action into 30 seconds. Rehearsal is not a completion condition.

1. Show the four columns and labelled type/owner/deadline cues.
2. Open a task, explain the saved context, then cancel.
3. Choose Review briefing; inspect the exact output and template hints.
4. Copy context and paste into a text editor to show what is transferred.
5. Point to the deliverable slots and explain local-only storage.

Explain the product's purpose in your own words. Avoid claiming that the app automatically calls AI, synchronises teammates or verifies the truth of context.

## Hosted demo check
- Replace demo roster names only when the actual roster is agreed.
- Use HTTPS for public clipboard support; test denied clipboard/manual fallback.
- Deploy the fork as a Vite project, build command `npm run build`, output directory `dist`. No environment variables/database needed.
- Test the actual public URL without login. A successful local build is not deployment verification.
- The lecturer portal is a different application; it does not host this tracker.
- Public deployment/access verification remains pending as a separate release step. The exact portal completion marker pitch-done records the prepared local demo and brief walkthrough. No formal presentation, rehearsal or completed speech is claimed.
