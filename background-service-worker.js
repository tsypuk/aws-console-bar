chrome.alarms.create(name = 'session-time', {
    periodInMinutes: 1 / 60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm)
    switch (alarm.name) {
        case 'session-time':
            chrome.storage.local.get(["timer"], (res) => {
                const time = res.timer ?? 0
                chrome.storage.local.set({
                    timer: time + 1,
                })
                chrome.action.setBadgeText({
                    text: `${secondsToHHMMSS(time)}`
                })
                if (time % 10 == 0) {
                    this.registration.showNotification("Chrome Timer Extentions", {
                        body: "45 min has passed!",
                        icon: "icon.pnh"
                    })
                }
            })
            break
        case 'rss-time':
            console.log('Time to refresh RSS')
            break
    }
})

function secondsToHHMMSS(seconds) {
    let minutes = Math.floor((seconds % 3600) / 60);
    let secondsRemainder = seconds % 60;

    minutes = String(minutes).padStart(2, '0');
    secondsRemainder = String(secondsRemainder).padStart(2, '0');

    return `${minutes}:${secondsRemainder}`;
}

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
})

function openOptionsPage() {
    chrome.runtime.openOptionsPage();
}