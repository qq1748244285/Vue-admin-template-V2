<!--
 * @Author: WenBin
 * @Date: 2022-04-18 10:53:52
 * @LastEditTime: 2022-04-18 16:38:37
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Sale\index.vue
 * @ascription 3xData
-->
<template>
  <div class='Sale'>
    <el-card class="box-card">
      <div slot="header" class="card-header">
        <!-- 头部左侧内容 -->
        <el-tabs v-model="activeName">
          <el-tab-pane name="sale">
            <template slot="label">
              <span class="label-item">销售额</span>
            </template>
          </el-tab-pane>
          <el-tab-pane name="visitor">
            <template slot="label">
              <span class="label-item">访问量</span>
            </template>
          </el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="date-main">
          <div class="date-item">
            <span class="item" @click="setDate('toDay')">今日</span>
            <span class="item" @click="setDate('week')">本周</span>
            <span class="item" @click="setDate('month')">本月</span>
            <span class="item" @click="setDate('year')">本年</span>
          </div>
          <el-date-picker format="yyyy年MM月dd日" value-format="yyyy年MM月dd日" size="mini" v-model="dateTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="card-main">
        <el-row :gutter="10">
          <el-col :span="18">
            <LeftCharts ref="chartsFormLeft" :title="title" :typeName="typeName" :data="data"></LeftCharts>
          </el-col>
          <el-col :span="6" class="right-col">
            <div class="right-content">
              <h3>门店{{title}}排名</h3>
              <ul class="ul-main">
                <li class="li-main" v-for="item in 7" :key="item">
                  <div class="left-text">
                    <span class="index" :class="item<=3?'radio':''">{{item}}</span>
                    <span class="content">肯德基{{item}}</span>
                  </div>
                  <div class="right-text">
                    <span class="item">323,23{{item}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div> 
    </el-card>
  </div>
</template>

<script>
import LeftCharts from './LeftCharts'
import dayjs from 'dayjs'
export default {
  // 组件名称
  name: 'Sale',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {
    LeftCharts
  },
  // 组件状态值
  data() {
    return {
      activeName: 'sale',
      dateTime: [],
      title: '销售额',
      typeName: '销售',
      data: [10, 20, 30, 40, 35, 30, 25, 20, 15, 10, 5, 50],
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    'activeName': {
      immediate: true, //首次加载
      handler(newValue) {
        let saleList = [10, 20, 30, 40, 35, 30, 25, 20, 15, 10, 5, 50];
        let visitorList = [111, 222, 3333, 444, 355, 311, 212, 130, 130, 120, 10, 443];
        if (newValue == 'sale') {
          this.title = '销售额';
          this.typeName = '销售';
          this.data = saleList;
        } else {
          this.title = '访问量';
          this.typeName = '访问';
          this.data = visitorList;
        }
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          title: {
            text: this.title + '趋势'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: this.typeName,
              type: 'bar',
              barWidth: '60%',
              data: this.data,
            }
          ]
        };
        this.$nextTick(() => {
          this.$refs.chartsFormLeft.init(option);
        })
      }
    }
  },
  // 组件方法
  methods: {
    setDate(date) {
      //默认值
      let start_time = '';
      let end_time = '';
      let format = 'YYYY年MM月DD日'; //格式可参考文档https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
      switch (date) {
        case 'toDay':
          //返回当天 - 当天
          start_time = dayjs().format(format);
          end_time = dayjs().format(format);
          break;
        case 'week':
          //返回本周第一天 - 本周最后一天
          start_time = dayjs().day(1).format(format);
          end_time = dayjs().day(7).format(format);
          break;
        case 'month':
          //返回本月第一天 - 本月最后一天
          start_time = dayjs(dayjs()).startOf('month').format(format);
          end_time = dayjs(dayjs()).endOf('month').format(format);
          break;
        case 'year':
          //返回本年第一天 - 本年最后一天
          start_time = dayjs().startOf('year').format(format);
          end_time = dayjs().endOf('year').format(format);
          break;
        default:
          break;
      }
      //设置
      this.dateTime = [start_time, end_time];
      //tips
      this.$msgSucc('日期切换成功!');
    }
  },
  created() {
  },
  mounted() {

  },
}
</script> 

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-card__header {
  border-bottom: 0;
}

.box-card {
  margin-top: 20px;
}
</style>


<style scoped lang="scss">
.Sale {
  .card-header {
    display: flex;
    justify-content: space-between;
    .label-item {
      font-size: 18px;
    }
  }
  .date-main {
    display: flex;
    align-items: center;
    .date-item {
      display: flex;
      justify-content: space-evenly;
      margin-right: 20px;
      .item {
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
  .ul-main {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
    .li-main {
      height: 8%;
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      .left-text {
        display: flex;
        .index {
          display: flex;
          justify-content: center;
          align-content: center;
          width: 18px;
          height: 18px;
          margin-right: 30px;
        }
        .radio {
          border-radius: 50%;
          background: black;
          color: white;
        }
      }
    }
  }
}
</style>