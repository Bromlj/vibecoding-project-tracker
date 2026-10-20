# Demo preparation — M13

This file is an operational walkthrough, not assessed report text or a pitch script.

## Open the demo
Run `npm ci`, then `npm run dev`. Open the printed localhost URL and choose **Open demo workspace**.
Demo mode uses separate localStorage keys, with 12 synthetic tasks (three per column) and filled context. The normal workspace remains intact. Return using **Back to my workspace**. No fake deliverable links are preloaded.

## Suggested 30-second sequence
1. Show the four columns and labelled type/owner/deadline cues.
2. Open a task, explain the saved context, then cancel.
3. Choose Review briefing; inspect the exact output and template hints.
4. Copy context and paste into a text editor to show what is transferred.
5. Point to the deliverable slots and explain local-only storage.

Explain the product's purpose in your own words. Avoid claiming that the app automatically calls AI, synchronises teammates or verifies the truth of context.

## Before presenting
- Rehearse and time the sequence yourself. No human rehearsal or pitch delivery has been recorded by the developer checks.
- Replace demo roster names only when the actual roster is agreed.
- Use HTTPS for public clipboard support; test denied clipboard/manual fallback.
- Deploy the fork as a Vite project, build command `npm run build`, output directory `dist`. No environment variables/database needed.
- Test the actual public URL without login. A successful local build is not deployment verification.
- The lecturer portal is a different application; it does not host this tracker.
- Public deployment and live pitch remain pending until completed by the student.
