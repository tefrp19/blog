<template>
  <div class="bucket-content">
    <template v-if="isBucketList">
      <!--      <zr-query-form :leftSpan="23" :rightSpan='1'>-->
      <!--        <template #left>-->
      <!--          <el-input-->
      <!--              v-model='queryParams.name'-->
      <!--              placeholder='搜索文件库'-->
      <!--              clearable-->
      <!--              :suffix-icon="Search"-->
      <!--          />-->
      <!--        </template>-->
      <!--        <template #right>-->
      <!--          <el-button><span class="iconfont icon-refresh1"></span></el-button>-->
      <!--        </template>-->
      <!--      </zr-query-form>-->
      <vxe-table
        border
        show-header-overflow
        show-overflow
        :row-config="{ isHover: true }"
        :row-class-name="rowClassName"
        :data="tableData"
        @cell-click="cellClickEvent"
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
            <span>Card name</span>
            <div>
              <el-button class="button" text :icon="RefreshRight">刷新</el-button>
              <el-button class="button" text :icon="Upload">上传</el-button>
            </div>
          </div>
        </template>

        <vxe-table
          border
          show-header-overflow
          show-overflow
          :row-config="{ isHover: true }"
          :row-class-name="rowClassName"
          :data="tableData"
          @cell-click="cellClickEvent"
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
      </el-card>
    </template>
  </div>
</template>

<script setup lang="ts">
// import ZrQueryForm from "@/components/zr/ZrQueryForm/src/ZrQueryForm.vue";
import { RefreshRight, Search, Upload } from "@element-plus/icons-vue"
import { reactive, ref, toRefs } from "vue"
import { VxeTableEvents, VxeTablePropTypes } from "vxe-table"
import { useRouter } from "vue-router"

const isBucketList = ref(true) // 是否是文件库列表页
const state = reactive({
  queryParams: {
    name: ""
  },
  psizeAccess: 10,
  psizeNum: 1 //分页
})
const { queryParams, psizeAccess, psizeNum } = toRefs(state)
const router = useRouter()

interface RowVO {
  id: number
  name: string
  objects: number
  size: string
  access: string
}

const tableData = ref<RowVO[]>([
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

const rowClassName: VxeTablePropTypes.RowClassName<RowVO> = ({ rowIndex }) => {
  return "row-green"
}
const cellClickEvent: VxeTableEvents.CellClick<RowVO> = ({ column }) => {
  console.log(`单元格点击${column.title}`)
  isBucketList.value = false
}

function refreshDataPsize() {}
</script>

<style scoped>
::v-deep(.vxe-table .vxe-body--row.row-green) {
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
