# CONTEXT

Working notes for anyone (human or AI) picking up this repo. Read this before
touching anything; read ARCHITECTURE.md for how the code is laid out.

## What this is

Faizan Patel's personal portfolio: full-stack developer, also does design and
freelance client builds. Live at https://faziansportfolio.netlify.app
(GitHub: FAIZAN101013/Portfolio, branch `main`, auto-deployed by Netlify on
push).

The React app in `react/` is the site. The HTML/CSS/JS at the repo root is the
old static version, kept only because `images/` and `Project video/` still
live beside it and the React build copies them in. Do not delete those folders
or move them into `react/public`.

## Owner preferences (learned, keep honouring)

- Default theme is `blend-light`. Themes are owner-only (picked on `/stats`),
  never exposed to visitors.
- No gold plus/x circles or "+" icons anywhere; collapsibles use plain
  "Show / Hide" text.
- Skills stay visible on the About section. Only experience collapses.
- Contact is email only. No WhatsApp, no phone number.
- CV link stays the Google Drive URL in `src/data/site.js`, not a hosted PDF.
- Client project buttons say "Live site"; own projects say "Live demo".
- Shortlist uses Supabase (not Neon). Do not "correct" this.
- Hero copy: "I design and build websites and apps that ship." Label:
  "Faizan Patel · Full-stack developer" (no "designer" in the title).
- Project nudge toast must stay subtle: once per session, 25s delay, only
  mid home page, 9s on screen.
- QUICKK logo is first in its gallery.
- Uppercase only on nav and the "Latest" eyebrow; everything else sentence
  case. 14px is the minimum text size.
- Every change is committed and pushed; the owner checks the Netlify deploy.

## Writing and typography rules in force

- Modular scale ratio 1.2 off 19px (`--text-*` tokens). `--text-xs` is about 14px.
- Two tracking tokens only: `--tracking-label: 0.16em`, `--tracking-nav: 0.25em`.
- Prose measure capped (About about 64ch, Contact headline 24ch).
- `.font-light` renders as 400 on light themes.

## Deploy and secrets

- `netlify.toml` at repo root: base `react`, publish `dist`, Node 22, SPA
  redirect, cache headers.
- Netlify functions in `react/netlify/functions`:
  - `contact.mjs` serves `/api/contact`, sends via Brevo. Env `BREVO_API_KEY`.
  - `visits.mjs` serves `/api/visits`, Netlify Blobs store `visits`. Env
    `VISITS_KEY` (secret) gates GET. POST is open and called once per route
    change from `App.jsx` (skips `/stats`).
- `/stats?key=<VISITS_KEY>` shows visits and the theme picker. `robots.txt`
  disallows `/stats`; the page is `noindex`.
- Google Search Console is verified; `sitemap.xml` and `robots.txt` live in
  `react/public`.

## Local workflow

```bash
cd react
npm install
npm run dev              # http://localhost:5173
npm run build && npx vite preview --port 4173   # for screenshots
```

Screenshots were taken with Playwright against the preview server at 1366px
desktop and 390px phone. Restart the dev server after adding new image
folders; Vite does not pick them up live.

## Gotchas met so far

- `react/src/data/projects.js` is one big literal. After any scripted edit,
  syntax-check it with `node --check` or `new Function(src)`, because regex
  edits have twice swallowed a closing `},`.
- Figma embeds need `embed.figma.com`; prototypes need
  `&scaling=scale-down-width&content-scaling=fixed&hide-ui=1`.
- Tall process images: use `scroll: true` so they sit in a `max-h-[75vh]`
  frame; otherwise Reveal never fires.
- `.column` is `flex: 1` with no `col-5/7` rules; use explicit `lg:w-[...]`.
- `.text-h1` has a 500px and a 600px media rule; edit both for phone changes.
- Git ignores raw client packages (QUICKK, Finlinks, LehrerLinks folders,
  Noted PDFs/boards, Shortlist raw exports). Untracked Noted PNGs and the
  Hotel/ZenSip zips at root are intentional leftovers, not to be committed.

## Open items

- "How it's built" / "How it's designed" flow: owner rejected the pill-row +
  card-grid UI. Agreed replacement: a Framer-Motion-only animated system map
  (nodes with travelling pulse, caption per step, scenario tabs change the
  lit path, vertical on phones, design pages show stage thumbnails). Needs a
  `captions` array per code project and per design process step. Not started;
  owner has not said "go".
- Regenerate LinkedIn-post screenshots for the light theme; OG image on cream.
- Hotel App hi-fi exports and Game Accessories frames still missing.
- Confirm wording and name for the Modern Display owner review.
