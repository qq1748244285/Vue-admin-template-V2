<!--
 * @Author: WenBin
 * @Date: 2022-04-04 13:49:32
 * @LastEditTime: 2022-04-17 20:48:03
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\product\Sku\index.vue
 * @ascription 3xData
-->
<template>
  <div class='Sku'>
    <!-- 表格 -->
    <el-table border :data="records" style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width" align="center"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width" align="center"></el-table-column>
      <el-table-column label="默认图片" width="width" align="center">
        <template slot-scope="{row}">
          <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="width" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="width" align="center"></el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row}">
          <el-button @click="ChangeSaleStatus(row)" type="info" v-if="row.isSale" icon="el-icon-top" size="mini"></el-button>
          <el-button @click="ChangeSaleStatus(row)" type="success" v-else size="mini" icon="el-icon-bottom"></el-button>
          <el-button type="primary" icon="el-icon-edit" @click="$msgInfo('功能开发中!...')" size="mini"></el-button>
          <el-button type="info" @click="reqSkuInfo(row)" icon="el-icon-info" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination style="textAlign:center" @size-change="sizeChange" @current-change="currentChange" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,total, sizes" :total="total">
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer :show-close="false" size="50%" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{SkuInfo.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{SkuInfo.Desc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{SkuInfo.price}}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag style="margin:0 10px;" type="success" v-for="item in SkuInfo.skuAttrValueList" :key="item.id">
            {{item.attrId}}-{{item.valueId}}
          </el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="imageItem in SkuInfo.skuImageList" :key="imageItem.id">
              <el-image style="width:100%;height:100%;" :src="imageItem.imgUrl"></el-image>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'Sku',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      records: [],
      drawer: false,
      direction: 'rtl',
      SkuInfo: {},//详情
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async getTableData(page = 1) {
      this.page = page;
      let result = await this.$proApi.Sku.reqSkuListTable(page, this.limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
        console.log(result, 'result..');
      }
    },
    sizeChange(size) {
      this.limit = size;
      this.getTableData();
    },
    currentChange(page) {
      console.log(page, 'page...');
      this.getTableData(page);
    },
    async ChangeSaleStatus(row) {
      let result = await this.$proApi.Sku.ChangeSaleState(row.id, !row.isSale);
      if (result.code == 200) {
        this.$msgSucc(`${row.isSale ? '上架' : '下架'}成功!`);
      } else {
        this.$msgError('操作失败!');
      }
      this.getTableData(this.page);
    },
    async reqSkuInfo(row) {
      this.drawer = true;
      let result = await this.$proApi.Sku.reqSkuInfo(row.id);
      if (result.code == 200) {
        this.SkuInfo = result.data;
        console.log(result, 'result..')
      }
    },
    handleClose(done) {
      done();
    },
  },
  created() {
  },
  mounted() {
    this.getTableData();
  },
}
</script> 

<style scoped lang="scss">
.Sku {
  .el-row .el-col-5 {
    color: red;
    font-size: 18px;
    text-align: right;
  }
  .el-col {
    margin: 10px 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  ::v-deep.el-carousel__button {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
}
</style>
