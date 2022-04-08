<!--
 * @Author: WenBin
 * @Date: 2022-04-04 13:48:57
 * @LastEditTime: 2022-04-08 16:32:40
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \vue-admin-template\src\views\product\Attr\index.vue
 * @ascription 3xData
-->
<template>
  <div class="Attr">
    <div class="Select-Top-Box">
      <el-card>
        <CategorySelect ref="CateGorySelect" @getShopTypeList="getShopTypeList"></CategorySelect>
      </el-card>
    </div>
    <div class="Select-Main-Box">
      <el-card>
        <div v-show="isShowTable" class="Main-Top-Content">
          <div class="Main-Add-Btn">
            <el-button @click="SubMitClick('add')" :disabled="!levelList3" type="primary" icon="el-icon-plus">添加属性</el-button>
          </div>
          <el-table border :data="arrList" style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="attrName" label="属性名称" width="150" align="center">
            </el-table-column>
            <el-table-column prop="prop" label="属性值列表" width="width">
              <template slot-scope="{row}">
                <div class="Main-Tag-Item" v-for="(ritem) of row.attrValueList" :key="ritem.id">
                  <el-tag type="success">{{ritem.valueName}}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="150" align="center">
              <template slot-scope="{row}">
                <el-button @click="SubMitClick('edit',row)" type="warning" icon="el-icon-edit" size="mini"></el-button>
                <el-button @click="SubMitClick('delete',row)" type="danger" icon="el-icon-delete" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="!isShowTable" class="Main-Bottom-Content">
          <el-form label-position="left" :inline="true" ref="AttrForm" label-width="80px">
            <el-form-item label="属性名">
              <el-input v-model="attrInfo.attrName" placeholder="请输入属性名"></el-input>
            </el-form-item>
          </el-form>
          <div class="Update-Btns-Box">
            <el-button :disabled="!(attrInfo.attrName)" type="primary" icon="el-icon-plus" @click="SubMitClick('addValue')">添加属性值</el-button>
            <el-button>取消</el-button>
          </div>
          <el-table :data="attrInfo.attrValueList" border style="width: 100% margin:20px 0">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column label="属性值名称" width="width">
              <template slot-scope="{row}">
                <el-input :autofocus="true" v-if="row.flag" @keyup.enter.native="blurInputValue(row)" @blur="blurInputValue(row)" v-model="row.valueName" placeholder="请输入属性值" size="mini"></el-input>
                <div v-else @click="row.flag=true">{{row.valueName}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="width">
              <template slot-scope="{row}">
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="Update-Btns-Box">
            <el-button @click="SubMitAddOrEdit" type="primary">保存</el-button>
            <el-button @click="SubMitClick('close')">取消</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import trim from 'lodash/trim';
export default {
  name: 'Attr',
  data() {
    return {
      arrList: [],
      ids: [],
      isShowTable: true,
      levelList1: '',
      levelList2: '',
      levelList3: '',
      attrInfo: {
        attrName: '',
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    }
  },
  methods: {
    SubMitClick(type, row) {
      this.isShowTable = false;
      //3级分类id获取
      this.attrInfo.categoryId = this.levelList3;

      switch (type) {
        case 'add':
          this.$refs['CateGorySelect'].handlerSelectDis(true);
          break;
        case 'addValue':
          let temp = { attrId: this.attrInfo.id, valueName: '', flag: true };
          this.attrInfo.attrValueList.push(temp);
          break;
        case 'close':
          this.isShowTable = true;
          this.attrInfo = {
            attrName: '',
            attrValueList: [],
            categoryId: 0,
            categoryLevel: 3,
          };
          break;
        case 'edit':
          this.isShowTable = false;
          row.attrValueList.forEach(item => {
            item.flag = false;
          })
          this.attrInfo = JSON.parse(JSON.stringify(row));
          break;
        default:
          return
      }
    },
    getShopTypeList(result) {
      console.log(result, 'emit');
      //赋值
      this['levelList' + result.level] = result.id;

      if (result.level == 1) {
        this.clearLevelList([2, 3]);
      }
      if (result.level == 2) {
        this.clearLevelList([3]);
      }
      if (result.level == 3) {
        console.log(result, 'result...');
        this.getListData(this.levelList1, this.levelList2, this.levelList3);
      }
    },
    clearLevelList(ids) {
      ids.forEach(id => {
        this['levelList' + id] = '';
      })
    },
    async getListData() {
      let res = await this.$proApi.Attr.GetShopTypeList(this.levelList1, this.levelList2, this.levelList3);
      if (res.code == 200) {
        this.arrList = res.data;
      } else {
        this.$message.success('获取商品属性失败')
      }
    },
    blurInputValue(row) {
      let { valueName } = row;
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return valueName == item.valueName
        }
      });
      isRepat ? this.$message.warning('不允许使用重复的名称') : trim(row.valueName) ? row.flag = false : this.$message.warning('请输入属性值名称');
    },
    async SubMitAddOrEdit() {
      //属性名及添加项不能为空
      if (trim(this.attrInfo.attrName)) {
        if (this.attrInfo.attrValueList?.length > 0) {
          //遍历数组确保每个选项的属性值都不为空
          let Notempty = this.attrInfo.attrValueList.every(rule => {
            return trim(rule.valueName)
          })
          if (Notempty) {
            let result = await this.$proApi.Attr.addAttribute(this.attrInfo);
            if (result.code == 200) {
              this.$message.success('新增成功!');
              this.isShowTable = true ; 
              this.getListData();
            }
          } else {
            this.$message.warning('未填写属性名称不允许保存!')
          }
        } else {
          this.$message.warning('未检测到新增属性值!')
        }
      } else {
        this.$message.warning('属性名不能为空!')
      }
    },
  }
}
</script>
 
<style scoped lang="scss">
.Attr {
  .Select-Top-Box {
    ::v-deep .el-card {
      margin: 20px 0 0 0;
    }
  }
  .Select-Main-Box {
    .Main-Add-Btn {
      margin: 0 0 20px 0;
    }
    .Main-Tag-Item {
      display: inline-block;
      margin: 0 10px;
    }
    .Update-Btns-Box {
      margin: 10px 0;
    }
  }
}
</style>