const rssUrl = 'https://born520.github.io/rss/';
const tubeUrl = 'https://born520.github.io/tube/';
let rssContent = [];
let tubeContent = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    fetchContents();
});

async function fetchContents() {
    const rssResponse = await fetch(rssUrl);
    const tubeResponse = await fetch(tubeUrl);
    rssContent = await parseContent(await rssResponse.text());
    tubeContent = await parseContent(await tubeResponse.text());
    displayContents();
}

async function parseContent(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // Example: Assuming the contents are within <div class="item"> in HTML
    return Array.from(doc.querySelectorAll('.item')).map(item => item.outerHTML);
}

function displayContents() {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = ''; // Clear the container
    let maxItems = Math.max(rssContent.length, tubeContent.length);

    for (let i = 0; i < maxItems; i++) {
        if (i < rssContent.length) {
            const item = document.createElement('div');
            item.innerHTML = rssContent[i];
            contentContainer.appendChild(item);
        }
        if (i < tubeContent.length) {
            const item = document.createElement('div');
            item.innerHTML = tubeContent[i];
            contentContainer.appendChild(item);
        }
    }
}
