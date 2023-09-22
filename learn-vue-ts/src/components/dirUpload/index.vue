<template>
  <div>
    <el-upload
        ref="uploadRef"
        :auto-upload="false"
        :show-file-list="true"
        v-model:file-list="fileList"
        :on-change="handleChange"
        multiple
    >
      <template #trigger>
        <el-button type="primary" ref="uploadButtonRef">添加文件</el-button>
      </template>
    </el-upload>

    <el-button type="success" @click="submitUpload" style="margin-top: 20px">
      获取文件列表，上传文件
    </el-button>

  </div>

</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import type {UploadFile, UploadFiles, UploadInstance} from 'element-plus'

const uploadRef = ref<UploadInstance>()
const uploadButtonRef = ref()
let fileList = ref<any[]>([])
let elUploadInputDom: HTMLInputElement | null = null
const addedFileList = ref<any []>([]) // 已被添加的文件列表
onMounted(() => {
  elUploadInputDom = uploadButtonRef.value.ref.parentElement.querySelector("input")
  console.dir(uploadButtonRef.value.ref)
  console.dir(elUploadInputDom);
//   为 input 添加 webkitdirectory
  elUploadInputDom.webkitdirectory = true

})

const handleChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log("uploadFiles", uploadFiles)
  // console.log("input.value",elUploadInputDom?.value)
}

const submitUpload = () => {
  // uploadRef.value?.handleStart()
  // uploadRef.value?.hand
  console.log("fileList", fileList)
}
</script>
