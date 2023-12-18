<template>
  <ul class="learn-list">
    <li v-for="item in list" :key="item.url" @click="open(item.url)">
      <el-link type="primary">{{ item.name }}</el-link>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const list = reactive([
  {
    name: "b站自然拼读法",
    url: "",
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
]);

function open(url) {
  chrome.tabs.create({ url: url });
}
</script>
<style>
.learn-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.learn-list li {
  margin: 4px 0;
}
</style>
