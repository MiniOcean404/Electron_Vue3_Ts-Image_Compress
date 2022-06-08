<template>
  <DarkMode></DarkMode>

  <div class="compress-container">
    <div class="tips">
      <p>1. 只能压缩 <span class="highlight">jpg/png</span> 格式图片；</p>
      <p>2. 图片处理需要时间，点击压缩后请耐心等待片刻。</p>
    </div>

    <el-slider v-model="quality" :step="10" show-stops show-input :min="10" :marks="marks" />

    <el-upload
      class="upload-img"
      drag
      multiple
      :on-success="upSuccess"
      action=""
      ref="upload"
      :http-request="uploadHttp"
      :show-file-list="false"
      :file-list="filesList"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽至这里 或 <em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import DarkMode from "@/render/components/DarkMode/dark-mode.vue";
import { sendCompressDate } from "@/render/message/send";
import { marksConfig } from "@/render/views/config";
import { UploadFilled } from "@element-plus/icons-vue";
import type { ElUpload } from "element-plus";
import { UploadProps } from "element-plus";
import { onMounted, ref } from "vue";

const path = window.require("path");

const marks = ref(marksConfig);
const quality = ref<number>(0);
const upload = ref<null | typeof ElUpload>(null);
const filesList = ref([]);

// eslint-disable-next-line
onMounted(() => {});

const uploadHttp = () => Promise.resolve();

const upSuccess: UploadProps["onSuccess"] = (res, file, files) => {
  files.forEach((item) => {
    if (!item.raw?.type) {
      // item.path;
    }
  });

  const mainProcessDate = {
    quality: quality.value,
    currentDir: "11",
  };

  sendCompressDate(mainProcessDate);
};
</script>
<!--深度选择器只用于 scope 且没有 css modules-->
<style lang="scss" scoped>
.compress-container {
  padding: 20px 20px 0 20px;

  .tips {
    line-height: 32px;
  }

  .upload-img {
    margin-top: 20px;
    height: 100%;
  }
}

// todo 深度选择器
:deep(.el-upload__text) {
  //color: red;
}
</style>
