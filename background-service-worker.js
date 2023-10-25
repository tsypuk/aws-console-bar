function readHistoryAddNewSession() {
    chrome.storage.local.get(["history"]).then((res) => {
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

        chrome.storage.local.set({history: res.history})
    })
}

chrome.runtime.onInstalled.addListener(details => {
    console.log(details)
    // Initialize storage and default values
    chrome.storage.sync.set({aws_accounts: []})
    // chrome.storage.sync.set({rss: []}, () => {
    //     console.log('Init RSS storage...')
    // })

    // chrome.storage.local.set({history: []}).then(() => {
    //     readHistoryAddNewSession()
    // })

    chrome.storage.local.set({history: []})
    
    chrome.storage.local.set({
        currentSession: {
            sessionId: 0,
            consoleSession: {}
        }
    })

    chrome.storage.sync.set({
        settings: {
            notificationTime: 45,
            rssReindexInterval: 7,
            sessionInterval: 1,
            newsInterval: 1
        }

    })

    chrome.storage.local.set({
        feed: []

    })
    loadRSSDataFromServer()
})

chrome.storage.sync.get('settings', result => {
    console.log(result.settings)

    chrome.alarms.create(name = 'session-time', {
        periodInMinutes: result.settings['sessionInterval'],
    })

    chrome.alarms.create(name = 'rss-time', {
        periodInMinutes: result.settings['newsInterval'],
    })
})

function updateHistory(itemCurrentSession) {
    chrome.storage.sync.get('history', res => {
        let toUpdate = res.history.find(item => item.id === itemCurrentSession.id)
        toUpdate.EndTimeStamp = itemCurrentSession.EndTimeStamp
        toUpdate.EndTime = itemCurrentSession.EndTime
        toUpdate.Duration = itemCurrentSession.Duration
        toUpdate.IAMUser = itemCurrentSession.IAMUser
        toUpdate.Account = itemCurrentSession.Account
        toUpdate.type = itemCurrentSession.type

        console.log(`update ${toUpdate}`)
        console.log(`history: ${res.history}`)
        chrome.storage.sync.set({history: res.history})
    })
}

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
            chrome.storage.sync.get(["timer"], (res) => {
                const time = res.timer ?? 0
                chrome.storage.sync.set({
                    timer: time + 1,
                })
                chrome.action.setBadgeText({
                    text: `${secondsToHHMMSS(time)}`
                })
                const internal = 45
                if (time % internal === 0) {
                    this.registration.showNotification("Chrome Timer Extentions", {
                        body: "45 min has passed!", icon: "icon.pnh"
                    })
                }
            })
            break
        case 'rss-time':
            console.log('Time to refresh RSS')

            // Load ordered, persist index
            chrome.storage.local.get(['feed'], results => {

                feedIndex = Math.floor(Math.random() * results.feed.length)
                console.log(`feed: ${results.feed}`)
                category = results.feed[feedIndex]
                console.log(`category: ${category}`)

                if (category) {
                    chrome.storage.local.get([category], res => {
                        console.log(`res: ${res}`)
                        index = Math.floor(Math.random() * res[category].length)
                        console.log(res[category][index])
                        console.log(`latest_news: ${res[category][index]}`)
                        res[category][index]['topic'] = category
                        chrome.storage.local.set({latest_news: res[category][index]})
                    })
                }
            })
            break
    }
})

function loadRSSDataFromServer() {
    fetch("https://blog.tsypuk.com/aws-news/index.json")
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            console.log(data)
            chrome.storage.local.set({rss_index: data})
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
        case "getActiveSession":
            console.log(`Received: ${request.session}`)
            console.log(request.session)

            // read active session

            // compare with receive requrest.session

            // udpate session Timing

            // OR create a new entry in session history


            // Session: | ID | IAMUser | Account | StartTime | EndTime | StartTimeStamp | EndTimeStamp | Duration |
            chrome.storage.local.get(["history"], (res) => {
                let itemCurrentSession = res.history.find(item => item.ID === sessionId)
                console.log(itemCurrentSession)

                if (itemCurrentSession) {
                    itemCurrentSession.EndTimeStamp = Date.now()
                    itemCurrentSession.EndTime = new Date().toISOString()
                    itemCurrentSession.Duration = itemCurrentSession.EndTimeStamp - itemCurrentSession.StartTimeStamp
                    itemCurrentSession.IAMUser = consoleUser.iamUser
                    itemCurrentSession.Account = consoleUser.accountID
                    itemCurrentSession.type = consoleUser.type

                    chrome.storage.sync.set({history: res.history})
                    // updateHistory(itemCurrentSession)
                }
            })

            break
        default:
            break;
    }
})

function openOptionsPage() {
    chrome.runtime.openOptionsPage();
}


// chrome.storage.onChanged.addListener((changes, namespace) => {
//     for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
//         console.log(
//             `Storage key "${key}" in namespace "${namespace}" changed.`,
//             `Old value was "${oldValue}", new value is "${newValue}".`
//         );
//     }
// })


// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.session?.newValue) {
        console.log(`New value for session ${changes.session?.newValue}`)
        // user switched the session


        // const debugMode = Boolean(changes.options.newValue.debug);
        // console.log('enable debug mode?', debugMode);
        // setDebugMode(debugMode);
    }
})
