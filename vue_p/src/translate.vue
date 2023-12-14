<template>
  <div class="content">
    <div class="origin-wrapper">
      <div class="flex">
        <el-input
          v-model="textarea"
          :rows="3"
          type="textarea"
          placeholder="请输入需要翻译的单词"
        />
        <div class="opt">
          <el-button class="ml-2" type="primary" @click="handle"
            >翻译</el-button
          >
          <el-icon
            v-if="result.speakUrl"
            class="cursor-pointer mt-2"
            :size="24"
            @click="paly()"
            ><Microphone
          /></el-icon>
        </div>
      </div>
    </div>
    <div v-if="result.tSpeakUrl">
      <div class="result">
        <div class="flex primary mb-2">
          结果：
          <div>{{ result.translation.join(",") }}</div>
        </div>
        <div v-if="result.web">
          网络释义：
          <ul class="web-ul">
            <li class="flex" v-for="item in result.web" :key="item.key">
              {{ item.key }} : {{ item.value.join(",") }}
            </li>
          </ul>
        </div>
        <el-link type="primary" @click="openDict">词典查看</el-link>
      </div>
      <el-space class="mt-2">
        <el-icon class="cursor-pointer" :size="24" @click="paly('t')"
          ><Microphone
        /></el-icon>
        <el-tooltip
          class="box-item"
          effect="dark"
          content="添加到生词本"
          placement="top-start"
        >
          <el-icon class="cursor-pointer" :size="24"><CirclePlus /></el-icon>
        </el-tooltip>
      </el-space>
    </div>
  </div>
  <audio src="" ref="audioDom" controls class="audio-play"></audio>
</template>
<script setup lang="ts">
import { Microphone, CirclePlus } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
const textarea = ref("");

const loading = ref(false);
const audioDom = ref<HTMLAudioElement>();
const result = ref<{
  translation: string[];
  query: string;
  web?: { key: string; value: string[] }[];
  tSpeakUrl: string;
  speakUrl: string;
}>({ translation: [], query: "", tSpeakUrl: "", speakUrl: "" });

function handle() {
  if (!textarea.value) {
    return;
  }
  loading.value = true;
  fetch("https://api.yeshaojun.com/v1/translate/text?text=" + textarea.value)
    .then((response) => response.json())
    .then((json) => {
      result.value = json as any;
      loading.value = false;
    });
}

function paly(type = "origin") {
  if (type === "origin") {
  } else {
  }
  let url = type === "origin" ? result.value.speakUrl : result.value.tSpeakUrl;
  if (audioDom.value) {
    audioDom.value.currentTime = 0;
    audioDom.value.src = url;
    audioDom.value.play();
  }
}

function openDict() {
  // @ts-ignore
  chrome.tabs.create({ url: result.value.webdict.url });
}
</script>
<style scoped>
.origin-wrapper {
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}
ul {
  list-style: none;
  padding: 0;
}
.result {
  margin-top: 20px;
  font-size: 14px;
}
.primary {
  color: #599ff7;
  font-size: 16px;
}

.content {
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
}
.flex {
  display: flex;
}
.audio-play {
  display: none;
}

.web-ul {
  margin: 0;
}
.web-ul li {
  line-height: 30px;
}
.opt {
  text-align: center;
}
</style>
