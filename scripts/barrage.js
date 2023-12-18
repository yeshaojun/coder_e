window.onload = async function () {
  // 什么时候开启弹幕
  const c = await getStorage({
    config: {
      barrage: true,
    },
    defaultStore: "coder_e_1",
  });
  if (c.config.barrage) {
    start();
  }

  async function start() {
    const Div = document.createElement("div");
    Div.classList.add("screen");
    document.body.appendChild(Div);

    const screen = new BulletJs(".screen", {
      trackHeight: 35,
      speed: undefined,
      pauseOnClick: true,
      pauseOnHover: true,
    });

    const data = await getStorage({
      [c.defaultStore]: [],
    });
    const list = data[c.defaultStore];
    let currentIndex = 0;
    let repeat = 20;
    const time = setInterval(() => {
      let html = ``;
      if (currentIndex < list.length) {
        html = `
          <span class="coder_e_query">${list[currentIndex].query}</span>
        `;
      } else {
        currentIndex = 0;
      }
      repeat--;
      screen.push(html);
      if (repeat === 0) {
        clearInterval(time);
      }
    }, 4000);
  }
};
