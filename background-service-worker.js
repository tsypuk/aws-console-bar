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
            sessionId: 0, consoleSession: {}
        }
    })

    chrome.storage.sync.set({
        settings: {
            rssReindexInterval: 7, sessionInterval: 1, newsInterval: 1
        }

    })

    chrome.storage.local.set({
        feed: []

    })

    chrome.storage.local.set({rssUpdateTimeStamp: 0})
    loadRSSDataFromServer()
})

chrome.storage.sync.get(['settings', 'rssUpdateTimeStamp'], result => {

    chrome.alarms.create(name = 'rss-time', {
        periodInMinutes: result.settings['newsInterval'],
    })

    if ((Date.now() - result.rssUpdateTimeStamp) > result.settings.rssReindexInterval * 1000 * 60 * 24) {
        fetchRss()
    }
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
        .then(data => {
            chrome.storage.local.set({rss_index: data})
            chrome.storage.local.set({rssUpdateTimeStamp: Date.now()})

            data.forEach(function (item) {
                fetchRss(item.name)
            })

        })
}

function fetchRss(name) {
    fetch(`https://blog.tsypuk.com/aws-news/news/${name}.json`)
        .then(res => res.json())
        // .then(data => console.log(data))
        .then(data => {
            console.log(`Fetch ${name} RSS into local storage...`)
            chrome.storage.local.set({[name]: data})
            chrome.storage.local.get(['feed'], result => {
                result.feed.push(name)
                chrome.storage.local.set({'feed': result.feed})
            })
        })
}

const alarmIconPath = {
    "16": "images/alarm/icon16.png", "48": "images/alarm/icon48.png", "128": "images/alarm/icon128.png",
}

const defaultIconPath = {
    "16": "images/icon16.png", "48": "images/icon48.png", "128": "images/icon128.png",
}

function addNewEntryToHistory(activeSession, sessionId) {
    chrome.storage.local.get('history', result => {
        newHistory = {}
        newHistory.sessionId = sessionId
        newHistory.StartTimeStamp = activeSession.time
        newHistory.StartTime = new Date(activeSession.time).toISOString()
        newHistory.EndTimeStamp = activeSession.time
        newHistory.EndTime = new Date(activeSession.time).toISOString()
        newHistory.Duration = 0
        newHistory.IAMUser = activeSession.iamUser
        newHistory.Account = activeSession.accountID
        newHistory.type = activeSession.type

        result.history.push(newHistory)
        chrome.storage.local.set({history: result.history})
    })
}

function updateEntryInHistory(activeSession, sessionId) {
    chrome.storage.local.get('history', result => {
        const currentSession = result.history.find(item => item.sessionId === sessionId)
        currentSession.EndTimeStamp = activeSession.time
        currentSession.EndTime = new Date(activeSession.time).toISOString()
        currentSession.Duration = currentSession.EndTimeStamp - currentSession.StartTimeStamp

        chrome.storage.local.set({history: result.history})
    })
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
            // read active session
            const activeSession = request.session
            // {
            //     "iamUser": "ReadOnly/Z004BRDT",
            //     "accountID": "5307-7388-2262",
            //     "type": "federated_user",
            //     "time": 1698218265176
            // }
            // compare with receive requrest.session
            chrome.storage.local.get('currentSession', result => {

                let sessionId = result.currentSession.sessionId
                const prevSession = result.currentSession.consoleSession

                if ((activeSession.time - prevSession.time < 80000) &
                    (activeSession.accountID === prevSession.accountID) &
                    (activeSession.iamUser === prevSession.iamUser) &
                    (activeSession.type === prevSession.type)) {
                    // update session Timing
                    updateEntryInHistory(activeSession, sessionId)
                } else {
                    // OR create a new entry in session history
                    sessionId = sessionId + 1
                    addNewEntryToHistory(activeSession, sessionId)
                }

                chrome.storage.local.set({
                    currentSession: {
                        sessionId: sessionId, consoleSession: activeSession
                    }
                })
            })
            break
        default:
            break;
    }
})

function openOptionsPage() {
    chrome.runtime.openOptionsPage();
}
