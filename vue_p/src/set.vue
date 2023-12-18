<template>
  <el-button type="primary" @click="reset">重置数据</el-button>
  <ul class="config-list">
    <li>
      选中翻译
      <el-switch v-model="config.translate" class="ml-2" @change="change" />
    </li>
    <li>
      单词弹幕
      <el-switch v-model="config.barrage" class="ml-2" @change="change" />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { getStorage } from "../utils/storage";
import { reactive, onMounted } from "vue";
const config = reactive({
  translate: true,
  barrage: true,
});
const storage = getStorage()();
function reset() {
  chrome.storage.sync.clear(() => {
    console.log("clear");
  });
}

function change() {
  storage.set({
    config: {
      ...config,
    },
  });
}
onMounted(() => {
  const store = storage.get({
    config: {
      translate: true,
      barrage: true,
    },
  });
  config.translate = store.config.translate;
  config.barrage = store.config.barrage;
});
</script>
<style>
.config-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.config-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
}
</style>
