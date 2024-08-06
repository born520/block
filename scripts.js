document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndDisplay();
});

async function fetchDataAndDisplay() {
    try {
        const rssResponse = await fetch('https://script.google.com/macros/s/AKfycbx6k0-G1Uv6YHdMg2RP3uuFgrNVt1OgzWzchIKC53dXFut7EXNw4VlpWxN9M9_YSEM/exec');
        const tubeResponse = await fetch('https://script.google.com/macros/s/AKfycbxriZtrysnwgb-VyNsbMHCYd84Ft5835UKFAX7Z8ZelFUyAvis_zd1uPKfKsUJXuIdTgg/exec');
        
        if (!rssResponse.ok || !tubeResponse.ok) {
            throw new Error('Failed to fetch data');
        }

        const rssItems = await rssResponse.json();
        const tubeItems = await tubeResponse.json();
        
        console.log('RSS Items:', rssItems);
        console.log('Tube Items:', tubeItems);

        displayContents(rssItems, tubeItems);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayContents(rssItems, tubeItems) {
    const contentContainer = document.getElementById('contentContainer');
    contentContainer.innerHTML = '';

    const maxItems = Math.max(rssItems.length, tubeItems.length);
    for (let i = 0; i < maxItems; i++) {
        if (i < rssItems.length) {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${rssItems[i].title}</h3><p>${rssItems[i].description}</p>`;
            contentContainer.appendChild(div);
        }

        if (i < tubeItems.length) {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${tubeItems[i].title}</h3><img src="${tubeItems[i].thumbnail}" alt="Thumbnail">`;
            contentContainer.appendChild(div);
        }
    }
}
