<!--
 * @Author: WenBin
 * @Date: 2022-04-10 18:01:46
 * @LastEditTime: 2022-04-10 18:31:12
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\components\tipsButton\index.vue
 * @ascription 3xData
-->
<template>
  <a style="margin:10px" :title="title">
    <el-button v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </el-button>
  </a>
</template>

<script>
export default {
  // 组件名称
  name: 'tipsButton',
  // 组件参数 接收来自父组件的数据
  props: { 
      title:{
          type:String,
          default:""
      }
  },
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
  },
}
</script> 

<style scoped lang="scss"> 
</style>
