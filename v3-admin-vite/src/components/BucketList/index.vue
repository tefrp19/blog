<template>
  <div class="bucket-list-container">
    <template v-if="isBucketList">
      <!--      <zr-query-form :leftSpan="23" :rightSpan="1">-->
      <!--        <template #left>-->
      <!--          <el-input v-model="queryParams.name" placeholder="搜索文件库" clearable :suffix-icon="Search" />-->
      <!--        </template>-->
      <!--        <template #right>-->
      <!--          <el-button><span class="iconfont icon-refresh1" /></el-button>-->
      <!--        </template>-->
      <!--      </zr-query-form>-->
      <vxe-table
        border
        show-header-overflow
        show-overflow
        :row-config="{ isHover: true }"
        :row-class-name="rowClassName"
        :data="tableData"
        @cell-click="isBucketList = false"
      >
        <vxe-column field="name" title="名称">
          <template #default="{ row }">
            <span class="iconfont icon-wenjiantong" style="font-size: 20px" />
            {{ row.name }}
          </template>
        </vxe-column>
        <vxe-column field="objects" title="文件数" />
        <vxe-column field="size" title="占用空间" />
        <vxe-column field="access" title="权限" />
      </vxe-table>
    </template>

    <template v-else>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="bucket-summary">
              <span class="iconfont icon-wenjiantong" style="font-size: 40px" />
              <div class="bucket-info">
                <h1>{{ "test" }}</h1>
                <span
                  >创建时间：<strong>{{ new Date() }}</strong
                  >></span
                >
                <span
                  >权限：<strong>{{ "public" }}</strong
                  >></span
                >
                <span
                  >大小：<strong>{{ "1.3 GiB / 1.0 TiB - 6 Objects" }}</strong
                  >></span
                >
              </div>
            </div>
            <div class="bucket-action">
              <el-button class="button" size="large" :icon="RefreshRight">刷新</el-button>
              <el-upload>
                <el-button class="button" size="large" :icon="Upload" color="rgb(0 21 41)">上传</el-button>
              </el-upload>
            </div>
          </div>
        </template>

        <el-card>
          <div class="container">
            <el-button class="button" size="large" @click="isBucketList = true">
              <el-icon>
                <ArrowLeft />
              </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bucket-breadcrumb">
              <el-breadcrumb-item>homepage</el-breadcrumb-item>
              <el-breadcrumb-item>promotion management</el-breadcrumb-item>
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button class="button" size="large">
              <el-icon>
                <CopyDocument />
              </el-icon>
            </el-button>
            <el-button class="button" size="large" :icon="FolderAdd">创建新路径</el-button>
          </div>
        </el-card>
        <div class="file-list">
          <el-card>
            <vxe-table
              show-header-overflow
              show-overflow
              :row-config="{ isHover: true }"
              :row-class-name="rowClassName"
              :data="fileListData"
              @cell-click="cellClickEvent"
            >
              <vxe-column field="name" title="名称">
                <template #default="{ row }">
                  <el-icon>
                    <template v-if="row.isDir">
                      <Folder />
                    </template>
                    <template v-else>
                      <Document />
                    </template>
                  </el-icon>
                  <!--                  <span class="iconfont icon-wenjiantong" style="font-size: 20px"></span>-->
                  {{ row.name }}
                </template>
              </vxe-column>
              <vxe-column field="updateTime" title="上次修改日期" />
              <vxe-column field="size" title="占用空间" />
            </vxe-table>
          </el-card>

          <el-card v-show="isShowFileDetail" class="file-detail">
            <el-row>
              <el-col :span="20">
                <div class="file-name" style="font-size: 16px; height: 30px; line-height: 30px">
                  {{ "XXX系统集成测试记录.xlsx" }}
                </div>
              </el-col>
              <el-col :span="4">
                <el-button @click="isShowFileDetail = false">
                  <el-icon>
                    <Expand />
                  </el-icon>
                </el-button>
              </el-col>
            </el-row>
            <el-card class="file-action">
              <div style="font-size: 16px; font-weight: bold">操作：</div>
              <el-divider />
              <el-button text>
                <el-icon>
                  <Download />
                </el-icon>
                下载
              </el-button>
              <el-divider />
              <el-button text>
                <el-icon>
                  <Share />
                </el-icon>
                分享
              </el-button>
              <el-divider />
              <el-button text>
                <el-icon>
                  <CollectionTag />
                </el-icon>
                标签
              </el-button>
              <el-divider />
            </el-card>

            <el-button type="danger" size="large" style="width: 100%; margin: 10px 0">
              <el-icon>
                <CollectionTag />
              </el-icon>
              删除
            </el-button>
            <el-divider />

            <el-descriptions title="文件信息" direction="vertical" :column="1" :size="'default'" border>
              <el-descriptions-item label="名称：">kooriookami</el-descriptions-item>
              <el-descriptions-item label="大小：">18100000000</el-descriptions-item>
              <el-descriptions-item label="上次修改日期：">{{ new Date() }}</el-descriptions-item>
              <el-descriptions-item label="标签">
                <el-tag size="small">test</el-tag>
              </el-descriptions-item>
            </el-descriptions>
            <el-divider />
          </el-card>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
// import ZrQueryForm from "@/components/zr/ZrQueryForm/src/ZrQueryForm.vue"
import { CopyDocument, Document, Folder, FolderAdd, RefreshRight, Search, Upload } from "@element-plus/icons-vue"
import { reactive, ref, toRefs } from "vue"
import { VxeTableEvents, VxeTablePropTypes } from "vxe-table"
import { useRouter } from "vue-router"

const isBucketList = ref(true) // 是否是文件库列表页
// const state = reactive({
//   queryParams: {
//     name: ""
//   },
//   psizeAccess: 10,
//   psizeNum: 1 //分页
// })
// const { queryParams, psizeAccess, psizeNum } = toRefs(state)
// const router = useRouter()

const tableData = ref([
  {
    id: 10001,
    name: "Test1",
    objects: 9,
    size: "1.3GiB",
    access: "R/W"
  },
  {
    id: 10002,
    name: "Test2",
    objects: 0,
    size: "0.0B",
    access: "R/W"
  }
])

const rowClassName = () => {
  return "row-pointer"
}
const cellClickEvent = ({ column }) => {
  console.log(`单元格点击${column.title}`)
  isShowFileDetail.value = true
}

const isShowFileDetail = ref(false)

function refreshDataPsize() {}

const fileListData = ref([
  {
    id: 10001,
    name: "Test1",
    isDir: true,
    type: "dir",
    updateTime: "",
    size: "1.3GiB"
  },
  {
    id: 10002,
    name: "Test1",
    isDir: false,
    type: "xlsx",
    updateTime: new Date(),
    size: "1.3GiB"
  }
])
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
  height: 900px;
}

.file-list > div:nth-child(1) {
  flex-grow: 1;
}

.file-detail {
  width: 300px;
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
</style>
