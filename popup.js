chrome.storage.sync.get(['popupText'], function(result) {
    const popupText = result.popupText || "Default Popup Text";
    const outputDiv = document.getElementById('output');
    outputDiv.textContent = popupText;
});

const myLink = document.getElementById('myLink');
const myLink2 = document.getElementById('myLink2');

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
myLink.addEventListener('click', linkClickHandler);
myLink2.addEventListener('click', extensionSettingsHandler);