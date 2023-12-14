(document.onload = () => {
  let time, left, top;
  let element = document.querySelector(".coder_e_transform_tip");
  let showel = document.querySelector(".coder_e_transform_result");
  document.addEventListener("mouseup", (e) => {
    if (
      e.target.classList.contains("coder_e_transform_tip") ||
      e.target.classList.contains("coder_e_transform_result")
    ) {
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

  function showResult(result) {
    if (!showel) {
      showel = document.createElement("div");
      showel.classList.add("coder_e_transform_result");
      document.body.appendChild(showel);
    }
    console.log("left11111", left, top);
    showel.style.display = "block";
    showel.style.left = left - result?.length + "px";
    showel.style.top = top + "px";
    showel.innerHTML = result;
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
