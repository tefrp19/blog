<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, reactive, ref } from "vue";

let chart;
const chartRef = ref();
const chartOption = reactive({
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
  tooltip: {},
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
      }
    }
  },
  brush: {},
  xAxis: {

  },
  yAxis: [
    {
      scale: true,
      axisLabel: {
        formatter: "{value} Hz"
      },
      splitLine: {
        show: true
      }
    },
    {
      scale: true,
      axisLabel: {
        formatter: "{value} mm"
      },
      splitLine: {
        show: true
      }
    }
  ],
  series: [
    {
      name: "aaa",
      type: "scatter",
      data: [
        [10, 40],
        [50, 100],
        [40, 20]
      ],
      smooth: false,
      markLine: {
        data: []
      }
    }
  ]
});
onMounted(() => {
  const mockData = [];
  for (let i = 0; i < 1000; i++) {
    mockData.push({
      unit: "Hz",
      xValue: Math.random() * 1000,
      yValue: Math.random() * 1000
    });
  }
  chart = echarts.init(chartRef.value);
  chartOption.xAxis.data = [...new Set(mockData.map(item => item.xValue))]; // 去重
  chartOption.series[0].data = mockData.map(item => item.yValue);
  // chartOption.series[0].data = mockData.map(item => [item.xValue,item.yValue]);
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
  chartTitle: "图表默认标题"
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
const chartTypeOptionChange = (value) => {
  switch (value) {
    case "line": {
      chartOption.series[0].type = "line";
      chartOption.series[0].smooth = false;
      break;
    }
    case "curve": {
      chartOption.series[0].type = "line";
      chartOption.series[0].smooth = true;
      break;
    }
    case "scatter": {
      chartOption.series[0].type = "scatter";
      break;
    }
  }
  chart.setOption(chartOption);
};

const switchList = [
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
const handleDisplayMarkLineChange = (type, checked: boolean) => {
  if (checked) {
    console.log(1);
    chartOption.series[0].markLine.data.push({ type, name: switchList.find(item => item.type === type)?.name });
  } else {
    chartOption.series[0].markLine.data = chartOption.series[0].markLine.data.filter(item => item.type !== type);
  }
  chart.setOption(chartOption);
};

// 改变图表标题
const handleChartTitleChange = () => {
  chartOption.title.text = userOption.chartTitle;
  chart.setOption(chartOption);
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
                <el-option
                  v-for="item in  chartTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item v-for="item in switchList" :label="`显示${item.name}：`">
              <el-switch v-model="userOption.displayMarkLine[item.type]"
                         @change="handleDisplayMarkLineChange(item.type,$event)" />
            </el-form-item>
            <el-form-item label="图表标题名称：">
              <el-input v-model="userOption.chartTitle" @input="handleChartTitleChange" />
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

.left, .right {
  border: #000 solid 1px;
  height: 800px;
  padding: 20px 10px;
}

.right {
  border: #000 solid 1px;
  height: 800px;
}
</style>
