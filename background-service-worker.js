function readHistoryAddNewSession() {
    chrome.storage.sync.get(["history", "active_session"]).then((res) => {
        console.log(res)
        var sessionID = 0
        itemCurrentSession = {}
        if (res.history.length === 0) {
            itemCurrentSession.StartTimeStamp = Date.now()
            itemCurrentSession.StartTime = new Date().toISOString()

        } else {
            // let maxIdElement = res.history.reduce((max, current) => (current.id > max.id) ? current : max)
            // sessionID = maxIdElement + 1
            itemCurrentSession.StartTimeStamp = Date.now()
            itemCurrentSession.StartTime = new Date().toISOString()
        }
        itemCurrentSession.ID = sessionID
        res.history.push(itemCurrentSession)

        chrome.storage.sync.set({history: res.history})
        chrome.storage.sync.set({active_session: sessionID})
    })
}

chrome.runtime.onInstalled.addListener(details => {
    console.log(details)
    // Initialize storage and default values
    chrome.storage.sync.set({aws_accounts: []}, () => {
        console.log('Init aws accounts storage...')
    })
    // chrome.storage.sync.set({rss: []}, () => {
    //     console.log('Init RSS storage...')
    // })
    chrome.storage.sync.set({history: []}).then(() => {
        console.log('Init history...')
        readHistoryAddNewSession()
    })
    loadRSSDataFromServer()
})

chrome.alarms.create(name = 'session-time', {
    periodInMinutes: 1,
})

chrome.alarms.create(name = 'rss-time', {
    periodInMinutes: 1 / 20,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    console.log(alarm)

    // Stop counter if console is closed
    chrome.tabs.query({}, function (tabs) {
        activeSession = false
        tabs.forEach(function (tab) {
            if (tab.url.includes('.amazon.com')) {
                console.log('Console')
                activeSession = true
            }
        })
        if (!activeSession) {
            chrome.alarms.clear("session-time");
        }
    })

    switch (alarm.name) {
        case 'session-time':
            chrome.storage.sync.get(["timer", "timeInterval", "history", "active_session"], (res) => {
                const time = res.timer ?? 0
                chrome.storage.sync.set({
                    timer: time + 1,
                })
                chrome.action.setBadgeText({
                    text: `${secondsToHHMMSS(time)}`
                })
                const internal = res.timeInterval ?? 45
                if (time % internal === 0) {
                    this.registration.showNotification("Chrome Timer Extentions", {
                        body: "45 min has passed!", icon: "icon.pnh"
                    })
                }

                // Session: | ID | IAMUser | Account | StartTime | EndTime | StartTimeStamp | EndTimeStamp | Duration |
                let sessionId = res.active_session
                console.log(`sessionID: ${sessionId}`)
                let itemCurrentSession = res.history.find(item => item.ID === sessionId)
                console.log(itemCurrentSession)
                if (itemCurrentSession) {
                    itemCurrentSession.EndTimeStamp = Date.now()
                    itemCurrentSession.EndTime = new Date().toISOString()
                    itemCurrentSession.Duration = itemCurrentSession.EndTimeStamp - itemCurrentSession.StartTimeStamp
                    itemCurrentSession.IAMUser = 'TEST'
                    itemCurrentSession.Account = '008-2-2-2'

                    chrome.storage.sync.set({history: res.history}, () => {
                        console.log('Update session')
                    })
                }
            })
            break
        case 'rss-time':
            console.log('Time to refresh RSS')
            chrome.storage.sync.get(["rss"], (res) => {
                index = Math.floor(Math.random() * res.rss.length)
                console.log(res.rss[index])
                // chrome.runtime.sendMessage(null, res.rss[index])
                chrome.storage.sync.set({latest_news: res.rss[index]})
            })
            break
    }
})

function loadRSSDataFromServer() {
    fetch("https://blog.tsypuk.com/aws-news/news/machine_learning.json")
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            console.log('Init RSS storage...')
            chrome.storage.sync.set({rss: data})
        })

    fetch("https://blog.tsypuk.com/aws-news/index.json")
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            chrome.storage.sync.set({rss_index: data})
        })
}

function secondsToHHMMSS(seconds) {
    let minutes = Math.floor((seconds % 3600) / 60);
    let secondsRemainder = seconds % 60;

    minutes = String(minutes).padStart(2, '0');
    secondsRemainder = String(secondsRemainder).padStart(2, '0');

    return `${minutes}:${secondsRemainder}`;
}

const alarmIconPath = {
    "16": "images/alarm/icon16.png", "48": "images/alarm/icon48.png", "128": "images/alarm/icon128.png",
}

const defaultIconPath = {
    "16": "images/icon16.png", "48": "images/icon48.png", "128": "images/icon128.png",
}

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
