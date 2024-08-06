const rssUrl = 'https://born520.github.io/rss/';
const tubeUrl = 'https://born520.github.io/tube/';
let rssContent = [];
let tubeContent = [];

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([loadRssContent(), loadTubeContent()]).then(showAlternatingContent);
});

function loadRssContent() {
    return fetch(rssUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('.rssItem'); // Assuming RSS content is wrapped in .rssItem
            rssContent = Array.from(items).map(item => item.outerHTML);
        })
        .catch(error => console.error('Error loading RSS content:', error));
}

function loadTubeContent() {
    return fetch(tubeUrl)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('.videoItem'); // Assuming each video is in a .videoItem class
            tubeContent = Array.from(items).map(item => item.outerHTML);
        })
        .catch(error => console.error('Error loading Tube content:', error));
}

function showAlternatingContent() {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = ''; // Clear previous content

    const maxLength = Math.max(rssContent.length, tubeContent.length);

    for (let i = 0; i < maxLength; i++) {
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
