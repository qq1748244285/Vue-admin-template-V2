<!--
 * @Author: WenBin
 * @Date: 2022-04-18 16:50:12
 * @LastEditTime: 2022-04-19 13:48:58
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Observe\left\LeftLineCharts\index.vue
 * @ascription 3xData
--> 
<template>
  <div class='LeftLineCharts'>
    <div class="header">
      <span class="text">搜索用户数</span>
      <i>
        <svg t="1650200763547" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1256" width="26" height="26">
          <path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="1257" fill="#d9d9d9"></path>
        </svg>
      </i>
    </div>
    <div class="main">
      <span class="text">12321</span>
      <span>17.1
        <i v-if="true">
          <svg t="1650333965082" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5835" width="16" height="16">
            <path d="M640 608c-6.4 0-19.2 0-25.6-6.4L512 492.8 409.6 601.6c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0l128 128c12.8 12.8 12.8 32 0 44.8C659.2 608 646.4 608 640 608z" p-id="5836" fill="#1afa29"></path>
          </svg>
        </i>
        <i v-else>
          <svg t="1650334253944" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2632" width="16" height="16">
            <path d="M512 608c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 531.2l102.4-102.4c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8l-128 128C531.2 608 518.4 608 512 608z" p-id="2633" fill="#d81e06"></path>
          </svg>
        </i>
      </span>
    </div>
    <div class="footer">
      <!-- 图表 -->
      <div ref="footerCharts" class="footerCharts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  // 组件名称
  name: 'LeftLineCharts',
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
    let footerCharts = echarts.init(this.$refs.footerCharts);
    //配置数据
    footerCharts.setOption({
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
          data: [820, 932, 901, 934, 1290, 1330, 1320,821,1341,1314,520],
          itemStyle: {
            opacity: 0
          },
          lineStyle: {
            color:'yellowgreen'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgb(255, 0, 135)'
              }, {
                offset: 1,
                color: 'rgb(135, 0, 157)'
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

<style lang='scss' scoped>
.LeftLineCharts {
  .header {
    display: flex;
    align-items: center;
    .text {
      margin-right: 20px;
    }
  }
  .main {
    margin-top: 20px;
    .text {
      margin-right: 20px;
      font-size: 25px;
    }
  }
  .footer {
    margin-top: 10px;
    .footerCharts {
      width: 100%;
      height: 100px;
    }
  }
}
</style>
