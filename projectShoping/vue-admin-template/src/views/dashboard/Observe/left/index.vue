<!--
 * @Author: WenBin
 * @Date: 2022-04-18 16:38:00
 * @LastEditTime: 2022-04-19 11:04:06
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\dashboard\Observe\left\index.vue
 * @ascription 3xData
-->
<template>
  <div class='left'>
    <el-card>
      <div slot="header" class="header">
        <div class="_flex_align_center">
          <span>线上热门搜索</span>
        </div>
        <div class="_flex_align_center">
          <el-dropdown>
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
              <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- LeftLineCharts -->
      <el-row :gutter="10">
        <el-col :span="12">
          <LeftLineCharts />
        </el-col>
        <el-col :span="12">
          <LeftLineCharts />
        </el-col>
      </el-row>
      <!-- 底部table -->
      <el-table border ref="filterTable" :data="tableData" style="width: 100%;margin-top:20px;">
        <el-table-column type="index" label="排名" width="100" align="center" column-key="date">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="100" align="center">
        </el-table-column>
        <el-table-column prop="address" sortable label="用户数" align="center" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="tag" sortable label="周涨幅" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px" @size-change="()=>{}" @current-change="()=>{}" :current-page="1" :page-sizes="[10, 20, 50]" :page-size="3" layout="->,prev, pager, next" :total="300">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import LeftLineCharts from './LeftLineCharts'
export default {
  // 组件名称
  name: 'left',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: { LeftLineCharts },
  // 组件状态值
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
      }]
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    }
  },
  created() {
  },
  mounted() {
  },
}
</script> 

<style scoped lang="scss">
.left {
  .header {
    height: 41px;
    display: flex;
    justify-content: space-between;
  }
  ._flex_align_center {
    display: flex;
    align-items: center;
  }
}
</style>
