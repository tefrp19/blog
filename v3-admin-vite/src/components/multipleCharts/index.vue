<script setup lang="ts">
import { reactive, ref } from "vue"
import { FormInstance, FormRules } from "element-plus"
// import { getDealTableColumns } from "@/api/metadata_data"
import * as echarts from "echarts"
import { EChartsType } from "echarts"
import { MarkerStatisticType } from "echarts/types/src/component/marker/MarkerModel"

const props = defineProps({
  nodeId: {
    type: String
  }
})
// 表格中一列数据对应一个轴上数据

const dialogVisible = ref(false)
const form = ref({
  xAxis: "",
  yAxis: [],
  dataLength: 100
})
// {xAxis:string,yAxis:string[]}
const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  xAxis: [
    {
      required: true,
      message: "选择x轴数据",
      trigger: "change"
    }
  ],
  yAxis: [
    {
      required: true,
      message: "选择y轴数据",
      trigger: "change"
    }
  ]
})

interface optionType {
  value: string
  label: string
}

const options = ref<optionType[]>([])

// 获取下拉框中的option（表格中的表头数据）
const loadSelectOptions = async () => {
  // console.log(props.nodeId)
  // const res = await getDealTableColumns(props.nodeId as string)
  // console.log(res)
  // options.value = res.data.map((item) => {
  //   return {
  //     value: item.field,
  //     label: item.label
  //   }
  // })
  options.value = [
    {
      value: "column1",
      label: "列1"
    },
    {
      value: "column2",
      label: "列2"
    },
    {
      value: "column3",
      label: "列3"
    }
  ]
}
const showDialog = () => {
  dialogVisible.value = true
  loadSelectOptions()
}

// 生成图表
const createChart = async () => {
  await formRef.value?.validate((valid) => {
    if (!valid) return
    // 得到表头列的字段名
    console.log("x轴", form.value.xAxis)
    console.log("y轴", form.value.yAxis)
    console.log("数据量", form.value.dataLength)
    console.log("nodeId", props.nodeId)
    //  请求后端接口获取图表数据

    initChart()
  })
}

