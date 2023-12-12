(document.onload = () => {
  console.log("111");
  let time, left, top;
  let element = document.querySelector(".coder_e_transform_tip");
  document.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("e", e.target);
    if (
      e.target.classList.contains("coder_e_transform_tip") ||
      e.target.classList.contains("coder_e_transform_result")
    ) {
      console.log("e111", e.target);
      return;
    }
    clearTimeout(time);
    time = setTimeout(() => {
      createTip();
    }, 500);
  });

  function createTip() {
    const { rect: obj, text } = getTextInfo();
    if (!text) {
      return;
    }
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
    element.style.left = left + "px";
    element.style.top = top - 20 + "px";
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

  document.addEventListener("mouseup", () => {
    element && (element.style.display = "none");
  });

  function showResult(result) {
    console.log("result", result);
    let el = document.querySelector(".coder_e_transform_result");
    if (!el) {
      el = document.createElement("div");
      el.classList.add("coder_e_transform_result");
      document.body.appendChild(el);
    }
    console.log("left11111", left, top);
    el.style.display = "block";
    el.style.left = left - result?.length + "px";
    el.style.top = top + "px";
    el.innerHTML = result;
  }

  function listenClick() {
    const { text, rect } = getTextInfo();
    element?.addEventListener("click", (e) => {
      e.stopPropagation();
      chrome.runtime.sendMessage(
        {
          type: "tf",
          payload: text,
        },
        showResult
      );
    });
  }
})();
