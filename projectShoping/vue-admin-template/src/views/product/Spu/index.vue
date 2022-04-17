<!--
 * @Author: WenBin
 * @Date: 2022-04-04 13:49:33
 * @LastEditTime: 2022-04-17 19:34:37
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\product\Spu\index.vue
 * @ascription 3xData
-->
<template>
  <div class='Spu'>
    <el-card style="margin:20px 0;">
      <CategorySelect ref="CateGorySelect" @getShopTypeList="getShopTypeList"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene===0">
        <el-button style="margin:0 0 20px 0" type="primary" icon="el-icon-plus" @click="handleAddSpu" :disabled="!categoryId3">添加SPU</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="index" label="序号" width="80" align="center"> </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width"> </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width"> </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <tips-button @click="handleAddSku(row)" title="添加Sku" type="success" icon="el-icon-plus" size="mini"></tips-button>
              <tips-button @click="handleEdit(row)" title="修改Spu" type="warning" icon="el-icon-edit" size="mini"></tips-button>
              <tips-button @click="ShowSkuList(row)" title="查看当前spu全部sku列表" type="info" icon="el-icon-info" size="mini"></tips-button>
              <el-popconfirm @onConfirm="removeSpu(row)" confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-question" icon-color="red" title="这是一段内容确定删除吗？">
                <template slot="reference">
                  <tips-button title="删除spu" type="danger" icon="el-icon-delete" size="mini"></tips-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="textAlign:center;" @size-change="handleSizeChange" @current-change="getSpuList" :current-page="page" :page-sizes="[3, 5,10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total"></el-pagination>
      </div>
      <SpuForm ref="SpuForm" v-if="scene===1" @changeScene="changeScene"></SpuForm>
      <SkuForm ref="SkuForm" v-show="scene===2" @changeScene="changeScene"></SkuForm>
    </el-card>
    <!-- 显示Sku列表的dialog -->
    <el-dialog :title="SpuTitle" :visible.sync="ShowSkuVisible" :before-close="closeDialog">
      <el-table :data="SkuList" v-loading="loading">
        <el-table-column property="skuName" label="名称" width="width" align="center"></el-table-column>
        <el-table-column property="price" label="价格" width="width" align="center"></el-table-column>
        <el-table-column property="weight" label="重量" width="width" align="center"></el-table-column>
        <el-table-column label="默认图片" width="width" align="center">
          <template slot-scope="{row}">
            <el-image style="width: 100px; height: 100px" :src="row.skuDefaultImg"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  // 组件名称
  name: 'Spu',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: { SpuForm, SkuForm },
  // 组件状态值
  data() {
    return {
      categoryId1: '',
      categoryId2: '',
      categoryId3: '',
      page: 1,
      limit: 3,
      tableData: [],
      total: 0,
      scene: 0, //0代表展示SPU列表数据 1添加与修改SPU  2添加SKU
      ShowSkuVisible: false,
      SkuList: [], //Sku列表
      SpuTitle: '',//Spu标题
      loading: false,
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    //控制3级菜单可用状态
    scene(value, newValue) {
      if (value != 0) {
        this.$refs.CateGorySelect.handlerSelectDis(true)
      } else {
        this.$refs.CateGorySelect.handlerSelectDis(false)
      }
    }
  },
  // 组件方法
  methods: {
    changeScene(scene, request = true) {
      this.scene = scene;
      //重新获取数据
      if (request) {
        this.getSpuList(this.page);
      } else {
        console.log('不请求..')
      }
    },
    closeDialog(done){
      //关闭对话框
      this.SkuList = []; //清空数据
      this.loading = true;
      done();
    },
    async ShowSkuList(row) {
      this.ShowSkuVisible = true;
      this.SpuTitle = row.spuName + '的Sku列表';
      let result = await this.$proApi.Sku.getSkuList(row.id);
      if (result.code == 200) {
        if (result.data?.length > 0) {
          this.SkuList = result.data;
        } else {
          this.$message.warning('暂无Sku!');
        }
        this.loading = false;
      } else {
        this.$msgError('查询Sku列表失败!');
      }
    },
    handleAddSku(row) {
      this.scene = 2;
      this.$nextTick(() => {
        this.$refs.SkuForm.init(row, this.categoryId1, this.categoryId2, this.categoryId3);
      })
    },
    handleEdit(row) {
      this.scene = 1;
      this.$nextTick(() => {
        this.$refs.SpuForm.init(row);
      })
    },
    handleAddSpu() {
      this.scene = 1;
      this.$nextTick(() => {
        this.$refs.SpuForm.initAdd(this.categoryId3);
      })
    },
    handleSizeChange(size) {
      this.limit = size;
      this.getSpuList();
    },
    getShopTypeList(result) {
      //赋值
      this['categoryId' + result.level] = result.id;

      if (result.level == 1) {
        this.clearLevelList([2, 3]);
      }
      if (result.level == 2) {
        this.clearLevelList([3]);
      }
      if (result.level == 3) {
        this.getSpuList();
      }
    },
    async getSpuList(page = 1) {
      this.page = page;
      let { limit, categoryId3 } = this;
      let result = await this.$proApi.Spu.reqPageSelectSpuList(page, limit, categoryId3);
      if (result.code == 200) {
        this.tableData = result.data.records;
        this.total = result.data.total;
      }
    },
    clearLevelList(ids) {
      ids.forEach(id => { this['levelList' + id] = ''; })
    },
    async removeSpu(row) {
      let result = await this.$proApi.Spu.deleteSpu(row.id);
      if (result.code == 200) {
        this.$msgSucc('删除成功!');
        if (this.tableData.length > 1 && this.page != 1) {
          this.getSpuList(this.page);
        } else {
          this.getSpuList(this.page - 1);
        }
      } else {
        this.$msgError('删除失败!')
      }
    }
  },
  created() {
  },
  mounted() {
  },
}
</script> 

<style scoped>
</style>
