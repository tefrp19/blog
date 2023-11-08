<template>
<div>
  <el-button style="width: 100px" type="primary" @click="initComponent">
    可视化
  </el-button>

  <el-dialog
      v-model="dialogVisible"
      width="90vw"
      top="2vh"
      append-to-body
      @open="initChart"
      @close="closeDialog"
  >
    <template #header>
      <el-card>
        <el-form :inline="true" :model="form" ref="formRef" :rules="rules">
          <el-form-item label="x轴数据：" prop="xAxis" required>
            <el-select v-model="form.xAxis" placeholder="选择表格列" style="width: 120px">
              <el-option
                  v-for="item in xAxisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="y轴数据：" prop="yAxis" required>
            <el-select multiple collapse-tags collapse-tags-tooltip v-model="form.yAxis" placeholder="选择表格列"
                       style="width: 200px;">
              <el-option
                  v-for="item in yAxisOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="数据量：">
            <el-select v-model="form.dataLength" placeholder="选择数据量" style="width: 100px">
              <el-option v-for="item in dataLengthOptions" :key="item.value" :label="item.label"
                         :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <condition-search-dialog @setConditionQueryParams="setConditionQueryParams"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createChart">生成可视化图表</el-button>
          </el-form-item>
          <el-form-item>
            <el-pagination
                v-if="createdChart"
                v-model:current-page="pagination.pageNum"
                v-model:page-size="form.dataLength"
                layout="total, prev, pager, next"
                :total="pagination.total"
                @current-change="handleCurrentChange"
            />
          </el-form-item>
        </el-form>
      </el-card>
    </template>

    <template #default>
      <el-card class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-scrollbar style="height: 95%">
              <el-card>
                <el-form label-width="120px">
                  <el-form-item label="图表类型：">
                    <el-select v-model="userOption.chartType" placeholder="Select">
                      <el-option v-for="item in chartTypeOptions" :key="item.value" :label="item.label"
                                 :value="item.value"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="标记粗细：">
                    <el-input-number v-model="userOption.symbolSize" :min="1" :max="10"/>
                  </el-form-item>
                  <el-form-item label="显示均值：">
                    <el-switch v-model="userOption.showAverage"/>
                  </el-form-item>
                  <el-form-item label="显示极值：">
                    <el-switch v-model="userOption.showMaxAndMin"/>
                  </el-form-item>
                  <el-form-item label="图表标题名称：">
                    <el-input v-model="userOption.chartTitle"/>
                  </el-form-item>
                  <el-form-item label="X轴标签：">
                    <el-input v-model="userOption.axisNames.xAxisName"/>
                  </el-form-item>
                  <el-form-item label="x轴值域：">
                    <el-input v-model="userOption.axisMinAndMax.xAxisMin" placeholder="最小值" class="number-input"/>
                    至
                    <el-input v-model="userOption.axisMinAndMax.xAxisMax" placeholder="最大值" class="number-input"/>
                  </el-form-item>

                  <el-form-item label="y轴标签：">
                    <el-input v-model="userOption.axisNames.leftYAxisName"/>
                  </el-form-item>
                  <el-form-item label="y轴值域：">
                    <el-input
                        v-model="userOption.axisMinAndMax.leftYAxisMin"
                        placeholder="最小值"
                        class="number-input"
                    />
                    至
                    <el-input
                        v-model="userOption.axisMinAndMax.leftYAxisMax"
                        placeholder="最大值"
                        class="number-input"
                    />
                  </el-form-item>
                  <!--                  <el-form-item label="y2轴名称：" >-->
                  <!--                    <el-input v-model="userOption.axisNames.rightYAxisName" />-->
                  <!--                  </el-form-item>-->
                  <!--                  <el-form-item label="y2轴值域：" >-->
                  <!--                    <el-input-->
                  <!--                        v-model="userOption.axisMinAndMax.rightYAxisMin"-->
                  <!--                        placeholder="最小值"-->
                  <!--                        class="number-input"-->
                  <!--                    />-->
                  <!--                    至-->
                  <!--                    <el-input-->
                  <!--                        v-model="userOption.axisMinAndMax.rightYAxisMax"-->
                  <!--                        placeholder="最大值"-->
                  <!--                        class="number-input"-->
                  <!--                    />-->
                  <!--                  </el-form-item>-->

                  <el-form-item label="x对数坐标轴：">
                    <el-switch v-model="userOption.axisLogarithmic.xAxis"/>
                  </el-form-item>
                  <el-form-item label="y对数坐标轴：">
                    <el-switch v-model="userOption.axisLogarithmic.leftYAxis"/>
                  </el-form-item>
                  <!--                  <el-form-item label="右侧y轴是否取对数：" >-->
                  <!--                    <el-switch v-model="userOption.axisLogarithmic.rightYAxis"/>-->
                  <!--                  </el-form-item>-->

                  <el-form-item label="色系：">
                    <el-checkbox-group v-model="userOption.colorCheckList">
                      <el-checkbox label="黑"/>
                      <el-checkbox label="红"/>
                      <el-checkbox label="橙"/>
                      <el-checkbox label="黄"/>
                      <el-checkbox label="蓝"/>
                      <el-checkbox label="绿"/>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
                <el-button type="primary" style="display: block;margin: 0 auto;width: 120px" @click="setChartOption">
                  设置>>
                </el-button>
              </el-card>
            </el-scrollbar>
          </el-col>
          <el-col :span="18">
            <div class="right" ref="chartRef"/>
          </el-col>
        </el-row>
      </el-card>
    </template>
  </el-dialog>

