var popupTextInput = document.getElementById('popupTextInput');

var saveButton = document.getElementById('saveButton');

let accounts = [];

chrome.storage.sync.get(['popupText'], function (result) {
    popupTextInput.value = result.popupText || "Default Popup Text";
});

function clear_accounts_table() {
    const awsAccountsDiv = document.getElementById("aws_accounts");

    while (awsAccountsDiv.firstChild) {
        awsAccountsDiv.removeChild(awsAccountsDiv.firstChild);
    }
}
function render_accounts_table() {
    const table = document.createElement('table');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Account ID</th>
          <th>Name</th>
          <th>Production</th>
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
        <td>${account.name}</td>
        <td>${account.prod ? 'Yes' : 'No'}</td>
      `;
        tbody.appendChild(row);
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
    var newText = popupTextInput.value;
    console.log(newText)
    var obj = {};
    obj['popupText'] = newText;
    // chrome.storage.sync.set(obj, function () {
    //     alert('Data saved');
    // });


    var accountTextInput = document.getElementById('accountTextInput');
    var nameTextInput = document.getElementById('nameTextInput');
    var isProdInput = document.getElementById('isProdInput');

    let aws_account = {
        accountID: accountTextInput.value,
        name: nameTextInput.value,
        prod: isProdInput.value
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
