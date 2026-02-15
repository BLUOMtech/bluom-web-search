// Minimal BLUOM search engine

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!query) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    // Load index.json
    fetch('index.json')
        .then(response => response.json())
        .then(data => {
            // Filter results by title or description
            const results = data.filter(site => 
                site.title.toLowerCase().includes(query) ||
                site.description.toLowerCase().includes(query)
            );

            if (results.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>';
                return;
            }

            // Display results
            results.forEach(site => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <a href="${site.url}" target="_blank" class="result-link">${site.title}</a>
                    <p class="result-desc">${site.description}</p>
                `;
                resultsDiv.appendChild(div);
            });
        })
        .catch(error => {
            resultsDiv.innerHTML = '<p>Error loading index.json</p>';
            console.error('Error fetching index.json:', error);
        });
}
