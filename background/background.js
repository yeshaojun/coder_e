chrome.runtime.onMessage.addListener(
  ({ type, payload }, sender, sendResponse) => {
    console.log("type", type, payload);
    fetch("http://api.yeshaojun.com/english/translate?text=" + payload)
      .then((response) => response.json())
      .then((json) => {
        sendResponse(json.data);
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
