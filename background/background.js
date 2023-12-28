chrome.runtime.onMessage.addListener(
  ({ type, payload }, sender, sendResponse) => {
    console.log("type", type, payload);
    fetch("https://api.yeshaojun.com/v1/translate/text?text=" + payload)
      .then((response) => response.json())
      .then((json) => {
        sendResponse(json);
      });
    return true;
  }
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "showReview") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "displayPopup" });
    });
  }
});
