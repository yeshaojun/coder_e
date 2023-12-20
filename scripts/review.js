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
    console.log("cccc", c);
    checkTimer = setInterval(() => {
      if (checkTime(c.config.remindTime)) {
        clearInterval(checkTimer);
        open();
      }
    }, 20000);
  }

  async function open() {
    const r = await getStorage({
      [c.defaultStore]: [],
    });
    word_list = r[c.defaultStore];
    list = r[c.defaultStore].filter(
      (_) => _.learnTime === formatDate(new Date()) && _.leranCount < 6
    );
    const div = document.createElement("div");
    div.classList.add("coder_e_review_wrapper");
    let html = "";
    list.forEach((_) => {
      html += `<li>
          <p class="coder_e_review_title">
            <span class="flex">
             ${_.query} 
              <span class="coder_e_review_play" url="${_.speakUrl}">
                <svg t="1703050077008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3896" width="16" height="16"><path d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z" p-id="3897"></path><path d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168z m-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z" p-id="3898"></path></svg>
              </span>  
            </span>  
            <span>
              <span class="coder_e_review_add" id="${_.id}">认识</span>
              <span class="coder_e_review_minus" id="${_.id}">不认识</span>
            </span>
          </p>
          <p class="coder_e_review_result">${_.translation}</p> 
        </li>`;
    });
    if (html) {
      div.innerHTML = `
          <div class="review_close">
            <svg t="1703040645856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2895" width="18" height="17"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="2896"></path></svg>
          </div>
          <ul>${html}</ul>
          <audio src="" controls class="coder_e_review_audio"></audio>
        `;
    } else {
      div.innerHTML = ` <div class="review_close">
      <svg t="1703040645856" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2895" width="18" height="17"><path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z" p-id="2896"></path></svg>
    </div><span>今天暂时没有需要复习的单词哦</span>`;
    }
    document.body.appendChild(div);
    document.querySelector(".review_close")?.addEventListener("click", () => {
      div.remove();
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
        index = e.target.getAttribute("index");
        const obj = word_list[index];
        obj.leranCount = obj.leranCount + 1;
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
      obj.learnTime = getFutureDate(CODER_E_MARK[obj.leranCount]);
    }
    setStorage({
      [c.defaultStore]: word_list,
    });
  }

  function play() {
    document.querySelectorAll(".coder_e_review_play").forEach((_) => {
      _.addEventListener("click", (e) => {
        const a = document.querySelector(".coder_e_review_audio");
        a.src = e.target.parentElement.parentElement.getAttribute("url");
        a.play();
      });
    });
  }

  chrome.storage.onChanged.addListener(function (changes, namespace) {
    if (changes.config.newValue.remind === changes.config.oldValue.remind) {
      return;
    }
    if (!changes.config.newValue.remind) {
      const o = document.querySelector(".coder_e_review_wrapper");
      o && o.remove();
    } else {
      open();
    }
  });
})();
