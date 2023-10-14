chrome.runtime.onInstalled.addListener(details => {
    console.log(details)
    // Initialize storage and default values
})

chrome.alarms.create(name = 'session-time', {
    periodInMinutes: 1,
})

chrome.alarms.create(name = 'rss-time', {
    periodInMinutes: 1,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm)

    // Stop counter if console is closed
    chrome.tabs.query({}, function(tabs) {
        activeSession = false
        tabs.forEach(function(tab) {
            if (tab.url.includes('.amazon.com')) {
                console.log('Console')
                activeSession = true
            }
        });
        if (!activeSession) {
            chrome.alarms.clear("session-time");
        }
    });

    switch (alarm.name) {
        case 'session-time':
            chrome.storage.local.get(["timer", "timeInterval"], (res) => {
                const time = res.timer ?? 0
                chrome.storage.local.set({
                    timer: time + 1,
                })
                chrome.action.setBadgeText({
                    text: `${secondsToHHMMSS(time)}`
                })
                const internal = res.timeInterval ?? 45
                if (time % internal == 0) {
                    this.registration.showNotification("Chrome Timer Extentions", {
                        body: "45 min has passed!",
                        icon: "icon.pnh"
                    })
                }
            })
            break
        case 'rss-time':
            console.log('Time to refresh RSS')
            // fetch("https://api.apis.guru/v2/list.json")
            //     .then(res => res.json())
            //     .then(data => console.log(data))
            // fetch("https://aws.amazon.com/blogs/machine-learning/feed/",{
            //     method: 'GET',
            //     mode: 'no-cors'
            // })
            //     .then(res => console.log(res))
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