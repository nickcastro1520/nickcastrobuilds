# AGENTS.md: nickcastrobuilds.com

## What the site is and who it's for
Nick Castro's builder portfolio. It shows recruiters and hiring managers the AI-powered sites and tools Nick has built, with case studies, his resume, and a Spanish homepage at /es. It's a static HTML site hosted on Vercel, and a push to main deploys it.

## Current status
- Live: the homepage, the Spanish homepage (/es), the stock-signals case study (/stock-signals), the book page, and the resume PDF.
- In progress: the weekly Google ranking program (Search Console, read-only). Through Nov 16, 2026, SEO changes are only proposed and wait for Nick's OK.
- Open pull requests: none.
- Live (Oct 22): /bilingual-websites-chicago/ and /ai-visibility-checker/, linked from homepage project cards (bilingual page also from /es).

## Decisions (newest first)
- 2026-10-23: Client Pipeline added private /w-aue3mb/ (noindex, unlinked, not in sitemap) — its walk-in outreach tool page, mirroring the /o-85kewn4w/ text-outreach page.
- 2026-10-22: Nick approved: resume PDF Triton College dates changed 2011–2019 → 2011–2013 (only change). Source: /workspace/jobs/Nick-Castro-AI-Builder-Resume.html, printed with headless Chrome. No other 2011–2019 dates in the site.
- 2026-10-22: Nick approved casual outreach texts. Rewrote batch 2 (#26-50) in /workspace/prospects/messages-batch2.md: short, no links, yes/no question; send nickcastrobuilds.com only after they reply. Republished private /o-85kewn4w/ (noindex, unlinked) with build_page.py --batch 2 --out into this repo. Note: build_page.py's default output, /workspace/portfolio/site, is an old clone that's behind main. Don't push from it.
- 2026-10-22: Nick approved: AGENTS.md is no longer served on the live site (listed in .vercelignore). It stays in GitHub.
- 2026-10-22: Nick approved both draft pages. Merged to main, added homepage card links (and /es link to the bilingual page), published, submitted via IndexNow. These are new pages, not changes to existing pages; the 4-week wait applies before judging them.
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
- (2026-10-23) After any site change (new/edited pages, URLs, titles, content), message SEO & AEO Desk bot (priority) with what changed and the URLs.
- CSP is script-src 'self': no inline <script>; put JS in external files.
- Read AGENTS.md at the start of every session. Update it at the end with what changed and what's next, then commit.
- Grok is the main builder. Claude is used for reviews and big decisions, and reads AGENTS.md to catch up.
- Only one AI edits a repo at a time. If Claude has an open pull request on this repo, don't edit until it's merged.
- Commit to GitHub before publishing. Never put keys in code or chat.
- Never claim a test ran unless you show its results.

- 2026-10-23: w-aue3mb — added "Email security walk-ins (SPF/DKIM/DMARC)" section (3 email-auth leads: E&J Auto, Portage Family Dental, Filippini Family Dentistry) below the 5 website walk-ins; separate localStorage key, all JS in app.js per CSP.
