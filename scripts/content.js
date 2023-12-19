// import { API_URL } from "../config/index";
(document.onload = () => {
  let time, left, top;
  let element = document.querySelector(".coder_e_transform_tip");
  let showel = document.querySelector(".coder_e_transform_result");
  let curren_text = "";
  document.addEventListener("mouseup", async (e) => {
    if (
      e.target.classList.contains("coder_e_transform_tip") ||
      e.target.classList.contains("coder_e_transform_result")
    ) {
      console.log("huhuh");
      return;
    }
    if (window.getSelection()?.toString().length === 0) {
      return;
    }

    const r = await getStorage({
      config: {
        translate: true,
      },
    });

    if (!r.config.translate) {
      return;
    }

    clearTimeout(time);
    time = setTimeout(() => {
      createTip();
    }, 500);
  });

  document.addEventListener("mouseup", () => {
    element && (element.style.display = "none");
    showel && (showel.style.display = "none");
  });

  function createTip() {
    const { rect: obj, text } = getTextInfo();
    console.log("createTip", text);
    if (!text) {
      return;
    }
    curren_text = text;
    if (!element) {
      element = document.createElement("div");
      element.classList.add("coder_e_transform_tip");
      element.innerHTML = "<span>转</span>";
      listenClick();
      document.body.appendChild(element);
    }
    left = obj.left;
    top = obj.top;
    console.log("left", left, top);
    element.style.display = "block";
    element.style.left = left + obj?.width + "px";
    element.style.top = top - 30 + "px";
  }

  function getTextInfo() {
    const result = document.getSelection();
    const oRange = result?.getRangeAt(0);
    const oRect = oRange?.getBoundingClientRect();
    return {
      text: result?.toString(),
      rect: oRect,
    };
  }

  function showResult(result) {
    console.log("result", result);
    if (!showel) {
      showel = document.createElement("div");
      showel.classList.add("coder_e_transform_result");
      document.body.appendChild(showel);
    }
    showel.addEventListener("mouseup", (e) => {
      e.stopPropagation();
    });
    showel.style.display = "block";
    showel.style.left = left + "px";
    showel.style.top = top + "px";
    showel.innerHTML = `
    <div class="coder_e_transform_result-title">结果：${
      result.basic ? result.basic.explains[0] : result.translation[0]
    }</div> 
    <div class="coder_e_transform_result-content">
      <span class="coder_e_transform_result_play">
        <svg t="1702631298867" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6259" width="16" height="16"><path d="M842 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 140.3-113.7 254-254 254S258 594.3 258 454c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 168.7 126.6 307.9 290 327.6V884H326.7c-13.7 0-24.7 14.3-24.7 32v36c0 4.4 2.8 8 6.2 8h407.6c3.4 0 6.2-3.6 6.2-8v-36c0-17.7-11-32-24.7-32H548V782.1c165.3-18 294-158 294-328.1z" p-id="6260" fill="#e6e6e6"></path><path d="M512 624c93.9 0 170-75.2 170-168V232c0-92.8-76.1-168-170-168s-170 75.2-170 168v224c0 92.8 76.1 168 170 168z m-94-392c0-50.6 41.9-92 94-92s94 41.4 94 92v224c0 50.6-41.9 92-94 92s-94-41.4-94-92V232z" p-id="6261" fill="#e6e6e6"></path></svg>
      </span>
      <span class="coder_e_transform_result_add">
        <svg t="1702631322800" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7387" width="16" height="16"><path d="M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8H618.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V140.8l189.866667 189.866667z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h181.333333V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z" fill="#e6e6e6" p-id="7388"></path><path d="M618.666667 586.666667h-74.666667V512c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v74.666667H405.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h74.666667V725.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-74.666666H618.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z" fill="#e6e6e6" p-id="7389"></path></svg>
      </span>
    </div>
    <audio class="coder_e_transform_result_audio" src="${
      result.speakUrl
    }" controls>
  `;
    addListenerhandle(result);
  }

  function addListenerhandle(result) {
    const audio = document.querySelector(".coder_e_transform_result_audio");
    document
      .querySelector(".coder_e_transform_result_play")
      ?.addEventListener("click", function () {
        audio.play();
      });
    document
      .querySelector(".coder_e_transform_result_add")
      ?.addEventListener("click", async () => {
        const { defaultStore } = await getStorage({
          defaultStore: "",
        });
        const r = await getStorage({
          [defaultStore]: [],
        });
        const list = r[defaultStore];
        console.log("r", r, list, defaultStore);
        list.unshift({
          query: result.query,
          translation: result?.basic
            ? result?.basic.explains[0]
            : result.translation[0],
          speakUrl: result.speakUrl,
          tSpeakUrl: result.tSpeakUrl,
        });
        await setStorage({
          [defaultStore]: list,
        });
      });
  }

  function listenClick() {
    element?.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      chrome.runtime.sendMessage(
        {
          type: "tf",
          payload: curren_text,
        },
        showResult
      );
    });
  }
})();
