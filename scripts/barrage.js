(document.onload = async () => {
  let timer = null;
  let checkTimer = null;
  let word_list = [];
  let count = 5;
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
    checkTimer = setInterval(() => {
      if (checkTime(c.config.barrageTime)) {
        clearInterval(checkTimer);
        for (let i = 0; i < count; i--) {
          setTimeout(() => {
            start();
          }, i * 1800000);
        }
      }
    }, 20000);
  }

  async function start() {
    createAnimation();
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

    // mark_word();
    danmu.addEventListener("click", function (e) {
      const target = e.target;
      if (
        target.classList.contains("coder_e_query_mark_add") ||
        target.classList.contains("coder_e_query_mark_minus")
      ) {
        let index = target.getAttribute("index");
        const obj = word_list[index];
        obj.leranCount = target.classList.contains("coder_e_query_mark_add")
          ? obj.leranCount + 1
          : obj.leranCount - 1;
        showAnimation(e);
        dealMark(obj);
      } else {
        return;
      }
    });

    // 鼠标移入暂停动画
    danmu.addEventListener("mouseenter", function () {
      danmu.style.animationPlayState = "paused";
      danmu.classList.add("coder_e_paused");
    });

    // 鼠标移出恢复动画
    danmu.addEventListener("mouseleave", function () {
      danmu.style.animationPlayState = "running";
      danmu.classList.remove("coder_e_paused");
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

  function dealMark(obj) {
    if (obj.leranCount < 0) {
      obj.leranCount = 0;
    }
    if (obj.leranCount < 6) {
      obj.learnTime = getFutureDate(CODER_E_MARK[obj.leranCount]);
    }
    setStorage({
      [c.defaultStore]: word_list,
    });
  }

  function createAnimation() {
    const div = document.createElement("div");
    div.classList.add("coder_e_clickAnimation");
    div.innerHTML = `
    <svg t="1703123835559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4207" width="16" height="16"><path d="M591.62819 121.904762c7.68 0 21.187048 1.633524 31.524572 4.973714 50.907429 16.505905 80.213333 70.582857 68.339809 124.708572l-1.219047 5.071238-45.372953 170.179047h179.736381c21.820952 0 43.398095 8.094476 58.026667 24.283429 16.335238 18.090667 22.698667 42.032762 17.846857 65.267809l-1.219047 4.973715-94.768762 337.432381a59.294476 59.294476 0 0 1-52.662857 43.154285l-4.388572 0.146286H268.190476V444.001524c97.084952-21.016381 239.079619-279.28381 239.079619-279.28381C527.457524 137.337905 551.936 121.904762 591.62819 121.904762zM828.952381 501.126095c0-0.316952-0.146286-0.512-0.560762-0.975238 0.341333 0.390095-0.975238-0.170667-3.754667-0.170667H549.692952l69.900191-262.217142c5.022476-18.773333-4.144762-36.498286-18.968381-41.301334a52.589714 52.589714 0 0 0-9.020952-1.414095c-10.922667 0-15.457524 1.26781-21.065143 7.558095l-1.950477 2.29181-9.216 16.091428-9.874285 16.700953a1534.683429 1534.683429 0 0 1-72.216381 110.201905c-28.013714 38.765714-55.53981 72.167619-82.553905 98.816-17.968762 17.724952-35.59619 32.49981-53.394286 43.958857V828.952381h395.605334L828.952381 501.126095zM121.904762 438.857143h73.142857v463.238095H121.904762z" p-id="4208" fill="#1296db"></path></svg>`;
    document.body.appendChild(div);
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (!changes.config) {
      return;
    }
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
