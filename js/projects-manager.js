import projectsData from './projects-data.js';

let initialProjects = 6;
let increment = 3;
let visibleProjects = initialProjects;

// Function to generate project list items
function generateProjectList() {
    const folioList = document.querySelector('.folio-list');
    if (!folioList) {
        console.error('Could not find .folio-list element');
        return;
    }

    console.log('Generating project list with data:', projectsData);
    const html = projectsData.map(project => `
        <div class="folio-list__item column" data-animate-el>
            <a class="folio-list__item-link" href="#${project.id}">
                <div class="folio-list__item-text">
                    <div class="folio-list__item-cat">
                        ${project.category}
                    </div>
                    <div class="folio-list__item-title">
                        ${project.title}
                    </div>
                </div>
            </a>
            <a class="folio-list__proj-link" href="${project.githubLink}" title="View on GitHub">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    `).join('');
    
    console.log('Generated HTML:', html);
    folioList.innerHTML = html;
}

// Function to generate project modals
function generateProjectModals() {
    const worksSection = document.querySelector('#works');
    if (!worksSection) {
        console.error('Could not find #works section');
        return;
    }

    console.log('Generating project modals');
    const modalsContainer = document.createElement('div');
    modalsContainer.className = 'modals-container';

    projectsData.forEach(project => {
        console.log('Creating modal for project:', project.id);
        const modal = document.createElement('div');
        modal.id = project.id;
        modal.hidden = true;
        modal.setAttribute('data-current-index', '0');
        modal.innerHTML = `
            <div class="modal-popup">
                <button class="modal-close" aria-label="Close modal" onclick="(function(){document.getElementById('${project.id}').setAttribute('hidden','');document.body.style.overflow='';})()">&times;</button>
                <div class="media-content">
                    <div class="media-container">
                        ${project.media[0].type === 'video' ? 
                            `<video width="100%" controls controlsList="nodownload" playsinline>
                                <source src="${project.media[0].src}" type="video/mp4">
                                Your browser doesn't support this video format.
                            </video>` :
                            `<img src="${project.media[0].src}" alt="${project.title}">`
                        }
                    </div>
                    <div class="media-nav">
                        <button class="prev" onclick="prevMedia('${project.id}')">❮</button>
                        <button class="next" onclick="nextMedia('${project.id}')">❯</button>
                    </div>
                </div>
                <div class="modal-popup__desc">
                    <h5 class="modal-title">${project.title}</h5>
                    <p class="project-intro">${project.description}</p>
                    <div class="project-features">
                        <h6>Key Features:</h6>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tech-stack">
                        <h6>Tech Stack:</h6>
                        <ul class="modal-popup__cat">
                            ${project.techStack.map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="modal-popup__footer">
                    <a href="${project.githubLink}" class="modal-popup__details" target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
            </div>
        `;
        modalsContainer.appendChild(modal);
    });

    // Remove any existing modals container
    const existingContainer = document.querySelector('.modals-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    worksSection.appendChild(modalsContainer);
    console.log('Project modals generated and added to DOM');
}

// Function to handle media navigation with per-modal index
function prevMedia(modalId) {
    const project = projectsData.find(p => p.id === modalId);
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    let currentIndex = parseInt(modal.getAttribute('data-current-index') || '0', 10);
    currentIndex = (currentIndex - 1 + project.media.length) % project.media.length;
    modal.setAttribute('data-current-index', currentIndex);
    updateMedia(modalId, currentIndex);
}

function nextMedia(modalId) {
    const project = projectsData.find(p => p.id === modalId);
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    let currentIndex = parseInt(modal.getAttribute('data-current-index') || '0', 10);
    currentIndex = (currentIndex + 1) % project.media.length;
    modal.setAttribute('data-current-index', currentIndex);
    updateMedia(modalId, currentIndex);
}

function updateMedia(modalId, index) {
    const project = projectsData.find(p => p.id === modalId);
    if (!project) return;

    const modal = document.getElementById(modalId);
    if (!modal) return;
    const mediaContainer = modal.querySelector('.media-container');
    if (!mediaContainer) return;

    const media = project.media[index];
    if (media.type === 'video') {
        mediaContainer.innerHTML = `
            <video width="100%" controls controlsList="nodownload" playsinline>
                <source src="${media.src}" type="video/mp4">
                Your browser doesn't support this video format.
            </video>
        `;
    } else {
        mediaContainer.innerHTML = `<img src="${media.src}" alt="${project.title}">`;
    }
}

function renderProjects() {
    const folioList = document.querySelector('.folio-list');
    folioList.innerHTML = '';
    const projectsToShow = projectsData.slice(0, visibleProjects);

    projectsToShow.forEach(project => {
        const item = document.createElement('div');
        item.className = 'folio-list__item column';
        item.innerHTML = `
            <a class="folio-list__item-link" href="#${project.id}">
                <div class="folio-list__item-text">
                    <div class="folio-list__item-cat">${project.category}</div>
                    <div class="folio-list__item-title">${project.title}</div>
                </div>
            </a>
            <a class="folio-list__proj-link" href="${project.githubLink}" title="View on GitHub">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
            </a>
        `;
        folioList.appendChild(item);
    });
}

function updateShowMoreButton() {
    const btn = document.getElementById('show-more-btn');
    if (!btn) return;
    if (visibleProjects >= projectsData.length) {
        btn.textContent = 'Show Less';
    } else {
        btn.textContent = 'Show More';
    }
}

// Initialize projects when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting project initialization');
    try {
        generateProjectList();
        generateProjectModals();
        console.log('Projects initialized successfully');
        
        // Debug: Check if modals are in the DOM
        const modals = document.querySelectorAll('[id^="modal-"]');
        console.log('Found modals:', modals.length);
        modals.forEach(modal => {
            console.log('Modal:', modal.id, 'hidden:', modal.hidden);
        });

        renderProjects();
        updateShowMoreButton();

        const btn = document.getElementById('show-more-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                if (visibleProjects >= projectsData.length) {
                    visibleProjects = initialProjects; // Reset to initial
                } else {
                    visibleProjects = Math.min(visibleProjects + increment, projectsData.length);
                }
                renderProjects();
                updateShowMoreButton();
            });
        }
    } catch (error) {
        console.error('Error initializing projects:', error);
    }
});

// Export functions for use in other files
export { prevMedia, nextMedia }; 