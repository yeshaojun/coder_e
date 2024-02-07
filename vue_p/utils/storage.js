class Storage {
  get(name) {
    return new Promise((resolve) => {
      chrome.storage.local.get(name, (result) => {
        resolve(result);
      });
    });
  }

  set(info) {
    return new Promise((resolve) => {
      console.log("set popup", info);
      chrome.storage.local.set(info, () => {
        console.log("set success");
        resolve(true);
      });
    });
  }

  remove(info) {
    return new Promise((resolve) => {
      chrome.storage.local.remove(info, () => {
        console.log("remove success");
        resolve(true);
      });
    });
  }
}

const getStorage = () => {
  let instance;
  return function () {
    if (!instance) {
      instance = new Storage();
    }
    return instance;
  };
};

export { getStorage };