</div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {ElMessage, ElMessageBox, FormInstance, FormRules} from 'element-plus'
// import {getDealTableColumns, getVisualizationChartData, getVisualizationTableColumn} from "@/api/metadata_data";
import * as echarts from "echarts";
import {EChartsType} from "echarts";
import ConditionSearchDialog from "./conditionSearchDialog.vue";
import {FormItem} from "./index.ts";

const props = defineProps({
  routeUrl: {
    type: String
  },
  tableId: {
    type: String
  },
  tableName: {
    type: String
  },
  searchCondition: {
    type: [] as any
  }
})

const initComponent = () => {
  dialogVisible.value = true
  setSelectOptions()
}

const dialogVisible = ref(false)
const form = ref({
  xAxis: '',
  yAxis: [],
  dataLength: 5000,
})

const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  xAxis: [
    {
      required: true,
      message: '选择x轴数据',
      trigger: 'change',
    },
  ],
  yAxis: [
    {
      required: true,
      message: '选择y轴数据',
      trigger: 'change',
    },
  ],

})

interface optionType {
  value: string,
  label: string,
}

const xAxisOptions = ref<optionType[]>([])
const yAxisOptions = ref<optionType[]>([])

// const
/**
 * 获取下拉框中的option（表格中的表头数据）
 */
const setSelectOptions = async () => {
  // const res = await getVisualizationTableColumn(props.routeUrl as any, props.tableId as string, props.tableName as string)
  const data = {
    xAxis: [
      {
        name: "column1",
        type: "varchar",
      },
      {
        name: "column2",
        type: "int4",
      },
      {
        name: "column3",
        type: "date",
      },
      {
        name: "column4",
        type: "timestamp",
      },
      {
        name: "column5",
        type: "float8",
      },
      {
        name: "column6",
        type: "int8",
      },
    ],
    yAxis: [
      {
        name: "column2",
        type: "int4",
      },
      {
        name: "column5",
        type: "float8",
      },
      {
        name: "column6",
        type: "int8",
      },
    ]
  }
  xAxisOptions.value = data.xAxis.map(item => {
    return {
      value: item.name,
      label: item.name,
    }
  })
  yAxisOptions.value = data.yAxis.map(item => {
    return {
      value: item.name,
      label: item.name,
    }
  })

}

