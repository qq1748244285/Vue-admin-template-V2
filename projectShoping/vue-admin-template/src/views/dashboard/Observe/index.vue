<!--
 * @Author: WenBin
 * @Date: 2022-04-18 16:32:28
 * @LastEditTime: 2022-04-19 09:42:49
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Observe\index.vue
 * @ascription 3xData
-->
<template>
  <div class='Observe'>
    <el-row :gutter="10">
      <el-col :span="12">
        <Left />
      </el-col>
      <el-col :span="12">
        <Right />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Left from './left'
import Right from './right'
export default {
  // 组件名称
  name: 'Observe',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: { Left, Right },
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
.Observe {
  margin: 10px 0;
}
</style>
