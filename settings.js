const timeInput = document.getElementById('time-input')
const timeInputRss = document.getElementById('time-input-rss')
const timeInputSession = document.getElementById('time-input-session')
const timeInputNews = document.getElementById('time-input-news')
const saveButton = document.getElementById('save-button')

function loadSettingsFromStorage() {
    chrome.storage.sync.get(['settings'], result => {
        timeInput.value = result.settings.notificationTime
        timeInputRss.value = result.settings.rssReindexInterval
        timeInputSession.value = result.settings.sessionInterval
        timeInputNews.value = result.settings.newsInterval
    })
}

loadSettingsFromStorage()

saveButton.addEventListener('click', () => {

    const settings = {
        notificationTime: timeInput.value,
        rssReindexInterval: timeInputRss.value,
        sessionInterval: timeInputSession.value,
        newsInterval: timeInputNews.value
    }

    chrome.storage.sync.set({settings})
    console.log('Settings saved...')
})
