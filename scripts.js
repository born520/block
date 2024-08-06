const rssUrl = 'https://born520.github.io/rss/';
const tubeUrl = 'https://born520.github.io/tube/';
let currentIndex = 0;
let rssContent = [];
let tubeContent = [];

document.addEventListener('DOMContentLoaded', () => {
    loadRssContent();
    loadTubeContent();
});

function loadRssContent() {
    fetch(rssUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('item'); // Assuming RSS format
            rssContent = Array.from(items).map(item => item.outerHTML);
            if (tubeContent.length > 0) {
                showNextContent();
            }
        })
        .catch(error => console.error('Error loading RSS content:', error));
}

function loadTubeContent() {
    fetch(tubeUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('.videoItem'); // Assuming each video is in a .videoItem class
            tubeContent = Array.from(items).map(item => item.outerHTML);
            if (rssContent.length > 0) {
                showNextContent();
            }
        })
        .catch(error => console.error('Error loading Tube content:', error));
}

function showNextContent() {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = ''; // Clear previous content

    const contentLength = Math.max(rssContent.length, tubeContent.length);

    for (let i = 0; i < contentLength; i++) {
        if (i < tubeContent.length) {
            const tubeDiv = document.createElement('div');
            tubeDiv.className = 'contentItem';
            tubeDiv.innerHTML = tubeContent[i];
            contentContainer.appendChild(tubeDiv);
        }
        if (i < rssContent.length) {
            const rssDiv = document.createElement('div');
            rssDiv.className = 'contentItem';
            rssDiv.innerHTML = rssContent[i];
            contentContainer.appendChild(rssDiv);
        }
    }
}
