let currentAccount = 'None'
let prevAccountText = ''

const accountTextElement = document.createTextNode('DATA: ')
const newsLink = document.createElement('a');

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

setTimeout(changeProgressBar, 5000)

setInterval(function () {

    chrome.storage.sync.get(["latest_news"], (res) => {
        newsLink.href = res.latest_news.link
        newsLink.textContent = res.latest_news.title
        newsLink.target = "_blank"
    })

    result = getAccountIDFromAWSConsole()
    let activeAccount = result.accountID
    // let iamUser = result.iamUser
    // console.log(result)
    let region = getRegion()
    try {

        chrome.storage.sync.get(['aws_accounts'], function (result) {
            const alias = result.aws_accounts.find(account => account.accountID === activeAccount)
            let accountText
            if (alias === undefined) {
                const obj = {}
                obj['new_account_id'] = activeAccount
                chrome.storage.sync.set(obj, function () {
                });
                accountText = `AWS Account: Unknown | id:${activeAccount} region:${region}`
                currentAccount = activeAccount
                button.style.display = 'block'
                chrome.runtime.sendMessage({action: 'changeAlarmIcon'});
            } else {
                accountText = `AWS Account: ${alias.name}`
                button.style.display = 'none'
                chrome.runtime.sendMessage({action: 'changeDefaultIcon'})
            }

            if (prevAccountText !== accountText) {
                accountTextElement.textContent = accountText
                prevAccountText = accountText
            }
        })
    } catch (error) {
        accountTextElement.textContent = `AWS Account: Unknown | id:${activeAccount} region:${region}`
    }


}, 5000)

function getRegion() {
    const regionSpanElement = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]')
    if (regionSpanElement) {
        return regionSpanElement.textContent
    }
    return 'NONE'
}

function getAccountIDFromAWSConsole() {
    let accountDetailMenu = document.querySelector("#menu--account")
    let divs = accountDetailMenu.querySelectorAll('div')

    if (divs.length > 12) {
        // Assumed cross-account role
        let activeSessionSpans = divs[1].querySelectorAll('span')
        let srcUserSpans = divs[5].querySelectorAll('span')
        let srcAccountSpans = divs[6].querySelectorAll('span')

        // Extract IAM user and Account ID values
        if ((activeSessionSpans[0].textContent.trim() === 'Currently active as:') &&
            (activeSessionSpans[3].textContent.trim() === 'Account ID:') &&
            (srcUserSpans[0].textContent.trim() === 'Signed in as:') &&
            (srcAccountSpans[0].textContent.trim() === 'Account ID:')) {
            // activeRole
            let activeRole = activeSessionSpans[1].textContent.trim();
            console.log(activeRole)
            // activeAccount
            activeAccount = activeSessionSpans[4].textContent.trim()
            console.log(activeAccount)
            // user
            user = srcUserSpans[1].textContent.trim()
            console.log(user)
            // srcAccount
            let srcAccount = srcAccountSpans[1].textContent.trim()
            console.log(srcAccount)
            return {iamUser: `${user}/${activeRole}::${srcAccount}`, accountID: activeAccount}
        }
    } else {
        // IAM user
        let accountDetailMenu = divs[0]
        let spans = accountDetailMenu.querySelectorAll('span')
        // console.log(spans)
        if ((spans[0].textContent.trim() === 'Account ID:') &&
            (spans[3].textContent.trim() === 'IAM user:')) {
            // Extract IAM user and Account ID values
            let iamUser = spans[4].textContent.trim() // Assuming IAM user is the 4th span element
            let accountID = spans[1].textContent.trim() // Assuming Account ID is the 2nd span element

            console.log('IAM user:', iamUser);
            console.log('Account ID:', accountID);
            return {iamUser, accountID}
        }
    }

    // const spanElement = document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
    // if (spanElement) {
    //     const innerText = spanElement.textContent;
    //     const parts = innerText.split(' @ ');
    //     if (parts.length == 2) {
    //         return parts[1].trim()
    //     } else {
    //         //     this is assumed Role
    //
    //     }
    // }
    return {iamUser: 'NONE', accountID: 'NONE'}
}

function changeProgressBar() {
    const divElement = document.querySelector('#awsc-navigation-container')
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

        const barDiv = document.createElement('div')
        barDiv.className = "bar"

        const leftContentDiv = document.createElement('div')
        leftContentDiv.className = "left-content"
        barDiv.appendChild(leftContentDiv)

        const newsDiv = document.createElement('div')
        newsDiv.className = "news-content"
        barDiv.appendChild(newsDiv)

        const buttonDiv = document.createElement('div')
        buttonDiv.className = "button-container"
        barDiv.appendChild(buttonDiv)

// Apply styles to the div
//         barDiv.style.backgroundColor = '#393941';
//         barDiv.style.color = 'white';
//         barDiv.style.fontSize = '16px';
//         barDiv.style.padding = '4px';

        leftContentDiv.appendChild(accountTextElement)
        newsDiv.appendChild(newsLink)
        buttonDiv.appendChild(button)

        // divElement.parentNode.insertBefore(accountText, divElement);
        divElement.parentNode.insertBefore(barDiv, divElement)

        // chrome.storage.sync.get(['aws_accounts'], function (result) {
        //     result['aws_accounts'].forEach(account => {
        //         accountText.appendData(`${account.name}, `)
        //         // console.log(account.name)
        //     })
        // })
    }
}
