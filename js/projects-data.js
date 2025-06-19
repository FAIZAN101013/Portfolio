// Project data structure
const projectsData = [
    {
        id: 'modal-01',
        title: 'ShoNgo',
        category: 'E-commerce Project (In Progress)',
        githubLink: 'https://github.com/FAIZAN101013/ShopNGo',
        tags: ['project'],
        media: [
            { type: 'video', src: 'Project video/ShopNGo.mp4' },
            { type: 'image', src: 'images/ShopNGo1.png' },
            { type: 'image', src: 'images/ShopNGo2.png' }
        ],
        description: `A full-featured MERN Stack e-commerce platform with secure payment integration. Also find the live demo at <a href="https://shop-n-go.vercel.app/" target="_blank" rel="noopener noreferrer">https://shop-n-go.vercel.app/</a>`,
        features: [
            'User authentication and profile management',
            'Product catalog with search and filters',
            'Shopping cart and wishlist functionality',
            'Secure checkout with Stripe and Razorpay',
            'Admin dashboard for product management',
            'Order tracking and history'
        ],
        techStack: [
            'React JS',
            'MongoDB',
            'Express JS',
            'Node JS',
            'Stripe',
            'Razorpay'
        ]
    },
    {
        id: 'modal-02',
        title: 'Portfolio Website',
        category: 'Web Application',
        githubLink: 'https://faziansportfolio.netlify.app/',
        tags: ['project'],
        media: [
            { type: 'image', src: 'images/portiflito.png' }
        ],
        description: `A personal portfolio website showcasing my projects and skills.
This is a simple and clean portfolio website that showcases my projects and skills.
It is a single page website that is responsive and uses a modern design.
It is a static website that is built using HTML, CSS and JavaScript.
It is a responsive website that is built using Bootstrap.`,
        features: [
            'Responsive design',
            'Project showcase with modals',
            'Skills section',
            'Contact form'
        ],
        techStack: [
            'HTML',
            'CSS',
            'JavaScript',
            'Bootstrap'
        ]
    },
    {
        id: 'modal-03',
        title: 'HandyMan',
        category: 'Web Application',
        githubLink: 'https://github.com/FAIZAN101013/handyman',
        tags: ['project'],
        media: [
            { type: 'image', src: 'images/handyman/Screenshot (341).png' },
            {type: 'video', src: 'Project video/handyman.mp4'},
            { type: 'image', src: 'images/handyman/Screenshot (342).png' },
            { type: 'image', src: 'images/handyman/Screenshot (343).png' },
            { type: 'image', src: 'images/handyman/Screenshot (344).png' },
        ],
        description: 'Handyman is a web application that connects skilled workers such as plumbers, electricians, and carpenters with consumers seeking their services.',
        features: [
            'Service provider registration',
            'Service booking system',
            'User reviews and ratings',
            'Location-based search'
        ],
        techStack: [
            'HTML',
            'CSS',
            'JavaScript',
            'Node.js',
            'Express',
            'MongoDB'
        ]
    },  {
        id: 'modal-04',
        title: 'MoviesX',
        category: 'Web Application',
        githubLink: 'https://github.com/FAIZAN101013/handyman',
        tags: ['project'],
        media: [
            { type: 'image', src: 'images/moviesx/mov1.png' },
            { type: 'image', src: 'images/moviesx/mov2.png' },
        ],
        description: `About
MOVIEX - Movie Explorer App 🎬 A simple movie explorer web app built with React.js and TMDB API. Browse popular movies, search for films, and manage your favorites with a sleek UI. 🚀`,
        features: [
            '🔥 Browse popular movies from The Movie Database (TMDB)',
            '🔍 Search for movies by title',
            '❤️ Add movies to your Favorites and manage them easily',
            '🎨 Beautiful and responsive UI',
            '🚀 Built with React.js and Context API'
        ],
        techStack: [
            'React.js',
            'Tailwind CSS',
            'TMDB API',
            'LocalStorage '
            
        ]
    },
    // Remove all previous design projects and add only the real one
    {
        id: 'modal-figma-01',
        title: 'Game Accessories App (Figma Design)',
        category: 'UI/UX Design',
        tags: ['design'],
        media: [
            { type: 'image', src: 'images/Game/Capture.PNG' }
        ],
        wireframes: [
            'images/Game/wireframe1.png',
            'images/Game/wireframe2.png'
        ],
        research: `User interviews and surveys revealed that gamers struggled to compare accessories across platforms. Competitive analysis showed fragmented shopping experiences. Personas and journey maps were created to guide the design decisions.`,
        researchImages: [
            'images/Game/research1.png',
            'images/Game/research2.png'
        ],
        result: `The final design improved user task completion by 30% in usability tests. Key learnings included the importance of clear product comparison and a streamlined checkout process.`,
        embedUrl: 'https://embed.figma.com/proto/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=26-2&p=f&scaling=min-zoom&content-scaling=fixed&page-id=34%3A79&starting-point-node-id=26%3A2&embed-host=share',
        problemStatement: `Design a seamless and modern app for browsing, comparing, and purchasing gaming accessories. The goal was to solve the problem of fragmented accessory shopping experiences for gamers by providing a unified, intuitive interface.`,
        description: `This project involved user research, wireframing, and high-fidelity prototyping in Figma. The design focuses on intuitive navigation, clear product comparison, and a modern visual style. You can view the full Figma design and prototype at <a href="https://www.figma.com/design/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=34-79&t=jYHCqdvQziuHIGCj-1" target="_blank" rel="noopener noreferrer">this Figma link</a>.`,
        tools: ['Figma'],
        prototypeLink: 'https://www.figma.com/design/IeAaAl3GrbyXk4naq70zcz/Game-Accessories-App?node-id=34-79&t=jYHCqdvQziuHIGCj-1'
    },
];

// Export the data
export default projectsData;

let projectsPerPage = 6;
let currentPage = 1;

function renderProjects() {
    const folioList = document.querySelector('.folio-list');
    folioList.innerHTML = '';
    const end = currentPage * projectsPerPage;
    const projectsToShow = projectsData.slice(0, end);

    projectsToShow.forEach(project => {
        // ... your existing code to create and append project items ...
    });
}

function updateShowMoreButton() {
    const btn = document.getElementById('show-more-btn');
    if ((currentPage * projectsPerPage) >= projectsData.length) {
        btn.textContent = 'Show Less';
    } else {
        btn.textContent = 'Show More';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    updateShowMoreButton();

    document.getElementById('show-more-btn').addEventListener('click', () => {
        if ((currentPage * projectsPerPage) >= projectsData.length) {
            currentPage = 1; // Reset to first page
        } else {
            currentPage++;
        }
        renderProjects();
        updateShowMoreButton();
    });
}); 