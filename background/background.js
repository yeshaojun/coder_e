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
