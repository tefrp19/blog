<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref } from "vue";
import { EChartsOption, EChartsType } from "echarts";
import { MarkerStatisticType } from "echarts/types/src/component/marker/MarkerModel";

let chart: null | EChartsType = null;
const chartRef = ref();
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
      scale: true,
      axisLabel: {
        formatter: "{value} Hz"
      },
      min: null,
      max: null
    },
    {
      name: "长度",
      scale: true,
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
};
onMounted(() => {
  const mockData1 = [];
  const mockData2 = [];
  for (let i = 0; i < 100; i++) {
    mockData1.push([Math.random() * 1000, Math.random() * 1000]);
    mockData2.push([Math.random() * 500, Math.random() * 500]);
  }
  chart = echarts.init(chartRef.value);
  mockData1.sort((a, b) => b[0] - a[0]);
  mockData2.sort((a, b) => b[0] - a[0]);

  chartOption.series[0].data = mockData1;
  chartOption.series[1].data = mockData2;
  chartOption.series[0].color = leftColor.value;
  chartOption.series[1].color = rightColor.value;
  chart.setOption(chartOption);
});

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
  yAxisNames:{
    leftYAxisName: "频率",
    rightYAxisName: "长度",
  }
});

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
];
// 改变图表类型
const chartTypeOptionChange = (value: "line" | "curve" | "scatter") => {
  switch (value) {
    case "line": {
      chartOption.series[0].type = "line";
      chartOption.series[0].smooth = false;
      chartOption.series[1].type = "line";
      chartOption.series[1].smooth = false;
      break;
    }
    case "curve": {
      chartOption.series[0].type = "line";
      chartOption.series[0].smooth = true;
      chartOption.series[1].type = "line";
      chartOption.series[1].smooth = true;
      break;
    }
    case "scatter": {
      chartOption.series[0].type = "scatter";
      chartOption.series[1].type = "scatter";
      break;
    }
  }
  chart?.setOption(chartOption);
};

interface switchItemType {
  type: Exclude<MarkerStatisticType, "median">; // 从联合类型中排除一个类型
  name: string;
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
];

// 设置图表标线
const handleDisplayMarkLineChange = (type: MarkerStatisticType, checked: boolean) => {
  if (checked) {
    chartOption.series[0].markLine.data.push({ type, name: switchList.find((item) => item.type === type)?.name });
    chartOption.series[1].markLine.data.push({ type, name: switchList.find((item) => item.type === type)?.name });
  } else {
    chartOption.series[0].markLine.data = chartOption.series[0].markLine.data.filter((item: any) => item.type !== type);
    chartOption.series[1].markLine.data = chartOption.series[1].markLine.data.filter((item: any) => item.type !== type);
  }
  chart?.setOption(chartOption);
};

// 改变图表标题
const handleChartTitleChange = () => {
  chartOption.title.text = userOption.chartTitle;
  chart?.setOption(chartOption);
};

const leftColor = ref("#1e90ff");
const rightColor = ref("#90ee90");
const predefineColors = ref(["#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585"]);

// 改变图标颜色
const handleLeftColorChange = () => {
  chartOption.series[0].color = leftColor.value;
  chart?.setOption(chartOption);
};
const handleRightColorChange = () => {
  chartOption.series[1].color = rightColor.value;
  chart?.setOption(chartOption);
};

// 改变各轴值域
const xAxisMin = ref<null | number>(null);
const xAxisMax = ref<null | number>(null);
const handleXAxisMinChange = (value: string) => {
  chartOption.xAxis.min = +value;
  chart?.setOption(chartOption);
};
const handleXAxisMaxChange = (value: string) => {
  chartOption.xAxis.max = +value;
  chart?.setOption(chartOption);
};
const leftYAxisMin = ref<null | number>(null);
const leftYAxisMax = ref<null | number>(null);
const handleLeftYAxisMinChange = (value: string) => {
  chartOption.yAxis[0].min = +value;
  chart?.setOption(chartOption);
};
const handleLeftYAxisMaxChange = (value: string) => {
  chartOption.yAxis[0].max = +value;
  chart?.setOption(chartOption);
};
const rightYAxisMin = ref<null | number>(null);
const rightYAxisMax = ref<null | number>(null);
const handleRightYAxisMinChange = (value: string) => {
  chartOption.yAxis[1].min = +value;
  chart?.setOption(chartOption);
};
const handleRightYAxisMaxChange = (value: string) => {
  chartOption.yAxis[1].max = +value;
  chart?.setOption(chartOption);
};

// 改变图例名称
const handLeftYAxisLegendNameChange = (value: string) => {
  chartOption.series[0].name = value;
  chart?.setOption(chartOption);
};
const handRightYAxisLegendNameChange = (value: string) => {
  chartOption.series[1].name = value;
  chart?.setOption(chartOption);
};

// 改变y轴名称
const handLeftYAxisNameChange = (value: string) => {
  chartOption.yAxis[0].name = value;
  chart?.setOption(chartOption);
};
const handRightYAxisNameChange = (value: string) => {
  chartOption.yAxis[1].name = value;
  chart?.setOption(chartOption);
};


</script>

<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="left">
          <el-form label-width="120px">
            <el-form-item label="图表类型：">
              <el-select v-model="userOption.chartType" placeholder="Select" @change="chartTypeOptionChange">
                <el-option v-for="item in chartTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
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
              <el-input v-model="xAxisMin" placeholder="最小值" class="number-input" @change="handleXAxisMinChange" />
              至
              <el-input v-model="xAxisMax" placeholder="最大值" class="number-input" @change="handleXAxisMaxChange" />
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
              <el-input v-model="userOption.legendNames.leftYAxisLegendName" @input="handLeftYAxisLegendNameChange" />
            </el-form-item>
            <el-form-item label="右侧y轴图例名称：" label-width="auto">
              <el-input v-model="userOption.legendNames.rightYAxisLegendName" @input="handRightYAxisLegendNameChange" />
            </el-form-item>
            <el-form-item label="左侧y轴名称：" label-width="auto">
              <el-input v-model="userOption.yAxisNames.leftYAxisName" @input="handLeftYAxisNameChange" />
            </el-form-item>
            <el-form-item label="右侧y轴名称：" label-width="auto">
              <el-input v-model="userOption.yAxisNames.rightYAxisName" @input="handRightYAxisNameChange" />
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right" ref="chartRef" />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.container {
  border: #000 solid 1px;
  margin: 10px auto;
  width: 100%;
  height: 100%;
}

.left,
.right {
  border: #000 solid 1px;
  height: 800px;
  padding: 20px 10px;
}

.right {
  border: #000 solid 1px;
  height: 800px;
}

.number-input {
  width: 100px;
  margin: 0 10px;
}
</style>
