<!--
 * @Author: WenBin
 * @Date: 2022-04-10 20:04:14
 * @LastEditTime: 2022-04-12 15:00:49
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\product\Spu\SpuForm\index.vue
 * @ascription 3xData
-->
<template>
  <div class='SpuForm'>
    <el-form ref="SpuForm" label-width="80px" v-loading="imageLoadingEnd">
      <el-form-item label="Spu名称">
        <el-input v-model="SpuInfo.spuName" placeholder="请输入Spu名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="SpuInfo.tmId" value="" placeholder="请选择品牌">
          <el-option v-for="(TradeMarkItem) in TradeMarkList" :key="TradeMarkItem.id" :label="TradeMarkItem.tmName" :value="TradeMarkItem.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input v-model="SpuInfo.description" type="textarea" rows="4" placeholder="请输入Spu描述"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <template>
          <el-upload :on-success="imageSuccessUp" action="/dev-api/admin/product/fileUpload" :file-list="ImageList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </template>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unSelectSellAttr.length}项属性未选择`">
          <el-option v-for="(sellItem,sellIndex) of unSelectSellAttr" :key="sellIndex" :label="sellItem.name" :value="`${sellItem.id}+${sellItem.name}`"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSellState">添加销售属性</el-button>
        <el-table :data="SpuInfo.spuSaleAttrList" style="width: 100%">
          <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
          <el-table-column label="序号" width="width"></el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width"></el-table-column>
          <el-table-column label="属性值名称列表" width="width">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="handleClose(row,tag,$index)">
                {{tag.saleAttrValueName}}
              </el-tag>
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" :ref="$index" size="small" @keyup.enter.native="$event.target.blur" @blur="handleInputConfirm(row,$index)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row,$index)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" @click="deleteRow(row,$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SubMitSave">保存</el-button>
        <el-button @click="closeAndBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import trim from 'lodash/trim';
export default {
  // 组件名称
  name: 'SpuForm',
  // 组件参数 接收来自父组件的数据
  props: {
  },
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      SpuInfo: {
        category3Id: 0,
        description: "",
        id: 0,
        spuName: "",
        tmId: 0,
        spuImageList: [
        ],
        spuSaleAttrList: [
        ],
      },
      TradeMarkList: [],
      ImageList: [],
      SellSelectList: [],
      imageLoadingEnd: false,
      attrIdAndAttrName: '', //未选择的销售id
      tempImageList: [], //临时保存图片组
    }
  },
  // 计算属性
  computed: {
    unSelectSellAttr() {
      return this.SellSelectList.filter(item => {
        return this.SpuInfo.spuSaleAttrList.every(InfoItem => {
          return item.name !== InfoItem.saleAttrName
        })
      })
    }
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    async init(row) {
      this.imageLoadingEnd = true; //开始加载
      let { id } = row;
      let SpuInfo = await this.$proApi.Spu.reqSpuInfo(id);
      let TradeMarkList = await this.$proApi.Spu.reqTradeMarkList();
      let ImageList = await this.$proApi.Spu.reqSpuImageList(id);
      let SellSelectList = await this.$proApi.Spu.reqSellSelectList(id);
      if (SpuInfo.code == 200) {
        //遍历子属性 
        this.SpuInfo = SpuInfo.data;
      };
      if (TradeMarkList.code == 200) { this.TradeMarkList = TradeMarkList.data; };
      if (ImageList.code == 200 && ImageList.data?.length > 0) {
        ImageList.data.forEach(imageItem => {
          imageItem.name = imageItem.imgName;
          imageItem.url = imageItem.imgUrl;
        })
        this.ImageList = ImageList.data
      };
      if (SellSelectList.code == 200) { this.SellSelectList = SellSelectList.data };
      this.imageLoadingEnd = false;

    },
    //保存/修改
    async SubMitSave() {
      console.log(this.SpuInfo, 'SpuInfo');
      //整理照片墙参数 
      let tempArr = this.tempImageList.map(item => {
        return {
          imgUrl: (item.response && item.response.data) || item.url,
          imgName: item.name
        }
      });
      //如果新增图片
      if (tempArr?.length > 0) {
        this.SpuInfo.spuImageList = tempArr;
      } else {
        console.log('未新增图片');
      };

      let result = await this.$proApi.Spu.reqAddOrUpdateSpu(this.SpuInfo);
      if (result.code == 200) {
        console.log(result, 'Save,result...');
        this.$msgSucc('修改成功!');
        this.$emit('changeScene', 0);
      }else{
        this.$msgError('修改失败!');
      }

    },
    addSellState() {
      //分割出name和id
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split('+');
      //创建一个属性对象
      let temp = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      };
      this.SpuInfo.spuSaleAttrList.push(temp);
      //清空数据
      this.attrIdAndAttrName = '';
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.tempImageList = fileList; //临时保存图片组用于后续保存使用
    },
    imageSuccessUp(response, file, fileList) {
      this.tempImageList = fileList; //临时保存图片组用于后续保存使用
    },
    closeAndBack() {
      this.$emit('changeScene', 0);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClose(row, tag, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    deleteRow(row, index) {
      this.SpuInfo.spuSaleAttrList.splice(index, 1);
    },
    showInput(row, index) {
      this.$set(row, 'inputVisible', true);
      this.$set(row, 'inputValue', '');
      this.$nextTick(_ => {
        this.$refs[index].focus();
      });
    },
    handleInputConfirm(row, index) {
      console.log('触发频率..')

      let { baseSaleAttrId, inputValue } = row;
      if (inputValue.trim() == '') { return this.$msgError('属性值不能为空!'); };
      let result = row.spuSaleAttrValueList.every(item => trim(item.saleAttrValueName) !== trim(inputValue));
      //判断名称重复
      if (!result) { return this.$msgError('与其他属性值名称重复!') }
      row.spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrValueName: inputValue });
      row.inputVisible = false;
    },
  },
  created() {
  },
  mounted() {
  },
}
</script> 

<style>
.el-tag + .el-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<style scoped lang="scss">
.SpuForm {
}
</style>
