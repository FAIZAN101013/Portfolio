# Portfolio — React + Tailwind rebuild

A rebuild of the static site at the repo root, in React 19 + Tailwind v4.
The original HTML/CSS/JS version is untouched and still deployable.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## How the design stayed identical

`src/index.css` ports the original `:root` block verbatim:

- `@theme` holds the colors, fonts and container widths, so Tailwind generates
  matching utilities (`bg-body`, `text-accent`, `font-display`, …).
- Tailwind's breakpoint scale is redefined onto the original's max-width
  values (500 / 600 / 800 / 1000 / 1200 / 1300 / 1600), so `max-lg:` here
  means exactly what `@media (max-width: 1000px)` means there.
- The spacing and typescale variables (`--vspace-*`, `--text-*`) stay as plain
  custom properties, because they are `calc()` chains off `--multiplier`, which
  changes at the 600px breakpoint.
- `html { font-size: 62.5% }` is preserved, so `1rem === 10px`. Tailwind's
  rem-based utilities land on the same pixel values the original CSS used —
  `gap-2` is 5px in both.
- The `.row` / `.column` grid is ported as-is: `.row` is **92%** wide and
  `.column` carries the horizontal gutter as padding. Those two rules set the
  left edge of every headline on the page.
- **Only the nav, intro and about rows are `.row--wide`** (1400px). Everything
  else — skills, timelines, works, contact, footer — is the default 1200px, as
  in `index.html`. Widening any of them knocks that section out of alignment
  with the footer.
- The accent rule (`.text-pretitle--line`) appears on the intro and about
  pretitles only. Other section headings are plain white.

Verified by measuring both sites in headless Chrome at 1366px — every section's
left edge matches to the pixel:

```
introPretitle  117 | aboutPretitle  645 | skillsPretitle 105
worksPretitle  105 | contactPretitle 105 | worksHeadline  103
contactHeadline 103 | footerText     103
```

### Three rules that will bite you

1. **Never put a Tailwind `w-*` utility on `.row` or `.column`.** Utilities
   outrank the components layer and silently collapse the gutter.
2. **Responsive column changes must use width utilities, not `col-*`.**
   `max-md:col-12` does nothing — Tailwind variants only apply to utilities it
   generates. Write `col-4 max-md:w-full` instead.
3. Inside `[...]` arbitrary values, `_` is Tailwind's space escape, so custom
   properties must be written `var(--vspace-1\_5)`.

## Motion

`src/lib/motion.js` transcribes the anime.js load timeline from `js/main.js`,
including its absolute offsets, so the entrance plays in the original's order:

```
header → intro pretitle → intro title → circles → social rail + scroll cue
```

Offsets are measured from the header's entrance, dropping the original's 1.6s
preloader head start (there is no blocking loader here). Everything after that
keeps the original's gaps, per-element staggers, durations and
`easeInOutCubic` easing.

**`HERO_SCALE` in `src/lib/motion.js` compresses the whole sequence.** Every
delay, duration and stagger scales by it, so the choreography is unchanged —
just faster. `1` is the original's pacing, which finishes around 4.5s; it is
set to **`0.6`**:

| | starts | ends |
| --- | --- | --- |
| header | 0.06s | 0.54s |
| intro pretitle | 0.54s | 1.02s |
| intro title | 0.78s | 1.26s |
| circles | 1.26s | 2.22s (last ring settled) |
| social rail + scroll cue | 2.22s | 2.70s |

The gold rings in `Circles.jsx` reproduce the anime keyframe step exactly: two
400ms legs (`0 → .3`, then `.3 → .1`), each with its own reverse 100ms
stagger, so the innermost ring lights up and settles first. Measured against
the original, peak values are identical and settle offsets match within 19ms.

The `Reveal` wrapper handles scroll reveals and opts out entirely under
`prefers-reduced-motion` rather than fading from a hidden state.

## Structure

```
src/
  components/   Header · Intro · About · Skills · Timelines · Projects
                ProjectCard · MediaGallery · Contact · Footer
                Preloader · Circles · Reveal · Icon
  pages/        Home · ProjectDetail
  data/         projects.js · skills.js · site.js
  hooks/        useScrollSpy · useReducedMotion
  lib/          asset.js · motion.js
```

Routes:

| path | renders |
| --- | --- |
| `/` | the single page, hash-scrolled |
| `/project/:id` | one detail page for **every** project, design or dev |
| `/design/:id` | redirects to `/project/:id` (the old `design-project.html`) |

There are no modals. Development and design projects open the same detail
layout, so both tabs behave identically; sections render only when the project
carries that data, which is what lets one template serve both shapes. Media is
an inline gallery with a thumbnail rail, and each page has prev/next links to
its siblings.

## Assets

Images and videos are **not** duplicated into `public/`. They stay at the repo
root so the legacy site keeps working; `vite.config.js` serves them from `../`
in dev and copies them into `dist/` at build time.

| Source | Served at |
| --- | --- |
| `../images/` | `/images/` |
| `../Project video/*.{mp4,webm}` | `/project-video/` |

## Deviations from the original

- **`CRM ADMIN.mkv` → `crm-admin.mp4`.** No browser can decode Matroska; that
  video never played. Transcoded with ffmpeg; the `.mkv` is excluded from builds.
- **`Journey Map & Scenario.png` → `Journey Map - Scenario.png`.** The `&` broke
  Vite's static file server. Renamed on disk; `js/projects-data.js` was updated
  to match so the legacy site keeps working.
- **Removed 4 dead image references** on the Game Accessories case study
  (`wireframe1/2.png`, `research1/2.png` were never committed).
- **Pretitle rule alignment.** The stylesheet sets
  `transform: translateX(-6rem)` on `.text-pretitle.with-line`, but anime.js
  overwrote that inline on every load, so the shipped site renders the rule
  flush with the column edge. The port matches what ships, not what the CSS says.
- **Nav breakpoint moved 800px → 1000px.** Between those widths the original's
  six nav labels wrapped to a second line and broke the header's fixed 6.4rem
  height. The drawer now takes over before that happens.
- **Project details are a page, not a popup** — see Structure above.
- **Accessibility.** Visible focus rings, `aria-current` on the active nav item,
  `role="tab"`/`tabpanel` on the project tabs, keyboard-pageable gallery,
  labelled controls, `prefers-reduced-motion` honoured in CSS *and* JS motion.

## Verification

`npm run build` is clean and code-split:

```
index.html    1.46 kB │ gzip:  0.68 kB
index.css    50.70 kB │ gzip:  9.51 kB
vendor.js    48.39 kB │ gzip: 17.14 kB   react + react-dom + router
motion.js   127.16 kB │ gzip: 41.87 kB   framer-motion
index.js    233.03 kB │ gzip: 73.05 kB   app
```

Checked in headless Chrome at 1600 / 1366 / 820 / 390px, on the home page and
on a project detail page: no page errors, no failing local requests, no
horizontal overflow, no broken images, exactly one `<footer>`, no dialogs
anywhere, cards navigate instead of opening popups, the gallery and prev/next
pager work, the legacy `/design/:id` redirect resolves, and the mobile menu
closes on Escape.