const conditionQueryParams=ref<FormItem[]>([])
const setConditionQueryParams=(value:FormItem[])=>{
  conditionQueryParams.value=value
  console.log("conditionQueryParams.value",conditionQueryParams.value)
}

const dataLengthOptions = ref([
  {
    value: 5000,
    label: "5000",
  },
  {
    value: 10000,
    label: "10000",
  },
  {
    value: 20000,
    label: "20000",
  },
  {
    value: 50000,
    label: "50000",
  },
  {
    value: 200000,
    label: "200000",
  },
])

let chart: null | EChartsType = null;
const chartRef = ref();
const chartOption: any = {
  title: {
    text: "图表默认标题",
    left: "center",
    textStyle: {
      width: 200,
    }
  },
  tooltip: {
    trigger: "axis"
  },
  toolbox: {
    feature: {
      dataZoom: {
        title: {
          zoom: "区域缩放",
          back: "区域缩放还原"
        }
      },
      saveAsImage: {
        show: true,
        title: "保存为图片"
      }
    }
  },
  brush: {},
  legend: {
    left: "center",
    bottom: 10,
  },
  xAxis: {
    name: "",
    nameLocation: "end",
    type: "value",
    min: "dataMin",
    max: "dataMax",
    axisLabel: {
      formatter: "{value}"
    }
  },
  yAxis: [
    {
      name: "",
      type: "value",
      scale: true,
      nameLocation: "end",
      axisLabel: {
        formatter: "{value}"
      },
      min: "dataMin",
      max: "dataMax",
    },
  ],
  series: [
    {
      name: "系列1",
      type: "scatter",
      color: "",
      symbolSize: 3,
      data: [],
      yAxisIndex: 0,
      markPoint: {
        itemStyle: {
          opacity: 0
        },
        data: [
          {
            type: "max",
            name: "最大值",
          },
          {
            type: "min",
            name: "最小值",
          }
        ]
      },
      markLine: {
        precision: 30,
        data: [{
          name: "平均值",
          yAxis: 0,
          lineStyle: {
            opacity: 0
          },
        }]
      }
    },

  ]
};

// 是否加载数据（加载数据后才能绘图）
const loadedData = ref(false)

// 左列用户可选的图表配置项
const userOption = reactive({
  chartType: "scatter", // 折线图、曲线图、散点图
  chartTitle: "图表默认标题",
  symbolSize: 3,
  showAverage: false, // 是否显示均值
  showMaxAndMin: false, // 是否显示极值
  axisNames: { // 各轴标签
    leftYAxisName: "",
    rightYAxisName: "",
    xAxisName: ""
  },
  axisMinAndMax: { // 各轴值域
    xAxisMin: null,
    xAxisMax: null,
    leftYAxisMin: null,
    leftYAxisMax: null,
    rightYAxisMin: null,
    rightYAxisMax: null,
  },
  axisLogarithmic: { // 各轴是否取对数
    xAxis: false,
    leftYAxis: false,
    rightYAxis: false,
  },
  colorCheckList: [] // 系列色系
});

/**
 * 生成图表
 */
const createChart = async () => {
  await formRef.value?.validate(async valid => {
        if (!valid) return
        loadedData.value = true
        pagination.value.pageNum = 1
        await resetChart()

      }
  )
}

/**
 * 重置图表
 */
