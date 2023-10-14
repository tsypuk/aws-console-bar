const saveButton = document.getElementById('saveButton');
const accountID = document.getElementById('accountTextInput');
const accountName = document.getElementById('nameTextInput');

// Init storage for the first installation
chrome.storage.sync.get(['aws_accounts'], function (result) {
    if (result == null) {
        console.log('Extension init...')
        const obj = {};
        obj['aws_accounts'] = [];
        chrome.storage.sync.set(obj, function () {
        });
    }
})

chrome.storage.sync.get(['new_account_id'], function (result) {
    if (result !== null) {
        accountID.value = result.new_account_id

        const obj = {};
        obj['new_account_id'] = null;
        chrome.storage.sync.set(obj, function () {
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
    chrome.storage.sync.get(['aws_accounts'], function (result) {
        const filteredAccounts = result['aws_accounts'].filter(account => account.accountID !== accountID);
        saveAccountsToStorage(filteredAccounts)
        clear_accounts_table()
        render_accounts_table()
    })
}

function addAccount(aws_account) {
    chrome.storage.sync.get(['aws_accounts'], function (result) {
        result['aws_accounts'].push(aws_account)
        saveAccountsToStorage(result['aws_accounts'])

        clear_accounts_table()
        render_accounts_table()

        clear_account_input()
    })
}

function saveAccountsToStorage(accounts) {
    const obj = {};
    obj['aws_accounts'] = accounts;
    chrome.storage.sync.set(obj, function () {
    });
}

function updateAccount(accountID, accountName) {
    chrome.storage.sync.get(['aws_accounts'], function (result) {
        const updatedAccounts = result['aws_accounts'].map(account => (account.accountID === accountID) ? {...account, name: accountName} : account);
        saveAccountsToStorage(updatedAccounts)
    })
}

function render_accounts_table() {
    const table = document.createElement('table');
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
    chrome.storage.sync.get(['aws_accounts'], function (result) {
        result['aws_accounts'].forEach(account => {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${account.accountID}</td>
        <td><input type="text" id="account_name_${account.accountID}" value="${account.name}" style="width: 300px" ></td>
        <td><button id="update_${account.accountID}">Update</button></td>
        <td><button id="del_${account.accountID}">Delete</button></td>
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
    })

    // Inject the table into the div with id "aws_accounts"
    const awsAccountsDiv = document.getElementById('aws_accounts');
    awsAccountsDiv.appendChild(table);
}

render_accounts_table()


function clear_account_input() {
    accountID.value = '';
    accountName.value = '';
}

saveButton.addEventListener('click', () => {
    // TODO: add user input validation
    let aws_account = {
        accountID: accountID.value, name: accountName.value,
    }
    addAccount(aws_account)
});
