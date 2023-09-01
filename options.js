var popupTextInput = document.getElementById('popupTextInput');

var saveButton = document.getElementById('saveButton');

var accounts = [];

function clear_accounts_table() {
    const awsAccountsDiv = document.getElementById("aws_accounts");

    while (awsAccountsDiv.firstChild) {
        awsAccountsDiv.removeChild(awsAccountsDiv.firstChild);
    }
}

function deleteAccount(accountID) {
    const filteredAccounts = accounts.filter(account => account.accountID !== accountID);
    accounts = filteredAccounts
    saveAccountsToStorage(accounts)
    clear_accounts_table()
    render_accounts_table()
}

function saveAccountsToStorage(accounts) {
    var obj = {};
    obj['aws_accounts'] = accounts;
    chrome.storage.sync.set(obj, function () {
    });
}

function updateAccount(accountID, accountName) {
    const updatedAccounts = accounts.map(account =>
        (account.accountID === accountID) ?
            {...account, name: accountName} :
            account
    );
    accounts = updatedAccounts
    saveAccountsToStorage(updatedAccounts)
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
    accounts.forEach(account => {
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
            console.log("Button clicked: " + buttonId);
            const accountID = buttonId.replace(new RegExp(`^${'del_'}`), '');
            console.log(accountID)
            deleteAccount(accountID)
        })

        updateButton.addEventListener("click", function () {
            const buttonId = updateButton.id; // Get the unique ID of the clicked button
            const accountID = buttonId.replace(new RegExp(`^${'update_'}`), '');
            const inputAccountName = document.getElementById(`account_name_${accountID}`);
            const accountName = inputAccountName.value;

            updateAccount(accountID, accountName)
        })

    });

    // Inject the table into the div with id "aws_accounts"
    const awsAccountsDiv = document.getElementById('aws_accounts');
    awsAccountsDiv.appendChild(table);
}

chrome.storage.sync.get(['aws_accounts'], function (result) {
    // popupTextInput.value = result.popupText || "Default Popup Text";
    console.log('Loading accounts')
    Array.prototype.push.apply(accounts, result['aws_accounts'])
    console.log(accounts)
    // Create a table
    render_accounts_table()
});

saveButton.addEventListener('click', function () {
    var accountTextInput = document.getElementById('accountTextInput');
    var nameTextInput = document.getElementById('nameTextInput');

    // TODO: add user input validation
    let aws_account = {
        accountID: accountTextInput.value,
        name: nameTextInput.value,
    }
    accounts.push(aws_account)
    console.log(accounts)

    var obj = {};
    obj['aws_accounts'] = accounts;
    chrome.storage.sync.set(obj, function () {
    });
    clear_accounts_table()
    render_accounts_table()


    // chrome.storage.sync.set({ popupText: newText });
});
