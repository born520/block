const rssUrl = 'https://born520.github.io/rss/';
const tubeUrl = 'https://born520.github.io/tube/';
let rssItems = [];
let tubeItems = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([fetchContent(rssUrl, 'rss'), fetchContent(tubeUrl, 'tube')])
        .then(() => displayContent())
        .catch(error => console.error('Error loading content:', error));
});

function fetchContent(url, type) {
    return fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll(type === 'rss' ? 'item' : '.videoItem'); // Adjust selectors as needed
            const content = Array.from(items).map(item => item.outerHTML);

            if (type === 'rss') {
                rssItems = content;
            } else {
                tubeItems = content;
            }
        });
}

function displayContent() {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = ''; // Clear the container

    const maxItems = Math.max(rssItems.length, tubeItems.length);
    for (let i = 0; i < maxItems; i++) {
        if (i < rssItems.length) {
            const rssElement = document.createElement('div');
            rssElement.className = 'contentItem';
            rssElement.innerHTML = rssItems[i];
            contentContainer.appendChild(rssElement);
        }

        if (i < tubeItems.length) {
            const tubeElement = document.createElement('div');
            tubeElement.className = 'contentItem';
            tubeElement.innerHTML = tubeItems[i];
            contentContainer.appendChild(tubeElement);
        }
    }
}
