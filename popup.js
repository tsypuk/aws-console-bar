chrome.storage.sync.get(['popupText'], function(result) {
    var popupText = result.popupText || "Default Popup Text";
    var outputDiv = document.getElementById('output');
    outputDiv.textContent = popupText;
});

const myLink = document.getElementById('myLink');
const myLink2 = document.getElementById('myLink2');

// Define the function to be called when the link is clicked
function linkClickHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    console.log('Link clicked!');
    const url = 'https://www.example.com'; // Replace with the URL you want to open
    window.open(url, '_blank');
}

function extlinkClickHandler(event) {
    event.preventDefault(); // Prevent the default behavior of the link
    console.log('Link clicked!');
    chrome.runtime.openOptionsPage()
}


// Add a click event listener to the link
myLink.addEventListener('click', linkClickHandler);
myLink2.addEventListener('click', extlinkClickHandler);