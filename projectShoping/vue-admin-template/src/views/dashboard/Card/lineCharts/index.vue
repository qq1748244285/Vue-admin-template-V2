<!--
 * @Author: WenBin
 * @Date: 2022-04-18 09:40:58
 * @LastEditTime: 2022-04-18 14:23:17
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Card\lineCharts\index.vue
 * @ascription 3xData
-->
<template>
  <div ref="charts" class='lineCharts'>

</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  // 组件名称
  name: 'lineCharts',
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
    let lineCharts = echarts.init(this.$refs.charts);
    //配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'line',
          data: [10,7,33,12,48,9,29,10,44],
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color: 'purple'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'purple' // 0% 处的颜色
              }, {
                offset: 1, color: 'white' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
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
    })
  
  },
}
</script> 

<style lang="scss" scoped>
.lineCharts {
  width: 100%;
  height: 100%;
}
</style>
