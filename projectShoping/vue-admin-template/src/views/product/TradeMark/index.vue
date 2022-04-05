<template>
  <div class="TradeMark">
    <div class="add-button">
      <el-button type="primary" icon="el-icon-plus" @click="showDiaLog('add')">添加</el-button>
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
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="showDiaLog('edit',row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="bottom-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="getPageList" :current-page="page" :page-sizes="[3,5,10]" :page-size="3" :pager-count="5" layout=" prev, pager, next, jumper,->,sizes,total" :total="total">
      </el-pagination>
    </div>
    <!-- 添加 / 修改 dialog-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" :rules="rules" style="width:80%" :model="tmForm">
        <el-form-item prop="tmName" label="品牌名称" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <template>
            <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "tradeMark",
  data() {
    //自定义效验规则 - 验证品牌名称
    const validatetmName = (rule, value, callback) => {
      if (value.length < 3 || value.length > 6) {
        callback(new Error('品牌名称支持3-6位字符'));
      } else {
        callback();
      }
    };

    return {
      Tabledata: [],
      page: 1, //当前页码
      limit: 3, //一页显示多少条
      total: 0,//总数
      dialogFormVisible: false, //dialogShow
      title: '',//dialog标题
      imageUrl: '',//上传图片使用的属性 
      tmForm: {
        tmName: '',
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请填写品牌名称', trigger: 'blur' },
          { validator: validatetmName, trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请上传品牌图片', trigger: 'change' }
        ]
      }
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
    showDiaLog(type, row) {
      switch (type) {
        case 'add':
          this.title = '添加品牌';
          this.tmForm = { tmName: '', logoUrl: '' }; //每次添加前清空表单
          break
        case 'edit':
          this.title = '修改品牌';
          this.tmForm = row; //当前修改对象赋值给tmForm
          break
      }
      this.dialogFormVisible = true;
    },
    handleAvatarSuccess(response, file, fileList) {
      this.tmForm.logoUrl = response.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt2M;
    },
    //添加或修改品牌
    addOrUpdateTradeMark() {
      //当所有验证通过后 才可执行业务
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false; //隐藏对话框
          try {
            let result = await this.$proApi.TradeMark.addOrUpdateTradeMark(this.tmForm);
            if (result.code == 200) {
              this.$message({
                message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
                type: 'success'
              });
              this.getPageList();
            }
          } catch (err) {
            console.log(err, 'err_updateOrAdd')
          }
        } else {
          return false
        }
      })
    },
    //删除品牌
    deleteTradeMark(row) {
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let result = await this.$proApi.TradeMark.deleteTradeMark(row.id);
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //替换数据的过程 如果当前数组中 只有一个数据 则会回退一页 否则还停留在当前页
          this.getPageList(this.Tabledata.length>1||this.page==1?this.page:this.page-1);
        }  
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>