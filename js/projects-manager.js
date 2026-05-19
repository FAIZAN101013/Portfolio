import projectsData from './projects-data.js';

const initialProjects = 6;
const increment = 3;
let visibleProjects = initialProjects;
let visibleDesignProjects = initialProjects;

function filterProjectsByTag(tag) {
    return projectsData.filter(project => project.tags.includes(tag));
}

function getProjectThumbnail(project) {
    const firstImage = project.media.find(media => media.type === 'image');
    return firstImage ? firstImage.src : project.media[0]?.src;
}

function getVideoType(src) {
    const extension = src.split('.').pop().toLowerCase();
    if (extension === 'webm') return 'video/webm';
    if (extension === 'mkv') return 'video/x-matroska';
    return 'video/mp4';
}

function createMediaMarkup(project, index = 0) {
    const media = project.media[index];
    if (!media) return '';

    if (media.type === 'video') {
        return `
            <video width="100%" controls controlsList="nodownload" playsinline preload="none">
                <source src="${media.src}" type="${getVideoType(media.src)}">
                Your browser does not support this video format.
            </video>
        `;
    }

    return `<img src="${media.src}" alt="${project.title}" loading="lazy" decoding="async">`;
}

function closeProjectModal() {
    const modalsContainer = document.querySelector('.modals-container');
    if (modalsContainer) {
        modalsContainer.remove();
    }
    document.body.style.overflow = '';
}

function openProjectModal(projectId) {
    const project = projectsData.find(item => item.id === projectId);
    if (!project) return;

    closeProjectModal();

    const modalsContainer = document.createElement('div');
    modalsContainer.className = 'modals-container is-open';

    const modal = document.createElement('div');
    modal.id = project.id;
    modal.setAttribute('data-current-index', '0');
    modal.innerHTML = `
        <div class="modal-popup">
            <div class="modal-header">
                <button class="modal-close" type="button" aria-label="Close modal">&times;</button>
            </div>
            <div class="modal-content">
                <div class="media-content">
                    <div class="media-container">
                        ${createMediaMarkup(project)}
                    </div>
                    ${project.media.length > 1 ? `
                        <div class="media-nav">
                            <button class="prev" type="button" aria-label="Previous media">&#10094;</button>
                            <button class="next" type="button" aria-label="Next media">&#10095;</button>
                        </div>
                    ` : ''}
                </div>
                <div class="modal-popup__desc">
                    <h5 class="modal-title">${project.title}</h5>
                    <p class="project-intro">${project.description || ''}</p>
                    <div class="project-features">
                        <h6>Key Features:</h6>
                        <ul>
                            ${(project.features || []).map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tech-stack">
                        <h6>Tech Stack:</h6>
                        <ul class="modal-popup__cat">
                            ${(project.techStack || []).map(tech => `<li>${tech}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-popup__footer">
                        <a href="${project.githubLink}" class="modal-popup__details" target="_blank" rel="noopener noreferrer">View Project</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.querySelector('.modal-close').addEventListener('click', closeProjectModal);
    modal.querySelector('.prev')?.addEventListener('click', () => prevMedia(project.id));
    modal.querySelector('.next')?.addEventListener('click', () => nextMedia(project.id));

    modalsContainer.addEventListener('click', event => {
        if (event.target === modalsContainer) closeProjectModal();
    });

    modalsContainer.appendChild(modal);
    document.body.appendChild(modalsContainer);
    document.body.style.overflow = 'hidden';
}

function attachModalEventListeners() {
    document.querySelectorAll('.folio-list__item-link[data-project-id]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            openProjectModal(link.dataset.projectId);
        });
    });
}

