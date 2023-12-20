(document.onload = async () => {
  let timer = null;
  let checkTimer = null;
  let word_list = [];
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

  async function start() {
    const data = await getStorage({
      [c.defaultStore]: [],
    });
    word_list = data[c.defaultStore];
    let currentIndex = 0;
    let repeat = 2;
    timer = setInterval(() => {
      if (currentIndex < word_list.length) {
        addDanmu(word_list, currentIndex);
        currentIndex++;
      } else {
        repeat--;
        currentIndex = 0;
      }
      // document.body.appendChild(html);
      if (repeat === 0) {
        clearInterval(timer);
        timer = null;
      }
    }, 4000);
  }

  function createDanmu(obj, index) {
    const info = obj[index];
    const danmu = document.createElement("div");
    danmu.className = "coder_e_barrage";
    danmu.innerHTML = `<div class="coder_e_query">${info.query}</div>
      <p class="coder_e_query_result">${info.translation}</p>
      <span class="coder_e_query_mark_add" index="${index}">认识</span>
      <span class="coder_e_query_mark_minus" index="${index}">不认识</span>
    `;
    mark_word();
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

    document.body.appendChild(danmu);
    // 计算纵向位置，确保分布相对平均
    danmu.style.top = `${Math.random() * (window.outerHeight - 200)}px`;

    return danmu;
  }

  function addDanmu(info, index) {
    const danmu = createDanmu(info, index);
    danmu.style.animationDuration = `${
      document.body.clientWidth / danmuConfig.speed
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

  function mark_word() {
    document.querySelectorAll(".coder_e_query_mark_minus").forEach((_) => {
      _?.addEventListener("click", (e) => {
        let index = e.target.getAttribute("index");
        const obj = word_list[index];
        obj.leranCount = obj.leranCount - 1;
        console.log("111", obj, index);
        dealMark(obj);
      });
    });

    document.querySelectorAll(".coder_e_query_mark_add").forEach((_) => {
      _.addEventListener("click", (e) => {
        let index = 0;
        index = e.target.getAttribute("index");
        const obj = word_list[index];
        obj.leranCount = obj.leranCount + 1;
        dealMark(obj);
      });
    });
  }

  function dealMark(obj) {
    if (obj.leranCount < 0) {
      obj.leranCount = 0;
    }
    if (obj.leranCount < 6) {
      obj.learnTime = getFutureDate(CODER_E_MARK[obj.mark]);
    }
    setStorage({
      [c.defaultStore]: word_list,
    });
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    console.log("222", changes.config);
    if (changes.config.newValue.barrage === changes.config.oldValue.barrage) {
      return;
    }
    if (!changes.config.newValue.barrage) {
      clearInterval(timer);
      timer = null;
      clearInterval(checkTimer);
    } else {
      if (!timer) {
        start();
      }
    }
  });
})();
