let currentAccount = 'None';
let prevAccountText = '';

const textNode = document.createTextNode('DATA: ')

const button = document.createElement('button')
button.style.display = 'none'
button.innerText = 'Register Account'
button.className = 'awsui_button_vjswe_1js1s_101 awsui_variant-primary_vjswe_1js1s_210'

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
            const alias = result.aws_accounts.find(account => account.accountID === accountId);
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
    } catch (error) {
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
    let accountDetailMenu = document.querySelector("#menu--account")
    let divs = accountDetailMenu.querySelectorAll('div')
    console.log(divs.length)

    if (divs.length > 12) {
        // Assumed cross-account role
        let menuAcount = divs[1]
        let spans = menuAcount.querySelectorAll('span');

        // Extract IAM user and Account ID values
        if ((spans[0].textContent.trim() == 'Currently active as:') &&
            (spans[3].textContent.trim() == 'Account ID:')) {
            console.log(spans[1].textContent.trim())
            console.log(spans[4].textContent.trim())
        }
    } else {
        // IAM user
        let accountDetailMenu = divs[0]
        let spans = accountDetailMenu.querySelectorAll('span');
        console.log(spans)

        // Extract IAM user and Account ID values
        let iamUser = spans[4].textContent.trim(); // Assuming IAM user is the 4th span element
        let accountID = spans[1].textContent.trim(); // Assuming Account ID is the 2nd span element

        console.log('IAM user:', iamUser);
        console.log('Account ID:', accountID);
    }

    const spanElement = document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
    if (spanElement) {
        const innerText = spanElement.textContent;
        const parts = innerText.split(' @ ');
        if (parts.length == 2) {
            return parts[1].trim()
        } else {
            //     this is assumed Role

        }
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

        // <div className="bar">
        //     <div className="left-content">
        //         <span>Text on the left</span>
        //     </div>
        //     <div className="button-container">
        //         <button>Button</button>
        //     </div>
        // </div>

        const barDiv = document.createElement('div',);
        barDiv.className = "bar"

// Apply styles to the div
//         barDiv.style.backgroundColor = '#393941';
//         barDiv.style.color = 'white';
//         barDiv.style.fontSize = '16px';
//         barDiv.style.padding = '4px';

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
