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
                const newRow = document.createElement('tr');

                const firstCell = document.createElement('td');
                const inputElement = document.createElement('input');
                inputElement.type = 'checkbox';
                inputElement.id = item.name;
                inputElement.checked = item.checked
                inputElement.addEventListener('click', handleCheckboxClick)
                firstCell.appendChild(inputElement);

                const secondCell = document.createElement('td');
                secondCell.textContent = item.name;

                const thirdCell = document.createElement('td');
                thirdCell.textContent = JSON.stringify(item);

                newRow.appendChild(firstCell);
                newRow.appendChild(secondCell);
                newRow.appendChild(thirdCell);
                tbody.appendChild(newRow);
            })
        }
    })

    const awsNewsDiv = document.getElementById('aws_news_index');
    awsNewsDiv.appendChild(table);
    console.log('table')

    function handleCheckboxClick(event) {
        const checkbox = event.target;
        const id = checkbox.id;
        console.log(`Checkbox with ID ${id} clicked. ${checkbox.checked}: `);
        chrome.storage.local.get(['rss_index'], result => {
            const clickedItem = result.rss_index.filter(item => item.name === id)[0]
            clickedItem.checked = checkbox.checked
            saveIndexToStorage(result.rss_index)
        })
    }

    function getSubscribedNewsFromIndex() {
        chrome.storage.local.get(['rss_index'], result => {
            return result.rss_index.filter(item => item.name === id)
        })
    }
}

function saveIndexToStorage(rss_index) {
    console.log(rss_index)
    const obj = {};
    obj['rss_index'] = rss_index;
    chrome.storage.local.set(obj)
}

render_news_index()

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
