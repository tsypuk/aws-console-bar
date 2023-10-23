const saveButton = document.getElementById('save-button')
const exportButton = document.getElementById('export-button')

const accountIdInput = document.getElementById('account-input')
const accountNameInput = document.getElementById('name-input')

exportButton.addEventListener('click', () => {
    chrome.storage.sync.get(['aws_accounts'], result => {
        if (result.aws_accounts.length > 0) {
            const jsonData = result.aws_accounts
            const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(jsonBlob);

            chrome.downloads.download({
                url: url,
                filename: 'exported_aws_accounts.json',
                saveAs: true
            })
        }
    })
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

function updateAccount(accountID, accountName) {
    chrome.storage.sync.get(['aws_accounts'], result => {
        const updatedAccounts = result.aws_accounts.map(account => (account.accountID === accountID) ? {...account, name: accountName} : account);
        saveAccountsToStorage(updatedAccounts)
    })
}

function render_accounts_table() {
    const table = document.createElement('table');
    table.className = "table table-hover"
    table.innerHTML = `
      <thead>
        <tr>
          <th>Account ID</th>
          <th>Name</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Populate the table with data from the accounts array
    chrome.storage.sync.get(['aws_accounts'], result => {
        exportButton.style.display = (result.aws_accounts.length > 0) ? 'block' : 'none'
        if (result.aws_accounts) {
            result.aws_accounts.forEach(account => {
                const row = document.createElement('tr');
                row.innerHTML = `
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
                    const accountName = inputAccountName.value;
                    updateAccount(accountID, accountName)
                })

            })
        }
    })

    // Inject the table into the div with id "aws_accounts"
    const awsAccountsDiv = document.getElementById('aws_accounts');
    awsAccountsDiv.appendChild(table);
}

render_accounts_table()

function clear_account_input() {
    accountIdInput.value = '';
    accountNameInput.value = '';
}

saveButton.addEventListener('click', () => {
    // TODO: add user input validation
    let aws_account = {
        accountID: accountIdInput.value, name: accountNameInput.value,
    }
    addAccount(aws_account)
})
