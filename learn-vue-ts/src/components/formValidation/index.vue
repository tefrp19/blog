<template>
  <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
  >
    <el-form-item label="上传文件" prop="fileList">
      <!--      实现表单校验文件是否上传的重点：将 v-model:file-list 值绑定为 el-form 的 model 中的值，才能进行校验-->
      <el-upload
          multiple
          :auto-upload="false"
          v-model:file-list="form.fileList"
      >
        <el-button>上传文件</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">
        提交表单
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {FormInstance} from "element-plus";

const form = ref({
  fileList: []
})

const formRef = ref<FormInstance>()
const rules = ref({
  fileList: [
    {
      required: true,
      message: '选择上传文件',
      trigger: 'change',
    },
  ]
})

const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log("表单校验成功")
      console.log("文件列表：", form.value.fileList)
    } else {
      console.log("表单校验失败")
    }
  })
}

</script>

<style scoped>

</style>