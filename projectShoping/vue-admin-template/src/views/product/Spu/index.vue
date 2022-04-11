<!--
 * @Author: WenBin
 * @Date: 2022-04-04 13:49:33
 * @LastEditTime: 2022-04-11 16:28:18
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
              <tips-button @click="handleAddSku(row)" title="添加Spu" type="success" icon="el-icon-plus" size="mini"></tips-button>
              <tips-button @click="handleEdit(row)" title="修改Spu" type="warning" icon="el-icon-edit" size="mini"></tips-button>
              <tips-button title="查看当前spu全部sku列表" type="info" icon="el-icon-info" size="mini"></tips-button>
              <tips-button title="删除spu" type="danger" icon="el-icon-delete" size="mini"></tips-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="textAlign:center;" @size-change="handleSizeChange" @current-change="getSpuList" :current-page="page" :page-sizes="[3, 5,10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total"></el-pagination>
      </div>
      <SpuForm ref="SpuForm" v-if="scene===1" @changeScene="changeScene"></SpuForm>
      <SkuForm v-show="scene===2"></SkuForm>
    </el-card>
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
      }else{
        this.$refs.CateGorySelect.handlerSelectDis(false)
      }
    }
  },
  // 组件方法
  methods: {
    changeScene(scene) {
      this.scene = scene;
    },
    handleAddSku(row) {
      console.log('addSku..');
      this.scene = 2;
    },
    handleEdit(row) {
      console.log('edit..', row);
      this.scene = 1;
      this.$nextTick(() => {
        this.$refs.SpuForm.init(row);
      })
    },
    handleAddSpu() {
      console.log('点击添加..');
      this.scene = 1;
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
  },
  created() {
  },
  async mounted() {
  },
}
</script> 

<style scoped>
</style>
