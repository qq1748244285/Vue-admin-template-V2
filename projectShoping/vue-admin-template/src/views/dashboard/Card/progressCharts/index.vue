<!--
 * @Author: WenBin
 * @Date: 2022-04-18 09:40:58
 * @LastEditTime: 2022-04-18 10:44:06
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\card\progressCharts\index.vue
 * @ascription 3xData
-->
<template>
  <div ref="progressCharts" class='progressCharts'>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  // 组件名称
  name: 'progressCharts',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  created() {
  },
  mounted() {
    //初始化charts实例
    let progressCharts = echarts.init(this.$refs.progressCharts);
    //配置数据
    progressCharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          color: 'cyan',
          barWidth: 10,
          color: 'yellowgreen',
          showBackground: true,
          backgroundStyle: {
            color: '#eee'
          },
          label: {
            show: true,
            formatter: '|',
            position: "right"
          }

        },
      ],
      //布局
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      //提示信息
      tooltip: {},
    })
  },
}
</script> 

<style lang="scss" scoped>
.progressCharts {
  width: 100%;
  height: 100%;
}
</style>
