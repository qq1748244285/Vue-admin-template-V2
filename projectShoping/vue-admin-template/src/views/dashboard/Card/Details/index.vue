<!--
 * @Author: WenBin
 * @Date: 2022-04-17 21:01:44
 * @LastEditTime: 2022-04-18 10:07:02
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\card\Details\index.vue
 * @ascription 3xData
-->
<template>
  <div class='Details'>
    <div class="card-header card-item">
      <span>{{title}}</span>
      <i>
        <svg t="1650200763547" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1256" width="16" height="16">
          <path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="1257" fill="#d9d9d9"></path>
        </svg>
      </i>
    </div>
    <div class="card-content card-item">
      <span>{{count}}</span>
    </div>
    <div class="card-charts card-item-charts">
      <slot name="charts">
        <!-- 插槽 -->
      </slot>
    </div>
    <div class="card-footer card-item">
      <slot name="footer">
        <!-- 插槽 -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Details',
  // 组件参数 接收来自父组件的数据
  props: {
    title: {
      default: "",
      type: String
    },
    count: {
      default: "",
      type: String
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
.Details {
  .card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
    font-size: 18px;
    margin-bottom: 5px;
  }
  .card-content {
    font-size: 30px;
    padding: 10px 0;
  }
  .card-charts {
    height: 50px;
  }
  .card-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
  }
  .card-item-charts{
    margin-bottom: 15px;
  }
}
</style>
