<template>
  <template v-if="isBucketList">
    <zr-query-form :leftSpan="23" :rightSpan="1">
      <template #left>
        <el-input v-model="queryParams.name" placeholder="搜索文件库" clearable :suffix-icon="Search" />
      </template>
      <template #right>
        <el-button><span class="iconfont icon-refresh1" /></el-button>
      </template>
    </zr-query-form>
    <vxe-table
      border
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :row-class-name="rowClassName"
      :data="bucketListData"
      @cell-click="goToFileListPage"
      max-height="1000px"
    >
      <vxe-column field="name" title="名称">
        <template #default="{ row }">
          <span class="iconfont icon-wenjiantong" style="font-size: 20px" />
          {{ row.name }}
        </template>
      </vxe-column>
      <vxe-column field="objectNum" title="文件数" />
      <vxe-column field="size" title="占用空间" />
      <vxe-column field="accessPolicy" title="权限" />
    </vxe-table>
  </template>

  <template v-else>
    <el-card>
      <template #header>
        <div class="card-header">
          <div class="bucket-summary">
            <span class="iconfont icon-wenjiantong" style="font-size: 40px" />
            <div class="bucket-info">
              <h1>{{ bucketDetail.name }}</h1>
              <span
                >创建时间：<strong>{{ bucketDetail.zonedDateTime }}</strong></span
              >
              <span
                >权限：<strong>{{ bucketDetail.access }}</strong></span
              >
              <span
                >大小：<strong>{{ bucketDetail.size }}</strong></span
              >
              <span
                >文件数：<strong>{{ bucketDetail.objectNum }}</strong></span
              >
            </div>
          </div>
          <div class="bucket-action">
            <el-button size="large" :icon="RefreshRight" @click="setFileListTable()">刷新</el-button>
            <el-dropdown trigger="click">
              <el-button class="button" size="large" :icon="Upload" color="rgb(0,21,41)">上传</el-button>
              <template #dropdown>
                <el-dropdown-menu style="width: 175px">
                  <el-upload :auto-upload="false" multiple :show-file-list="false" :on-change="uploadFileOrDir">
                    <el-button size="large" style="width: 175px" :icon="Upload">上传文件</el-button>
                  </el-upload>
                  <el-upload :auto-upload="false" multiple :show-file-list="false" :on-change="uploadFileOrDir">
                    <el-button size="large" style="width: 175px" :icon="FolderAdd">上传文件夹 </el-button>
                  </el-upload>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>

      <el-card>
        <div class="container">
          <el-button class="button" size="large" @click="backToSpecifiedSpace(-1)">
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </el-button>
          <el-breadcrumb separator="/" class="bucket-breadcrumb">
            <el-breadcrumb-item
              v-for="(path, index) in breadcrumbPath"
              :key="index"
              @click="backToSpecifiedSpace(path)"
            >
              <a>
                {{ path }}
              </a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <el-button class="button" size="large" @click="copyPath">
            <el-icon>
              <CopyDocument />
            </el-icon>
          </el-button>
          <el-button class="button" size="large" :icon="FolderAdd" @click="createDirDialogVisible = true"
            >创建新路径
          </el-button>
          <el-dialog
            v-model="createDirDialogVisible"
            title="创建新路径"
            width="30%"
            align-center
            append-to-body
            :lock-scroll="false"
          >
            <span>当前路径：</span><br />
            <strong>{{ currentDir }}</strong
            ><br />
            <el-space style="margin-top: 20px">
              <span>新目录名称：</span>
              <el-input v-model="newDir" placeholder="输入新目录名称" />
            </el-space>

            <template #footer>
              <span class="dialog-footer">
                <el-button size="large" @click="createDirDialogVisible = false">取消</el-button>
                <el-button size="large" :disabled="newDir.length === 0" type="primary" @click="createDir"
                  >创建</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
      </el-card>
      <div class="file-list">
        <el-card>
          <template v-if="!showFileVersionsList">
            <vxe-table
              show-header-overflow
              show-overflow
              :row-config="{ isHover: true }"
              :row-class-name="rowClassName"
              :data="fileListTableData"
              @cell-click="cellClickEvent"
              max-height="1000px"
            >
              <vxe-column field="objectName" title="名称">
                <template #default="{ row }">
                  <el-icon>
                    <template v-if="row.dir">
                      <Folder />
                    </template>
                    <template v-else>
                      <Document />
                    </template>
                  </el-icon>
                  {{ row.objectName }}
                </template>
              </vxe-column>
              <vxe-column field="lastModified" title="上次修改日期" />
              <vxe-column field="size" title="占用空间" />
            </vxe-table>
          </template>
          <template v-else>
            <el-card>
              <template #header>
                <el-row :gutter="20" align="middle">
                  <el-col :span="3">
                    <el-icon size="50">
                      <List />
                    </el-icon>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col :span="24"
                        ><span style="font-size: 25px">{{ fileDetail.objectName + " 版本" }}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8"
                        ><span style="font-size: 15px">{{ fileDetail.versions.versionNum + "个版本" }}</span></el-col
                      >
                      <el-col :span="16"
                        ><span style="font-size: 15px">{{ fileDetail.versions.totalSize }}</span>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="3" :offset="6">
                    <el-tooltip effect="dark" content="删除当前版本外的所有版本" placement="bottom">
                      <el-button :type="'danger'" :size="'large'" :icon="DocumentDelete" />
                    </el-tooltip>
                  </el-col>
                </el-row>
              </template>
              <el-row
                class="version-list-item"
                v-for="(version, index) in fileDetail.versions.itemVOList"
                :style="{ opacity: version.deleteMaker ? 0.5 : 1 }"
                :key="index"
              >
                <el-col :span="24">
                  <el-row :gutter="20" align="middle">
                    <el-col :span="2" style="max-height: 50px; max-width: 50px">
                      <Document />
                    </el-col>
                    <el-col :span="2" style="font-weight: bold; font-size: 16px"
                      >v{{ fileDetail.versions.itemVOList.length - index }}
                    </el-col>
                    <el-col :span="3">
                      <el-tag v-if="version.latest">当前版本</el-tag>
                      <el-tag v-if="version.deleteMaker" type="info">已删除</el-tag>
                    </el-col>

                    <el-col :span="2" :offset="11">
                      <el-tooltip effect="dark" content="下载该版本" placement="bottom">
                        <el-button
                          type="info"
                          size="small"
                          circle
                          :icon="Download"
                          :disabled="version.deleteMaker"
                          @click="downloadFile(version.versionId as string | null)"
                        />
                      </el-tooltip>
                    </el-col>
                    <el-col :span="2">
                      <el-tooltip effect="dark" content="恢复该版本" placement="bottom">
                        <el-button
                          type="info"
                          size="small"
                          circle
                          :icon="Refresh"
                          :disabled="version.deleteMaker"
                          @click="restoreFile(version.objectName, version.versionId as string | null)"
                        />
                      </el-tooltip>
                    </el-col>
                    <el-col :span="2">
                      <el-tooltip effect="dark" content="删除该版本" placement="bottom">
                        <el-button
                          type="info"
                          size="small"
                          circle
                          :icon="Delete"
                          :disabled="version.deleteMaker"
                          @click="deleteFileVersion(version.objectName, version.versionId as string | null)"
                        />
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24">{{ version.versionId ? version.versionId : "-" }}</el-col>
                <el-col :span="16">上次修改时间：{{ version.lastModified }}</el-col>
                <el-col :span="8">大小：{{ version.size }}</el-col>
                <el-divider />
              </el-row>
            </el-card>
          </template>
        </el-card>

        <el-card v-show="showFileDetail" style="width: 300px">
          <el-row>
            <el-col :span="20">
              <div class="file-name" style="font-size: 16px; height: 30px; line-height: 30px">
                <strong>{{ fileDetail.objectName }}</strong>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button @click="showFileDetail = false">
                <el-icon>
                  <Expand />
                </el-icon>
              </el-button>
            </el-col>
          </el-row>
          <el-card class="file-action">
            <div style="font-size: 16px; font-weight: bold">操作：</div>
            <el-divider />
            <el-button text @click="downloadFile(null)">
              <el-icon>
                <Download />
              </el-icon>
              下载
            </el-button>
            <el-divider />
            <el-button text disabled>
              <el-icon>
                <Share />
              </el-icon>
              分享
            </el-button>
            <el-divider />
            <el-button text @click="tagsDialogVisible = true">
              <el-icon>
                <CollectionTag />
              </el-icon>
              标签
            </el-button>
            <el-dialog
              v-model="tagsDialogVisible"
              title="修改标签"
              width="50%"
              align-center
              append-to-body
              :lock-scroll="false"
            >
              <span>当前标签：</span><br />
              <div>
                <el-tag
                  v-for="tag in fileDetail.tags"
                  :key="tag.tagKey"
                  class="mx-1"
                  round
                  closable
                  @close="deleteTag(tag.tagKey)"
                  style="margin-top: 15px"
                >
                  {{ tag.tagKey }}:{{ tag.tagLabel }}
                </el-tag>
              </div>

              <el-form :model="tagForm" style="margin-top: 20px">
                <el-form-item label="标签 Key：">
                  <el-input v-model="tagForm.tagKey" />
                </el-form-item>
                <el-form-item label="标签 Label：">
                  <el-input v-model="tagForm.tagLabel" />
                </el-form-item>
              </el-form>

              <template #footer>
                <span class="dialog-footer">
                  <el-button size="large" @click="tagsDialogVisible = false">取消</el-button>
                  <el-button
                    size="large"
                    :disabled="tagForm.tagKey.length === 0 || tagForm.tagLabel.length === 0"
                    type="primary"
                    @click="createTag"
                    >保存</el-button
                  >
                </span>
              </template>
            </el-dialog>
            <el-divider />
            <el-button text @click="showFileVersionsList = !showFileVersionsList">
              <el-icon>
                <Operation />
              </el-icon>
              {{ showFileVersionsList ? "隐藏文件版本" : "展示文件版本" }}
            </el-button>
            <el-divider />
          </el-card>

          <el-button
            type="danger"
            size="large"
            style="width: 100%; margin: 10px 0"
            @click="deleteFileDialogVisible = true"
          >
            <el-icon>
              <Delete />
            </el-icon>
            删除
          </el-button>

          <el-dialog
            v-model="deleteFileDialogVisible"
            title="删除文件"
            width="30%"
            align-center
            append-to-body
            :lock-scroll="false"
          >
            <span>你确定要删除：</span><br />
            <strong>{{ currentDir + fileDetail.objectName }}</strong> ？<br />
            <el-space style="margin-top: 20px">
              <span>删除全部版本：</span>
              <el-switch v-model="deleteFileAllVersion" />
            </el-space>

            <template #footer>
              <span class="dialog-footer">
                <el-button size="large" @click="deleteFileDialogVisible = false">取消</el-button>
                <el-button size="large" type="danger" @click="deleteCurrentVersionFile(null)">删除</el-button>
              </span>
            </template>
          </el-dialog>

          <el-divider />

          <el-descriptions title="文件信息" direction="vertical" :column="1" :size="'default'" border>
            <el-descriptions-item label="名称：">{{ fileDetail.objectName }}</el-descriptions-item>
            <el-descriptions-item label="大小：">{{ fileDetail.size }}</el-descriptions-item>
            <el-descriptions-item label="上次修改日期：">{{ fileDetail.lastModified }}</el-descriptions-item>
            <el-descriptions-item label="ETag：">{{ fileDetail.etag }}</el-descriptions-item>
            <el-descriptions-item label="标签：">
              <span v-for="(tag, index) in fileDetail.tags" :key="index">{{ tag.tagKey }}:{{ tag.tagLabel }}, </span>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="元数据" direction="vertical" :column="1" :size="'default'" border>
            <el-descriptions-item label="Content-Type：">
              {{ fileDetail.metadata.contentType }}
            </el-descriptions-item>
            <el-descriptions-item label="X-Amz-Tagging-Count：">
              {{ fileDetail.metadata.xAmzTaggingCount }}
            </el-descriptions-item>
          </el-descriptions>
          <el-divider />
        </el-card>
      </div>
    </el-card>
  </template>
