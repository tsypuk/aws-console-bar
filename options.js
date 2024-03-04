function getRandomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    // Convert the values to a hexadecimal string and return it
    return "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const saveButton = document.getElementById('save-button')
const exportButton = document.getElementById('export-button')
const importButton = document.getElementById('import-button')


const accountIdInput = document.getElementById('account-input')
const accountNameInput = document.getElementById('name-input')
const accountColorInput = document.getElementById('color-input')

const awsAccountsDiv = document.getElementById('aws_accounts');

accountColorInput.value = getRandomColor()

exportButton.addEventListener('click', () => {
    chrome.storage.sync.get(['aws_accounts'], result => {
        if (result.aws_accounts.length > 0) {
            const jsonData = result.aws_accounts
            const textArea = document.getElementById('accounts_export')
            textArea.value = JSON.stringify(jsonData, null, 2);
            document.getElementById('div_accounts_export').hidden = false
            textArea.select();
        }
    })
})

function mergeJsonData(mergedData, newData) {
    newData.forEach(function (obj) {
        if (!mergedData.some(search => search.accountID === obj.accountID && search.color == obj.color && search.name == obj.name)) {
            mergedData.push(obj)
        }
    });
    return mergedData
}

importButton.addEventListener('click', () => {
    let fileInput = document.getElementById('fileInput');

    var accountImportedJsonData = []
    for (const file of fileInput.files) {
        let reader = new FileReader();

        reader.onload = function (e) {

            let fileContent = e.target.result;
            let jsonData = JSON.parse(fileContent);
            mergeJsonData(accountImportedJsonData, jsonData);
            clear_accounts_table()
            saveAccountsToStorage(accountImportedJsonData)
            render(accountImportedJsonData)
        };

        reader.readAsText(file);
    }

})

chrome.storage.sync.get(['aws_accounts'], result => {
    if (result.aws_accounts == null) {
        console.log('Extension init...')
        chrome.storage.sync.set({aws_accounts: []}, () => {
            console.log('Init aws accounts storage...')
        })
    }
})

chrome.storage.sync.get(['new_account_id'], result => {
    if (result !== null) {
        accountIdInput.value = result.new_account_id

        const obj = {};
        obj['new_account_id'] = null;
        chrome.storage.sync.set(obj, () => {
        });
    }
})

function clear_accounts_table() {
    const awsAccountsDiv = document.getElementById("aws_accounts");

    while (awsAccountsDiv.firstChild) {
        awsAccountsDiv.removeChild(awsAccountsDiv.firstChild);
    }
}

function deleteAccount(accountID) {
    chrome.storage.sync.get(['aws_accounts'], result => {
        const filteredAccounts = result.aws_accounts.filter(account => account.accountID !== accountID);
        saveAccountsToStorage(filteredAccounts)
        clear_accounts_table()
        render_accounts_table()
    })
}

function addAccount(aws_account) {
    chrome.storage.sync.get(['aws_accounts'], result => {
        result.aws_accounts.push(aws_account)
        saveAccountsToStorage(result.aws_accounts)

        clear_accounts_table()
        render_accounts_table()

        clear_account_input()
    })
}

function saveAccountsToStorage(accounts) {
    const obj = {};
    obj['aws_accounts'] = accounts;
    chrome.storage.sync.set(obj)
    exportButton.style.display = (accounts.length > 0) ? 'block' : 'none'
}

function updateAccount(accountID, accountName, color) {
    chrome.storage.sync.get(['aws_accounts'], result => {
        const updatedAccounts = result.aws_accounts.map(account => (account.accountID === accountID) ? {...account, name: accountName, color: color} : account);
        saveAccountsToStorage(updatedAccounts)
    })
}

let render = (aws_accounts) => {
    exportButton.style.display = (aws_accounts.length > 0) ? 'block' : 'none'
    if (aws_accounts.length > 0) {

        const table = document.createElement('table');
        table.className = "table table-hover"
        table.innerHTML = `
      <thead>
        <tr>
          <th>Color</th>
          <th>Account ID</th>
          <th>Alias</th>
          <th>Update</th>
          <th>Delete</th>
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
        <td><input type="text" id="account_name_${account.accountID}" value="${account.name}" class="form-control me-2"></td>
        <td><button id="update_${account.accountID}" class="btn btn-warning">Update</button></td>
        <td><button id="del_${account.accountID}" class="btn btn-danger">Delete</button></td>
      `;
            tbody.appendChild(row);
            const deleteButton = row.querySelector(`#del_${account.accountID}`);
            const updateButton = row.querySelector(`#update_${account.accountID}`);

            deleteButton.addEventListener("click", function () {
                const buttonId = deleteButton.id; // Get the unique ID of the clicked button
                const accountID = buttonId.replace(new RegExp(`^${'del_'}`), '');
                deleteAccount(accountID)
            })

            updateButton.addEventListener("click", function () {
                const buttonId = updateButton.id; // Get the unique ID of the clicked button
                const accountID = buttonId.replace(new RegExp(`^${'update_'}`), '');
                const inputAccountName = document.getElementById(`account_name_${accountID}`);
                const color = document.getElementById(`color_${accountID}`).value;
                const accountName = inputAccountName.value;
                updateAccount(accountID, accountName, color)
            })

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

function clear_account_input() {
    accountIdInput.value = '';
    accountNameInput.value = '';
}

saveButton.addEventListener('click', () => {
    // TODO: add user input validation
    let aws_account = {
        accountID: accountIdInput.value, name: accountNameInput.value, color: accountColorInput.value
    }
    addAccount(aws_account)
})
