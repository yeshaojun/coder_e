(document.onload = async () => {
  // 1.先取出列表
  const c = await getStorage({
    config: {
      remind: true,
      remindTime: "11:00",
    },
    defaultStore: "coder_e_1",
  });
  let checkTimer;
  let list = [];
  let word_list = [];

  if (c.config.remind) {
    checkTimer = setInterval(() => {
      if (checkTime(c.config.remindTime)) {
        clearInterval(checkTimer);
        // open();
        chrome.runtime.sendMessage({ message: "showReview" });
      }
    }, 20000);
  }

  function isTodayOrEarlier(inputDate) {
    // 将输入日期字符串转换为日期对象
    var inputDateTime = new Date(inputDate + "T00:00:00");

    // 获取当前日期
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // 将当前日期的时间部分设置为零

    // 比较日期部分是否等于或小于当前日期
    return inputDateTime <= currentDate;
  }

  async function open() {
    if (document.querySelector(".coder_e_review_wrapper")) {
      document.querySelector(".coder_e_review_wrapper").style.dislay = "block";
      return;
    }

    const r = await getStorage({
      [c.defaultStore]: [],
    });
    word_list = r[c.defaultStore];
    list = r[c.defaultStore].filter(
      (_) => isTodayOrEarlier(_.learnTime) && _.leranCount < 6
    );
    const div = document.createElement("div");
    div.classList.add("coder_e_review_wrapper");
    let html = "";
    list.forEach((_) => {
      html += `<li>
          <p class="coder_e_review_title">
            <span class="code_e_flex">
             ${_.query} 
              <span class="coder_e_review_play" url="${_.speakUrl}">
                <svg t="1703050077008" class="icon" url="${_.speakUrl}" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3896" width="16" height="16"><path d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z" p-id="3897"></path><path d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168z m-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z" p-id="3898"></path></svg>
              </span>  
            </span>  
            <span style="position:relative;top: -4px">
              <span class="coder_e_review_add" id="${_.id}">认识</span>
              <span class="coder_e_review_minus" id="${_.id}">不认识</span>
            </span>
          </p>
          <p class="coder_e_review_result">${_.translation}</p> 
        </li>`;
    });
    if (html) {
      let str = `
          <div class="review_close">
            <svg t="1703040645856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2895" width="18" height="17"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="2896"></path></svg>
          </div>
          <ul>${html}</ul>
          <audio src="" controls class="coder_e_review_audio"></audio>
        `;
      if (!document.querySelector(".coder_e_clickAnimation")) {
        str += `<div class="coder_e_clickAnimation">
        <svg t="1703123835559" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4207" width="16" height="16"><path d="M591.62819 121.904762c7.68 0 21.187048 1.633524 31.524572 4.973714 50.907429 16.505905 80.213333 70.582857 68.339809 124.708572l-1.219047 5.071238-45.372953 170.179047h179.736381c21.820952 0 43.398095 8.094476 58.026667 24.283429 16.335238 18.090667 22.698667 42.032762 17.846857 65.267809l-1.219047 4.973715-94.768762 337.432381a59.294476 59.294476 0 0 1-52.662857 43.154285l-4.388572 0.146286H268.190476V444.001524c97.084952-21.016381 239.079619-279.28381 239.079619-279.28381C527.457524 137.337905 551.936 121.904762 591.62819 121.904762zM828.952381 501.126095c0-0.316952-0.146286-0.512-0.560762-0.975238 0.341333 0.390095-0.975238-0.170667-3.754667-0.170667H549.692952l69.900191-262.217142c5.022476-18.773333-4.144762-36.498286-18.968381-41.301334a52.589714 52.589714 0 0 0-9.020952-1.414095c-10.922667 0-15.457524 1.26781-21.065143 7.558095l-1.950477 2.29181-9.216 16.091428-9.874285 16.700953a1534.683429 1534.683429 0 0 1-72.216381 110.201905c-28.013714 38.765714-55.53981 72.167619-82.553905 98.816-17.968762 17.724952-35.59619 32.49981-53.394286 43.958857V828.952381h395.605334L828.952381 501.126095zM121.904762 438.857143h73.142857v463.238095H121.904762z" p-id="4208" fill="#1296db"></path></svg>
        </div>`;
      }
      div.innerHTML = str;
    } else {
      div.innerHTML = ` <div class="review_close">
      <svg t="1703040645856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2895" width="18" height="17"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="2896"></path></svg>
    </div><p style="text-align:center">今天暂时没有需要复习的单词哦</p>`;
    }
    document.body.appendChild(div);
    // document.querySelector(".review_close")?.addEventListener("click", (e) => {
    //   console.log("remove", e.target);
    //   div.remove();
    // });

    div.addEventListener("click", (e) => {
      console.log("e", e, e.target);
      if (e.target.nodeName === "svg" || e.target.nodeName === "path") {
        div.remove();
      }
    });

    mark();
    play();
  }

  function mark() {
    document.querySelectorAll(".coder_e_review_minus").forEach((_) => {
      _?.addEventListener("click", (e) => {
        let index = word_list.findIndex(
          (_) => _.id == e.target.getAttribute("id")
        );
        e.target.parentElement.parentElement.nextElementSibling.style.display =
          "inline-block";
        e.target.previousElementSibling.style.display = "none";
        e.target.style.display = "none";
        const obj = word_list[index];
        obj.leranCount = obj.leranCount - 1;
        showAnimation(e);
        dealMark(obj);
      });
    });

    document.querySelectorAll(".coder_e_review_add").forEach((_) => {
      _?.addEventListener("click", (e) => {
        let index = word_list.findIndex(
          (_) => _.id == e.target.getAttribute("id")
        );
        e.target.parentElement.parentElement.nextElementSibling.style.display =
          "inline-block";

        e.target.nextElementSibling.style.display = "none";
        e.target.style.display = "none";
        const obj = word_list[index];
        obj.leranCount = obj.leranCount + 1;
        showAnimation(e);
        dealMark(obj);
      });
    });
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

  function play() {
    document.querySelectorAll(".coder_e_review_play").forEach((_) => {
      _.addEventListener("click", (e) => {
        console.log("play play", e);
        e.stopPropagation();
        const a = document.querySelector(".coder_e_review_audio");
        a.src =
          e.target.getAttribute("url") ||
          e.target.parentElement.parentElement.getAttribute("url");
        a.play();
      });
    });
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (!changes.config) {
      return;
    }
    if (changes.config.newValue.remind === changes.config.oldValue.remind) {
      return;
    }
    if (!changes.config.newValue.remind) {
      const o = document.querySelector(".coder_e_review_wrapper");
      o && o.remove();
    } else {
      // open();
      chrome.runtime.sendMessage({ message: "showReview" });
    }
  });

  // content.js

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log("request", request.message);
    if (request.message === "displayPopup") {
      // 在这里添加显示弹窗的逻辑
      open();
    }
  });
})();
