window.onload = async function () {
  let timer = null;
  let checkTimer = null;
  const danmuContainer = document.body;
  const danmuConfig = {
    speed: 20, // 弹幕速度，可以根据需求调整
  };
  // 什么时候开启弹幕
  const c = await getStorage({
    config: {
      barrage: true,
      barrageTime: "09:00",
    },
    defaultStore: "coder_e_1",
  });

  if (c.config.barrage) {
    // checkTimer = setInterval(() => {
    //   if (checkTime(c.config.barrageTime)) {
    //     clearInterval(checkTimer);
    //     start();
    //   }
    // }, 20000);
    start();
  }
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log("changes", changes);
    if (changes.config.newValue.barrage) {
      start();
    } else {
      clearInterval(timer);
    }
  });

  async function start() {
    const data = await getStorage({
      [c.defaultStore]: [],
    });
    const list = data[c.defaultStore];
    let currentIndex = 0;
    let repeat = 2;
    timer = setInterval(() => {
      if (currentIndex < list.length) {
        addDanmu(list[currentIndex]);
      } else {
        repeat--;
        currentIndex = 0;
      }
      // document.body.appendChild(html);
      if (repeat === 0) {
        clearInterval(timer);
      }
    }, 4000);
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

  function createDanmu(info) {
    const danmu = document.createElement("div");
    danmu.className = "coder_e_barrage";
    danmu.innerHTML = `<div class="coder_e_query">${info.query}</div>
      <p class="coder_e_query_result">${info.translation}</p>
      <span class="coder_e_query_mark_minus">不认识</span>
    `;

    // 鼠标移入暂停动画
    danmu.addEventListener("mouseenter", function () {
      danmu.style.animationPlayState = "paused";
      danmu.classList.add("paused");
    });

    // 鼠标移出恢复动画
    danmu.addEventListener("mouseleave", function () {
      danmu.style.animationPlayState = "running";
      danmu.classList.remove("paused");
    });

    danmuContainer.appendChild(danmu);
    // 计算纵向位置，确保分布相对平均
    danmu.style.top = `${Math.random() * (window.outerHeight - 100)}px`;

    return danmu;
  }

  function addDanmu(text) {
    const danmu = createDanmu(text);

    danmu.style.animationDuration = `${
      danmuContainer.clientWidth / danmuConfig.speed
    }s`;

    // 弹幕动画结束后移除弹幕元素
    danmu.addEventListener("animationiteration", function () {
      danmu.remove();
    });

    // 弹幕动画开始
    danmu.style.animation = "none";
    danmu.offsetHeight; // 强制重绘
    danmu.style.animation = `moveRight ${danmuConfig.speed}s linear infinite`;

    return danmu;
  }
};
