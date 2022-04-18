<!--
 * @Author: WenBin
 * @Date: 2022-04-18 14:21:25
 * @LastEditTime: 2022-04-18 15:27:25
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Sale\LeftCharts\index.vue
 * @ascription 3xData
-->

<template>
  <div class='LeftCharts' ref="LeftCharts"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  // 组件名称
  name: 'LeftCharts',
  // 组件参数 接收来自父组件的数据
  props: {
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {}
  },
  // 计算属性
  computed: {

  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {},
  created() {
  },
  mounted() {
    //挂载charts
    //初始化charts实例

  },
  methods: {
    init(option) {
      //初始化charts实例
      let LeftCharts = echarts.init(this.$refs.LeftCharts);
      LeftCharts.setOption(option);
    }
  }
}
</script> 

<style scoped lang="scss">
.LeftCharts {
  width: 100%;
  height: 300px;
}
</style>
