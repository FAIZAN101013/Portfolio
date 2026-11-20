# ARCHITECTURE

How the portfolio is put together. Paths are relative to `react/` unless they
start with `/`.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 19 + Vite 7 | Fast dev, static build, SPA routing |
| Styling | Tailwind CSS v4 (`@theme` tokens in `src/index.css`) | Utilities map 1:1 onto the original design tokens |
| Motion | Framer Motion 12 | Reveal, marquee, in-view triggers, toast; the only animation dependency |
| Routing | react-router-dom 7 | `/`, `/project/:id`, `/stats`, legacy `/design/:id` redirect |
| Hosting | Netlify | Free tier, functions, Blobs |
| Email | Brevo via `netlify/functions/contact.mjs` | No backend to run |
| Analytics | Netlify Blobs via `netlify/functions/visits.mjs` | Owner-only counter, no cookies, no third party |

No UI kit, no state library, no CMS. Content is plain JS data.

## Repo layout

```
/                      repo root
  netlify.toml         whole deploy config (base = react)
  images/              all project images (served as /images/*)
  Project video/       mp4/webm, remapped to /project-video/* at build
  index.html, css/, js/  legacy static site, untouched
  react/
    index.html         meta, JSON-LD Person, theme colour
    vite.config.js     tailwind plugin, static-copy of ../images and ../Project video, vendor/motion chunks
    public/            favicons, manifest, robots.txt, sitemap.xml, _redirects, QUICKK-Brand-Guide.pdf
    netlify/functions/ contact.mjs, visits.mjs
    src/
      main.jsx, App.jsx
      index.css        tokens, 10 themes, utilities, type scale
      data/            projects.js, site.js, skills.js
      pages/           Home.jsx, ProjectDetail.jsx, Stats.jsx
      components/      sections and primitives (see below)
      hooks/           useMediaQuery, useParallax, useReducedMotion, useScrollSpy
      lib/             asset.js, motion.js, seo.js
```

## Runtime flow

1. `main.jsx` mounts `App`.
2. `App.jsx` sets `document.documentElement.dataset.theme` from
   `localStorage.theme` or `'blend-light'`, posts one visit to `/api/visits`
   per pathname (not `/stats`), renders Header, routes, Footer, ProjectNudge.
3. `Home.jsx` stacks the sections: Intro, Projects, About, Services, Contact.
   Each uses `useSeo` for title and description and the scroll spy for nav
   state.
4. `ProjectDetail.jsx` looks the project up by id and renders one of two
   templates based on `tags`: the code template (gallery, brief, facts,
   "How it's built" architecture, features, tech stack, links) or the design
   template `DesignDetail` (research, process blocks, "How it's designed",
   Figma embeds, downloads). Related buttons cross-link the code and design
   versions of the same product (Noted).
5. `Stats.jsx` fetches `/api/visits?key=` and offers the theme picker.

## Data model: `src/data/projects.js`

One array of project objects. Important fields:

- `id` (`modal-NN` for code, `modal-figma-NN` for design), `title`,
  `category`, `tags` (`project` | `design` | `freelance`), `featured`.
- Media: `media` (gallery list), `cover` (card image), `preview` (card hover
  video), `embedUrl`, `prototypeLink`.
- Copy: `brief`, `facts`, `description`, `problemStatement`,
  `result` / `learning` / `decision`, `research`, `process[]`, `features`,
  `techStack`, `tools`.
- Links: `liveDemo`, `githubLink`, `liveLinks[]` / `codeLinks[]` (hover menus),
  `related`, `downloads`.
- Code pages: `architecture { summary, flow[], scenarios[], layers[], decisions[] }`.
- Design pages: `designSummary`, `designLayers[]`.

Helpers: `getThumbnail(project)` (uses `cover`), `getPreviewVideo(project)`.
`src/lib/asset.js` exports `asset(path)`, which resolves root-level images and
videos.

`site.js` holds personal info, `cvUrl` (Google Drive), `skillGroups`,
`experience`, `navLinks`. `skills.js` feeds the marquee.

## Components

Sections: `Intro` (hero plus rotating `LatestPill`), `Projects` (Code/Design
tabs, snap rail on phones), `ProjectCard`, `About` (paragraphs, skills
marquee, skills list, experience timeline), `Services` (offers, reviews
marquee, steps accordion), `Contact` (two-step form on phones, reads
`#contact?need=`), `Footer`, `Header`.

Primitives: `Reveal`, `TextReveal`, `Marquee`, `Disclosure` (mobile-only
collapsible), `Button`, `Icon`, `MediaGallery`, `Preloader`, `ScrollProgress`,
`Circles`, `ProjectNudge` (once-per-session toast).

Inside `ProjectDetail.jsx`: `Flow` (interactive step player shared by
`Architecture` and `DesignFlow`), `ProcessBlock`, `ActionButton`,
`ActionMenu`, `RelatedButton`, `Section`, `ImageBlock`, `PagerLink`,
`BackLink`.

## Theming

`--color-white` and `--color-black` are `@theme` tokens, so every existing
`text-white`, `bg-black/40`, `border-white/15` utility flips per theme without
touching components. Each theme is a `:root[data-theme="..."]` block in
`index.css` overriding the colour tokens plus a few `body` and `.btn` rules.
Themes: dark, cream, teal, chantilly, walnut, bondi, blend, blend-light
(default), blend-deep, blend-green.

## Type scale

`--text-size` is 19px, ratio 1.2. Tokens `--text-xs` (about 14px) through
`--text-xxl`, used as `text-(length:--text-sm)`. Tracking tokens
`--tracking-label` and `--tracking-nav`. Headline classes `.text-h1` and
`.text-pretitle`. Phone sizes are overridden at the 600px and 500px media rules.

## Responsive strategy

Tailwind breakpoints are redefined onto the original max-width scale
(500/600/800/1000/1200/1300/1600), so `max-lg:` means `max-width: 1000px`. A
custom `touch:` variant targets coarse pointers. Phones get horizontal snap
rails (`snap-rail`, `snap-card`, `no-scrollbar`, `mask-fade-x`), accordions
and `Disclosure` wrappers instead of long stacks; the home page is about 7k px
tall on a phone.

## SEO

`useSeo({ title, description, noindex })` sets the document title and meta per
route. `index.html` carries the JSON-LD Person block and OG tags. Sitemap and
robots are static in `public/`. `/stats` is noindexed and disallowed.

## Build and caching

Vite splits `vendor` (react, react-dom, router) and `motion` (framer-motion)
chunks. Netlify serves `/assets/*` immutable for a year and `/images/*` and
`/project-video/*` for a week.
