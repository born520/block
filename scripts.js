function loadRssContent() {
    return fetch(rssUrl)
        .then(response => response.text())
        .then(html => {
            console.log("Loaded RSS Content:", html);  // 로딩된 RSS HTML 로그 출력
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('.rssItem'); // 적절한 선택자 사용
            rssContent = Array.from(items).map(item => item.outerHTML);
            console.log("Parsed RSS Items:", rssContent);  // 파싱된 아이템 로그 출력
        })
        .catch(error => console.error('Error loading RSS content:', error));
}

function loadTubeContent() {
    return fetch(tubeUrl)
        .then(response => response.text())
        .then(html => {
            console.log("Loaded Tube Content:", html);  // 로딩된 Tube HTML 로그 출력
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const items = doc.querySelectorAll('.videoItem'); // 적절한 선택자 사용
            tubeContent = Array.from(items).map(item => item.outerHTML);
            console.log("Parsed Tube Items:", tubeContent);  // 파싱된 아이템 로그 출력
        })
        .catch(error => console.error('Error loading Tube content:', error));
}
