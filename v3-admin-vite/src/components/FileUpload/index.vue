<script lang="ts" setup>
import { ref } from "vue"
import { ElMessage } from "element-plus"

interface TableData {
  id: number
  name: string
  secret: number
  raw: File
  status: "pending" | "success" | "error" // 文件上传状态
}

const handleChange = (uploadFile) => {
  tableData.value.push({
    ...uploadFile,
    id: tableData.value.length + 1,
    secret: 0,
    status: "pending"
  })
}
const removeFile = (scope) => {
  // 被删除项的数组下标
  const index = scope.row.id - 1
  tableData.value.splice(index, 1)
  // 被删除项之后的数据id都减1
  for (let i = index; i < tableData.value.length; i++) {
    tableData.value[i].id = tableData.value[i].id - 1
  }
}
const submitUpload = async () => {
  const formData = new FormData()
  for (let i = 0; i < tableData.value.length; i++) {
    formData.append(`file${i}`, tableData.value[i].raw) // File对象
    formData.append(`file${i}Secret`, String(tableData.value[i].secret)) // 每个文件对应的密级
  }
  // 调用后端接口
  // const res = await FileUpLoadAPI(formData)
  // 模拟调用后端接口
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if ((Math.random() * 10) % 2 === 0) resolve(null)
      else reject(null)
    }, 1000)
  })
    .then(() => {
      ElMessage({
        message: "上传成功",
        type: "success"
      })
      tableData.value = tableData.value.map((data) => {
        return {
          ...data,
          status: "success"
        }
      })
    })
    .catch(() => {
      ElMessage({
        message: "上传失败",
        type: "error"
      })
      tableData.value = tableData.value.map((data) => {
        return {
          ...data,
          status: "error"
        }
      })
    })
}

const tableData = ref<TableData[]>([])
const options = [
  {
    value: 0,
    label: "等级0"
  },
  {
    value: 1,
    label: "等级1"
  },
  {
    value: 2,
    label: "等级2"
  },
  {
    value: 3,
    label: "等级3"
  },
  {
    value: 4,
    label: "等级4"
  }
]
</script>
<template>
  <div class="file-upload-container">
    <el-upload
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
    >
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
    </el-upload>
    <el-table :data="tableData" size="large" class="file-upload-table">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column prop="id" label="编号" align="center" />
      <el-table-column prop="name" label="文件名" align="center" />
      <el-table-column prop="level" label="密级" align="center">
        <template #default="scope">
          <el-select v-model="scope.row.secret" class="m-2" placeholder="Select" size="large">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态" align="center">
        <template #default="scope">
          <el-link v-if="scope.row.status === 'pending'" type="info" :underline="false" @click="removeFile(scope)">
            待上传 X
          </el-link>
          <el-tag v-else-if="scope.row.status === 'success'" type="success"> 上传成功 </el-tag>
          <el-tag v-else type="error"> 上传失败 </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" :disabled="tableData.length === 0" @click="submitUpload"> 批量上传文件 </el-button>
  </div>
</template>

<style scoped>
.file-upload-container {
  padding: 50px;
}
.file-upload-table {
  margin: 50px 0;
}
</style>
