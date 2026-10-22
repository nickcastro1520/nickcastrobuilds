# AGENTS.md: nickcastrobuilds.com

## What the site is and who it's for
Nick Castro's builder portfolio. It shows recruiters and hiring managers the AI-powered sites and tools Nick has built, with case studies, his resume, and a Spanish homepage at /es. It's a static HTML site hosted on Vercel, and a push to main deploys it.

## Current status
- Live: the homepage, the Spanish homepage (/es), the stock-signals case study (/stock-signals), the book page, and the resume PDF.
- In progress: the weekly Google ranking program (Search Console, read-only). Through Nov 16, 2026, SEO changes are only proposed and wait for Nick's OK.
- Open pull requests: none.
- Draft (Oct 22, branch `draft/seo-pages-2026-10-22`, NOT merged, preview only): /bilingual-websites-chicago/ (service page) and /ai-visibility-checker/ (case study), plus 2 sitemap entries. Needs Nick's own OK before merging to main.

## Decisions (newest first)
- 2026-10-22: Drafted two SEO pages from the ideas board on a branch with a Vercel preview only (approval period). Skipped a third "15 stock signals" post because /stock-signals already covers it; a duplicate page would compete with it.
- 2026-10-21: Added this file so every AI stays in sync without Nick relaying messages.
- 2026-10-21: The SEO approval period runs through Nov 16. Starting Nov 23, bots may make one logged change per page on their own.
- 2026-10-20: Standing rule to commit to GitHub before publishing and confirm the live site matches main.
- 2026-10-20: Published the stock-signals case study ("15 signals, one survived") in English plus a card on /es. These are real results only, framed honestly.
- 2026-10-08: Removed repeated "Grok Bot" mentions so the site reads as a builder's portfolio.

## Next steps
- Oct 26: the first weekly Google ranking report, with proposed changes for Nick to approve.
- Possible case studies for Homework Helper and Rocket Lander once they have real results.

## Rules
- Read AGENTS.md at the start of every session. Update it at the end with what changed and what's next, then commit.
- Grok is the main builder. Claude is used for reviews and big decisions, and reads AGENTS.md to catch up.
- Only one AI edits a repo at a time. If Claude has an open pull request on this repo, don't edit until it's merged.
- Commit to GitHub before publishing. Never put keys in code or chat.
- Never claim a test ran unless you show its results.
