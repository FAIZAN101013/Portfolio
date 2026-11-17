/**
 * Project data — ported from js/projects-data.js.
 *
 * Path changes vs. the original:
 *   "images/..."        -> "/images/..."          (served from public root)
 *   "Project video/..." -> "/project-video/..."   (space removed; see vite.config.js)
 *   "CRM ADMIN.mkv"     -> "crm-admin.mp4"        (.mkv is unplayable in browsers)
 */

export const projects = [
  {
    id: 'modal-01',
    brief:
      'Marketing site for a Pune manufacturer of luxury jewellery packaging, supplying 430+ brands. Built solo: an animated one-page site with a quote form that emails the team, and nothing for them to maintain.',
    facts: { Role: 'Sole developer, design to deploy', Client: 'Orniva Packaging, Pune', Year: '2026', Status: 'Live on client domain' },
    title: 'Orniva Packaging',
    category: 'Freelance Project',
    liveDemo: 'https://www.ornivapackaging.com/',
    tags: ['project', 'freelance'],
    featured: true,
    media: [
      { type: 'image', src: '/images/orniva/Screenshot (1636).png' },
      { type: 'image', src: '/images/orniva/Screenshot (1613).png' },
      { type: 'image', src: '/images/orniva/Screenshot (1614).png' },
      { type: 'image', src: '/images/orniva/Screenshot (1615).png' },
      { type: 'image', src: '/images/orniva/Screenshot (1616).png' },
      { type: 'image', src: '/images/orniva/Screenshot (1618).png' },
      { type: 'image', src: '/images/orniva/Screenshot (1620).png' },
    ],
    description:
      'Marketing site for Orniva Packaging — a Pune manufacturer of luxury jewelry boxes, cases, trays and pouches. Built end to end as the sole developer: an animated one-page site backed by an enquiry API that emails every quote request straight to the team, with nothing to host but the site itself — no database, no admin, no maintenance. Live: <a href="https://www.ornivapackaging.com/" target="_blank" rel="noopener noreferrer">ornivapackaging.com</a>',
    problemStatement: `A manufacturer supplying 430+ brands had no real web presence. They didn't need an online shop — they needed a site that presents the craft well enough for luxury clients and turns visitors into quote enquiries, without saddling a non-technical team with anything to maintain.`,
    result: `Delivered solo, from design to deployment, and running live for the client. The enquiry pipeline is deliberately stateless — form → API → email via Resend, nothing stored — so there is no database to break and nothing for the client to operate. My first production freelance build where the architecture decision was about the client's maintenance budget, not the tech.`,
    features: [
      'Animated single-page marketing site with catalogue, craft and gallery sections',
      'Quote form wired to an Express enquiry API that emails the team via Resend',
      'Zero-database architecture — nothing stored, nothing to maintain',
      'Cookie consent and analytics measured only with permission',
      'Responsive, SEO-ready and deployed on the client’s own domain',
    ],
    techStack: ['React 19', 'Vite', 'Tailwind CSS v4', 'Anime.js', 'Express 5', 'Resend'],
  },
  {
    id: 'modal-02',
    brief:
      'Public catalogue and enquiry form for a jewellery display manufacturer, plus a CRM behind a login where every enquiry becomes a tracked lead. Two products, one codebase, built solo.',
    facts: { Role: 'Sole developer, design to deploy', Client: 'Modern Display, Mumbai', Year: '2026', Status: 'Live on client domain' },
    title: 'Modern Display',
    category: 'Freelance Project',
    githubLink: 'https://github.com/kundanpandey11/project-jewel',
    liveDemo: 'https://moderndisplay.store/',
    tags: ['project', 'freelance'],
    featured: true,
    media: [
      { type: 'image', src: '/images/moderndisplay/Screenshot (1623).png' },
      { type: 'image', src: '/images/moderndisplay/Screenshot (1624).png' },
      { type: 'image', src: '/images/moderndisplay/Screenshot (1626).png' },
      { type: 'image', src: '/images/moderndisplay/Screenshot (1628).png' },
      { type: 'image', src: '/images/moderndisplay/Screenshot (1630).png' },
      { type: 'image', src: '/images/moderndisplay/Screenshot (1632).png' },
      { type: 'image', src: '/images/moderndisplay/Screenshot (1634).png' },
    ],
    description:
      'Marketing site and business console for Modern Display — a manufacturer of luxury jewellery displays and packaging. Two products in one codebase, built solo: the public catalogue with an enquiry form (trade and wholesale only — no cart, no checkout, by design), and a full CRM behind a login where those enquiries become leads — a pipeline that tracks every enquiry from new to quoted, quote and note management on each lead, user administration with role-based access, and an audit trail of every change. Live: <a href="https://moderndisplay.store/" target="_blank" rel="noopener noreferrer">moderndisplay.store</a>',
    problemStatement: `A trade manufacturer doesn't sell to consumers, so an online shop was the wrong product. The house needed its catalogue to bring in qualified wholesale enquiries — and then a real system for handling them, because enquiries scattered across inboxes don't become quotes.`,
    result: `Shipped both halves solo and live on the client's domain — the enquiry-first public site and the console their team actually works in. The biggest freelance step up so far: modelling a sales pipeline with Prisma and PostgreSQL, protecting the console with NextAuth and role-based access, and keeping an audit trail of every change.`,
    features: [
      'Public catalogue and enquiry form — trade and wholesale only, no checkout by design',
      'CRM lead pipeline — every enquiry tracked from new through quoted',
      'Quote and note management on each lead',
      'User management with role-based access and a full audit trail, behind NextAuth login',
      'PostgreSQL data layer via Prisma',
      'Form validation with React Hook Form and Zod',
      'End-to-end tests with Playwright',
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind CSS', 'Zod', 'Playwright'],
  },
  {
    id: 'modal-03',
    brief:
      'Your whole job search in one place: track applications, score your resume against each job description, prepare for interviews, and let AI write the follow-ups.',
    facts: { Role: 'Designer & developer', Stack: 'React, Supabase', Year: '2026', Status: 'Live, free to use' },
    title: 'Shortlist',
    category: 'AI Career Management Platform',
    githubLink: 'https://github.com/FAIZAN101013/resume-optimizer',
    liveDemo: 'https://shortlist-in.vercel.app/',
    tags: ['project'],
    featured: true,
    media: [
      { type: 'video', src: '/project-video/shortlist-loop.mp4' },
      { type: 'image', src: '/images/shortlist/hero.jpg' },
      { type: 'image', src: '/images/shortlist/app-dashboard.jpg' },
      { type: 'image', src: '/images/shortlist/app-tracker.jpg' },
      { type: 'image', src: '/images/shortlist/app-optimizer.jpg' },
      { type: 'image', src: '/images/shortlist/app-builder.jpg' },
      { type: 'image', src: '/images/shortlist/app-assistant.jpg' },
      { type: 'image', src: '/images/shortlist/pipeline.jpg' },
      { type: 'image', src: '/images/shortlist/modules.jpg' },
      { type: 'image', src: '/images/shortlist/paste-once.jpg' },
    ],
    description:
      'Shortlist is an AI-powered career management platform that keeps your whole job search in one place — track applications, tailor your resume to each job with AI, prepare for interviews, and see what is actually working. Live demo: <a href="https://shortlist-in.vercel.app/" target="_blank" rel="noopener noreferrer">https://shortlist-in.vercel.app/</a>',
    problemStatement: `Job seekers juggle applications across spreadsheets, email threads and sticky notes — statuses get lost, follow-ups slip, and nothing shows what's actually working. Shortlist set out to put the whole search in one place: every application tracked from Applied to Offer, with AI handling the repetitive communication around it.`,
    learning: `Built to level up on Supabase as a full backend — auth with email and Google OAuth, protected routes, and per-user data — and on shipping a SaaS-style product end to end: landing page, dashboard, and an AI writing feature that people can actually use.`,
    features: [
      'Job tracker with Applied → Interview → Offer → Rejected stages and CSV export',
      'AI email assistant for follow-ups, thank-yous, and interview confirmations',
      'Email/password and Google Sign-In with protected routes',
      'Dashboard with application overview, status breakdown, and career insights',
      'Modern SaaS design with dark/light themes and mobile optimization',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'Google OAuth', 'Framer Motion'],
  },
  {
    id: 'modal-04',
    title: 'ShopNGo',
    category: 'E-commerce Web App',
    githubLink: 'https://github.com/FAIZAN101013/ShopNGo',
    liveDemo: 'https://shop-n-go.vercel.app/',
    tags: ['project'],
    media: [
      { type: 'video', src: '/project-video/ShopNGo.mp4' },
      { type: 'image', src: '/images/ShopNGo1.png' },
      { type: 'image', src: '/images/ShopNGo2.png' },
    ],
    description:
      'A full-featured MERN Stack e-commerce platform with secure payment integration. Also find the live demo at <a href="https://shop-n-go.vercel.app/" target="_blank" rel="noopener noreferrer">https://shop-n-go.vercel.app/</a>',
    problemStatement: `Build a complete e-commerce flow — browsing, search, cart, checkout and an admin back office — as one MERN application, with the hard part done properly: taking real payments securely through Stripe and Razorpay and keeping order state consistent from checkout to delivery tracking.`,
    learning: `My deep dive into the MERN stack. The biggest upskill was payment integration — wiring Stripe and Razorpay checkouts and learning how much care order state needs once real money is involved — plus building an admin side, not just the customer-facing store.`,
    features: [
      'User authentication and profile management',
      'Product catalog with search and filters',
      'Shopping cart and wishlist functionality',
      'Secure checkout with Stripe and Razorpay',
      'Admin dashboard for product management',
      'Order tracking and history',
    ],
    techStack: ['React JS', 'MongoDB', 'Express JS', 'Node JS', 'Stripe', 'Razorpay'],
  },
  {
    id: 'modal-13',
    preview: '/project-video/noted-hero-loop.mp4',
    brief:
      'A personal expense tracker for India: log a spend in two taps, see what is safe to spend today, and split bills over UPI links. Designed end to end in Figma, then built.',
    facts: {
      Role: 'Product designer & developer',
      Tools: 'Figma, React, Tailwind',
      Year: '2026',
      Deliverables: 'Brand identity, design system, 54 screens, landing page',
    },
    decision: `Capture a real expense before asking for an account, so the first thing a new user does is the thing the app is for. Put one number on the home screen, "safe to spend today", instead of a dashboard. Let friends pay a split through a link so they never need the app. And design the unhappy paths first: offline, sync failed, nothing logged yet, payment declined, because that is most of what a finance app actually shows.`,
    process: [
      {
        title: 'Brand identity',
        text: 'A mark that draws an N inside a rounded tile, with a lime tick for the entry you just made. Nine-page guidelines cover logo versions, clear space, colour, type, iconography and voice.',
        images: [
          { src: '/images/noted/brand/brand-logo.jpg', caption: 'The mark, construction and logo versions' },
          { src: '/images/noted/brand/brand-colour.jpg', caption: 'Clear space and misuse, and the palette' },
        ],
      },
      {
        title: 'Voice',
        text: 'Noted talks like a friend who is good with money: short, specific, never preachy. Every message in the app was written against four rules before any screen was drawn.',
        images: [{ src: '/images/noted/brand/brand-voice.jpg', caption: 'Voice and tone, and the brand in the product' }],
      },
      {
        title: 'Design system',
        text: 'Tokens and components used across all 54 screens: colour roles, a type scale with tabular numbers for every amount, spacing, buttons, inputs, cards, navigation and feedback states.',
        images: [
          { src: '/images/noted/brand/system-colour.jpg', caption: 'Colour roles: brand, text, surfaces, success, warning, danger' },
          { src: '/images/noted/brand/system-cards.jpg', caption: 'Cards, lists, navigation and feedback' },
        ],
      },
      {
        title: 'Icons',
        text: 'Phosphor icons in three weights with one job each: regular for controls, duotone for categories, fill for the active tab.',
        images: [{ src: '/images/noted/brand/icons-regular.jpg', caption: 'The regular set' }],
      },
      {
        title: 'Onboarding that earns the sign-up',
        text: 'Three steps: log one spend, set a monthly number, then save progress. The account is asked for after the app has already been useful.',
        images: [
          { src: '/images/noted/Container-1.png', caption: 'Step 1: the first expense' },
          { src: '/images/noted/Container-2.png', caption: 'Step 2: a monthly budget, turned into a daily number' },
        ],
      },
      {
        title: 'Splits without the app',
        text: 'A split sends each friend a UPI payment link. Their share counts against your budget until they pay, then drops back.',
        images: [],
      },
    ],
    title: 'Noted — Expense Tracker',
    category: 'Mobile App & Landing Page',
    liveDemo: 'https://getnoted-app.netlify.app/',
    githubLink: 'https://github.com/FAIZAN101013/noted',
    prototypeLink:
      'https://www.figma.com/design/RH2NGwUR4PUsPh5mgzn1s6/Noted---Expense-Tracker?node-id=44-14367&t=kRoEFssKdXUdGoJO-1',
    embedUrl:
      'https://embed.figma.com/design/RH2NGwUR4PUsPh5mgzn1s6/Noted---Expense-Tracker?node-id=44-14367&embed-host=share',
    tags: ['project', 'design'],
    media: [
      { type: 'video', src: '/project-video/noted-promo.mp4' },
      { type: 'image', src: '/images/noted/landing-hero.jpg' },
      { type: 'image', src: '/images/noted/landing-how.jpg' },
      { type: 'image', src: '/images/noted/Container.png' },
      { type: 'image', src: '/images/noted/3 (1).png' },
      { type: 'image', src: '/images/noted/Container-1.png' },
      { type: 'image', src: '/images/noted/Container-2.png' },
      { type: 'image', src: '/images/noted/3 (5).png' },
      { type: 'image', src: '/images/noted/3 (6).png' },
      { type: 'image', src: '/images/noted/3 (3).png' },
      { type: 'image', src: '/images/noted/3 (8).png' },
      { type: 'image', src: '/images/noted/3 (11).png' },
      { type: 'image', src: '/images/noted/4 (4).png' },
      { type: 'image', src: '/images/noted/4 (7).png' },
      { type: 'image', src: '/images/noted/4 (3).png' },
    ],
    description:
      'Noted is a personal expense tracker for India: log a spend in two taps, see what is safe to spend today, split bills with friends over UPI links, and get budget alerts before you go over. I designed the whole product in Figma — logo, 60+ screens across onboarding, budgets, goals, splits, paywall and empty states — and built the landing page that ships it. Live: <a href="https://getnoted-app.netlify.app/" target="_blank" rel="noopener noreferrer">getnoted-app.netlify.app</a>',
    problemStatement: `Most expense apps either ask for bank access up front or bury the one number people care about: how much can I spend today? Noted had to work with no sign-up, make the first entry take seconds, and handle the messy real-world case of splitting a dinner with friends who do not have the app.`,
    research: `Mapped the full journey from first expense to getting paid back, then designed every state along it — onboarding that captures a real entry before asking for an account, a "safe to spend today" number that does the budgeting math, split flows where friends pay via a UPI link without installing anything, plus offline, sync-failed, empty and paywall states.`,
    result: `A complete Figma design system and screen set, a branded logo and icon, and a live landing page built in React. The Android app walkthrough is coming next.`,
    learning: `First project where I owned the product end to end: brand, UX research, a full screen inventory in Figma, and the marketing site — and learned how much of app design is the edge cases, not the happy path.`,
    features: [
      'Two-tap expense entry with category chips and a numeric keypad',
      '"Safe to spend today" budgeting with per-category alerts at 80%',
      'Split bills: equal, custom or share-based, settled via UPI payment links',
      'Savings goals with auto-save, insights, recurring payments and monthly reports',
      'Offline-first states, sync recovery and a free vs Plus paywall',
      'Landing page with download CTA, how-it-works and feature sections',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Netlify'],
    tools: ['Figma'],
  },
  {
    id: 'modal-14',
    brief:
      'Three landing pages built as pitches for prospective clients. The deals did not close, but each is a complete, live, production-quality page.',
    facts: { Role: 'Designer & developer', Pages: '3 live sites, 2 versions of one', Year: '2026', Status: 'Live on Vercel' },
    title: 'Landing Page Pitches',
    category: 'Landing Pages',
    liveDemo: 'https://solar-website-sage.vercel.app/',
    githubLink: 'https://github.com/FAIZAN101013/solar-website',
    // Several pages in one project: the buttons open a menu of these.
    liveLinks: [
      { label: 'The Solar Co. — Version A', note: 'Light hero', url: 'https://solar-website-sage.vercel.app/' },
      { label: 'The Solar Co. — Version B', note: 'Video hero', url: 'https://solar-website-sage.vercel.app/b.html' },
      { label: 'Solar Shop hero gallery', note: '22 concepts, 10 rounds', url: 'https://solarshophero.vercel.app/' },
      { label: 'Vybemation', note: 'Hero concept', url: 'https://vybemation.vercel.app/' },
    ],
    codeLinks: [
      { label: 'The Solar Co.', note: 'React + Vite + GSAP', url: 'https://github.com/FAIZAN101013/solar-website' },
      { label: 'Vybemation', note: 'HTML/CSS', url: 'https://github.com/FAIZAN101013/Vybemation' },
    ],
    tags: ['project'],
    media: [
      { type: 'image', src: '/images/landing-pitches/solar-hero.jpg' },
      { type: 'image', src: '/images/landing-pitches/solar-prices.jpg' },
      { type: 'image', src: '/images/landing-pitches/solar-how.jpg' },
      { type: 'image', src: '/images/landing-pitches/solar-b-hero.jpg' },
      { type: 'image', src: '/images/landing-pitches/solar-b-section.jpg' },
      { type: 'image', src: '/images/landing-pitches/vybemation-hero.jpg' },
      { type: 'image', src: '/images/landing-pitches/vybemation-system.jpg' },
      { type: 'image', src: '/images/landing-pitches/solarshop-gallery.jpg' },
      { type: 'image', src: '/images/landing-pitches/solarshop-rounds.jpg' },
    ],
    description:
      'Three landing pages built as pitches for prospective clients. The deals did not close, but each one is a complete, live, production-quality page. <strong>The Solar Co.</strong> — a conversion-focused site for a New Zealand solar installer with a lead form, pricing argument and how-it-works walkthrough, delivered in two hero versions for the client to choose from: <a href="https://solar-website-sage.vercel.app/" target="_blank" rel="noopener noreferrer">Version A (light hero)</a> · <a href="https://solar-website-sage.vercel.app/b.html" target="_blank" rel="noopener noreferrer">Version B (video hero)</a> · <a href="https://github.com/FAIZAN101013/solar-website" target="_blank" rel="noopener noreferrer">code</a>. <strong>Solar Shop hero gallery</strong> — a client presentation site collecting 22 hero concepts across 10 design rounds, with desktop, mobile and style-token variations: <a href="https://solarshophero.vercel.app/" target="_blank" rel="noopener noreferrer">live</a>. <strong>Vybemation</strong> — a hero concept for a note-to-automation product, with a pinned scroll story that turns a handwritten note into running code: <a href="https://vybemation.vercel.app/" target="_blank" rel="noopener noreferrer">live</a> · <a href="https://github.com/FAIZAN101013/Vybemation" target="_blank" rel="noopener noreferrer">code</a>.',
    problemStatement: `Each prospect needed to see the idea working, not a mockup. The brief was to build a real landing page fast enough to pitch with, strong enough to convert if it shipped, and specific to the client’s business: a solar installer selling quotes, a solar retailer reviewing hero directions, and a startup explaining an abstract product.`,
    result: `Three live pages, each built in days. The Solar Co. page carries the full sales argument from the 80% bill-cut headline to a three-field quote form. The Solar Shop gallery turned 10 rounds of hero iterations into a browsable presentation the client could review on their own. Vybemation uses a scroll-pinned sequence to make "write a sentence, get working Python" tangible. None of the clients signed, but the pages became my fastest proof of what I can deliver before a contract exists.`,
    learning: `Pitch work taught me to scope for the decision, not the launch: lead with the one promise the client sells on, keep every section earning its place, and make the page good enough to ship so the only open question is the deal itself.`,
    features: [
      'The Solar Co.: two hero versions (light and video), lead-capture form, price-history chart, six-step how-it-works, testimonials and FAQ',
      'Solar Shop: searchable gallery of 22 hero concepts across 10 rounds with desktop and mobile frames',
      'Vybemation: scroll-pinned hero that animates a handwritten note into generated code',
      'Fully responsive, deployed on Vercel, each built in a few days',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'GSAP', 'HTML/CSS', 'Vercel'],
  },
  {
    id: 'modal-05',
    title: 'Admin CRM',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/Admin-CRM',
    liveDemo: 'https://admin-crm-one.vercel.app/',
    tags: ['project'],
    media: [
      { type: 'video', src: '/project-video/crm-admin.mp4' },
      { type: 'image', src: '/images/Crm/Screenshot (350).png' },
      { type: 'image', src: '/images/Crm/Screenshot (351).png' },
      { type: 'image', src: '/images/Crm/Screenshot (352).png' },
    ],
    description:
      'Admin CRM is a comprehensive Customer Relationship Management platform for businesses to manage clients, sales, and support. Features include dashboards, analytics, and user management. <br>Live demo: <a href="https://admin-crm-one.vercel.app/" target="_blank" rel="noopener noreferrer">https://admin-crm-one.vercel.app/</a>',
    problemStatement: `Small businesses track clients in one tool, sales in another and support in a third, so nobody sees the full relationship. Admin CRM brings clients, pipeline, tasks and analytics into a single dashboard, with roles and permissions so each team member sees exactly what they should.`,
    learning: `An upskilling project in structuring a larger React app: role-based access with JWTs, dashboard analytics with Chart.js, and keeping a growing codebase organised once it's more than a handful of components.`,
    features: [
      'Client and contact management',
      'Sales pipeline tracking',
      'Task and activity management',
      'Analytics dashboard',
      'User roles and permissions',
      'Responsive UI',
    ],
    techStack: ['React JS', 'Node.js', 'Express', 'MongoDB', 'JWT Auth', 'Chart.js'],
  }
  ,
  {
    id: 'modal-06',
    title: 'HandyMan',
    category: 'Service Booking Platform',
    githubLink: 'https://handymangunicorn-handyman-wsgi.onrender.com/',
    tags: ['project'],
    media: [
      { type: 'image', src: '/images/handyman/Home.jpeg' },
      { type: 'video', src: '/project-video/HandyMan.mp4' },
      { type: 'image', src: '/images/handyman/order.jpeg' },
      { type: 'image', src: '/images/handyman/list.jpeg' },
      { type: 'image', src: '/images/handyman/work.png' },
    ],
    description:
      'Handyman is a web application that connects skilled workers such as plumbers, electricians, and carpenters with consumers seeking their services.',
    problemStatement: `Finding a trustworthy local plumber, electrician or carpenter still runs on word of mouth — and skilled workers have no easy way to be found. HandyMan connects the two sides: providers register their services, and consumers search by location, book, and judge quality from real reviews.`,
    learning: `One of my first full-stack builds — where I learned to connect a plain HTML/CSS/JavaScript frontend to a Node/Express/MongoDB backend, model a two-sided marketplace (providers and consumers), and design a booking flow.`,
    features: [
      'Service provider registration',
      'Service booking system',
      'User reviews and ratings',
      'Location-based search',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'modal-07',
    title: 'The Subreddit Vibe Check',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/subreddit-vibe-check',
    liveDemo: 'https://subreddit-vibe-check-nu.vercel.app/',
    tags: ['project'],
    media: [{ type: 'image', src: '/images/subreddit-vibe-check/home.png' }],
    description:
      'Discover the mood of a subreddit — fetches the 50 hottest posts from any subreddit and scores each title’s emotional tone right in the browser, with a three-tier OAuth/JSON/RSS fallback for Reddit data. Live demo: <a href="https://subreddit-vibe-check-nu.vercel.app/" target="_blank" rel="noopener noreferrer">https://subreddit-vibe-check-nu.vercel.app/</a> · Read the full case study: <a href="https://github.com/FAIZAN101013/subreddit-vibe-check/blob/main/ENGINEERING_NOTES.md" target="_blank" rel="noopener noreferrer">Engineering Notes — The 403 Investigation</a>',
    problemStatement: `Every documented way to read a subreddit returned 403 Forbidden — the public JSON API, api.reddit.com, even oauth.reddit.com without a token. Spoofing a full set of Chrome headers changed nothing, so the app's data source was dead before the first feature was built.`,
    research: `The obvious explanation was that Reddit blocks datacenter IPs. I tested it directly: the same request from a browser on a home connection returned 200, but the identical request from Node on the same machine and same connection still got 403 — ruling out the network entirely and pointing at TLS client fingerprinting plus session cookies. Fetching from the user's browser was also tested and failed for two independent reasons: no CORS header, and cookies don't cross origins. A server-side proxy wasn't a preference — it was mandatory.`,
    result: `The final architecture is a three-tier fallback behind one /api/reddit endpoint: OAuth first, the public JSON second, and Reddit's RSS feed last — with 404s and authenticated 403s short-circuiting into clear errors instead of vague ones, failures never cached, and the UI naming its data source when it degrades. Sentiment uses AFINN comparative scoring (per-word, with a ±0.08 neutral dead zone) so long titles don't score higher just by being long. Biggest lesson: optional chaining plus '|| []' silently converted a wrong-shape bug into an empty page — defensive defaults can hide real failures.`,
    features: [
      'Sentiment badge (positive / neutral / negative) on every post',
      'Summary stats and sentiment distribution visualization',
      'Filter the feed by sentiment category',
      'Post metadata: score, comments, flair, and Reddit links',
      'Loading skeletons and clear errors for invalid or private subreddits',
    ],
    techStack: ['React 19', 'Vite', 'sentiment (AFINN-165)', 'Vercel Serverless', 'Reddit API'],
  },
  {
    id: 'modal-08',
    title: 'MoviesX',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/moviesx',
    tags: ['project'],
    media: [
      { type: 'image', src: '/images/moviesx/mov1.png' },
      { type: 'image', src: '/images/moviesx/mov2.png' },
    ],
    description: `MOVIEX - Movie Explorer App  A simple movie explorer web app built with React.js and TMDB API. Browse popular movies, search for films, and manage your favorites with a sleek UI. 🚀`,
    problemStatement: `Build a fast, pleasant way to browse and search movies on top of a third-party API (TMDB) — including favorites that survive a page reload — without any backend at all, using React state patterns and LocalStorage to do the persistence.`,
    learning: `Upskilled on working against a third-party API: reading TMDB's docs, handling loading and error states properly, sharing state with Context instead of prop-drilling, and persisting favorites in LocalStorage.`,
    features: [
      ' Browse popular movies from The Movie Database (TMDB)',
      ' Search for movies by title',
      ' Add movies to your Favorites and manage them easily',
      ' Beautiful and responsive UI',
      ' Built with React.js and Context API',
    ],
    techStack: ['React.js', 'Tailwind CSS', 'TMDB API', 'LocalStorage'],
  },
  {
    id: 'modal-09',
    title: 'Task Tracker',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/task-tracker',
    liveDemo: 'https://task-tracker-six-plum-38.vercel.app/',
    tags: ['project'],
    media: [{ type: 'image', src: '/images/task-tracker/home.png' }],
    description:
      'A full-stack MERN task manager with cookie-based JWT authentication — each user gets their own private workspace with database-level security. Live demo: <a href="https://task-tracker-six-plum-38.vercel.app/" target="_blank" rel="noopener noreferrer">https://task-tracker-six-plum-38.vercel.app/</a>',
    problemStatement: `Most todo-app demos skip real security — tokens in localStorage, every user seeing the same data. Task Tracker treats auth as the core feature: JWTs live in httpOnly cookies where scripts can't read them, and every database query is scoped to its owner so each user gets a genuinely private workspace.`,
    learning: `Built specifically to upskill on production-grade auth: httpOnly JWT cookies instead of localStorage tokens, CORS with credentials across separate frontend and API deployments (Vercel + Render), and scoping every query to its owner at the database level.`,
    features: [
      'Register, login, and logout with httpOnly JWT cookies',
      'Edit profile, change password, and delete account',
      'Task CRUD with status, priority levels, and due dates',
      'Light/dark theme with responsive design',
      'Per-user task statistics',
    ],
    techStack: ['React 19', 'Vite', 'React Router 7', 'Node.js', 'Express 5', 'MongoDB Atlas', 'JWT'],
  },
  {
    id: 'modal-10',
    title: 'Rutuja Portfolio',
    category: 'Freelance Project',
    githubLink: 'https://github.com/FAIZAN101013/rutuja-portfolio',
    liveDemo: 'https://rutujaapatil-form.vercel.app/',
    tags: ['project', 'freelance'],
    media: [{ type: 'image', src: '/images/rutuja-portfolio/booking.png' }],
    description:
      'My first freelance project — a session-booking page built for a client: a simple form wired to an API. Live site: <a href="https://rutujaapatil-form.vercel.app/" target="_blank" rel="noopener noreferrer">https://rutujaapatil-form.vercel.app/</a>',
    problemStatement: `The client was taking session bookings through Instagram DMs — details scattered, slots double-booked. She needed a simple page where people could book a session themselves: a clean form that collects the details and submits them to an API, nothing more.`,
    learning: `Less about code, more about freelancing itself: scoping a small job, communicating with a real client, and shipping something they actually use. Technically simple by design — the lesson was delivering, not over-engineering.`,
    features: ['Session booking form with client details', 'Form submission wired to an API', 'Responsive design'],
    techStack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'modal-11',
    title: 'TodoApp',
    category: 'Mobile Application',
    githubLink: 'https://github.com/FAIZAN101013/TodoApp',
    tags: ['project'],
    // No live demo (mobile app) — the demo video stands in for one.
    media: [
      { type: 'video', src: '/project-video/TodoApp.mp4' },
      { type: 'image', src: '/images/todoapp/home.png' },
    ],
    description:
      'A full-stack cross-platform todo app built with React Native and TypeScript. Users register, log in, and manage their personal tasks, backed by an Express and MongoDB API with authenticated routes.',
    problemStatement: `Take task management off the desktop: a cross-platform mobile app where tasks belong to an account, not a device — backed by an authenticated Express/MongoDB API so a user's list follows them across installs instead of living in local storage.`,
    learning: `My first React Native project — upskilling from web to mobile: screens and navigation instead of routes, TypeScript throughout, and reusing the Express/MongoDB API patterns I knew from the web against a mobile client.`,
    features: [
      'User registration and login',
      'Personal task list with create, update, and delete',
      'Authenticated REST API with protected routes',
      'Runs on both Android and iOS',
    ],
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'modal-12',
    title: 'Portfolio Website',
    category: 'Web Application',
    githubLink: 'https://faziansportfolio.netlify.app/',
    tags: ['project'],
    media: [{ type: 'image', src: '/images/portiflito.png' }],
    description: `A personal portfolio website showcasing my projects and skills.
This is a simple and clean portfolio website that showcases my projects and skills.
It is a single page website that is responsive and uses a modern design.
It is a static website that is built using HTML, CSS and JavaScript.
It is a responsive website that is built using Bootstrap.`,
    problemStatement: `Projects scattered across GitHub repos don't tell a story to a recruiter. This first portfolio put everything in one place — a single responsive page presenting projects and skills clearly, built with plain HTML, CSS and Bootstrap.`,
    learning: `Where the fundamentals got practised: semantic HTML, responsive layout with Bootstrap, and vanilla JavaScript for interactions — the foundation this whole portfolio was later rebuilt on.`,
    features: [
      'Responsive design',
      'Project showcase with modals',
      'Skills section',
      'Contact form',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  }
  ,

  /* ---------------------------- design ---------------------------- */

  {
    id: 'modal-figma-01',
    brief: 'A mobile shop for gaming accessories, designed to make comparing gear across platforms simple.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Research, personas, hi-fi prototype' },
    title: 'Game Accessories App (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [{ type: 'image', src: '/images/Game/Capture.PNG' }],
    // The original data pointed at wireframe1/2.png and research1/2.png, which
    // were never committed — they rendered as broken-image icons.
    wireframes: [],
    research: `Interviews with a handful of regular buyers and a look at how the big stores handle comparison. The pattern was clear: people open three tabs and build the comparison themselves. Personas and a journey map set the order of screens.`,
    researchImages: [],
    result: `Browse by platform first, compare side by side as a first-class screen, and a checkout kept to one page. In usability tests the compare task completed about 30% faster than the three-tab way people were already using.`,
    embedUrl:
      'https://embed.figma.com/proto/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=26-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=34%3A79&starting-point-node-id=26%3A2&embed-host=share',
    problemStatement: `Gamers buying accessories bounce between Amazon, brand sites and forums to compare a headset or a controller across PC, PlayStation and Xbox. The brief was one app where comparing is the main action, not a feature hidden behind search.`,
    description: `A Figma case study: research, wireframes and a high-fidelity prototype for a gaming accessories shop built around comparison.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=34-79&t=jYHCqdvQziuHIGCj-1',
  },
  {
    id: 'modal-figma-02',
    brief: 'A currency converter web app with live rates and a history chart, designed for daily use.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Wireframes, 4 screens, prototype' },
    title: 'CurrencyEx – Currency Converter UI',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [
      { type: 'image', src: '/images/New folder/Screenshot (354).png' },
      { type: 'image', src: '/images/New folder/Screenshot (355).png' },
      { type: 'image', src: '/images/New folder/Capture.PNG' },
      { type: 'image', src: '/images/New folder/Wrie frame/Capture.PNG' },
    ],
    wireframes: ['/images/New folder/Wrie frame/Capture.PNG'],
    research: `Started from the two things people check, today's rate and whether it has moved, and sketched layouts that put both above the fold. Wireframed before colour to settle the hierarchy.`,
    researchImages: [],
    result: `A single-screen converter with the amount field as the hero, a swap control between currencies, and a history chart underneath. Responsive from phone to desktop in one layout.`,
    embedUrl:
      'https://embed.figma.com/proto/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=27-105&m=dev&t=mmnZjnGxNLhRszDG-1&embed-host=share',
    problemStatement: `Most converter sites are ad-heavy and make you dig for the number. The brief was a converter you would open daily: amount in, result out, with the recent trend visible without a second click.`,
    description: `UI design in Figma for a currency converter: wireframes, a responsive layout and a clickable prototype.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/proto/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=37-19&p=f&t=C4eoW3oiRVXMO6yL-1&scaling=scale-down-width&content-scaling=fixed&page-id=27%3A105&starting-point-node-id=37%3A19',
  },
  {
    id: 'modal-figma-03',
    brief: 'A hotel landing page built to drive bookings, with a clear hierarchy and one call to action.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Landing page, prototype' },
    title: 'Hotel Landing Page (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [{ type: 'image', src: '/images/Hotel webpage UI/Home 2.png' }],
    wireframes: [],
    research: `Looked at how booking-first hotel sites place their search bar and how far down the fold the first room appears, then built the hierarchy around the check-availability form.`,
    researchImages: [],
    result: `A hero with the booking form inside it, rooms as the first scroll, then amenities, location and reviews, each with the same call to action. One visual language throughout so the page reads as calm rather than busy.`,
    embedUrl:
      'https://embed.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?page-id=0%3A1&node-id=2-2&viewport=396%2C95%2C0.1&t=0TW1mW1bgc5yxKjT-1&scaling=min-zoom&content-scaling=fixed&embed-host=share',
    problemStatement: `A hotel landing page has one job: get the visitor to check availability. The brief was a page where that action is impossible to miss, and the rooms, location and reviews support it instead of competing with it.`,
    description: `A Figma landing page for a hotel, designed around the booking form.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?page-id=0%3A1&node-id=2-2&viewport=396%2C95%2C0.1&t=0TW1mW1bgc5yxKjT-1&scaling=min-zoom&content-scaling=fixed',
  },
  {
    id: 'modal-figma-04',
    brief: 'A hotel booking app that takes a guest from search to a confirmed room in as few taps as possible.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Journey map, wireframes, 4 screens' },
    title: 'Hotel App (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [
      { type: 'image', src: '/images/Hotel App ui/wireframe/HOME.png' },
      { type: 'image', src: '/images/Hotel App ui/wireframe/Booking details.png' },
      { type: 'image', src: '/images/Hotel App ui/wireframe/Bokking calnder.png' },
      { type: 'image', src: '/images/Hotel App ui/wriefrma idea and user flow/user flow.png' },
    ],
    // "Wireframe Plan.png" lives under the user-flow folder, not /wireframe.
    wireframes: ['/images/Hotel App ui/wriefrma idea and user flow/Wireframe Plan.png'],
    research: `A journey map for a traveller booking a short trip exposed where people hesitate: price surprises at the last step and not knowing what the cancellation terms are. The wireframe plan maps every screen from home to cancellation before any visual design.`,
    researchImages: [
      '/images/Hotel App ui/Research/Journey Map - Scenario.png',
      '/images/Hotel App ui/Research/RESEARCH.png',
    ],
    result: `Search, hotel, room and confirmation as four screens, with the total price visible from the room screen onward and cancellation terms on the booking itself. Wireframes first, then the high-fidelity screens.`,
    embedUrl:
      'https://embed.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1&embed-host=share',
    problemStatement: `Booking a room on a phone usually means a long form, unclear totals and no way to see what was reserved afterwards. The brief was a booking app that gets a guest from search to a confirmed room with as few decisions as possible.`,
    description: `A Figma case study for a hotel booking app: journey map, wireframe plan and high-fidelity screens.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1',
  },
  {
    id: 'modal-figma-05',
    brief: 'A tea shop web app with a calm, unhurried ordering flow.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Desktop design, prototype' },
    title: 'ZenSip (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [{ type: 'image', src: '/images/tea/Desktop - 1.png' }],
    wireframes: [],
    research: `Collected references from speciality tea and coffee brands, then set a palette and type scale that stay quiet, and tested how much white space the catalogue could carry before it stopped feeling like a shop.`,
    researchImages: [],
    result: `A desktop design with generous spacing, a muted green and cream palette, and an ordering flow that stays within two screens. The calm comes from the layout, not from hiding the buttons.`,
    embedUrl:
      'https://embed.figma.com/design/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-137&t=IHoNTQ9Nhdrz4IDw-1&embed-host=share',
    problemStatement: `Tea shops online tend to look like any other store. The brief was an ordering experience that feels like the product: slow, calm and simple, without making the actual ordering slower.`,
    description: `A Figma web app design for a tea shop, built around a calm ordering flow.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-137&t=IHoNTQ9Nhdrz4IDw-1',
  },
]

export const getProjectsByTag = (tag) => projects.filter((p) => p.tags.includes(tag))

export const getFeaturedProjects = () => projects.filter((p) => p.featured)

export const getProjectById = (id) => projects.find((p) => p.id === id)

/** First still image, falling back to whatever media exists. */
export const getThumbnail = (project) =>
  (project.media.find((m) => m.type === 'image') ?? project.media[0])?.src ?? ''

/** Video to play on card hover: an explicit light `preview`, else the first
 *  video in the gallery, else nothing. */
export const getPreviewVideo = (project) =>
  project.preview ?? project.media.find((m) => m.type === 'video')?.src ?? null
