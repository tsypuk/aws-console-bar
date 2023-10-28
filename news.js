const ulAwsTopics = document.getElementById('aws-topics')
const tableTitle = document.getElementById('table-title')
const awsNewsDiv = document.getElementById('aws_news_div')
const awsNewsIndexDiv = document.getElementById('aws_news_index')
const indexNewsNavA = document.getElementById('index_news_nav_a')

indexNewsNavA.addEventListener('click', handleNavIndexClick)

function addElementToTab(name) {
    li = document.createElement('li')
    li.id = `id_${name}`
    li.className = "nav-item"
    a = document.createElement('a')
    a.className = "nav-link"
    a.text = name
    a.id = name
    a.addEventListener('click', handleNavClick)
    li.appendChild(a)
    ulAwsTopics.appendChild(li)
}

function handleNavIndexClick(event) {
    tableTitle.textContent = 'Index Content'
    awsNewsIndexDiv.style.display = 'block'
    awsNewsDiv.style.display = 'none'
}

function handleNavClick(event) {
    const nav = this.id;
    tableTitle.textContent = `${convertToBigDataFormat(this.text)} feed`
    awsNewsIndexDiv.style.display = 'none';
    awsNewsDiv.style.display = 'block'
    render_news(this.text)
}

function convertToBigDataFormat(inputString) {
    let upperCaseString = inputString.toUpperCase();
    let formattedString = upperCaseString.replace(/_/g, ' ');
    return formattedString;
}

function fetchRss(name) {
    fetch(`https://blog.tsypuk.com/aws-news/news/${name}.json`)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            console.log(`Fetch ${name} RSS into local storage...`)
            chrome.storage.local.set({[name]: data})
            chrome.storage.local.get(['feed'], result => {
                result.feed.push(name)
                chrome.storage.local.set({'feed': result.feed})
            })
        })
}

function render_news_index() {
    if (awsNewsDiv.firstChild) {
        awsNewsDiv.removeChild(awsNewsDiv.firstChild)
    }
    const table = document.createElement('table');
    table.className = "table table-hover"
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Category</th>
          <th>Link</th>
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

                const checkDiv = document.createElement('div')
                checkDiv.className = "form-check form-switch"

                const inputElement = document.createElement('input');
                inputElement.type = 'checkbox';
                inputElement.className = 'form-check-input'
                inputElement.id = item.name;
                inputElement.checked = item.checked
                inputElement.addEventListener('click', handleCheckboxClick)

                firstCell.appendChild(checkDiv)
                checkDiv.appendChild(inputElement)

                const secondCell = document.createElement('td');
                secondCell.textContent = item.name;

                const thirdCell = document.createElement('td');
                // thirdCell.textContent = JSON.stringify(item);
                thirdCell.textContent = item['path'];

                if (item.checked) {
                    newRow.className = "table-primary"
                    addElementToTab(item.name)
                }
                newRow.appendChild(firstCell);
                newRow.appendChild(secondCell);
                newRow.appendChild(thirdCell);
                tbody.appendChild(newRow);
            })
        }
    })

    awsNewsIndexDiv.appendChild(table);

    function handleCheckboxClick(event) {
        const checkbox = event.target;
        const id = checkbox.id;
        console.log(`Checkbox with ID ${id} clicked. ${checkbox.checked}: `);
        chrome.storage.local.get(['rss_index'], result => {
            const clickedItem = result.rss_index.filter(item => item.name === id)[0]
            clickedItem.checked = checkbox.checked
            var newRow = checkbox.parentNode.parentNode.parentNode;
            let name = checkbox.parentNode.parentNode.nextElementSibling.textContent;
            if (checkbox.checked) {
                newRow.className = "table-primary"
                fetchRss(name)
                addElementToTab(name)
            } else {
                newRow.className = ""
                document.getElementById(`id_${name}`).remove()
                chrome.storage.local.get(['feed'], result => {

                    let index = result.feed.indexOf(name);
                    if (index > -1) {
                        result.feed.splice(index, 1);
                    }
                    chrome.storage.local.set({feed: result.feed})
                })
            }
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

function render_news(rssCategoryName) {
    if (awsNewsDiv.firstChild) {
        awsNewsDiv.removeChild(awsNewsDiv.firstChild)
    }
    const table = document.createElement('table');
    table.className = "table table-hover"
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Populate the table with data from the accounts array
    console.log(rssCategoryName)
    chrome.storage.local.get([rssCategoryName], result => {
        console.log(result)
        if (result[rssCategoryName]) {
            result[rssCategoryName].forEach((news, index) => {
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
    awsNewsDiv.appendChild(table);
}
