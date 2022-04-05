<template>
  <div class="TradeMark">
    <div class="add-button">
      <el-button type="primary" icon="el-icon-plus">添加</el-button>
    </div>
    <!-- 表格区域 -->
    <el-table :data="Tabledata" style="width: 100%" :border="true">
      <el-table-column prop="id" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width" align="center"></el-table-column>
      <el-table-column label="品牌LOGO" width="width" align="center">
        <template slot-scope="{row,$index}">
          <el-image style="width: 100px; height: 100px" :src="row.logoUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="getPageList" :current-page="page" :page-sizes="[3,5,10]" :page-size="3" :pager-count="5" layout=" prev, pager, next, jumper,->,sizes,total" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    return {
      Tabledata: [],
      page: 1, //当前页码
      limit: 3, //一页显示多少条
      total: 0,

    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    async getPageList(pager = 1) {
      this.page = pager;  //pager 会被调用时默认传入当前点击的index 初次调用时没调用默认值为1
      let { page, limit } = this;
      try {
        let result = await this.$proApi.TradeMark.getTradeMarkList(page, limit);
        if (result.code == 200) {
          console.log(result, 'result.')
          this.total = result.data.total;
          this.Tabledata = result.data.records;
        }
      } catch (err) {

      }
    },
    handleSizeChange(i) {
      this.limit = i;
      this.getPageList();
    },
  }
};
</script>

<style lang="scss">
.TradeMark {
  .add-button {
    margin: 10px 0;
  }
  .bottom-pagination {
    text-align: center;
    margin-top: 20px;
  }
}
</style>