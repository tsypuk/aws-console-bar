console.log("AWS Account script loaded");

accounts = []

chrome.storage.sync.get(['aws_accounts'], function (result) {
    // popupTextInput.value = result.popupText || "Default Popup Text";
    console.log('Loading accounts')
    Array.prototype.push.apply(accounts, result['aws_accounts'])
    console.log(accounts)
    // Create a table
    render_accounts_table()
});


changeProgressBar()

setTimeout(changeProgressBar, 5000);

function changeProgressBar() {
    console.log('5 sec looking for global-nav__content')

    const spanElement = document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
    if (spanElement) {
        const innerText = spanElement.textContent;
        console.log(innerText);
        // Split the string by the "@" character
        const parts = innerText.split('@');
        const rightSide = parts[1].trim();
        console.log(rightSide);
    } else {
        console.log("Span element not found.");
    }

    const regionSpanElement = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]');
    if (regionSpanElement) {
        const innerText = regionSpanElement.textContent;
        console.log(innerText);
    }

    const divElement = document.querySelector('#awsc-navigation-container');
    if (divElement) {
        divElement.style.backgroundColor = 'red';
        const textNode = document.createTextNode('DATA: ');

// Insert the text node before the div element
        divElement.parentNode.insertBefore(textNode, divElement);


        accounts.forEach(account => {
            textNode.appendData(`${account.name}, `)
          // console.log(account.name)
        })
    }
    
    
}