function generateProjectList(tabType) {
    const folioList = document.querySelector(`#${tabType}-tab .folio-list`);
    if (!folioList) return;

    const tag = tabType === 'projects' ? 'project' : 'design';
    const filteredProjects = filterProjectsByTag(tag);
    const visibleCount = tabType === 'projects' ? visibleProjects : visibleDesignProjects;
    const projectsToShow = filteredProjects.slice(0, visibleCount);

    if (projectsToShow.length === 0) {
        folioList.innerHTML = '<p class="empty-projects">No projects found in this category.</p>';
        return;
    }

    folioList.innerHTML = projectsToShow.map(project => {
        const thumbnail = getProjectThumbnail(project);
        const isDesign = project.tags.includes('design');
        const cardLink = isDesign ? `design-project.html?id=${project.id}` : `#${project.id}`;
        const projectLink = isDesign ? cardLink : project.githubLink;
        const projectLinkLabel = isDesign ? 'View design case study' : 'View project';

        return `
            <div class="folio-list__item column" data-animate-el>
                <a class="folio-list__item-link" href="${cardLink}" style="--project-thumb: url('${thumbnail}')" ${isDesign ? '' : `data-project-id="${project.id}"`}>
                    <img class="folio-list__item-thumb" src="${thumbnail}" alt="${project.title}" loading="lazy" decoding="async">
                    <div class="folio-list__item-text">
                        <div class="folio-list__item-cat">${project.category}</div>
                        <div class="folio-list__item-title">${project.title}</div>
                    </div>
                </a>
                <a class="folio-list__proj-link" href="${projectLink}" target="_blank" rel="noopener noreferrer" title="${projectLinkLabel}">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        `;
    }).join('');

    attachModalEventListeners();
}

function updateMedia(modalId, index) {
    const project = projectsData.find(item => item.id === modalId);
    const modal = document.getElementById(modalId);
    const mediaContainer = modal?.querySelector('.media-container');
    if (!(project && mediaContainer)) return;

    mediaContainer.innerHTML = createMediaMarkup(project, index);
}

function prevMedia(modalId) {
    const project = projectsData.find(item => item.id === modalId);
    const modal = document.getElementById(modalId);
    if (!(project && modal)) return;

    const currentIndex = Number(modal.getAttribute('data-current-index') || 0);
    const nextIndex = (currentIndex - 1 + project.media.length) % project.media.length;
    modal.setAttribute('data-current-index', nextIndex);
    updateMedia(modalId, nextIndex);
}

function nextMedia(modalId) {
    const project = projectsData.find(item => item.id === modalId);
    const modal = document.getElementById(modalId);
    if (!(project && modal)) return;

    const currentIndex = Number(modal.getAttribute('data-current-index') || 0);
    const nextIndex = (currentIndex + 1) % project.media.length;
    modal.setAttribute('data-current-index', nextIndex);
    updateMedia(modalId, nextIndex);
}

function updateShowMoreButton(tabType) {
    const btn = document.getElementById(tabType === 'projects' ? 'show-more-btn' : 'show-more-design-btn');
    const container = btn?.parentElement;
    if (!btn) return;

    const tag = tabType === 'projects' ? 'project' : 'design';
    const filteredProjects = filterProjectsByTag(tag);
    const currentVisible = tabType === 'projects' ? visibleProjects : visibleDesignProjects;
    const shouldShow = filteredProjects.length > initialProjects;

    btn.style.display = shouldShow ? '' : 'none';
    if (container) container.style.display = shouldShow ? '' : 'none';
    btn.textContent = currentVisible >= filteredProjects.length ? 'Show Less' : 'Show More';
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `${tabName}-tab`);
    });

    generateProjectList(tabName);
    updateShowMoreButton(tabName);
}

document.addEventListener('DOMContentLoaded', () => {
    generateProjectList('projects');
    generateProjectList('design');
    updateShowMoreButton('projects');
    updateShowMoreButton('design');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.getElementById('show-more-btn')?.addEventListener('click', () => {
        const filteredProjects = filterProjectsByTag('project');
        visibleProjects = visibleProjects >= filteredProjects.length
            ? initialProjects
            : Math.min(visibleProjects + increment, filteredProjects.length);
        generateProjectList('projects');
        updateShowMoreButton('projects');
    });

    document.getElementById('show-more-design-btn')?.addEventListener('click', () => {
        const filteredProjects = filterProjectsByTag('design');
        visibleDesignProjects = visibleDesignProjects >= filteredProjects.length
            ? initialProjects
            : Math.min(visibleDesignProjects + increment, filteredProjects.length);
        generateProjectList('design');
        updateShowMoreButton('design');
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeProjectModal();
    });
});

export { prevMedia, nextMedia };
