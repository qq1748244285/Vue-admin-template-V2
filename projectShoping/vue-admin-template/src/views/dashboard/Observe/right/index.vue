<!--
 * @Author: WenBin
 * @Date: 2022-04-18 16:38:21
 * @LastEditTime: 2022-04-19 11:43:28
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Observe\right\index.vue
 * @ascription 3xData
-->
<template>
  <div class='right'>
    <el-card>
      <div slot="header" class="header">
        <div class="title">
          <span>销售额类别占比</span>
        </div>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- pieCharts -->
      <div class="PieCharts" ref="PieCharts"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  // 组件名称
  name: 'right',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      value: '全部渠道'
    }
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
    let PieCharts = echarts.init(this.$refs.PieCharts);
    //配置对象
    let option = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: '视频广告',
        subtext: 1048,
        left: 'center',
        top: 'center',
      },
      series: [
        {
          label: {
            show: true,
            formatter: `{b}:{c}`
          },
          name: '访问量数据',
          type: 'pie',
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: [
            { value: 1048, name: '视频广告' },
            { value: 735, name: '联盟广告' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '搜索引擎' },
            { value: 300, name: '直接访问' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    //配置数据
    PieCharts.setOption(option);
    //绑定事件
    PieCharts.on('mouseover', (params) => {
      let { name, value } = params.data;
      option.title.text = name;
      option.title.subtext = value;
      PieCharts.setOption(option);
    }); 
  },
}
</script> 

<style scoped lang="scss">
.right {
  .header {
    height: 41px;
    display: flex;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
    }
  }
  .PieCharts {
    width: 100%;
    height: 550px;
  }
}
</style>
