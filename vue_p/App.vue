<template>
  <el-tabs v-model="active" class="demo-tabs">
    <el-tab-pane label="翻译" name="translate">
      <div class="content">
        <el-input
          v-model="textarea"
          :rows="2"
          type="textarea"
          placeholder="请输入需要翻译的单词"
        />
        <div v-if="textarea">
          <div class="result">translate</div>
          <el-space class="mt-2">
            <el-icon class="cursor-pointer"><Microphone /></el-icon>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="添加到生词本"
              placement="top-start"
            >
              <el-icon class="cursor-pointer"><CirclePlus /></el-icon>
            </el-tooltip>
          </el-space>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="词库" name="store">
      <div class="content">
        <div class="footer">
          <el-space>
            <el-button size="small">导出</el-button>
            <el-button size="small">添加词库</el-button>
          </el-space>
        </div>
        <el-collapse>
          <el-collapse-item title="生词本" name="1">
            <ul>
              <li>
                agenda
                <span>议程</span>
                <span>收录时间</span>
                <span>复习次数</span>
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="程序员词库" name="1">
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
import { Microphone, CirclePlus } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
const textarea = ref("");
const active = ref();
onMounted(() => {});
</script>
<style>
ul {
  list-style: none;
  padding: 0;
}
.result {
  margin-top: 20px;
  color: #599ff7;
  font-size: 24px;
}

.footer {
  background-color: #f0f0f0;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}

.content {
  min-height: 200px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
