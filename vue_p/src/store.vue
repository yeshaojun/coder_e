<template>
  <div class="content">
    <div class="footer">
      <el-space>
        <el-button size="small">导出</el-button>
        <el-button size="small" @click="opt('create')">新建</el-button>
        <el-button size="small" @click="opt('remove')">删除</el-button>
      </el-space>
    </div>
    <div class="mt-2 mb-2">
      <el-space>
        默认
        <el-select v-model="defaultStore" size="small">
          <el-option
            v-for="item in storeList"
            :key="item.key"
            :label="item.name"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-space>
    </div>
    <el-collapse @change="findWordList" accordion>
      <el-collapse-item
        v-for="item in storeList"
        :key="item.key"
        :name="item.key"
      >
        <template #title>
          <el-space>
            <span>{{ item.name }}</span>
            <el-tag v-if="item.key === defaultStore">默认</el-tag>
          </el-space>
        </template>
        <ul class="word-list" @mouseleave="hoveActive = ''">
          <li
            v-for="(w, index) in wordList[item.key]"
            :key="w.query"
            :class="[hoveActive === w.query + index ? 'active' : '']"
            @mouseenter="enter(w.query + index)"
          >
            <div>
              <div class="word-item-title">
                <el-space>
                  {{ w.query }}
                  <el-icon
                    @click="play(w.speakUrl)"
                    class="cursor-pointer mr-2"
                    :size="16"
                    ><Microphone
                  /></el-icon>
                </el-space>
                <es-space>
                  <el-icon
                    v-if="hoveActive === w.query + index"
                    class="cursor-pointer delete-icon"
                    @click="deleteWord(item.key, index)"
                    ><DeleteFilled
                  /></el-icon>
                </es-space>
              </div>
              <div class="conetent">
                {{ w.translation }}
              </div>
            </div>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="optType === 'create' ? '新增词典' : '删除词典'"
    width="80%"
  >
    <P v-if="optType === 'remove'" class="tip"
      >删除词典，词典里的数据也会删除，请谨慎操作</P
    >
    <el-input
      v-if="optType === 'create'"
      v-model="storename"
      placeholder="请输入词典名称"
    ></el-input>

    <el-select
      style="width: 100%"
      v-else
      multiple
      v-model="keys"
      placeholder="删除词典，词典内的 车单词也会被删除"
    >
      <el-option
        v-for="item in storeList"
        :key="item.key"
        :label="item.name"
        :value="item.key"
      ></el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <audio src="" ref="audioDom" controls class="audio-play"></audio>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getStorage } from "../utils/storage.js";
import { Microphone, DeleteFilled } from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const storename = ref("");
const optType = ref("create");
const keys = ref<string[]>([]);
const defaultStore = ref("");
const storage = getStorage()();
const storeList = ref<{ name: string; key: string }[]>([]);
const activeStore = ref("");
const wordList = ref<Record<string, any>>({});
const audioDom = ref<HTMLAudioElement>();
const hoveActive = ref("");

async function save() {
  if (optType.value === "create") {
    const key = `coder_e_${new Date().getTime()}`;
    const result = await storage.set({
      store: storeList.value.concat([
        {
          name: storename.value,
          key,
        },
      ]),
      [key]: [],
    });
    if (result) {
      storeList.value.push({
        name: storename.value,
        key,
      });
      ElMessage.success("success");
      dialogVisible.value = false;
    }
  } else {
    if (keys.value.length === storeList.value.length) {
      ElMessage.info("至少保留一个词典");
      return;
    }
    if (keys.value.indexOf(defaultStore.value) !== -1) {
      ElMessage.info("不能删除默认词典");
      return;
    }
    const result = await storage.set({
      store: storeList.value.filter((_) => keys.value.indexOf(_.key) === -1),
    });
    storeList.value = storeList.value.filter(
      (_) => keys.value.indexOf(_.key) === -1
    );
    keys.value.forEach((_) => {
      storage.remove(_);
    });
    if (result) {
      ElMessage.success("success");
      dialogVisible.value = false;
    }
  }
}

function opt(type) {
  optType.value = type;
  dialogVisible.value = true;
}

async function findWordList(name, refush = false) {
  if (!(name in wordList.value) || refush) {
    if (refush) {
      console.log("defaultStore.value", defaultStore.value);
      name = defaultStore.value;
    }
    const result = await storage.get({
      [name]: [],
    });
    console.log("result", result);
    wordList.value = {
      ...wordList.value,
      ...result,
    };
  }
}

function enter(name) {
  hoveActive.value = name;
}

function play(url) {
  if (audioDom.value) {
    audioDom.value.currentTime = 0;
    audioDom.value.src = url;
    audioDom.value.play();
  }
}

function deleteWord(key, index) {
  const list = wordList.value[key];
  list.splice(index, 1);
  storage.set({
    [key]: list,
  });
}

onMounted(async () => {
  const result = await storage.get({
    store: [
      {
        key: "coder_e_1",
        name: "生词本",
      },
    ],
    defaultStore: "coder_e_1",
  });
  storeList.value = result.store;
  defaultStore.value = result.defaultStore;
  activeStore.value = result.defaultStore;
  findWordList(result.defaultStore);
});

defineExpose({
  findWordList,
});
</script>
<style scoped>
.footer {
  background-color: #f0f0f0;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.tip {
  color: #999;
  font-size: 12px;
}

.word-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.word-list li {
  border-bottom: 1px solid #f0f0f0;
  background-color: #f5f5f5;
  margin-bottom: 10px;
  padding: 0 10px;
}

.word-list li.active {
  background-color: #eef5fe;
}
.word-item-title {
  color: #599ff7;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
}

.conetent {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  padding: 2px;
}
.delete-icon {
  color: #e57471;
  font-size: 16px;
}
.audio-play {
  display: none;
}
</style>
