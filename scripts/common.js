async function getStorage(name) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(name, (result) => {
      resolve(result);
    });
  });
}

async function setStorage(info) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(info, () => {
      console.log("set success");
      resolve(true);
    });
  });
}
