document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplay();
});

async function fetchDataAndDisplay() {
    const rssUrl = 'https://script.google.com/macros/s/AKfycbx6k0-G1Uv6YHdMg2RP3uuFgrNVt1OgzWzchIKC53dXFut7EXNw4VlpWxN9M9_YSEM/exec';
    const tubeUrl = 'https://script.google.com/macros/s/AKfycbxriZtrysnwgb-VyNsbMHCYd84Ft5835UKFAX7Z8ZelFUyAvis_zd1uPKfKsUJXuIdTgg/exec';
    
    try {
        // Fetch data from both web apps
        const [rssResponse, tubeResponse] = await Promise.all([
            fetch(rssUrl).then(response => response.json()),
            fetch(tubeUrl).then(response => response.json())
        ]);

        // Assuming the responses are arrays of items
        displayContentAlternately(rssResponse, tubeResponse);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

function displayContentAlternately(rssItems, tubeItems) {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = ''; // Clear previous contents

    const maxItems = Math.max(rssItems.length, tubeItems.length);
    for (let i = 0; i < maxItems; i++) {
        if (i < rssItems.length) {
            const item = document.createElement('div');
            item.innerHTML = `<h3>${rssItems[i].title}</h3><p>${rssItems[i].description}</p>`;
            contentContainer.appendChild(item);
        }
        if (i < tubeItems.length) {
            const item = document.createElement('div');
            item.innerHTML = `<h3>${tubeItems[i].title}</h3><img src="${tubeItems[i].thumbnail}" alt="Thumbnail">`;
            contentContainer.appendChild(item);
        }
    }
}
