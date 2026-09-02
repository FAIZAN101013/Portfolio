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
    id: 'modal-06',
    title: 'JoBz',
    category: 'AI Career Management Platform',
    githubLink: 'https://github.com/FAIZAN101013/resume-optimizer',
    liveDemo: 'https://resume-optimizer-topaz-eight.vercel.app/',
    tags: ['project'],
    // Placeholder shot of the live landing page — drop real media into
    // images/resume-optimizer/ and list it here.
    media: [{ type: 'image', src: '/images/resume-optimizer/home.png' }],
    description:
      'JoBz is an AI-powered career management platform that keeps your whole job search in one place — track applications, tailor your resume to each job with AI, prepare for interviews, and see what is actually working. Live demo: <a href="https://resume-optimizer-topaz-eight.vercel.app/" target="_blank" rel="noopener noreferrer">https://resume-optimizer-topaz-eight.vercel.app/</a>',
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
    id: 'modal-01',
    title: 'ShoNgo',
    category: 'E-commerce Project (In Progress)',
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
    id: 'modal-02',
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
    id: 'modal-03',
    title: 'HandyMan',
    category: 'Web Application',
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
    features: [
      'Service provider registration',
      'Service booking system',
      'User reviews and ratings',
      'Location-based search',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'modal-04',
    title: 'MoviesX',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/moviesx',
    tags: ['project'],
    media: [
      { type: 'image', src: '/images/moviesx/mov1.png' },
      { type: 'image', src: '/images/moviesx/mov2.png' },
    ],
    description: `MOVIEX - Movie Explorer App  A simple movie explorer web app built with React.js and TMDB API. Browse popular movies, search for films, and manage your favorites with a sleek UI. 🚀`,
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
    id: 'modal-07',
    title: 'TodoApp',
    category: 'Mobile Application',
    githubLink: 'https://github.com/FAIZAN101013/TodoApp',
    tags: ['project'],
    // No live demo (mobile app) — drop screenshots into images/todoapp/ and
    // list them here.
    media: [{ type: 'image', src: '/images/todoapp/home.png' }],
    description:
      'A full-stack cross-platform todo app built with React Native and TypeScript. Users register, log in, and manage their personal tasks, backed by an Express and MongoDB API with authenticated routes.',
    features: [
      'User registration and login',
      'Personal task list with create, update, and delete',
      'Authenticated REST API with protected routes',
      'Runs on both Android and iOS',
    ],
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'modal-08',
    title: 'Task Tracker',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/task-tracker',
    liveDemo: 'https://task-tracker-six-plum-38.vercel.app/',
    tags: ['project'],
    media: [{ type: 'image', src: '/images/task-tracker/home.png' }],
    description:
      'A full-stack MERN task manager with cookie-based JWT authentication — each user gets their own private workspace with database-level security. Live demo: <a href="https://task-tracker-six-plum-38.vercel.app/" target="_blank" rel="noopener noreferrer">https://task-tracker-six-plum-38.vercel.app/</a>',
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
    id: 'modal-09',
    title: 'The Subreddit Vibe Check',
    category: 'Web Application',
    githubLink: 'https://github.com/FAIZAN101013/subreddit-vibe-check',
    liveDemo: 'https://subreddit-vibe-check-nu.vercel.app/',
    tags: ['project'],
    media: [{ type: 'image', src: '/images/subreddit-vibe-check/home.png' }],
    description:
      'Discover the mood of a subreddit — fetches the 50 hottest posts from any subreddit and scores each title’s emotional tone right in the browser, with a three-tier OAuth/JSON/RSS fallback for Reddit data. Live demo: <a href="https://subreddit-vibe-check-nu.vercel.app/" target="_blank" rel="noopener noreferrer">https://subreddit-vibe-check-nu.vercel.app/</a>',
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
    id: 'modal-10',
    title: 'Rutuja Portfolio',
    category: 'Freelance Project',
    githubLink: 'https://github.com/FAIZAN101013/rutuja-portfolio',
    tags: ['project', 'freelance'],
    // Drop screenshots into images/rutuja-portfolio/ and list them here.
    media: [{ type: 'image', src: '/images/rutuja-portfolio/home.png' }],
    description:
      'My first freelance project — a simple personal portfolio website built for a client, with a contact form wired to an API.',
    features: ['Personal portfolio layout', 'Contact form with API integration', 'Responsive design'],
    techStack: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'modal-05',
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
    title: 'Game Accessories App (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [{ type: 'image', src: '/images/Game/Capture.PNG' }],
    // The original data pointed at wireframe1/2.png and research1/2.png, which
    // were never committed — they rendered as broken-image icons.
    wireframes: [],
    research: `User interviews and surveys revealed that gamers struggled to compare accessories across platforms. Competitive analysis showed fragmented shopping experiences. Personas and journey maps were created to guide the design decisions.`,
    researchImages: [],
    result: `The final design improved user task completion by 30% in usability tests. Key learnings included the importance of clear product comparison and a streamlined checkout process.`,
    embedUrl:
      'https://embed.figma.com/proto/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=26-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=34%3A79&starting-point-node-id=26%3A2&embed-host=share',
    problemStatement: `Design a seamless and modern app for browsing, comparing, and purchasing gaming accessories. The goal was to solve the problem of fragmented accessory shopping experiences for gamers by providing a unified, intuitive interface.`,
    description: `This project involved user research, wireframing, and high-fidelity prototyping in Figma. The design focuses on intuitive navigation, clear product comparison, and a modern visual style. You can view the full Figma design and prototype at <a href="https://www.figma.com/design/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=34-79&t=jYHCqdvQziuHIGCj-1" target="_blank" rel="noopener noreferrer">this Figma link</a>.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=34-79&t=jYHCqdvQziuHIGCj-1',
  },
  {
    id: 'modal-figma-02',
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
    research: `Designed a modern, responsive currency converter web app UI. Focused on clarity, accessibility, and ease of use for daily currency conversion needs.`,
    researchImages: [],
    result: `The final design features a clean interface, real-time conversion, and a historical chart. Usability tests showed improved user satisfaction and efficiency.`,
    embedUrl:
      'https://embed.figma.com/proto/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=27-105&m=dev&t=mmnZjnGxNLhRszDG-1&embed-host=share',
    problemStatement: `Create an intuitive and visually appealing currency converter app that provides accurate, real-time exchange rates and historical data visualization.`,
    description: `This project involved UI/UX design in Figma for a currency converter app. The design emphasizes usability, responsive layout, and a modern look. <a href="https://www.figma.com/design/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=27-105&t=Gpg4r6CTmDgAiBYC-1" target="_blank" rel="noopener noreferrer">View on Figma</a>.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/proto/1o0CpzYf5TWL7sM0FslQZX/CurrencyEx?node-id=37-19&p=f&t=C4eoW3oiRVXMO6yL-1&scaling=scale-down-width&content-scaling=fixed&page-id=27%3A105&starting-point-node-id=37%3A19',
  },
  {
    id: 'modal-figma-03',
    title: 'Hotel Landing Page (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [{ type: 'image', src: '/images/Hotel webpage UI/Home 2.png' }],
    wireframes: [],
    research: `Designed a modern, visually appealing hotel landing page UI in Figma. Focused on user experience, clear call-to-actions, and a welcoming visual style for hospitality businesses.`,
    researchImages: [],
    result: `The final design features a clean layout, intuitive navigation, and strong visual hierarchy to drive bookings and engagement.`,
    embedUrl:
      'https://www.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?page-id=0%3A1&node-id=2-2&viewport=396%2C95%2C0.1&t=0TW1mW1bgc5yxKjT-1&scaling=min-zoom&content-scaling=fixed',
    problemStatement: `Create a hotel website landing page that maximizes user engagement and booking conversion through modern UI/UX principles.`,
    description: `This project showcases a Figma-based hotel landing page UI, emphasizing a clean, modern look and user-friendly layout. <a href="https://www.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?page-id=0%3A1&node-id=2-2&viewport=396%2C95%2C0.1&t=0TW1mW1bgc5yxKjT-1&scaling=min-zoom&content-scaling=fixed" target="_blank" rel="noopener noreferrer">View the prototype</a>.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/proto/PBSzQvMNBiwJt4rU8iL7dR/hotel-landing-page?page-id=0%3A1&node-id=2-2&viewport=396%2C95%2C0.1&t=0TW1mW1bgc5yxKjT-1&scaling=min-zoom&content-scaling=fixed',
  },
  {
    id: 'modal-figma-04',
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
    research: `User research and journey mapping were conducted to understand the needs of hotel app users. The design focuses on a seamless booking experience, clear navigation, and modern UI elements.`,
    researchImages: [
      '/images/Hotel App ui/Research/Journey Map - Scenario.png',
      '/images/Hotel App ui/Research/RESEARCH.png',
    ],
    result: `The final design provides an intuitive hotel booking experience, with a focus on usability and visual appeal.`,
    embedUrl:
      'https://www.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1',
    problemStatement: `Design a hotel booking app that streamlines the reservation process and enhances user satisfaction through thoughtful UI/UX.`,
    description: `This project showcases a Figma-based hotel app UI, emphasizing a user-friendly booking flow and modern design. <a href="https://www.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1" target="_blank" rel="noopener noreferrer">View the design</a>.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/2Gm7UIl3BE6EupRld1QRxn/Hotel--App?node-id=0-1&t=juS1qBKA9IbN3cJY-1',
  },
  {
    id: 'modal-figma-05',
    title: 'ZenSip (Figma Design)',
    category: 'UI/UX Design',
    tags: ['design'],
    media: [{ type: 'image', src: '/images/tea/Desktop - 1.png' }],
    wireframes: [],
    research: `ZenSip is a tea shop web app UI designed in Figma. The project focuses on a calming, modern aesthetic and a seamless ordering experience.`,
    researchImages: [],
    result: `The final design features a clean layout, intuitive navigation, and a relaxing color palette to enhance the user experience.`,
    embedUrl:
      'https://www.figma.com/design/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-137&t=IHoNTQ9Nhdrz4IDw-1',
    problemStatement: `Design a tea shop web app that provides a tranquil and efficient ordering process for users.`,
    description: `This project showcases a Figma-based tea shop UI, emphasizing a peaceful, modern look and user-friendly layout. <a href="https://www.figma.com/design/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-137&t=IHoNTQ9Nhdrz4IDw-1" target="_blank" rel="noopener noreferrer">View the design</a>.`,
    tools: ['Figma'],
    prototypeLink:
      'https://www.figma.com/design/VOyiRUiNyqqvJYqNYDyYrl/ZenSip?node-id=1-137&t=IHoNTQ9Nhdrz4IDw-1',
  },
]

export const getProjectsByTag = (tag) => projects.filter((p) => p.tags.includes(tag))

export const getProjectById = (id) => projects.find((p) => p.id === id)

/** First still image, falling back to whatever media exists. */
export const getThumbnail = (project) =>
  (project.media.find((m) => m.type === 'image') ?? project.media[0])?.src ?? ''