</template>

<script setup lang="ts">
// import ZrQueryForm from "@/components/zr/ZrQueryForm/src/ZrQueryForm.vue";
import {
  CopyDocument,
  Delete,
  Document,
  DocumentDelete,
  Download,
  Folder,
  FolderAdd,
  Refresh,
  RefreshRight,
  Search,
  Share,
  Upload
} from "@element-plus/icons-vue"
import { computed, nextTick, onMounted, reactive, ref, toRefs } from "vue"
import { useRouter } from "vue-router"
// import {
//   createTagApi,
//   deleteFileApi,
//   deleteTagApi,
//   downloadFileApi,
//   file,
//   getBucketListApi,
//   getFileListApi,
//   uploadFileApi
// } from "@/api/minio/bucketList"
import { ElMessage, ElMessageBox, UploadFile } from "element-plus"

const isBucketList = ref(true) // 是否是文件库列表页
const state = reactive({
  queryParams: {
    name: ""
  },
  psizeAccess: 10,
  psizeNum: 1 //分页
})
const { queryParams } = toRefs(state)
const router = useRouter()

const bucketListData = ref([])

onMounted(async () => {
  const bucketName = router.currentRoute.value.query.bucketName
  if (bucketName) {
    goToFileListPage({ row: { name: bucketName } })
  } else {
    bucketListData.value = (await getBucketListApi()).data
  }
})
const rowClassName = () => {
  return "row-pointer"
}