const resetChart = async () => {
  const queryConditionStr = JSON.stringify(props.searchCondition)
  //  请求后端接口获取图表数据
  let res: any
  try {
    // res = await getVisualizationChartData(props.tableId as string, form.value.xAxis, form.value.yAxis.join(","), pagination.value.pageNum, form.value.dataLength, queryConditionStr)
    res = []
  } catch (e) {
    return
  }
  chart?.clear()

  const {data} = res
  const {leftYAxis, rightYAxis, xAxis, total} = data
  pagination.value.total = total
  chartOption.xAxis.name = chartOption.xAxis.name ? chartOption.xAxis.name : (xAxis.unit ? xAxis.unit : "") // 如果该列没有单位，配置项中xx轴名称也应赋空字符串
  chartOption.yAxis[0].name = chartOption.yAxis[0].name ? chartOption.yAxis[0].name : (leftYAxis[0].unit ? leftYAxis[0].unit : "")
  userOption.axisNames.xAxisName = chartOption.xAxis.name ? chartOption.xAxis.name : (xAxis.unit ? xAxis.unit : "")
  userOption.axisNames.leftYAxisName = chartOption.yAxis[0].name ? chartOption.yAxis[0].name : (leftYAxis[0].unit ? leftYAxis[0].unit : "")
  chartOption.xAxis.type = xAxis.dataType === "varchar" ? "category" : "value"
  const series: any = []
  for (let i = 0; i < leftYAxis.length; i++) {
    const {label, averageValue, data} = leftYAxis[i]
    // 对数坐标轴下的x、y轴坐标不能为0，否则数据显示不完全
    const filterData = data.filter(item => item[0] !== 0 && item[1] !== 0)
    console.log(filterData)
    const existColor = chartOption.series[i]?.color
    const item = {
      large: true,
      name: label,
      type: chartOption.series[0].type,
      symbolSize: chartOption.series[0].symbolSize,
      color: existColor ? existColor : "",
      yAxisIndex: 0,
      markLine: {
        precision: 30,
        data: [{
          name: "平均值",
          yAxis: averageValue,
          lineStyle: {
            opacity: chartOption.series[0].markLine.data[0].lineStyle.opacity
          },
        }]
      },
      markPoint: {
        itemStyle: {
          opacity: chartOption.series[0].markPoint.itemStyle.opacity
        },
        data: [
          {
            type: "max",
            name: "最大值",
          },
          {
            type: "min",
            name: "最小值",
          }
        ]
      },
      data: filterData,
    }

    series.push(item)
  }
  chartOption.series = series


  // todo 双y轴节后再做
  // if (rightYAxis) {
  //   // 设置第2个y轴option
  //   const {data, maxValue, minValue, averageValue} = rightYAxis
  //   userOption.axisNames.rightYAxisName = rightYAxis.label
  //   chartOption.yAxis[1].name = rightYAxis.label
  //   chartOption.series[1].data = data;
  //   chartOption.series[1].color = rightColor.value;
  //   chartOption.yAxis[1].axisLabel.formatter = "{value} " + rightYAxis.unit ? rightYAxis.unit : "";
  //   chartOption.series[1].markLine.data[0] = {name: "最大值", yAxis: maxValue, lineStyle}
  //   chartOption.series[1].markLine.data[1] = {name: "最小值", yAxis: minValue, lineStyle}
  //   chartOption.series[1].markLine.data[2] = {name: "平均值", yAxis: averageValue, lineStyle}
  //   chartOption.legend.data[1].name = "系列2"
  // } else {
  //   // 清空左侧部分表单项
  //   userOption.axisNames.rightYAxisName = ""
  //
  //   // 清空之前的option
  //   chartOption.yAxis[1].name = ""
  //   chartOption.series[1].data = []
  //   chartOption.series[1].markLine.data = []
  //   chartOption.legend.data[1].name = ""
  //
  // }

  createdChart.value = true
  chart?.setOption(chartOption);
}

const createdChart = ref(false) // 是否已点击生成图表按钮，点击按钮有数据后才显示分页
const pagination = ref({
  pageNum: 1,
  total: 99999999
})
/**
 * 分页跳转请求新数据
 */
const handleCurrentChange = async () => {
  resetChart()
}


/**
 * 初始化图表
 */
const initChart = () => {
  chart = echarts.init(chartRef.value);
};

/**
 * 关闭对话框清空表单和图表
 */
