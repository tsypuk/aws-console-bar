chrome.storage.sync.get(['popupText'], function(result) {
    var popupText = result.popupText || "Default Popup Text";
    var outputDiv = document.getElementById('output');
    outputDiv.textContent = popupText;
});
