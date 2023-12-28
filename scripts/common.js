async function getStorage(name) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(name, (result) => {
      resolve(result);
    });
  });
}

async function setStorage(info) {
  console.log("set", info);
  return new Promise((resolve) => {
    chrome.storage.sync.set(info, () => {
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

function showAnimation(e) {
  const animation = document.querySelector(".coder_e_clickAnimation");
  animation.style.display = "block";
  animation.style.left = e.clientX + "px";
  animation.style.top = e.clientY + "px";
  // 触发动画效果
  setTimeout(function () {
    animation.style.transform = "translateY(-50px)";
  }, 0);

  // 1秒后隐藏动画并移除副本
  setTimeout(function () {
    animation.style.display = "none";
    animation.style.transform = "translateY(0px)";
  }, 1000);
}

const CODER_E_MARK = {
  0: 0,
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 15,
};
