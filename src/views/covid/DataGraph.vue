<template lang="">
  <!-- <div :id="barChart" :class="className" :style="{ height: height, width: width }" /> -->
  <div :id="id" class="dataChart"></div>
</template>
<script>
import * as echarts from "echarts";
import { Component, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";

export default {
  //   components: {
  //     BarChart,
  //   },
  props: {
    xAxisData: Array,

    yAxisData: Array,
    id: String,
    title: String,
    color: String,
  },
  data() {
    return {
      className: "chart",

      width: "800px",
      height: "500px",
    };
  },
  mounted() {
    this.initChart();
  },

  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      var dom = document.getElementById(this.id);
      var myChart = echarts.init(dom, null, {
        renderer: "canvas",
        useDirtyRect: false,
      });
      var app = {};

      var option;

      option = {
        color: this.color,
        xAxis: {
          type: "category",
          data: this.xAxisData,
          inverse: true,
        },
        yAxis: {
          type: "value",
        },
        title: {
          text: this.title,
        },
        tooltip: {
          trigger: "axis",
        },
        series: [
          {
            data: this.yAxisData,
            type: "line",
            smooth: true,
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option);
      }

      window.addEventListener("resize", myChart.resize);
    },
  },
  watch: {
    xAxisData: {
      handler() {
        this.initChart();
      },
      //   immediate: true,
    },
  },
};
</script>
<style lang="scss">
.dataChart {
  width: 800px;
  height: 500px;
}

@media (max-width: 1000px) {
  .dataChart {
    width: 600px;
    height: 375px;
  }
}
@media (max-width: 700px) {
  .dataChart {
    width: 270px;
    height: 240px;
  }
}
</style>
