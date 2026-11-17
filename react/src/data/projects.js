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
    architecture: {
      summary: 'A static React site and a one-endpoint Express API. The only thing that runs on a server is the enquiry handler, and it stores nothing.',
      flow: ['Visitor', 'React site on Netlify', 'POST /enquiry', 'Express API', 'Resend', 'Client inbox'],
      layers: [
        { title: 'Frontend', items: ['React 19', 'Vite', 'Tailwind CSS v4', 'Anime.js'], note: 'Single page, sections animated on scroll, static build.' },
        { title: 'API', items: ['Express 5', 'Zod validation', 'Rate limit'], note: 'One route. Validates, sends the email, returns 200. No queue, no retries to manage.' },
        { title: 'Email', items: ['Resend', 'Branded HTML template'], note: 'Every enquiry lands in the team inbox with the form fields laid out.' },
        { title: 'Hosting', items: ['Netlify', 'Custom domain', 'HTTPS'], note: 'Free tier covers the traffic a manufacturer gets.' },
      ],
      decisions: [
        'No database. Enquiries are emails, so the client has nothing to log into or back up.',
        'Stateless API so a crash loses nothing and a redeploy fixes everything.',
        'Animations in Anime.js, not a heavy motion library, to keep the bundle small on mobile.',
        'Cookie consent before analytics, measured only with permission.',
      ],
    },
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
    architecture: {
      summary: 'One Next.js app with two faces: the public catalogue, and the CRM behind NextAuth. They share a PostgreSQL database through Prisma so an enquiry on the site is a lead in the console the same second.',
      flow: ['Buyer', 'Catalogue (Next.js)', 'Enquiry form', 'Server action', 'Prisma', 'PostgreSQL', 'CRM lead list'],
      layers: [
        { title: 'Frontend', items: ['Next.js App Router', 'Tailwind CSS', 'React Hook Form', 'Zod'], note: 'Public pages are server-rendered for SEO. The console is a client app behind a login.' },
        { title: 'Auth', items: ['NextAuth', 'Role-based access', 'Middleware'], note: 'Admin, sales and viewer roles. Routes and server actions check the role, not just the UI.' },
        { title: 'Data', items: ['PostgreSQL', 'Prisma', 'Audit log table'], note: 'Leads, quotes, notes, users. Every change writes an audit row with who, what and when.' },
        { title: 'Quality', items: ['Playwright e2e', 'Zod schemas', 'TypeScript'], note: 'End-to-end tests cover enquiry to lead to quote.' },
      ],
      decisions: [
        'No cart or checkout. Trade buyers want a quote, so the whole site funnels to one form.',
        'Enquiries become leads in a pipeline with explicit stages, so nothing sits in an inbox.',
        'Role checks on the server, so a hidden button is never the only protection.',
        'Audit trail from day one, because a sales console without history is unverifiable.',
      ],
    },
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
    architecture: {
      summary: 'A React single-page app on Supabase. Auth, the database and row-level security are Supabase; the AI features call a model through a small server function so the key never reaches the browser.',
      flow: ['User', 'React app', 'Supabase Auth', 'Postgres (RLS)', 'Edge function', 'AI model', 'Back to the UI'],
      layers: [
        { title: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'], note: 'Six modules in one app: tracker, optimizer, builder, prep, assistant, analytics.' },
        { title: 'Auth', items: ['Supabase Auth', 'Google OAuth', 'Protected routes'], note: 'Email and Google sign-in with persistent sessions.' },
        { title: 'Data', items: ['Postgres', 'Row-level security', 'CSV export'], note: 'Every row is scoped to its user by policy, not by application code.' },
        { title: 'AI', items: ['Server-side calls', 'Prompt per module', 'JD as shared context'], note: 'The job description pasted once feeds scoring, interview prep and emails.' },
      ],
      decisions: [
        'One source of truth: the job description in the tracker drives every other module.',
        'Row-level security so a bug in the UI cannot leak another user\u2019s data.',
        'AI calls go through a function, not the browser, so keys and prompts stay private.',
        'Free to use, so no billing code, which kept the scope shippable.',
      ],
    },
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
    architecture: {
      summary: 'A MERN store: React in front, Express and MongoDB behind, with Stripe and Razorpay for payment so Indian and international cards both work.',
      flow: ['Shopper', 'React app', 'Express API', 'MongoDB', 'Stripe / Razorpay', 'Order confirmed'],
      layers: [
        { title: 'Frontend', items: ['React', 'React Router', 'Context for cart'], note: 'Listings, search, filters and a cart held in context so it survives navigation.' },
        { title: 'API', items: ['Node', 'Express', 'REST routes'], note: 'Products, cart, orders and payment intents.' },
        { title: 'Data', items: ['MongoDB', 'Mongoose'], note: 'Products and orders as documents, which suits a catalogue that changes shape.' },
        { title: 'Payments', items: ['Stripe', 'Razorpay'], note: 'Two gateways behind one checkout so the buyer never sees the choice.' },
      ],
      decisions: [
        'Cart state in React Context rather than a store library, enough for one cart.',
        'Two payment providers to cover UPI and cards without forcing one on every buyer.',
      ],
    },
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
    title: 'Noted — Expense Tracker',
    category: 'Mobile App & Landing Page',
    liveDemo: 'https://getnoted-app.netlify.app/',
    githubLink: 'https://github.com/FAIZAN101013/noted',
    related: { id: 'modal-figma-06', label: 'See the design case study' },
    tags: ['project'],
    preview: '/project-video/noted-hero-loop.mp4',
    cover: '/images/noted/landing-hero.jpg',
    brief:
      'A personal expense tracker for India: log a spend in two taps, see what is safe to spend today, and split bills over UPI links. Landing page live, Android app in progress.',
    facts: { Role: 'Designer & developer', Stack: 'React, Vite, Tailwind', Year: '2026', Status: 'Landing page live, app in progress' },
    media: [
      { type: 'video', src: '/project-video/noted-promo.mp4' },
      { type: 'image', src: '/images/noted/landing-hero.jpg' },
      { type: 'image', src: '/images/noted/landing-how.jpg' },
      { type: 'image', src: '/images/noted/3 (1).png' },
      { type: 'image', src: '/images/noted/3 (5).png' },
      { type: 'image', src: '/images/noted/3 (3).png' },
      { type: 'image', src: '/images/noted/4 (4).png' },
      { type: 'image', src: '/images/noted/3 (8).png' },
      { type: 'image', src: '/images/noted/4 (7).png' },
    ],
    description: 'Noted is a personal expense tracker for India: log a spend in two taps, see what is safe to spend today, split bills with friends over UPI links, and get budget alerts before you go over. I designed the whole product in Figma — logo, 60+ screens across onboarding, budgets, goals, splits, paywall and empty states — and built the landing page that ships it. Live: <a href="https://getnoted-app.netlify.app/" target="_blank" rel="noopener noreferrer">getnoted-app.netlify.app</a>',
    problemStatement: `Most expense apps either ask for bank access up front or bury the one number people care about: how much can I spend today? Noted had to work with no sign-up, make the first entry take seconds, and handle the messy real-world case of splitting a dinner with friends who do not have the app.`,
    result: `Landing page shipped on Netlify with a download call to action, how-it-works and feature sections, and the promo film. The product is fully designed and the Android build is next. The brand, design system and all 54 screens are documented in the design case study.`,
    learning: `First project where I owned the product end to end: brand, UX research, a full screen inventory in Figma, and the marketing site — and learned how much of app design is the edge cases, not the happy path.`,
    architecture: {
      summary: 'The landing page is a static React site. The app is designed mobile-first for Android with an offline-first data model: entries live on the phone until the user chooses to back them up.',
      flow: ['Visitor', 'Landing page (React, Netlify)', 'Download', 'Android app', 'Local store', 'Optional sync'],
      layers: [
        { title: 'Landing page', items: ['React', 'Vite', 'Tailwind CSS'], note: 'Static, fast, one call to action. The promo plays inline.' },
        { title: 'App UI', items: ['Design system', 'Phosphor icons', 'Manrope'], note: 'Every screen built from the tokens and components in the design case study.' },
        { title: 'Data', items: ['Offline-first', 'Local store', 'Sync when signed in'], note: 'No sign-up to start. Entries stay on the device until the user opts in to backup.' },
        { title: 'Splits', items: ['UPI payment links', 'Shareable pages'], note: 'Friends pay through a link and never need the app.' },
      ],
      decisions: [
        'No account before the first entry, so the first thing a user does is the thing the app is for.',
        'Offline first, because a money app that needs a connection to log a chai is useless on the metro.',
        'Splits settle through UPI links, not in-app wallets, so there is nothing to top up or regulate.',
      ],
    },
    features: [
      'Two-tap expense entry with category chips and a numeric keypad',
      '"Safe to spend today" budgeting with per-category alerts at 80%',
      'Split bills: equal, custom or share-based, settled via UPI payment links',
      'Savings goals with auto-save, insights, recurring payments and monthly reports',
      'Offline-first states, sync recovery and a free vs Plus paywall',
      'Landing page with download CTA, how-it-works and feature sections',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Netlify'],
  },
  {
    id: 'modal-14',
    architecture: {
      summary: 'Three static sites. The Solar Co. is React with GSAP for scroll animation; Vybemation is hand-written HTML and CSS with a pinned scroll sequence; the Solar Shop gallery is a static index of design exports. All deploy on Vercel from Git.',
      flow: ['Git push', 'Vercel build', 'Static files on the edge', 'Visitor'],
      layers: [
        { title: 'The Solar Co.', items: ['React', 'Vite', 'Tailwind CSS', 'GSAP'], note: 'Lead form, price-history chart, two hero versions switched by route.' },
        { title: 'Vybemation', items: ['HTML', 'CSS', 'Vanilla JS'], note: 'Scroll-pinned hero animating a note into code, no framework.' },
        { title: 'Solar Shop gallery', items: ['Static HTML', 'Design exports'], note: 'Rounds and variants as a browsable index.' },
        { title: 'Hosting', items: ['Vercel'], note: 'Preview URLs per commit made client review easy.' },
      ],
      decisions: [
        'No backend on any of them: a pitch has to be live in days and cost nothing to leave up.',
        'Framework only where animation needed it; plain HTML where it did not.',
      ],
    },
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
    architecture: {
      summary: 'A React admin console over an Express API with JWT sessions, backed by MongoDB, with Chart.js for the dashboard numbers.',
      flow: ['Admin', 'React console', 'JWT in header', 'Express API', 'MongoDB', 'Charts'],
      layers: [
        { title: 'Frontend', items: ['React', 'Chart.js', 'Protected routes'], note: 'Dashboard, customers, deals and reports.' },
        { title: 'Auth', items: ['JWT', 'bcrypt', 'Role middleware'], note: 'Token issued at login, checked on every API route.' },
        { title: 'API', items: ['Node', 'Express', 'REST'], note: 'CRUD for customers, deals and activity.' },
        { title: 'Data', items: ['MongoDB'], note: 'Customers, deals, notes and users.' },
      ],
      decisions: [
        'JWT over sessions so the API stays stateless and easy to host anywhere.',
        'Charts computed from the API, not in the browser, so numbers match across users.',
      ],
    },
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
    architecture: {
      summary: 'A Django platform with Django REST Framework endpoints, PostgreSQL for data and AWS S3 for uploaded photos, served through Gunicorn.',
      flow: ['Customer', 'Django views / DRF', 'PostgreSQL', 'S3 for images', 'Booking confirmed'],
      layers: [
        { title: 'App', items: ['Django', 'Django REST Framework', 'Templates'], note: 'Customer and provider sides share the same models.' },
        { title: 'Auth', items: ['Django auth', 'Profiles', 'Permissions'], note: 'Customers book, providers manage requests and approvals.' },
        { title: 'Data', items: ['PostgreSQL', 'Migrations'], note: 'Users, services, bookings, ratings and reviews.' },
        { title: 'Files & hosting', items: ['AWS S3', 'Gunicorn', 'Render'], note: 'Profile and job photos go to S3, not the app server.' },
      ],
      decisions: [
        'Images on S3 so the app server is disposable and uploads do not fill its disk.',
        'Ratings and reviews on the booking, not the provider, so every review is tied to a real job.',
      ],
    },
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
    techStack: ['Django', 'Django REST Framework', 'PostgreSQL', 'AWS S3', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'modal-07',
    architecture: {
      summary: 'A React app with one serverless function. The function fetches a subreddit from the Reddit API, scores each post with an AFINN word list, and returns the numbers; the browser never calls Reddit directly.',
      flow: ['User types a subreddit', 'React app', 'Vercel function', 'Reddit API', 'AFINN scoring', 'Chart'],
      layers: [
        { title: 'Frontend', items: ['React 19', 'Vite'], note: 'Input, loading state, and the sentiment breakdown.' },
        { title: 'Function', items: ['Vercel Serverless', 'Reddit JSON API'], note: 'Avoids browser CORS limits and keeps request headers off the client.' },
        { title: 'Scoring', items: ['sentiment (AFINN-165)'], note: 'A dictionary approach: fast, free and explainable, no model to host.' },
        { title: 'Hosting', items: ['Vercel'], note: 'Static front, one function, zero servers to keep up.' },
      ],
      decisions: [
        'Dictionary sentiment instead of an LLM: instant results, no cost, and you can see why a post scored the way it did.',
        'Serverless proxy so Reddit rate limits and headers are handled in one place.',
      ],
    },
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
    architecture: {
      summary: 'React front end with React Router, Express API with JWT auth, MongoDB Atlas for storage.',
      flow: ['User', 'React (Router 7)', 'Express 5 API', 'JWT check', 'MongoDB Atlas'],
      layers: [
        { title: 'Frontend', items: ['React 19', 'React Router 7', 'Vite'], note: 'Lists, filters and task detail as routes.' },
        { title: 'API', items: ['Node', 'Express 5', 'JWT'], note: 'Tasks scoped to the signed-in user on every route.' },
        { title: 'Data', items: ['MongoDB Atlas'], note: 'Hosted cluster, no database to run locally in production.' },
      ],
      decisions: ['Atlas over a self-hosted database so the demo stays up without maintenance.'],
    },
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
    id: 'modal-figma-07',
    title: 'Finlinks.de — Logo & Banner Package',
    category: 'Brand & Graphic Design',
    liveDemo: 'https://www.finlinks.de/',
    tags: ['design', 'freelance'],
    cover: '/images/finlinks/cover.jpg',
    brief:
      'A minimalist logo redesign, favicon set and a full banner package for a German finance link portal. Paid client work, delivered through Freelancer.com with a five-star review.',
    facts: { Role: 'Brand & graphic designer', Client: 'Finlinks.de, Germany', Year: '2026', Status: 'Delivered, 5-star review' },
    media: [
      { type: 'image', src: '/images/finlinks/cover.jpg' },
      { type: 'image', src: '/images/finlinks/logo-colour.jpg' },
      { type: 'image', src: '/images/finlinks/logo-dark.jpg' },
      { type: 'image', src: '/images/finlinks/banners-dark.jpg' },
      { type: 'image', src: '/images/finlinks/banners-light.jpg' },
      { type: 'image', src: '/images/finlinks/favicons.jpg' },
    ],
    description: `Logo redesign, favicon set and banner package for Finlinks.de.`,
    problemStatement: `Finlinks.de collects the best German finance blogs and YouTube channels in one place. The existing mark did not scale: it broke at favicon size and had no version for dark backgrounds or partner sites. The brief was a minimalist logo that works from 16px to a billboard, plus every banner size a partner site might ask for.`,
    decision: `Two interlocking links as the symbol, so the name is the idea. Three lockups, horizontal, stacked and symbol-only, each in colour, black, grey, white and a dark-background version, delivered as SVG and PNG at three widths. A complete favicon set with the manifest and head snippet, and twelve banner sizes in light and dark with ready embed codes, so the client could hand partners a link and nothing else.`,
    process: [
      { title: 'The mark', text: 'Interlocking links, drawn on a square grid so the symbol stays crisp at every size.', images: [
        { src: '/images/finlinks/logo-colour.jpg', caption: 'Horizontal, stacked and symbol lockups in brand green' },
        { src: '/images/finlinks/logo-dark.jpg', caption: 'Dark-background versions' },
        { src: '/images/finlinks/logo-mono.jpg', caption: 'Black and grey for print and single-colour use' },
      ]},
      { title: 'Favicons', text: 'Nine sizes from 16px to 512px, apple touch icon, ICO and SVG, with the manifest and head snippet included.', images: [
        { src: '/images/finlinks/favicons.jpg', caption: 'The full favicon set' },
      ]},
      { title: 'Banner package', text: 'Nine standard ad sizes, each in light and dark, with embed codes so partner sites can place them in a minute.', images: [
        { src: '/images/finlinks/banners-dark.jpg', caption: 'Dark set' },
        { src: '/images/finlinks/banners-light.jpg', caption: 'Light set' },
      ]},
    ],
    tools: ['Figma', 'Illustrator', 'SVG'],
  },
  {
    id: 'modal-figma-08',
    title: 'LehrerLinks.net — Banner Set',
    category: 'Brand & Graphic Design',
    liveDemo: 'https://www.lehrerlinks.net/',
    tags: ['design', 'freelance'],
    cover: '/images/lehrerlinks/cover.jpg',
    brief:
      'Twelve banner sizes in two colourways for a German link portal for teachers. Second job for the same client, each size reviewed and signed off individually.',
    facts: { Role: 'Graphic designer', Client: 'LehrerLinks.net, Germany', Year: '2026', Status: 'Delivered, 5-star review' },
    media: [
      { type: 'image', src: '/images/lehrerlinks/cover.jpg' },
      { type: 'image', src: '/images/lehrerlinks/banners-blue.jpg' },
      { type: 'image', src: '/images/lehrerlinks/banners-white.jpg' },
      { type: 'image', src: '/images/lehrerlinks/leaderboards.jpg' },
    ],
    description: `Banner set for LehrerLinks.net: twelve sizes, blue and white, delivered as PNG at 1x and 2x plus the Figma source.`,
    problemStatement: `LehrerLinks.net needed banners that partner sites and newsletters could drop in, from a 728×90 leaderboard down to an 80×15 micro button, and the existing logo had to read at every one of those sizes without being redrawn.`,
    decision: `One system, scaled by rules rather than by eye: symbol height, wordmark width and spacing set per size band, so the 160×600 and the 88×31 are visibly the same family. Blue and white versions of every size, 1x and 2x exports, and a sign-off sheet where the client approved each of the twenty-four files with notes. Two tweaks came back, both to the small sizes, and both were fixed the same day.`,
    process: [
      { title: 'Twelve sizes, one system', text: 'Every standard web banner size from leaderboard to micro button.', images: [
        { src: '/images/lehrerlinks/banners-blue.jpg', caption: 'Blue set' },
        { src: '/images/lehrerlinks/banners-white.jpg', caption: 'White set' },
      ]},
      { title: 'Sign-off per size', text: 'The client reviewed all twenty-four files individually. The notes that came back were about the small sizes: a slightly stronger blue for the wordmark on white, and tighter spacing on the skyscraper.', images: [
        { src: '/images/lehrerlinks/leaderboards.jpg', caption: 'Leaderboards after the sign-off tweaks' },
      ]},
    ],
    tools: ['Figma', 'PNG 1x/2x', 'SVG'],
  },
  {
    id: 'modal-figma-09',
    title: 'QUICKK — Delivery Brand Concept',
    category: 'Brand Concept (Pitch)',
    tags: ['design'],
    cover: '/images/quickk/delivery-handoff.jpg',
    brief:
      'A full brand concept for a quick-commerce delivery startup: logo, app icon, rider gear, packaging and social templates. Built as a pitch. The client went another way.',
    facts: { Role: 'Brand designer', Client: 'Delivery startup (pitch)', Year: '2026', Status: 'Not selected' },
    media: [
      { type: 'image', src: '/images/quickk/delivery-handoff.jpg' },
      { type: 'image', src: '/images/quickk/logo-on-green.jpg' },
      { type: 'image', src: '/images/quickk/splash-board.jpg' },
      { type: 'image', src: '/images/quickk/rider-gear-board.jpg' },
      { type: 'image', src: '/images/quickk/rider-scooter.jpg' },
      { type: 'image', src: '/images/quickk/overview-board.jpg' },
      { type: 'image', src: '/images/quickk/instagram-post.jpg' },
    ],
    description: `Brand concept for QUICKK, a delivery startup: logo, app icon, rider uniform, packaging and social kit.`,
    problemStatement: `A delivery brand is seen for three seconds on a moving scooter and on a bag at the door. The brief was a mark that reads at that distance, a colour the eye catches in traffic, and a kit the startup could hand to a uniform supplier and a printer on day one.`,
    decision: `The double chevron does the work: it is the K in QUICKK, an arrow, and a symbol that reads on a helmet from across the street. Deep green with a lime accent, the opposite of the orange and red every competitor uses. The package included vector logos in every format, an app icon in light and dark, tech flats for the jacket, T-shirt, bag and box so a supplier could quote without questions, mockups on riders and gear, and social templates. The client chose a different direction. The concept stands as the most complete brand package I have produced.`,
    process: [
      { title: 'The mark and the colour', text: 'A double chevron as the K, in deep green and lime.', images: [
        { src: '/images/quickk/logo-on-green.jpg', caption: 'Primary logo on green' },
        { src: '/images/quickk/icons-mono.jpg', caption: 'App icons and monochrome versions' },
      ]},
      { title: 'On the rider', text: 'Jacket, helmet and bag mocked up so the client could see it in traffic, not on a slide.', images: [
        { src: '/images/quickk/rider-gear-board.jpg', caption: 'Rider gear board' },
        { src: '/images/quickk/rider-helmet.jpg', caption: 'Helmet' },
        { src: '/images/quickk/rider-jacket.jpg', caption: 'Jacket' },
      ]},
      { title: 'Tech flats for production', text: 'Measured drawings for the jacket, T-shirt, bag, helmet and delivery box, ready for a supplier to quote.', images: [
        { src: '/images/quickk/tech-flats.jpg', caption: 'Jacket, T-shirt, bag and helmet, delivery box', scroll: true },
      ]},
      { title: 'App and social', text: 'Splash screens, an Instagram post and story, and a LinkedIn banner, so launch day had assets.', images: [
        { src: '/images/quickk/splash-screens.jpg', caption: 'Splash screens, light and dark' },
        { src: '/images/quickk/linkedin-banner.jpg', caption: 'LinkedIn banner' },
      ]},
    ],
    tools: ['Illustrator', 'Figma', 'Mockups'],
  },
  {
    id: 'modal-figma-06',
    title: 'Noted — Brand & Product Design',
    category: 'UI/UX Design',
    related: { id: 'modal-13', label: 'See the build' },
    prototypeLink:
      'https://www.figma.com/design/RH2NGwUR4PUsPh5mgzn1s6/Noted---Expense-Tracker?node-id=44-14367&t=kRoEFssKdXUdGoJO-1',
    embedUrl:
      'https://embed.figma.com/design/RH2NGwUR4PUsPh5mgzn1s6/Noted---Expense-Tracker?node-id=44-14367&embed-host=share',
    tags: ['design'],
    cover: '/images/noted/brand/brand-cover.jpg',
    brief:
      'The brand, design system and 54 screens for Noted, a personal expense tracker. Logo to paywall, happy path to offline, designed end to end in Figma.',
    facts: {
      Role: 'Product designer',
      Tools: 'Figma',
      Year: '2026',
      Deliverables: 'Brand identity, design system, 54 screens, prototype',
    },
    media: [
      { type: 'image', src: '/images/noted/brand/brand-cover.jpg' },
      { type: 'image', src: '/images/noted/brand/brand-logo.jpg' },
      { type: 'image', src: '/images/noted/brand/brand-colour.jpg' },
      { type: 'image', src: '/images/noted/brand/brand-type-icons.jpg' },
      { type: 'image', src: '/images/noted/brand/system-colour.jpg' },
      { type: 'image', src: '/images/noted/brand/system-cards.jpg' },
      { type: 'image', src: '/images/noted/Container.png' },
      { type: 'image', src: '/images/noted/3 (1).png' },
      { type: 'image', src: '/images/noted/3 (5).png' },
      { type: 'image', src: '/images/noted/4 (4).png' },
    ],
    description: `Brand identity, design system and the full screen set for Noted, designed in Figma.`,
    problemStatement: `Most expense apps either ask for bank access up front or bury the one number people care about: how much can I spend today? Noted had to work with no sign-up, make the first entry take seconds, and handle the messy real-world case of splitting a dinner with friends who do not have the app.`,
    decision: `Capture a real expense before asking for an account, so the first thing a new user does is the thing the app is for. Put one number on the home screen, "safe to spend today", instead of a dashboard. Let friends pay a split through a link so they never need the app. And design the unhappy paths first: offline, sync failed, nothing logged yet, payment declined, because that is most of what a finance app actually shows.`,
    research: `Mapped the full journey from first expense to getting paid back, then designed every state along it — onboarding that captures a real entry before asking for an account, a "safe to spend today" number that does the budgeting math, split flows where friends pay via a UPI link without installing anything, plus offline, sync-failed, empty and paywall states.`,
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
        images: [{ src: '/images/noted/brand/screens-01.jpg', caption: 'Splash, first expense, budget, save progress, first home' }],
      },
      {
        title: 'One number, four tabs',
        text: 'Home leads with what is safe to spend today. Activity, Plan and Insights sit behind a floating tab bar with the add button always in reach.',
        images: [
          { src: '/images/noted/brand/screens-03.jpg', caption: 'Home, Activity, Plan and Account' },
          { src: '/images/noted/brand/screens-04.jpg', caption: 'Add an expense, create and edit a budget, delete with undo' },
        ],
      },
      {
        title: 'Splits without the app',
        text: 'A split sends each friend a UPI payment link. Their share counts against your budget until they pay, then drops back. Friends never need to install anything.',
        images: [{ src: '/images/noted/brand/screens-13.jpg', caption: 'Split an expense, send links, the friend’s payment page, the group' }],
      },
      {
        title: 'The unhappy paths',
        text: 'Empty states, no internet, failed sync and a declined payment were designed as carefully as the happy path, because that is most of what a money app shows on a bad day.',
        images: [
          { src: '/images/noted/brand/screens-06.jpg', caption: 'Empty states' },
          { src: '/images/noted/brand/screens-07.jpg', caption: 'Errors and offline' },
        ],
      },
      {
        title: 'Earning the upgrade',
        text: 'Free covers tracking and three budgets. Plus is shown at the moment it would help, with a preview of the locked feature instead of a wall.',
        images: [{ src: '/images/noted/brand/screens-12.jpg', caption: 'Limit reached, locked preview, free vs Plus' }],
      },
    ],
    tools: ['Figma'],
  },
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
    embedUrl: 'https://embed.figma.com/proto/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=26-2&p=f&page-id=34%3A79&starting-point-node-id=26%3A2&embed-host=share&scaling=scale-down-width&content-scaling=fixed&hide-ui=1',
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
    process: [
      {
        title: 'Wireframe',
        text: 'The amount field, the swap control and the result settled before any colour went on.',
        images: [{ src: '/images/exchange/Wrie frame/Capture.PNG', caption: 'Low-fidelity layout' }],
      },
      {
        title: 'Final screens',
        text: 'Converter, history chart and the responsive layout at desktop width.',
        images: [
          { src: '/images/exchange/Screenshot (354).png', caption: 'Converter' },
          { src: '/images/exchange/Screenshot (355).png', caption: 'History' },
        ],
      },
    ],
    media: [
      { type: 'image', src: '/images/exchange/Screenshot (354).png' },
      { type: 'image', src: '/images/exchange/Screenshot (355).png' },
      { type: 'image', src: '/images/exchange/Capture.PNG' },
    ],
    wireframes: ['/images/exchange/Wrie frame/Capture.PNG'],
    research: `Started from the two things people check, today's rate and whether it has moved, and sketched layouts that put both above the fold. Wireframed before colour to settle the hierarchy.`,
    researchImages: [],
    result: `A single-screen converter with the amount field as the hero, a swap control between currencies, and a history chart underneath. Responsive from phone to desktop in one layout.`,
    embedUrl: 'https://embed.figma.com/proto/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=27-105&m=dev&t=mmnZjnGxNLhRszDG-1&embed-host=share&scaling=scale-down-width&content-scaling=fixed&hide-ui=1',
    problemStatement: `Most converter sites are ad-heavy and make you dig for the number. The brief was a converter you would open daily: amount in, result out, with the recent trend visible without a second click.`,
    description: `UI design in Figma for a currency converter: wireframes, a responsive layout and a clickable prototype.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/proto/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=37-19&p=f&t=C4eoW3oiRVXMO6yL-1&scaling=scale-down-width&content-scaling=fixed&page-id=27%3A105&starting-point-node-id=37%3A19',
  },
  {
    id: 'modal-figma-03',
    brief: 'A hotel landing page built to drive bookings, with a clear hierarchy and one call to action.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Landing page, 3 hero directions, component set, prototype' },
    title: 'Hotel Landing Page (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    process: [
      {
        title: 'Three hero directions',
        text: 'Same booking form, three photographic directions: a pool deck, a terrace at dusk, and a lobby. The first went forward because the form reads clearest over it.',
        images: [{ src: '/images/hotel-landing/hero-options.jpg', caption: 'Hero options A, B and C' }],
      },
      {
        title: 'Rooms and amenities as components',
        text: 'Room cards, hotel cards and amenity tiles built as components so the page could be extended without redrawing.',
        images: [
          { src: '/images/hotel-landing/room-cards.jpg', caption: 'Room cards' },
          { src: '/images/hotel-landing/hotels.jpg', caption: 'Hotel cards' },
          { src: '/images/hotel-landing/amenities.jpg', caption: 'Amenity tiles' },
        ],
      },
      {
        title: 'Proof and capture',
        text: 'Reviews under the rooms, then a newsletter block so a visitor who is not ready to book still leaves something.',
        images: [
          { src: '/images/hotel-landing/reviews.jpg', caption: 'Review cards' },
          { src: '/images/hotel-landing/newsletter.jpg', caption: 'Newsletter' },
        ],
      },
      {
        title: 'The full page',
        text: 'Hero with the booking form, rooms, amenities, reviews, newsletter, footer.',
        images: [{ src: '/images/hotel-landing/full-page.jpg', caption: 'Desktop, top to bottom', scroll: true }],
      },
    ],
    cover: '/images/hotel-landing/hero.jpg',
    media: [
      { type: 'image', src: '/images/hotel-landing/hero.jpg' },
      { type: 'image', src: '/images/hotel-landing/hero-options.jpg' },
      { type: 'image', src: '/images/hotel-landing/rooms.jpg' },
      { type: 'image', src: '/images/hotel-landing/amenities.jpg' },
      { type: 'image', src: '/images/hotel-landing/reviews.jpg' },
      { type: 'image', src: '/images/hotel-landing/newsletter.jpg' },
      { type: 'image', src: '/images/hotel-landing/full-page.jpg' },
    ],
    wireframes: [],
    research: `Looked at how booking-first hotel sites place their search bar and how far down the fold the first room appears, then built the hierarchy around the check-availability form.`,
    researchImages: [],
    result: `A hero with the booking form inside it, rooms as the first scroll, then amenities, location and reviews, each with the same call to action. One visual language throughout so the page reads as calm rather than busy.`,
    embedUrl: 'https://embed.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?node-id=0-1&embed-host=share&scaling=scale-down-width&content-scaling=fixed&hide-ui=1',
    problemStatement: `A hotel landing page has one job: get the visitor to check availability. The brief was a page where that action is impossible to miss, and the rooms, location and reviews support it instead of competing with it.`,
    description: `A Figma landing page for a hotel, designed around the booking form.`,
    tools: ['Figma'],
    prototypeLink: 'https://www.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?node-id=0-1&t=R6OR5rITYIHQAnBU-1',
  },
  {
    id: 'modal-figma-04',
    brief: 'A hotel booking app that takes a guest from search to a confirmed room in as few taps as possible.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Research, journey map, user flow, 9 wireframes, hi-fi screens' },
    title: 'Hotel App (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    process: [
      {
        title: 'Research',
        text: 'A persona, a problem statement and key points from looking at how people actually book on a phone, then a journey map for a short weekend trip.',
        images: [
          { src: '/images/Hotel App ui/Research/Journey Map - Scenario.png', caption: 'User journey map' },
          { src: '/images/hotel-app/research.jpg', caption: 'Problem statement, goal, personas, key points', scroll: true },
        ],
      },
      {
        title: 'User flow and wireframe plan',
        text: 'Every screen from home to cancellation mapped before any was drawn, so the booking path had no dead ends.',
        images: [
          { src: '/images/Hotel App ui/wriefrma idea and user flow/user flow.png', caption: 'User flow' },
          { src: '/images/Hotel App ui/wriefrma idea and user flow/Wireframe Plan.png', caption: 'Wireframe plan' },
        ],
      },
      {
        title: 'Wireframes',
        text: 'Low-fidelity screens for the whole path: home, search, hotel, booking details, confirmation and cancellation.',
        images: [
          { src: '/images/Hotel App ui/wireframe/HOME.png', caption: 'Home' },
          { src: '/images/Hotel App ui/wireframe/Search bar.png', caption: 'Search' },
          { src: '/images/Hotel App ui/wireframe/hotle details.png', caption: 'Hotel details' },
          { src: '/images/Hotel App ui/wireframe/Booking details.png', caption: 'Booking details' },
          { src: '/images/Hotel App ui/wireframe/Booking confiremed.png', caption: 'Booking confirmed' },
          { src: '/images/Hotel App ui/wireframe/Booking cansalation.png', caption: 'Cancellation' },
        ],
      },
    ],
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
    embedUrl: 'https://embed.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1&embed-host=share',
    problemStatement: `Booking a room on a phone usually means a long form, unclear totals and no way to see what was reserved afterwards. The brief was a booking app that gets a guest from search to a confirmed room with as few decisions as possible.`,
    description: `A Figma case study for a hotel booking app: journey map, wireframe plan and high-fidelity screens.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1',
  },
  {
    id: 'modal-figma-05',
    brief: 'A tea shop web app with a calm, unhurried ordering flow.',
    facts: { Role: 'UI/UX designer', Tools: 'Figma', Deliverables: 'Logo, landing page, product grid, review components, prototype' },
    title: 'ZenSip (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    process: [
      {
        title: 'Imagery and tone',
        text: 'Dark backgrounds, warm photography and a lot of air. The calm comes from spacing, not from hiding anything.',
        images: [
          { src: '/images/tea/web/imagery.jpg', caption: 'Photography direction' },
          { src: '/images/tea/web/about.jpg', caption: 'About section: handmade, freshness, sustainability' },
        ],
      },
      {
        title: 'Product grid',
        text: 'One card for every tea, with the three grid states worked through: best sellers, new arrivals, sale.',
        images: [{ src: '/images/tea/web/product-grid.jpg', caption: 'Featured products, three states', scroll: true }],
      },
      {
        title: 'Social proof',
        text: 'A single large quote instead of a wall of stars, with variants for the carousel.',
        images: [
          { src: '/images/tea/web/reviews.jpg', caption: 'What our customers say' },
          { src: '/images/tea/web/review-variants.jpg', caption: 'Review card variants' },
        ],
      },
      {
        title: 'The full page',
        text: 'Hero, about, featured products, why choose us, reviews, footer.',
        images: [{ src: '/images/tea/web/full-page.jpg', caption: 'Desktop, top to bottom', scroll: true }],
      },
    ],
    cover: '/images/tea/web/hero.jpg',
    media: [
      { type: 'image', src: '/images/tea/web/hero.jpg' },
      { type: 'image', src: '/images/tea/web/about.jpg' },
      { type: 'image', src: '/images/tea/web/featured.jpg' },
      { type: 'image', src: '/images/tea/web/why.jpg' },
      { type: 'image', src: '/images/tea/web/reviews.jpg' },
      { type: 'image', src: '/images/tea/web/footer.jpg' },
      { type: 'image', src: '/images/tea/web/full-page.jpg' },
    ],
    wireframes: [],
    research: `Collected references from speciality tea and coffee brands, then set a palette and type scale that stay quiet, and tested how much white space the catalogue could carry before it stopped feeling like a shop.`,
    researchImages: [],
    result: `A desktop design with generous spacing, a muted green and cream palette, and an ordering flow that stays within two screens. The calm comes from the layout, not from hiding the buttons.`,
    embedUrl: 'https://embed.figma.com/proto/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-139&embed-host=share&scaling=scale-down-width&content-scaling=fixed&hide-ui=1',
    problemStatement: `Tea shops online tend to look like any other store. The brief was an ordering experience that feels like the product: slow, calm and simple, without making the actual ordering slower.`,
    description: `A Figma web app design for a tea shop, built around a calm ordering flow.`,
    tools: ['Figma'],
    prototypeLink: 'https://www.figma.com/proto/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-139&t=HtKdaISMBKhNmriu-1',
  },
]

export const getProjectsByTag = (tag) => projects.filter((p) => p.tags.includes(tag))

export const getFeaturedProjects = () => projects.filter((p) => p.featured)

export const getProjectById = (id) => projects.find((p) => p.id === id)

/** First still image, falling back to whatever media exists. */
export const getThumbnail = (project) =>
  project.cover ?? ((project.media.find((m) => m.type === 'image') ?? project.media[0])?.src ?? '')

/** Video to play on card hover: an explicit light `preview`, else the first
 *  video in the gallery, else nothing. */
export const getPreviewVideo = (project) =>
  project.preview ?? project.media.find((m) => m.type === 'video')?.src ?? null
