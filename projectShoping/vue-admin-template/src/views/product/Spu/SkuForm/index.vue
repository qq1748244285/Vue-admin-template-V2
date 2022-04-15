<!--
 * @Author: WenBin
 * @Date: 2022-04-10 20:04:31
 * @LastEditTime: 2022-04-15 15:15:07
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\product\Spu\SkuForm\index.vue
 * @ascription 3xData
-->
<template>
  <div class='SkuForm'>
    <el-form ref="SkuFormInput" label-width="80px" v-loading="FormLoading">
      <el-form-item label="Spu名称">
        {{Spu.spuName}}
      </el-form-item>
      <el-form-item label="Sku名称">
        <el-input v-model="SkuInfo.skuName" placeholder="请输入Sku名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input type="number" v-model="SkuInfo.price" placeholder="请输入价格"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="SkuInfo.weight" placeholder="请输入重量"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="SkuInfo.skuDesc" rows="4" placeholder="请输入规格" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="SkuFormSelect" inline label-width="80px">
          <el-form-item :label="proItem.attrName" v-for="proItem of ProDuctList" :key="proItem.id">
            <el-select v-model="proItem.proIds" placeholder="请选择">
              <el-option v-for="opItem in proItem.attrValueList" :key="opItem.id" :label="opItem.valueName" :value="`${proItem.id}:${opItem.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="SkuFormSell" inline label-width="80px">
          <el-form-item :label="SaleItem.saleAttrName" v-for="SaleItem of SaleList" :key="SaleItem.id">
            <el-select v-model="SaleItem.SaleIds" placeholder="请选择">
              <el-option v-for="SaleValueItem of SaleItem.spuSaleAttrValueList" :key="SaleValueItem.id" :label="SaleValueItem.saleAttrValueName" :value="`${SaleItem.id}:${SaleValueItem.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table @selection-change="tableSelectChange" style="width: 100%" border :data="imageList">
          <el-table-column type="selection" prop="prop" label="图片" width="80">
          </el-table-column>
          <el-table-column label="图片" width="width">
            <template slot-scope="{row,$index}">
              <el-image style="width: 100px; height: 100px" :src="row.imgUrl">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button v-if="row.isDefault==0" type="primary" @click="toggleDefault(row)">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlerSubmit">保存</el-button>
        <el-button @click="handlerClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'SkuForm',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      Spu: {},//Sku名称
      imageList: [],
      SaleList: [],
      ProDuctList: [],
      SkuInfo: {
        category3Id: 0,
        price: 1,
        spuId: "",
        tmId: "",
        weight: "",
        skuDefaultImg: "",
        skuDesc: "",
        skuName: "",
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: "",
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: ""
          // }
        ],
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "",
          //   skuId: 0,
          //   spuId: 0
          // }
        ],
      },
      FormLoading: true,
      templateImageList: [], //临时保存勾选图片
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async init(row, id1, id2, id3) {
      //获取Sku数据
      this.SkuInfo.category3Id = id3;
      this.SkuInfo.spuId = row.id;
      this.SkuInfo.tmId = row.tmId;
      this.Spu = row;
      let promiseArr = [this.getImageList(row), await this.$proApi.Sku.reqSaleList(row.id), await this.$proApi.Sku.reqProductInfo(id1, id2, id3)];
      Promise.all(promiseArr).then(values => {
        ['imageList', 'SaleList', 'ProDuctList'].forEach((item, index) => {
          this[item] = values[index].data;
          this.FormLoading = false;
        });
      }).catch(err => {
        this.$msgError(err);
        this.$emit('changeScene', 0);
      })
    },
    //获取图片列表
    getImageList(row) {
      return new Promise((resolve, reject) => {
        this.$proApi.Sku.reqImageList(row.id).then(res => {
          if (res.code == 200) {
            res.data?.length > 0 && res.data.forEach(item => { item.isDefault = 0 });
            resolve(res);
          } else {
            reject('获取图片列表失败!');
          }
        })
      })
    },
    handlerClose() {
      this.$emit('changeScene', 0);
      Object.assign(this._data, this.$options.data());
    },
    tableSelectChange(selection) {
      console.log(selection, '...');
      this.templateImageList = selection;
    },
    toggleDefault(row) {
      this.imageList.forEach(item => {
        this.$set(item, 'isDefault', 0);
      });
      row.isDefault = 1;
      this.SkuInfo.skuDefaultImg = row.imgUrl;
    },
    async handlerSubmit() {
      //整理平台属性
      const { ProDuctList, SkuInfo, SaleList, templateImageList } = this;
      SkuInfo.skuAttrValueList = ProDuctList.reduce((box, item) => {
        if (item.proIds) {
          let [attrId, valueId] = item.proIds.split(':');
          box.push({ attrId, valueId });
        }
        return box;
      }, []);
      //整理销售属性
      SkuInfo.skuSaleAttrValueList = SaleList.reduce((box, item) => {
        if (item.SaleIds) {
          let [saleAttrId, saleAttrValueId] = item.SaleIds.split(':');
          box.push({ saleAttrId, saleAttrValueId })
        }
        return box;
      }, [])
      //整理图片数据
      SkuInfo.skuImageList = templateImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      })


      let result = await this.$proApi.Sku.saveAddSkuInfo(SkuInfo);
      if (result.code == 200) {
        //修改显示且不发送请求
        this.$msgSucc('添加Sku成功!');
        this.$emit('changeScene', 0, false);
      } else {
        this.$msgError('保存失败!');
      };
      //清空组件数据 因为使用的v-show 不会注销组件 导致数据未清空
      Object.assign(this._data, this.$options.data());
    },
  },
  created() {
  },
  mounted() {
  },
}
</script> 

<style scoped>
</style>
