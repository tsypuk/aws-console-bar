function render_news() {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>link</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Populate the table with data from the accounts array
    chrome.storage.sync.get(['rss'], result => {
        if (result.rss) {
            result.rss.forEach((news, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
        <td>${index}</td>
        <td>${news.title}</td>
        <td>${news.link}</td>
      `;
                tbody.appendChild(row);
            })
        }
    })

    // Inject the table into the div with id "aws_accounts"
    const awsNewsDiv = document.getElementById('aws_news');
    awsNewsDiv.appendChild(table);
}

render_news()
