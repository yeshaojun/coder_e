chrome.runtime.onMessage.addListener(
  ({ type, payload }, sender, sendResponse) => {
    console.log("type", type, payload);
    // 假设已经处理完了，返回结果
    sendResponse("哈哈哈，我已经返回了");
  }
);