const closeDialog = () => {
  form.value.xAxis = ""
  form.value.yAxis = []
  form.value.dataLength = 5000
  createdChart.value = false
  chartOption.title.text = "图表默认标题"
  chartOption.xAxis.name = ""
  chartOption.yAxis[0].name = ""
  chartOption.xAxis.type = "value"
  chartOption.yAxis[0].type = "value"
  chartOption.xAxis.min = "dataMin"
  chartOption.xAxis.max = "dataMax"
  chartOption.yAxis[0].min = "dataMin"
  chartOption.yAxis[0].max = "dataMax"
  //
  userOption.chartTitle = "图表默认标题"
  userOption.axisNames.xAxisName = ""
  userOption.axisNames.leftYAxisName = ""
  userOption.axisMinAndMax.xAxisMin = null
  userOption.axisMinAndMax.xAxisMax = null
  userOption.axisMinAndMax.leftYAxisMin = null
  userOption.axisMinAndMax.leftYAxisMax = null
  userOption.axisLogarithmic.xAxis = false
  userOption.axisLogarithmic.leftYAxis = false
  loadedData.value = false
  chart?.dispose()
}

const chartTypeOptions = [
  {
    label: "曲线图",
    value: "line"
  },
  {
    label: "散点图",
    value: "scatter"
  },
  {
    label: "柱状图",
    value: "bar"
  },
];

// 汉字与颜色的映射
const map = new Map([
  ["黑", "#000"],
  ["红", "#D32F2F"],
  ["橙", "#F57C00"],
  ["黄", "#FFEB3F"],
  ["蓝", "#448AFF"],
  ["绿", "#388E3C"],
])


/**
 * 设置图表配置，将userOption同步到chartOption
 */
const setChartOption = () => {
  // 绘图前进行校验
  // 是否加载数据
  if (!loadedData.value) {
    ElMessage.warning("尚未加载数据")
    return
  }
  console.log(userOption.chartTitle.length)
  console.log(userOption.axisNames)

  // 标题、xy 轴名称是否过长
  const inputTextTooLong = userOption.chartTitle.length > 50 || userOption.axisNames.xAxisName.length > 7 || userOption.axisNames.leftYAxisName.length > 15
  if (inputTextTooLong) {
    ElMessage.warning("图表标题限制50字符，x轴标签限制7字符，y轴标签限制15字符")
    return
  }
  chartOption.title.text = userOption.chartTitle
  chartOption.xAxis.name = userOption.axisNames.xAxisName
  chartOption.yAxis[0].name = userOption.axisNames.leftYAxisName
  chartOption.xAxis.min = userOption.axisMinAndMax.xAxisMin ? userOption.axisMinAndMax.xAxisMin : "dataMin"
  chartOption.xAxis.max = userOption.axisMinAndMax.xAxisMax ? userOption.axisMinAndMax.xAxisMax : "dataMax"
  chartOption.yAxis[0].min = userOption.axisMinAndMax.leftYAxisMin ? userOption.axisMinAndMax.leftYAxisMin : "dataMin"
  chartOption.yAxis[0].max = userOption.axisMinAndMax.leftYAxisMax ? userOption.axisMinAndMax.leftYAxisMax : "dataMax"
  chartOption.xAxis.type = userOption.axisLogarithmic.xAxis ? "log" : "value"
  chartOption.yAxis[0].type = userOption.axisLogarithmic.leftYAxis ? "log" : "value"

  const {series} = chartOption
  for (let i = 0; i < series.length; i++) {
    series[i].type = userOption.chartType
    series[i].symbolSize = userOption.symbolSize
    series[i].markLine.data[0].lineStyle.opacity = userOption.showAverage
    series[i].markPoint.itemStyle.opacity = userOption.showMaxAndMin
    const color = map.get(userOption.colorCheckList[i])
    series[i].color = color ? color : ""
  }

  chart?.setOption(chartOption)
}

</script>

<style scoped>
.container {
  margin: 0 auto;
  height: 75vh;
}

.right {
  box-sizing: border-box;
  height: 70vh;
  padding: 20px 10px;
}

.number-input {
  width: 80px;
  margin: 0 10px;
}
</style>