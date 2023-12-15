<template>
  <el-button type="primary" @click="reset">重置数据</el-button>
</template>
<script setup lang="ts">
function reset() {
  chrome.storage.sync.clear(() => {
    console.log("clear");
  });
}
</script>
<style lang="scss"></style>