// 面包屑路径
const breadcrumbPath = ref<string[]>([])
/**
 * 跳转到文件列表页
 */
const goToFileListPage = async ({ row }) => {
  const { name: bucketName, zonedDateTime, access, size, objectNum } = row
  isBucketList.value = false
  bucketDetail.value = {
    name: bucketName,
    zonedDateTime,
    access,
    size,
    objectNum
  }
  breadcrumbPath.value.push(bucketName)
  await setFileListTable(bucketName, "")

  // 需要设置input的webkitRelativePath属性才能实现上传文件夹
  await nextTick()
  const inputDom = document.querySelectorAll(".el-upload__input")[1] as HTMLInputElement
  inputDom.webkitdirectory = true
}

/**
 * 刷新文件列表表格
 */
const setFileListTable = async (bucketName?: string, prefix?: string) => {
  fileListTableData.value = (
    await getFileListApi(bucketName ? bucketName : bucketDetail.value.name, prefix ? prefix : currentDir.value)
  ).data
}

const fileListTableData = ref<fileDetailType[]>([])

const showFileDetail = ref(false)

/**
 * 回到指定文件库或文件目录下
 * @param space 指定文件库、文件目录或者返回上一级
 */
type space = string | -1
const backToSpecifiedSpace = async (space: space) => {
  showFileDetail.value = false
  // let prefix
  let breadcrumbPathPopNum = 1
  // 返回上一级面包屑数组只pop一次
  if (space === -1) {
    // 如果正在展示文件版本列表则上一级返回文件列表
    if (showFileVersionsList.value) {
      showFileVersionsList.value = false
      return
    }
    // 返回文件库列表
    if (breadcrumbPath.value.length == 1) {
      breadcrumbPath.value.pop()
      isBucketList.value = true
      bucketListData.value = (await getBucketListApi()).data
      return
    }
  } else {
    //  跳转到到指定文件目录下
    breadcrumbPathPopNum = breadcrumbPath.value.length - 1 - breadcrumbPath.value.findIndex((item) => item === space)
    showFileVersionsList.value = false
  }
  // 面包屑数组pop多次
  for (let i = 0; i < breadcrumbPathPopNum; i++) {
    breadcrumbPath.value.pop()
  }
  await setFileListTable()
}

