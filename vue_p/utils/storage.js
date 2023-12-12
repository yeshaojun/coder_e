class Storage {
  async get(name) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(name, (result) => {
        resolve(result);
      });
    });
  }

  set(info) {
    return new Promise((resolve) => {
      chrome.storage.sync.set(info, () => {
        console.log("set success");
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
