# RULES

How we work on this repo so each change costs the least. Two lists: what the
owner does before asking, and what Claude does before acting. CONTEXT.md has
the site facts, ARCHITECTURE.md has the code layout.

## Owner: before asking

1. **Name the target.** File plus the change. "Intro.jsx: Latest pill on one
   line" beats "fix the Latest button".
2. **Batch small asks.** Put every small fix in one message. One build, one
   check, one push.
3. **Say what verification you want.** "No screenshots, I'll check on the
   dev server" or "no build, data only". Default is build plus screenshots.
4. **Give the decision, not a question, when you already know.** "Do X" is
   one round. "What do you think about X" then "do it" is two.
5. **Show, don't describe, for visual feedback.** A screenshot with one
   sentence of what is wrong beats "make it better".
6. **Do manual moves yourself.** Moving folders, renaming images, dropping in
   client assets. Then say what moved.
7. **Set a rule once.** If something should always be true (no plus icons,
   email only), say "always" and it goes into CONTEXT.md.
8. **Start a fresh session per topic.** Long sessions carry old work into every
   call. A new session reads the three docs and starts cheap.
9. **Ask for a cost estimate before big work** if unsure. Estimates are cheap,
   rebuilds are not.
10. **Say "update docs"** after a big change so CONTEXT.md and
    ARCHITECTURE.md stay true for the next session.

## Claude: before acting

1. **Read CONTEXT.md, ARCHITECTURE.md and this file first.** Do not re-explore
   the tree to learn what they already say.
2. **Read only the lines you need.** Grep for the function, read that range.
   Never read whole large files (projects.js, ProjectDetail.jsx) end to end.
3. **Edit with a script when touching many places.** One Python or sed pass,
   then a syntax check, instead of many single edits.
4. **Syntax-check projects.js after every scripted edit** with `node --check`.
   Regex edits have swallowed closing braces twice.
5. **One build per batch.** Collect all edits, build once, screenshot once.
6. **Screenshot only what changed**, desktop and phone, at 1366 and 390. Reuse
   the scripts in the scratchpad `shot/` folder; do not write new ones for the
   same page.
7. **Skip screenshots when told to.** Trust the owner's dev server check.
8. **No new dependencies** without asking. Framer Motion, Tailwind and React
   Router cover everything so far.
9. **Keep the Flow and card components generic.** Content lives in
   projects.js, not in JSX. New projects must work with no component change.
10. **Commit and push every finished batch** with a short message. Netlify
    deploys from main.
11. **Honour the standing preferences in CONTEXT.md** without re-asking:
    blend-light default, no plus icons, email only, Supabase for Shortlist,
    sentence case, "Live site" for clients.
12. **Report cost honestly.** When an ask will be expensive, say the estimate
    in one line before starting, and offer the cheaper version.
13. **Stop at a fork that changes the work.** Ask one question with two or
    three options; do not build both.
14. **Don't narrate.** Short updates while working, one recap at the end that
    says what changed and where to look.

## Cost reference

| Task | Rough tokens |
| --- | --- |
| Data-only text edit, no build | 5k |
| One component fix, build, two screenshots | 15 to 20k |
| New section or component, both viewports | 40 to 60k |
| Repo restructure with path verification | 60 to 80k |
| "Make it better" without a reference | open ended |