/**
 * 复制路径
 */
const copyPath = async () => {
  await navigator.clipboard.writeText(bucketDetail.value.name + currentDir.value)
  ElMessage.success("路径复制成功")
}

const createDirDialogVisible = ref(false)
const newDir = ref("")
/**
 * 创建新目录
 */
const createDir = () => {
  createDirDialogVisible.value = false
  breadcrumbPath.value.push(newDir.value)
  fileListTableData.value = []
  newDir.value = ""
}

// 文件库信息
const bucketDetail = ref({
  name: "",
  zonedDateTime: "",
  access: "",
  size: "",
  objectNum: 0
})

interface fileDetailType {
  objectName: string
  size: string
  lastModified: string
  etag: string
  tags: tag[]
  metadata: {
    contentType: string
    xAmzTaggingCount: string
  }
  versionId?: string | null
  deleteMaker?: boolean
  latest?: boolean
  versions: {
    versionNum: number
    totalSize: string
    itemVOList: fileDetailType[]
  }
}

const currentFileName = ref("")
// 文件详情信息
const fileDetail = computed<fileDetailType>(() => {
  const fileDetail = fileListTableData.value.find((item) => item.objectName === currentFileName.value)
  if (fileDetail) {
    return fileDetail
  } else {
    return {
      objectName: "",
      size: "",
      lastModified: "",
      etag: "",
      tags: [],
      metadata: {
        contentType: "",
        xAmzTaggingCount: ""
      },
      versions: {
        versionNum: 1,
        totalSize: "",
        itemVOList: []
      }
    }
  }
})

