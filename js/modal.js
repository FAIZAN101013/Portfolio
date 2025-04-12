// Define media items with your specific image paths
const mediaItems = [
    {
        type: 'video',
        src: 'Project video/ShopNGo.mp4'
    },
    {
        type: 'image',
        src: 'images/ShopNGo1.png'
    },
    {
        type: 'image',
        src: 'images/ShopNGo2.png'
    }
];

let currentMediaIndex = 0;
const mediaContainer = document.querySelector('.media-container');

// Function to update the dots navigator
function updateDots() {
    const dotsContainer = document.querySelector('.dots-nav');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    // Create a dot for each media item
    mediaItems.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `dot ${index === currentMediaIndex ? 'active' : ''}`;
        dot.onclick = () => showMediaAt(index);
        dotsContainer.appendChild(dot);
    });
}

// Function to show media at specific index
function showMediaAt(index) {
    currentMediaIndex = index;
    updateMedia();
    updateDots();
}

// Function to update displayed media
function updateMedia() {
    const currentItem = mediaItems[currentMediaIndex];

    // Clear the container first
    if (mediaContainer) {
        mediaContainer.innerHTML = '';

        // Handle video type
        if (currentItem.type === 'video') {
            const video = document.createElement('video');
            video.width = '100%';
            video.controls = true;
            video.controlsList = 'nodownload';
            video.src = currentItem.src;
            mediaContainer.appendChild(video);
        }
        // Handle image type
        else if (currentItem.type === 'image') {
            const img = document.createElement('img');
            img.src = currentItem.src;
            img.alt = `Project screenshot ${currentMediaIndex + 1}`;
            mediaContainer.appendChild(img);
        }
    }
}

// Next media function
function nextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
    updateMedia();
    updateDots();
}

// Previous media function
function prevMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
    updateMedia();
    updateDots();
}

// Initialize the modal on page load
document.addEventListener('DOMContentLoaded', function () {
    // Initial media load
    updateMedia();
    updateDots();

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nextMedia();
        } else if (e.key === 'ArrowLeft') {
            prevMedia();
        }
    });
});