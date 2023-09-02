const alarmIconPath = {
    "16": "images/alarm/icon16.png",
    "48": "images/alarm/icon48.png",
    "128": "images/alarm/icon128.png",
};

const defaultIconPath = {
    "16": "images/icon16.png",
    "48": "images/icon48.png",
    "128": "images/icon128.png",
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.action) {
        case "openOptionsPage":
            openOptionsPage();
            break;
        case "changeAlarmIcon":
            chrome.action.setIcon({path: alarmIconPath});
            break;
        case "changeDefaultIcon":
            chrome.action.setIcon({path: defaultIconPath});
            break;
        default:
            break;
    }
});

function openOptionsPage() {
    chrome.runtime.openOptionsPage();
}