<!--
 * @Author: WenBin
 * @Date: 2022-04-10 20:04:14
 * @LastEditTime: 2022-04-10 20:25:54
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\product\Spu\SpuForm\index.vue
 * @ascription 3xData
-->
<template>
  <div class='SpuForm'>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Spu名称">
        <el-input placeholder="请输入Spu名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select value="" placeholder="请选择品牌">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input type="textarea" rows="4" placeholder="请输入Spu描述"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <template>
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </template>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select value="" placeholder="还有3未选择">
          <el-option label="label" value="value"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
        <el-table style="width: 100%">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column label="序号" width="width"></el-table-column>
          <el-table-column label="属性名" width="width"></el-table-column>
          <el-table-column label="属性值名称列表" width="width"></el-table-column>
          <el-table-column label="操作" width="width"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'SpuForm',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
