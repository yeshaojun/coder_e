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

function getFutureDate(days) {
  var currentDate = new Date();
  var futureDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);

  // 将日期格式化为字符串，例如 "YYYY-MM-DD"
  var formattedDate = formatDate(futureDate);

  return formattedDate;
}

function formatDate(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function checkTime(time) {
  // 获取当前时间
  var currentTime = new Date();

  if (
    currentTime.getHours() === parseInt(time.substring(0, 2)) &&
    currentTime.getMinutes() === parseInt(time.substring(3, 5))
  ) {
    return true;
  } else {
    return false;
  }
}

const CODER_E_MARK = {
  0: 1,
  1: 2,
  2: 4,
  3: 7,
  4: 15,
  5: 30,
};
