<!--
 * @Author: WenBin
 * @Date: 2022-04-18 09:40:58
 * @LastEditTime: 2022-04-18 10:11:43
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\card\barCharts\index.vue
 * @ascription 3xData
-->
<template>
  <div ref="barCharts" class='barCharts'>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  // 组件名称
  name: 'barCharts',
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
    let lineCharts = echarts.init(this.$refs.barCharts);
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
          type: 'bar',
          data: [100, 37, 133, 212, 148, 209, 129, 110, 44, 103, 111, 122],
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
.barCharts {
  width: 100%;
  height: 100%;
}
</style>
