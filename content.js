let currentAccount = 'None';
let prevAccountText = '';
const textNode = document.createTextNode('DATA: ');

const button = document.createElement('button');
button.style.display = 'none';
button.innerText = 'Register Account';

// Add event listener to handle button click
button.addEventListener('click', function () {
    button.style.display = 'none';
    chrome.runtime.sendMessage({
        "action": "openOptionsPage", "accountID": currentAccount
    });
});

changeProgressBar()

setTimeout(changeProgressBar, 5000);

setInterval(function () {
    let accountId = getAccountIDFromAWSConsole()
    let region = getRegion()
    try {

        chrome.storage.sync.get(['aws_accounts'], function (result) {
            const alias = result['aws_accounts'].find(account => account.accountID === accountId);
            let accountText;
            if (alias === undefined) {
                const obj = {};
                obj['new_account_id'] = accountId;
                chrome.storage.sync.set(obj, function () {
                });
                accountText = `AWS Account: Unknown | id:${accountId} region:${region}`
                currentAccount = accountId
                button.style.display = 'block'
                chrome.runtime.sendMessage({action: 'changeAlarmIcon'});
            } else {
                accountText = `AWS Account: ${alias.name}`
                button.style.display = 'none'
                chrome.runtime.sendMessage({action: 'changeDefaultIcon'});
            }

            if (prevAccountText !== accountText) {
                textNode.textContent = accountText
                prevAccountText = accountText
            }
        });
    } catch (error){
        accountText = `AWS Account: Unknown | id:${accountId} region:${region}`
        textNode.textContent = accountText
    }


}, 5000);

function getRegion() {
    const regionSpanElement = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]');
    if (regionSpanElement) {
        return regionSpanElement.textContent
    }
    return 'NONE'
}

function getAccountIDFromAWSConsole() {
    const spanElement = document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
    if (spanElement) {
        const innerText = spanElement.textContent;
        const parts = innerText.split(' @ ');
        return parts[1].trim()
    }
    return 'NONE'
}

function changeProgressBar() {
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


        const barDiv = document.createElement('div');

// Apply styles to the div
        barDiv.style.backgroundColor = '#393941';
        barDiv.style.color = 'white';
        barDiv.style.fontSize = '16px';
        barDiv.style.padding = '4px';
        barDiv.appendChild(textNode);
        barDiv.appendChild(button);

        // divElement.parentNode.insertBefore(textNode, divElement);
        divElement.parentNode.insertBefore(barDiv, divElement);

        // chrome.storage.sync.get(['aws_accounts'], function (result) {
        //     result['aws_accounts'].forEach(account => {
        //         textNode.appendData(`${account.name}, `)
        //         // console.log(account.name)
        //     })
        // });
    }
}
