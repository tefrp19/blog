<template>
  <el-scrollbar class="dashBoardScrollbars">
    <el-row>
      <el-col :span="12">
        <el-card>
          <div class="echartDiv" id="chart1"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="echartDiv" id="chart2"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card>
          <div class="echartDiv1" id="chart3"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="echartDiv1" id="chart4"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="echartDiv1" id="chart5"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>服务器活动</span>
            </div>
          </template>
          <div class='runningCon'>
            <el-tabs
                v-model="activeName"
                class="demo-tabs"
                @tab-click="handleClick"
            >
              <el-tab-pane label="Sessions" name="first">
                <el-card class="serrestable">
                  <el-scrollbar class="dashBoardScrollbarsDown">
                    <VxeTable :tableProps="tableProps" @page-change="pageChange"/>
                  </el-scrollbar>
                </el-card>
              </el-tab-pane>
              <el-tab-pane label="Locks" name="second">Config</el-tab-pane>
              <el-tab-pane label="Prepared Transactions" name="third">Role</el-tab-pane>
              <el-tab-pane label="Configuration" name="fourth">Task</el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>
</template>

<script setup lang='ts'>
import {onMounted, toRefs, ref, reactive, watch, onBeforeUnmount} from 'vue';
import * as echarts from 'echarts/core';
import {VxeTable} from "../../vxeTable/index";
import {listTableDatasSessions} from "@/api/dataServer/dbOperate";
import {dashBoardTableColumns, dataDashBord} from "@/components/zr/dataServer/src/assemblyPublic";
const props = defineProps<{
  editConfig: any
}>()
const timer = ref()
const parent: any = ref(props.editConfig)
const tableProps = reactive({
  tableData: [] as any[],
  tableColumn: [] as any,
  total: 0,
  enabled: false,
  ifPager: true,
  heightNum: 400,
  pagerType: 'handMovement',
})
watch(()=>[props.editConfig.storey,props.editConfig.functionName,props.editConfig.dbConnectionId],(newVal, oldVal)=>{
  clearTimeout(timer.value)
  timer.value=""
  console.log("111111111111")
  if (props.editConfig.storey===3 || props.editConfig.storey===5){
    getTableData()
    //dataDash1()
  }
})
const state = reactive({
  activeName: 'first',
  storey: 0,
  pageSize: 20,
  pageNum: 1,
})

const {activeName} = toRefs(state)
/**
 *生成仪表盘-------待简化
 **/
function dataDash1() {
  let myChart1 = echarts.init(document.getElementById('chart1') as HTMLElement);
  let myChart2 = echarts.init(document.getElementById('chart2') as HTMLElement);
  let myChart3 = echarts.init(document.getElementById('chart3') as HTMLElement);
  let myChart4 = echarts.init(document.getElementById('chart4') as HTMLElement);
  let myChart5 = echarts.init(document.getElementById('chart5') as HTMLElement);
  timer.value = dataDashBord(myChart1,myChart2,myChart3,myChart4,myChart5,timer.value)
}
/**
 *获取后端接口数据
 **/
async function getTableData() {
  if (parent.value.dbConnectionId!==-1){
    tableProps.tableColumn = await dashBoardTableColumns()
    await listTableDatasSessions(parent.value.dbName,parent.value.dbConnectionId).then(({data}) => {
      tableProps.total = data.length
      data.forEach(item=>{
        item.wait_event = item.wait_event_type + ':' + item.wait_event
      })
      tableProps.tableData = data
    });
  }
}
/**
 * 分页
 **/
function pageChange(val) {
  state.pageNum = val.currentPage
  state.pageSize = val.pageSize
  getTableData()
}
onMounted(() => {
})
onBeforeUnmount(()=>{
  clearTimeout(timer.value)
})
</script>
