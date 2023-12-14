<template>
  <el-tabs v-model="active" class="demo-tabs">
    <el-tab-pane label="翻译" name="translate">
      <TranslateCom></TranslateCom>
    </el-tab-pane>
    <el-tab-pane label="词库" name="store">
      <StoreCom></StoreCom>
    </el-tab-pane>
    <el-tab-pane label="设置" name="third">
      <div class="content">设置</div>
    </el-tab-pane>
    <el-tab-pane label="资料" name="fourth">
      <div class="content">Task</div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import TranslateCom from "./src/translate.vue";
import StoreCom from "./src/store.vue";
import { ref } from "vue";
const active = ref("translate");
</script>
<style></style>
