<template>
  <div class="content">
    <div class="footer">
      <el-space>
        <el-button size="small">导出</el-button>
        <el-button size="small">添加词库</el-button>
      </el-space>
    </div>
    <el-collapse>
      <el-collapse-item
        v-for="item in storeList"
        :key="item.key"
        :title="item.name"
        :name="item.key"
      >
        <ul>
          <li>
            agenda
            <span>议程</span>
            <span>收录时间</span>
            <span>复习次数</span>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const storeList = reactive([
  {
    key: "coder_e_1",
    name: "生词本",
  },
]);
</script>
<style scoped>
.footer {
  background-color: #f0f0f0;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
</style>