/**
 * 文件列表表格单元格被点击触发事件
 */
const cellClickEvent = async ({ row }) => {
  const { dir, objectName } = row
  // 如果点击的是目录则进入下一级，否则显示文件详细信息
  if (dir) {
    showFileDetail.value = false
    breadcrumbPath.value.push(objectName.slice(0, -1)) // 去掉分隔符："temp/"->"temp"
    await setFileListTable()
  } else {
    showFileDetail.value = true
    currentFileName.value = objectName
  }
}

// 当前目录
const currentDir = computed(() => {
  const dirArr = breadcrumbPath.value.slice(1, breadcrumbPath.value.length)
  if (dirArr.length === 0) {
    return ""
  } else {
    return dirArr.join("/") + "/"
  }
})

/**
 * 上传文件或文件夹
 * @param uploadFile 上传的文件
 */
const uploadFileOrDir = async (uploadFile: UploadFile) => {
  const file = uploadFile.raw
  const res: any = await uploadFileApi(bucketDetail.value.name, file as File, currentDir.value)
  if (res.code === 200) {
    ElMessage.success("上传成功")
  }
  await setFileListTable()
}

/**
 * 下载文件
 */
const downloadFile = async (versionId: string | null) => {
  const res: any = await downloadFileApi(
    bucketDetail.value.name,
    currentDir.value,
    fileDetail.value.objectName,
    versionId
  )
  const url = res.data
  window.open(url, "_blank")
}

const tagsDialogVisible = ref(false)
const tagForm = ref({
  tagKey: "",
  tagLabel: ""
})

interface tag {
  tagKey: string
  tagLabel: string
}

/**
 * 创建标签
 */
