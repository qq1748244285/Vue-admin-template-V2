<!--
 * @Author: WenBin
 * @Date: 2022-04-07 14:24:38
 * @LastEditTime: 2022-04-08 10:23:17
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\components\CategorySelect\index.vue
 * @ascription 3xData
-->

<template>
  <div class='CategorySelect'>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select :disabled="disabledSelect"  @change="handlerOneSelect" v-model="OneSelectCheck" placeholder="请选择">
          <el-option v-for="(Select1) in  OneSelectList " :key="Select1.id" :label="Select1.name" :value="Select1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select :disabled="disabledSelect" @change="handlerTwoSelect" v-model="TwoSelectCheck" placeholder="请选择">
          <el-option v-for="(Select2) in  TwoSelectList " :key="Select2.id" :label="Select2.name" :value="Select2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select :disabled="disabledSelect" @change="handlerThreeSelect" v-model="ThreeSelectCheck" placeholder="请选择">
          <el-option v-for="(Select3) in  ThreeSelectList " :key="Select3.id" :label="Select3.name" :value="Select3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'CategorySelect',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      OneSelectCheck: '',
      TwoSelectCheck: '',
      ThreeSelectCheck: '',
      OneSelectList: [],
      TwoSelectList: [],
      ThreeSelectList: [],
      disabledSelect:false, //控制搜索框选择状态
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async GetSelectData() {
      let res = await this.$proApi.Attr.GetCategorySelect1();
      if (res.code == 200) {
        this.OneSelectList = res.data;
      }
    },
    async handlerOneSelect(id) {
      //每当1级分类选择时 清空2|3级已选和列表
      this.clearListOrCheck(['Two', 'Three']);
      let resultTwo = await this.$proApi.Attr.GetCategorySelect2(id);
      if (resultTwo.code == 200) {
        this.TwoSelectList = resultTwo.data;
        this.$emit('getShopTypeList', { id, level: 1 });
      }
    },
    async handlerTwoSelect(id) {
      //选中2级时 清空3级可选
      this.clearListOrCheck(['Three']);
      let resultThree = await this.$proApi.Attr.GetCategorySelect3(id);
      if (resultThree.code == 200) {
        this.ThreeSelectList = resultThree.data;
        this.$emit('getShopTypeList', { id, level: 2 });
      }
    },
    async handlerThreeSelect(id) {
      this.$emit('getShopTypeList', { id, level: 3 });
    },
    clearListOrCheck(typeArr) {
      //方法用于清空需要清空的数组项 要求传入数组type
      typeArr.forEach((item, index) => {
        this[item + 'SelectList'] = [];
        this[item + 'SelectCheck'] = '';
      })
    },
    handlerSelectDis(boolean){
      this.disabledSelect = boolean;
    }
  },
  created() {
  },
  mounted() {
    this.GetSelectData();
  },
}
</script> 

<style scoped>
</style>
