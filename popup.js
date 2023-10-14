const accountsCountElement = document.getElementById("accountsCount")

chrome.action.setBadgeText({
        text: "TIME",
    }, () => {
        console.log("badge text")
    }
)

chrome.storage.sync.get(['aws_accounts'], result => {
    accountsCountElement.textContent = `Accounts: ${result.aws_accounts.length}`
})

chrome.storage.sync.get(['popupText'], result => {
    const popupText = result.popupText || "Default Popup Text";
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = popupText;
});

const myLinkElement = document.getElementById('myLink');
const myLink2Element = document.getElementById('myLink2');

// Define the function to be called when the link is clicked
function linkClickHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    const url = 'https://www.example.com'; // Replace with the URL you want to open
    window.open(url, '_blank');
}

function extensionSettingsHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    chrome.runtime.openOptionsPage()
}


// Add a click event listener to the link
myLinkElement.addEventListener('click', linkClickHandler);
myLink2Element.addEventListener('click', extensionSettingsHandler);