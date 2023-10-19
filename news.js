function render_news_index() {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>info</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Populate the table with data from the accounts array
    chrome.storage.local.get(['rss_index'], result => {
        if (result.rss_index) {
            result.rss_index.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
        <td>${index}</td>
        <td>${item.name}</td>
        <td>${JSON.stringify(item)}</td>
      `;
                tbody.appendChild(row);
            })
        }
    })

    // Inject the table into the div with id "aws_accounts"
    const awsNewsDiv = document.getElementById('aws_news_index');
    awsNewsDiv.appendChild(table);
}
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

render_news_index()
render_news()
