console.log('Content script')
chrome.runtime.sendMessage("From content script", (response) => {
    console.log(response)
})