let chart: null | EChartsType = null
const chartRef = ref()
const chartOption: any = {
  title: {
    text: "图表默认标题",
    left: "center"
  },
  grid: {
    left: "3%",
    right: "7%",
    bottom: "7%",
    containLabel: true
  },
  tooltip: {
    axisPointer: {
      show: true,
      type: "cross",
      lineStyle: {
        type: "dashed",
        width: 1
      }
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        title: {
          zoom: "区域缩放",
          back: "区域缩放还原"
        }
      },
      brush: {
        type: ["rect", "polygon", "clear"],
        title: {
          rect: "矩形选择",
          polygon: "圈选",
          clear: "清除选择"
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
    bottom: 10
  },
  xAxis: {
    name: "重量",
    type: "value",
    nameLocation: "middle",
    nameTextStyle: {
      color: "#000",
      fontSize: 22
    },
    min: null,
    max: null,
    axisLabel: {
      formatter: "{value} g"
    }
  },
  // todo 1. 设置legend名称
  // todo 2. 设置x、y轴名称
  // todo 3. 导出图表为jpg
  // todo 4. x、y轴数据转成对数（按钮）
  //  newData=Math.log(oldData) / Math.log(10) oldData为100取对数后newData为2
  yAxis: [
    {
      name: "频率",
      type: "value",
      scale: true,
      nameLocation: "middle",
      nameTextStyle: {
        color: "#000",
        fontSize: 22
      },
      axisLabel: {
        formatter: "{value} Hz"
      },
      min: null,
      max: null
    },
    {
      name: "长度",
      scale: true,
      type: "value",
      nameLocation: "middle",
      nameTextStyle: {
        color: "#000",
        fontSize: 22
      },
      axisLabel: {
        formatter: "{value} mm"
      },
      min: null,
      max: null
    }
  ],
  series: [
    {
      name: "aaa",
      type: "scatter",
      color: "",
      data: [],
      smooth: false,
      yAxisIndex: 0,
      markLine: {
        data: []
      }
    },
    {
      name: "bbb",
      type: "scatter",
      color: "",
      data: [],
      smooth: false,
      yAxisIndex: 1,
      markLine: {
        data: []
      }
    }
  ]
}

const initChart = () => {
  // 模拟y=lg(x)
  // 数据格式：[[1,0],[10,1],[100,2],[1000,3]]
  type point = [number, number]
  type mockDataType = point[]
  const data: mockDataType = []
  for (let i = 0; i < 100; i++) {
    const point: point = [Math.pow(10, i), i]
    data.push(point)
  }
  const mockData1: mockDataType = []
  const mockData2: mockDataType = []
  for (let i = 0; i < 100; i++) {
    mockData1.push([Math.random() * 1000, Math.random() * 1000])
    mockData2.push([Math.random() * 500, Math.random() * 500])
  }
  chart = echarts.init(chartRef.value)
  mockData1.sort((a, b) => b[0] - a[0])
  mockData2.sort((a, b) => b[0] - a[0])

  // console.log("mockData1", mockData1);
  chartOption.series[0].data = data
  chartOption.series[1].data = mockData2
  chartOption.series[0].color = leftColor.value
  chartOption.series[1].color = rightColor.value
  chart.setOption(chartOption)
}
// 左列用户可选的图表配置项
const userOption = reactive({
  chartType: "scatter", // 折线图、曲线图、散点图
  displayMarkLine: {
    min: false, // 是否展示数据最小值线
    max: false, // 是否展示数据最大值线
    average: false // 是否展示数据平均值线
  },
  chartTitle: "图表默认标题",
  legendNames: {
    leftYAxisLegendName: "aaa",
    rightYAxisLegendName: "bbb"
  },
  axisNames: {
    leftYAxisName: "频率",
    rightYAxisName: "长度",
    xAxisName: "重量"
  }
})

const chartTypeOptions = [
  {
    label: "折线图",
    value: "line"
  },
  {
    label: "曲线图",
    value: "curve"
  },
  {
    label: "散点图",
    value: "scatter"
  }
]
// 改变图表类型
const chartTypeOptionChange = (value: "line" | "curve" | "scatter") => {
  switch (value) {
    case "line": {
      chartOption.series[0].type = "line"
      chartOption.series[0].smooth = false
      chartOption.series[1].type = "line"
      chartOption.series[1].smooth = false
      break
    }
    case "curve": {
      chartOption.series[0].type = "line"
      chartOption.series[0].smooth = true
      chartOption.series[1].type = "line"
      chartOption.series[1].smooth = true
      break
    }
    case "scatter": {
      chartOption.series[0].type = "scatter"
      chartOption.series[1].type = "scatter"
      break
    }
  }
  chart?.setOption(chartOption)
}

interface switchItemType {
  type: Exclude<MarkerStatisticType, "median"> // 从联合类型中排除一个类型
  name: string
}

const switchList: switchItemType[] = [
  {
    type: "min",
    name: "最小值"
  },
  {
    type: "max",
    name: "最大值"
  },
  {
    type: "average",
    name: "平均值"
  }
]

// 设置图表标线
const handleDisplayMarkLineChange = (type: MarkerStatisticType, checked: boolean) => {
  if (checked) {
    chartOption.series[0].markLine.data.push({ type, name: switchList.find((item) => item.type === type)?.name })
    chartOption.series[1].markLine.data.push({ type, name: switchList.find((item) => item.type === type)?.name })
  } else {
    chartOption.series[0].markLine.data = chartOption.series[0].markLine.data.filter((item: any) => item.type !== type)
    chartOption.series[1].markLine.data = chartOption.series[1].markLine.data.filter((item: any) => item.type !== type)
  }
  chart?.setOption(chartOption)
}

// 改变图表标题
const handleChartTitleChange = () => {
  chartOption.title.text = userOption.chartTitle
  chart?.setOption(chartOption)
}

const leftColor = ref("#1e90ff")
const rightColor = ref("#90ee90")
const predefineColors = ref(["#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585"])

// 改变图标颜色
const handleLeftColorChange = () => {
  chartOption.series[0].color = leftColor.value
  chart?.setOption(chartOption)
}
const handleRightColorChange = () => {
  chartOption.series[1].color = rightColor.value
  chart?.setOption(chartOption)
}

// 改变各轴值域
const xAxisMin = ref<null | number>(null)
const xAxisMax = ref<null | number>(null)
const handleXAxisMinChange = (value: string) => {
  chartOption.xAxis.min = +value
  chart?.setOption(chartOption)
}
const handleXAxisMaxChange = (value: string) => {
  chartOption.xAxis.max = +value
  chart?.setOption(chartOption)
}
const leftYAxisMin = ref<null | number>(null)
const leftYAxisMax = ref<null | number>(null)
const handleLeftYAxisMinChange = (value: string) => {
  chartOption.yAxis[0].min = +value
  chart?.setOption(chartOption)
}
const handleLeftYAxisMaxChange = (value: string) => {
  chartOption.yAxis[0].max = +value
  chart?.setOption(chartOption)
}
const rightYAxisMin = ref<null | number>(null)
const rightYAxisMax = ref<null | number>(null)
const handleRightYAxisMinChange = (value: string) => {
  chartOption.yAxis[1].min = +value
  chart?.setOption(chartOption)
}
const handleRightYAxisMaxChange = (value: string) => {
  chartOption.yAxis[1].max = +value
  chart?.setOption(chartOption)
}

// 改变图例名称
const handLeftYAxisLegendNameChange = (value: string) => {
  chartOption.series[0].name = value
  chart?.setOption(chartOption)
}
const handRightYAxisLegendNameChange = (value: string) => {
  chartOption.series[1].name = value
  chart?.setOption(chartOption)
}

// 改变各轴名称
const handLeftYAxisNameChange = (value: string) => {
  chartOption.yAxis[0].name = value
  chart?.setOption(chartOption)
}
const handRightYAxisNameChange = (value: string) => {
  chartOption.yAxis[1].name = value
  chart?.setOption(chartOption)
}
const handXAxisNameChange = (value: string) => {
  chartOption.xAxis.name = value
  chart?.setOption(chartOption)
}

// 对各轴取对数
const xAxisLogarithmic = () => {
  chartOption.xAxis.type = "log"
  chart?.setOption(chartOption)
}
const leftYAxisLogarithmic = () => {
  chartOption.yAxis[0].type = "log"
  chart?.setOption(chartOption)
}
const rightYAxisLogarithmic = () => {
  chartOption.yAxis[1].type = "log"
  chart?.setOption(chartOption)
}
</script>

<template>
  <div>
    <el-button type="primary" @click="showDialog" style="margin-right: 12px"> 可视化 </el-button>

    <el-dialog v-model="dialogVisible" title="外部对话框" width="90vw" top="5vh" append-to-body>
    <template #default>
      <el-card>
        <el-form :inline="true" :model="form" ref="formRef" :rules="rules">
          <el-form-item label="x轴数据：" prop="xAxis" label-width="auto" required>
            <el-select v-model="form.xAxis" class="m-2" placeholder="选择表格列" size="large">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="y轴数据：" prop="yAxis" label-width="auto" required>
            <el-select multiple v-model="form.yAxis" placeholder="选择表格列" size="large">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="数据量：" label-width="auto">
            <el-input-number v-model="form.dataLength" :min="1" :max="1000" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createChart">生成可视化图表</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card>
              <el-form label-width="120px">
                <el-form-item label="图表类型：">
                  <el-select v-model="userOption.chartType" placeholder="Select" @change="chartTypeOptionChange">
                    <el-option
                      v-for="item in chartTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item v-for="item in switchList" :label="`显示${item.name}：`">
                  <el-switch
                    v-model="userOption.displayMarkLine[item.type]"
                    @change="handleDisplayMarkLineChange(item.type, $event as boolean)"
                  />
                </el-form-item>
                <el-form-item label="图表标题名称：">
                  <el-input v-model="userOption.chartTitle" @input="handleChartTitleChange" />
                </el-form-item>
                <el-form-item label="左侧y轴数据颜色：" label-width="auto">
                  <el-color-picker v-model="leftColor" :predefine="predefineColors" @change="handleLeftColorChange" />
                </el-form-item>
                <el-form-item label="右侧y轴数据颜色：" label-width="auto">
                  <el-color-picker v-model="rightColor" :predefine="predefineColors" @change="handleRightColorChange" />
                </el-form-item>
                <el-form-item label="x轴值域：" label-width="auto">
                  <el-input
                    v-model="xAxisMin"
                    placeholder="最小值"
                    class="number-input"
                    @change="handleXAxisMinChange"
                  />
                  至
                  <el-input
                    v-model="xAxisMax"
                    placeholder="最大值"
                    class="number-input"
                    @change="handleXAxisMaxChange"
                  />
                </el-form-item>
                <el-form-item label="左y轴值域：" label-width="auto">
                  <el-input
                    v-model="leftYAxisMin"
                    placeholder="最小值"
                    class="number-input"
                    @change="handleLeftYAxisMinChange"
                  />
                  至
                  <el-input
                    v-model="leftYAxisMax"
                    placeholder="最大值"
                    class="number-input"
                    @change="handleLeftYAxisMaxChange"
                  />
                </el-form-item>
                <el-form-item label="右y轴值域：" label-width="auto">
                  <el-input
                    v-model="rightYAxisMin"
                    placeholder="最小值"
                    class="number-input"
                    @change="handleRightYAxisMinChange"
                  />
                  至
                  <el-input
                    v-model="rightYAxisMax"
                    placeholder="最大值"
                    class="number-input"
                    @change="handleRightYAxisMaxChange"
                  />
                </el-form-item>
                <el-form-item label="左侧y轴图例名称：" label-width="auto">
                  <el-input
                    v-model="userOption.legendNames.leftYAxisLegendName"
                    @input="handLeftYAxisLegendNameChange"
                  />
                </el-form-item>
                <el-form-item label="右侧y轴图例名称：" label-width="auto">
                  <el-input
                    v-model="userOption.legendNames.rightYAxisLegendName"
                    @input="handRightYAxisLegendNameChange"
                  />
                </el-form-item>
                <el-form-item label="左侧y轴名称：" label-width="auto">
                  <el-input v-model="userOption.axisNames.leftYAxisName" @input="handLeftYAxisNameChange" />
                </el-form-item>
                <el-form-item label="右侧y轴名称：" label-width="auto">
                  <el-input v-model="userOption.axisNames.rightYAxisName" @input="handRightYAxisNameChange" />
                </el-form-item>
                <el-form-item label="X轴名称：" label-width="auto">
                  <el-input v-model="userOption.axisNames.xAxisName" @input="handXAxisNameChange" />
                </el-form-item>
                <el-form-item label="y轴取对数：" label-width="auto">
                  <el-button size="small" @click="leftYAxisLogarithmic">左侧y轴取对数</el-button>
                  <el-button size="small" @click="rightYAxisLogarithmic">右侧y轴取对数</el-button>
                </el-form-item>
                <el-form-item label="x轴取对数：" label-width="auto">
                  <el-button size="small" @click="xAxisLogarithmic">x轴取对数</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="18">
            <div class="right" ref="chartRef" />
          </el-col>
        </el-row>
      </el-card>
    </template>
  </el-dialog>
  </div>
</template>

<style scoped>
.container {
  margin: 10px auto;
  height: 100%;
}

.right {
  box-sizing: border-box;
  height: 900px;
  padding: 20px 10px;
}

.number-input {
  width: 80px;
  margin: 0 10px;
}
</style>
