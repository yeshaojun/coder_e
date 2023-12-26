# coder_e

coder english 程序员英语学习插件

支持中文转英文，支持句子。（主要本人 ai 绘画经常要中文转英文）

# 插件使用

克隆代码或者直接下载 zip 包，解压到浏览器扩展程序目录，打开浏览器扩展程序页面，加载已解压的扩展程序，选择解压的目录

# 主要功能

1. 查词（支持句子）翻译，选中文本，自动出现翻译图标（点击转图标），仅支持中英文（可加入生词本）
2. 生词本可自定义设置，但必须保证最少一个生词本
3. 弹幕功能，以及复习功能(开启功能，默认会开启一次，否则为固定时间开启)
   弹幕功能，每天一次，可在配置中开启/关闭，以及设置时间。
   弹幕单词为字典中的所有单词，重复 2 遍

   复习功能，可在配置中开启/关闭，以及设置时间。
   复习的单词为字典中的单词，根据权重计算

4. 配置修改
5. 英语学习资源(点个 start 呀老铁们)
   资源为某宝付费购买,请务必先保存到自己云盘。

   ```
   [
      {
      name: "b站自然拼读法",
      url: "https://www.bilibili.com/video/BV1T541157Ut/?p=4&spm_id_from=333.880.my_history.page.click",
      },
      {
      name: "雪莉老师课程",
      url: "https://pan.baidu.com/s/1GY9Efnn7OJOvhM-EITjaAg?pwd=e59m",
      },
      {
      name: "杨家成英语十合一",
      url: "https://pan.baidu.com/s/1ssSCEXERzerUS6lwxAbPBQ?pwd=u2sg",
      },
      {
      name: "sam老师全集",
      url: "https://pan.baidu.com/s/1W08nEA3hra68A_HvPUEDFw?pwd=tteh",
      },
   ]

   ```

# 单词权重（可在 scripts/common 中最修改）

弹幕以及复习功能，均有认识，以及不认识两个按钮，为权重按钮。
learn <1 ===> 1 天提醒
learn 1 ==> 2 天后提醒
learn 2 ===> 4 天后提醒
learn 3 ==> 7 天后提醒
learn 4 ===> 15 天后提醒
learn 5 ===> 30 天后提醒
learn >5 不提醒

认识，则标记+1， 不认识则减 1。

新添加的单词，权重为 1。

# 说明

插件翻译接口为有道智云，为付费接口。（目前用的是免费额度）

因为是个人开发，如果用的人多，我也扛不住，大家可以自己申请一个免费额度，替换一下接口。（目前是可用的，无需替换）

文档可参考 https://ai.youdao.com/DOCSIRMA/html/trans/api/wbfy/index.html

除了 vue，没有使用任何三方库，如果需要修改，可参考文章。

https://juejin.cn/post/7314642642868764706

# 如何替换成自己的 api

插件只在两处地方做了接口请求

1. 单词翻译（可在 vue_p/src/translate 下 handle 方法中，修改 fetch 方法即可，修改完之后记得 build 一下）

2. 选中单词翻译（可在 background/background.js 中直接修改 fetch 方法即可）

# 问题反馈

个人精力有限，插件可能还会有一些问题，如果大家在使用过程中遇到问题，可提 Issues。
