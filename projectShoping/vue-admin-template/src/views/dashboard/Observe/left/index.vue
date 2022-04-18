<!--
 * @Author: WenBin
 * @Date: 2022-04-18 16:38:00
 * @LastEditTime: 2022-04-18 17:27:08
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Observe\left\index.vue
 * @ascription 3xData
-->
<template>
  <div class='left'>
    <el-card>
      <div slot="header">
        <div class="left-header">
          <span>线上热门搜索</span>
          <i class="el-icon-more"></i>
        </div>
      </div>
      <!-- lineCharts -->
      <lineCharts/>
    </el-card>
  </div>
</template>

<script>
import lineCharts from './lineCharts'
export default {
  // 组件名称
  name: 'left',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: { lineCharts },
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
  },
}
</script> 

<style scoped lang="scss">
.left {
  .left-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
