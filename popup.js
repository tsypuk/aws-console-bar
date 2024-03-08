const awsAccountsDiv = document.getElementById('aws_accounts');

chrome.action.setBadgeText({
        text: "TIME",
    }, () => {
        console.log("badge text")
    }
)

let render = (aws_accounts) => {
    if (aws_accounts.length > 0) {

        const table = document.createElement('table');
        table.className = "table table-hover"
        table.innerHTML = `
      <thead>
        <tr>
          <th></th>
          <th>aws account</th>
          <th>alias</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

        const tbody = table.querySelector('tbody');

        aws_accounts.forEach(account => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>
        <div class="colorcontainer">
        <input id="color_${account.accountID}" type="color" value="${account.color}" class="circle"/>
        </div>
        </td>
        <td>${account.accountID}</td>
        <td>${account.name}</td>
      `;
            tbody.appendChild(row);
        })
        // Inject the table into the div with id "aws_accounts"
        awsAccountsDiv.appendChild(table);
    } else {
        console.log('no accounts')
    }
}

function render_accounts_table() {
    // Populate the table with data from the accounts array
    chrome.storage.sync.get(['aws_accounts'], result => render(result.aws_accounts))
}

render_accounts_table()


chrome.storage.sync.get(['popupText'], result => {
    const popupText = result.popupText || "Default Popup Text"
    const outputDiv = document.getElementById('output')
    outputDiv.textContent = popupText
})

const myLinkElement = document.getElementById('myLink')
const myLink2Element = document.getElementById('myLink2')

// Define the function to be called when the link is clicked
function linkClickHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    const url = 'https://tsypuk.github.io/aws-console-bar/'; // Replace with the URL you want to open
    window.open(url, '_blank')
}

function extensionSettingsHandler(event) {
    event.preventDefault() // Prevent the default behavior of the link
    chrome.runtime.openOptionsPage()
}


// Add a click event listener to the link
myLinkElement.addEventListener('click', linkClickHandler)
myLink2Element.addEventListener('click', extensionSettingsHandler)