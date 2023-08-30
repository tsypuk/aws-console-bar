console.log("AWS Account script loaded");

accounts = []
var prevAccountText = ''
const textNode = document.createTextNode('DATA: ');

chrome.storage.sync.get(['aws_accounts'], function (result) {
    // popupTextInput.value = result.popupText || "Default Popup Text";
    console.log('Loading accounts')
    Array.prototype.push.apply(accounts, result['aws_accounts'])
    console.log(accounts)
    // Create a table
    render_accounts_table()
});

function findAccount(accountToFind) {
    const foundAccount = accounts.find(account => account.accountID === accountToFind);

    if (foundAccount) {
        return foundAccount
    } else {
        console.log("Account not found.");
        return null
    }
}


changeProgressBar()

setTimeout(changeProgressBar, 5000);

setInterval(function () {
        let accountId = getAccountID()
        console.log(accountId)

        let region = getRegion()
        console.log(region)

        let alias = findAccount(accountId)
        let accountText;
        if (alias === null) {
            accountText = `Unknown AccountID: ${accountId} region: ${region}`
        } else {
            accountText = `Active Session: ${alias.name}`
        }

        if (prevAccountText != accountText) {
            textNode.textContent = accountText
            prevAccountText = accountText
        }
    }
    , 5000);

function getRegion() {
    const regionSpanElement = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]');
    if (regionSpanElement) {
        const innerText = regionSpanElement.textContent;
        // console.log(innerText);
        return innerText
    }
    return 'NONE'
}

function getAccountID() {
    const spanElement = document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
    if (spanElement) {
        const innerText = spanElement.textContent;
        // console.log(innerText);
        // Split the string by the "@" character
        const parts = innerText.split('@');
        const rightSide = parts[1].trim();
        // console.log(rightSide);
        return rightSide
    } else {
        console.log("Span element not found.");
    }
    return 'NONE'
}

function changeProgressBar() {
    console.log('5 sec looking for global-nav__content')


    const divElement = document.querySelector('#awsc-navigation-container');
    if (divElement) {
        // divElement.style.backgroundColor = 'red';
        // divElement.className="globalNav-327"
        // const newDiv = document.createElement('div');
        // newDiv.className = 'globalNav-2217'; // Set the class attribute
        // newDiv.textContent = 'This is a new div'; // Set the text content
        // document.body.appendChild(newDiv);

        // const existingDiv = document.getElementById('aws-unified-search-container');
        // const parent = existingDiv.parentNode;
        // parent.insertBefore(newDiv, existingDiv);


        const newdivElement = document.createElement('div');

// Apply styles to the div
        newdivElement.style.backgroundColor = '#393941';
        newdivElement.style.color = 'white';
        newdivElement.style.fontSize = '20px';
        newdivElement.style.padding = '4px';
        newdivElement.appendChild(textNode);

        // divElement.parentNode.insertBefore(textNode, divElement);
        divElement.parentNode.insertBefore(newdivElement, divElement);


        accounts.forEach(account => {
            textNode.appendData(`${account.name}, `)
            // console.log(account.name)
        })
    }


}
