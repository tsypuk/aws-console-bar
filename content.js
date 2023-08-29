console.log("Content script loaded");

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
    const divElement = document.querySelector('.global-nav__content');
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