const createTag = async () => {
  const res: any = await createTagApi(
    bucketDetail.value.name,
    fileDetail.value.objectName,
    tagForm.value.tagKey,
    tagForm.value.tagLabel
  )
  if (res.code === 200) {
    ElMessage.success("创建标签成功")
  }
  const existingTagIndex = fileDetail.value.tags.findIndex((tag) => tag.tagKey === tagForm.value.tagKey)
  if (existingTagIndex === -1) {
    // 如果是新标签则插入数据
    fileDetail.value.tags.push(tagForm.value)
  } else {
    // 如果标签已经存在则覆盖写
    fileDetail.value.tags[existingTagIndex].tagLabel = tagForm.value.tagLabel
  }
  tagForm.value = {
    tagKey: "",
    tagLabel: ""
  }
}

/**
 * 删除标签
 */
const deleteTag = async (tagKey) => {
  const res: any = await deleteTagApi(bucketDetail.value.name, fileDetail.value.objectName, tagKey)
  if (res.code === 200) {
    ElMessage.success("删除成功")
  }
  fileDetail.value.tags.splice(
    fileDetail.value.tags.findIndex((tag) => tag.tagKey === tagKey),
    1
  )
}

const deleteFileDialogVisible = ref(false)

const deleteFileAllVersion = ref(false)

/**
 * 删除文件
 */
const deleteFile = async (versionId: string | null) => {
  const fileList: file[] = [
    {
      objectName: currentDir.value + fileDetail.value.objectName,
      version: versionId ? versionId : null
    }
  ]
  const res: any = await deleteFileApi(bucketDetail.value.name, fileList)
  return res
}

/**
 * 删除文件当前版本
 */
const deleteCurrentVersionFile = async (versionId: string | null) => {
  console.log(versionId)
  const res = await deleteFile(versionId)
  if (res.code === 200) {
    ElMessage.success("删除成功")
  }
  deleteFileDialogVisible.value = false
  showFileDetail.value = false
  await setFileListTable()
}

const showFileVersionsList = ref(false)

/**
 * 恢复文件的历史版本
 */
const restoreFile = (fileName: string, versionId: string | null) => {
  ElMessageBox.confirm(`确定要恢复${fileName}文件的${versionId}版本?`, "恢复文件版本", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info"
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "恢复成功"
      })
    })
    .catch(() => {})
}

/**
 * 删除文件的历史版本
 */
const deleteFileVersion = (fileName: string, versionId: string | null) => {
  ElMessageBox.confirm(`确定要删除${fileName}文件的${versionId}版本?`, "删除文件版本", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  })
    .then(async () => {
      const res = await deleteFile(versionId)
      if (res.code === 200) {
        ElMessage({
          type: "success",
          message: "删除成功"
        })
        await setFileListTable()
      }
    })
    .catch(() => {})
}
</script>

<style scoped>
::v-deep(.vxe-table .vxe-body--row.row-pointer) {
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bucket-summary {
  display: flex;
}

.bucket-summary > span {
  margin: 10px;
}

.bucket-info h1 {
  font-size: 30px;
}

.bucket-info > span {
  margin-right: 20px;
}

.bucket-action {
  display: flex;
}

.bucket-action button {
  margin: 0 10px;
}

.container {
  display: flex;
  align-items: center;
  max-width: 100%;
}

.container button {
  margin-right: 10px;
}

.bucket-breadcrumb {
  flex-grow: 1;
}

.file-list {
  display: flex;
  height: 1000px;
}

.file-list > div:nth-child(1) {
  flex-grow: 1;
}

/**
  重写分割线样式
**/
.el-divider--horizontal {
  margin: 5px 0;
}

.file-action button {
  width: 100%;
}

.version-list-item {
  padding: 16px 8px 16px 40px;
  height: 108px;
}

.version-list-item:hover {
  background-color: rgb(251, 250, 250);
}
</style>
