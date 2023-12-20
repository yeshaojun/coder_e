<template>
  <el-tabs v-model="active" class="demo-tabs" @tab-change="changeTabs">
    <el-tab-pane label="翻译" name="translate">
      <TranslateCom></TranslateCom>
    </el-tab-pane>
    <el-tab-pane label="词库" name="store">
      <StoreCom ref="storeDom"></StoreCom>
    </el-tab-pane>
    <el-tab-pane label="设置" name="third">
      <SetCom></SetCom>
    </el-tab-pane>
    <el-tab-pane label="资料" name="fourth">
      <LearnCom />
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import TranslateCom from "./src/translate.vue";
import StoreCom from "./src/store.vue";
import SetCom from "./src/set.vue";
import LearnCom from "./src/learn.vue";
import { ref, onMounted } from "vue";
import { getStorage } from "./utils/storage.js";
const active = ref("translate");
const storeDom = ref();

function changeTabs(name) {
  if (name === "store") {
    storeDom.value && storeDom.value.findWordList("", true);
  }
}

onMounted(async () => {
  const storage = getStorage()();
  const store = await storage.get({
    store: [],
  });
  if (store.store.length === 0) {
    await storage.set({
      store: [
        {
          key: "coder_e_1",
          name: "生词本",
        },
      ],
      defaultStore: "coder_e_1",
      coder_e_1: [],
    });
  }
});
</script>
<style></style>
