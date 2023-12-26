<template>
  <el-button type="primary" size="small" @click="reset">重置数据</el-button>
  <ul class="config-list">
    <li>
      选中翻译
      <el-switch v-model="config.translate" class="ml-2" @change="change" />
    </li>
    <li>
      单词弹幕
      <el-switch v-model="config.barrage" class="ml-2" @change="change" />
    </li>
    <li>
      复习提醒
      <el-switch v-model="config.remind" class="ml-2" @change="change" />
    </li>
    <li>
      弹幕开启时间
      <el-time-select
        v-model="config.barrageTime"
        start="00:00"
        step="00:15"
        end="23:59"
        @change="change"
        placeholder="弹幕开始时间"
        format="hh:mm"
      />
    </li>
    <li>
      开启复习时间
      <el-time-select
        v-model="config.remindTime"
        start="00:00"
        step="00:15"
        end="23:59"
        @change="change"
        placeholder="弹幕开始时间"
        format="hh:mm"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { getStorage } from "../utils/storage";
import { ref, onMounted } from "vue";
const config = ref({});
const storage = getStorage()();

async function change() {
  await storage.set({
    config: {
      ...config.value,
    },
  });
}

function reset() {
  chrome.storage.sync.clear();
  location.reload();
}

onMounted(async () => {
  const store = await storage.get({
    config: {
      translate: true,
      barrage: true,
      barrageTime: "09:00",
      remindTime: "11:00",
      remind: true,
    },
  });
  config.value = store.config;
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
