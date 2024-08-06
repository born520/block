const rssUrl = 'https://born520.github.io/rss/';
const tubeUrl = 'https://born520.github.io/tube/';
let currentContent = 'rss';

document.addEventListener('DOMContentLoaded', () => {
    loadContent(rssUrl, 'rssContent');
    loadContent(tubeUrl, 'tubeContent');
    
    const toggleButton = document.getElementById('toggleContent');
    toggleButton.addEventListener('click', toggleContentDisplay);
});

function loadContent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const container = document.getElementById(containerId);
            container.innerHTML = doc.body.innerHTML;
            if (containerId !== `${currentContent}Content`) {
                container.classList.add('hidden');
            }
        })
        .catch(error => console.error('Error loading content:', error));
}

function toggleContentDisplay() {
    const rssContent = document.getElementById('rssContent');
    const tubeContent = document.getElementById('tubeContent');

    if (currentContent === 'rss') {
        rssContent.classList.add('hidden');
        tubeContent.classList.remove('hidden');
        currentContent = 'tube';
    } else {
        tubeContent.classList.add('hidden');
        rssContent.classList.remove('hidden');
        currentContent = 'rss';
    }
}
