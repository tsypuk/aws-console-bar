let currentAccount = 'None'
let prevAccountText = ''

const accountTextElement = document.createTextNode('')
const newsLink = document.createElement('a');

const leftContentDiv = document.createElement('div')
const barDiv = document.createElement('div')

const circleDiv = document.createElement('div');

const registerButton = document.createElement('button')

window.onload = function exampleFunction() {
    changeProgressBar()
}

registerButton.style.display = 'none'
registerButton.innerText = 'Register Account'
// button.className = 'awsui_button_vjswe_1js1s_101 awsui_variant-primary_vjswe_1js1s_210'

// Add event listener to handle button click
registerButton.addEventListener('click', function () {
    registerButton.style.display = 'none';
    chrome.runtime.sendMessage({
        "action": "openOptionsPage", "accountID": currentAccount
    });
});

let myTimeout = setTimeout(changeProgressBar, 2000)

// changeProgressBar()

function changeStyleToActive(isActive) {
    if (isActive) {
        newsLink.className = "white"
        leftContentDiv.classList.add('white')
        leftContentDiv.classList.remove('black')
        barDiv.classList.remove('orange')
    } else {
        newsLink.className = "black"
        leftContentDiv.classList.add('black')
        leftContentDiv.classList.remove('white')

        barDiv.classList.add('orange')
    }

}

function limitString(input, maxLength) {
    return input.length > maxLength ? input.substring(0, maxLength) : input;
}

let renderBar = () => {

    const result = getAccountIDFromAWSConsole()
    if (result) {
        result['time'] = Date.now()

        chrome.runtime.sendMessage({
            action: "getActiveSession", session: result
        });

        let activeAccount = result.accountID
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
                    accountText = `AWS Account: Unknown`
                    changeStyleToActive(false)
                    currentAccount = activeAccount
                    registerButton.textContent = `Register: ${activeAccount}`
                    registerButton.style.display = 'block'
                    chrome.runtime.sendMessage({action: 'changeAlarmIcon'});
                } else {
                    accountText = `AWS Account: ${alias.name}`
                    registerButton.style.display = 'none'
                    chrome.runtime.sendMessage({action: 'changeDefaultIcon'})
                    changeStyleToActive(true)
                }

                if (prevAccountText !== accountText) {
                    accountTextElement.textContent = accountText
                    prevAccountText = accountText
                    if (prevAccountText !== `AWS Account: Unknown`) {
                        circleDiv.style.backgroundColor = "blue"
                    }
                }
            })
        } catch (error) {
            accountTextElement.textContent = `AWS Account: Unknown`
            registerButton.textContent = activeAccount
            changeStyleToActive(false)
        }

    }

    chrome.storage.local.get(["latest_news"], (res) => {
        if (res.latest_news) {
            newsLink.href = res.latest_news.link
            let topic = res.latest_news.topic
            newsLink.textContent = limitString(`${topic}: ${res.latest_news.title}`, 100)
            newsLink.target = "_blank"
        }
    })
}

setInterval(renderBar, 10000)

function getRegion() {
    const regionSpanElement = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]')
    if (regionSpanElement) {
        return regionSpanElement.textContent
    }
    return 'NONE'
}

function getAccountIDFromAWSConsole() {
    let accountDetailMenu = document.querySelector("#menu--account")
    if (accountDetailMenu) {
        let divs = accountDetailMenu.querySelectorAll('div')

        if (divs.length > 12) {
            // Assumed cross-account role
            let activeSessionSpans = divs[1].querySelectorAll('span')
            let srcUserSpans = divs[5].querySelectorAll('span')
            let srcAccountSpans = divs[6].querySelectorAll('span')

            // Extract IAM user and Account ID values
            if ((activeSessionSpans[0].textContent.trim() === 'Currently active as:') && (activeSessionSpans[3].textContent.trim() === 'Account ID:') && (srcUserSpans[0].textContent.trim() === 'Signed in as:') && (srcAccountSpans[0].textContent.trim() === 'Account ID:')) {
                // activeRole
                let activeRole = activeSessionSpans[1].textContent.trim();
                // activeAccount
                activeAccount = activeSessionSpans[4].textContent.trim()
                // user
                user = srcUserSpans[1].textContent.trim()
                // srcAccount
                let srcAccount = srcAccountSpans[1].textContent.trim()
                return {
                    iamUser: `${user}/${activeRole}::${srcAccount}`, accountID: activeAccount, type: 'cross-account-role'
                }
            }
        } else {
            // IAM user
            let accountDetailMenu = divs[0]
            let spans = accountDetailMenu.querySelectorAll('span')
            if (spans[0].textContent.trim() === 'Account ID:') {
                // Extract IAM user and Account ID values
                let iamUser = spans[4].textContent.trim() // Assuming IAM user is the 4th span element
                let accountID = spans[1].textContent.trim() // Assuming Account ID is the 2nd span element

                type = 'UNKNOWN'
                if (spans[3].textContent.trim() === 'IAM user:') {
                    type = 'iam_user'
                }
                if (spans[3].textContent.trim() === 'Federated user:') {
                    type = 'federated_user'
                }
                return {iamUser, accountID, type}
            }
        }
        return {iamUser: 'NONE', accountID: 'NONE', type: 'NONE'}
    }
}

function changeProgressBar() {
    const divElement = document.querySelector('#awsc-navigation-container')
    if (divElement) {
        barDiv.className = "bar"

        leftContentDiv.className = "left-content"

        // <div style="width: 100px; height: 100px; border-radius: 50%; background-color: red;"></div>
        // change color to yellow
        circleDiv.style = "width: 20px; height: 20px; border-radius: 50%; background-color: rgb(255, 174, 0);"
        barDiv.appendChild(circleDiv)
        barDiv.appendChild(leftContentDiv)

        const newsDiv = document.createElement('div')
        newsDiv.className = "news-content"
        barDiv.appendChild(newsDiv)

        const buttonDiv = document.createElement('div')
        buttonDiv.className = "button-container"
        barDiv.appendChild(buttonDiv)

        leftContentDiv.appendChild(accountTextElement)
        newsDiv.appendChild(newsLink)
        buttonDiv.appendChild(registerButton)

        divElement.parentNode.insertBefore(barDiv, divElement)

        clearTimeout(myTimeout)
        changeStyleToActive(false)
        renderBar()
    } else {
        // console.error('No nav element')
    }
}
