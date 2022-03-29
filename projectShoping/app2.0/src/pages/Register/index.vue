<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <ValidationProvider rules="required|mobile" v-slot="{ errors }">
          <label>手机号:</label>
          <input placeholder="请输入手机号" v-model="phone" name="phone" />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <ValidationProvider rules="required|code" v-slot="{ errors }">
          <label>验证码:</label>
          <input
            v-model="code"
            name="code"
            type="text"
            placeholder="请输入验证码"
          />
          <button @click="getCode" class="getCode">获取验证码</button>
          <img
            ref="code"
            src="http://182.92.128.115/api/user/passport/code"
            alt="code"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <ValidationProvider rules="required|password" v-slot="{ errors }">
          <label>登录密码:</label>
          <input
            v-model="password"
            type="password"
            placeholder="请输入你的登录密码"
            name="password"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          v-model="passwordAgain"
          type="passwordAgain"
          placeholder="请二次输入密码"
        />
        <span class="error-msg">{{
          passwordAgain !== password ? "二次输入的密码不符" : ""
        }}</span>
      </div>
      <div class="controls">
        <ValidationProvider rules="isCheck" v-slot="{ errors }">
          <input v-model="isOk" name="isCheck" type="checkbox" />
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="btn">
        <button @click="sumbit">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      code: "",
      phone: "",
      password: "",
      passwordAgain: "",
      isOk: true,
    };
  },
  methods: {
    sumbit() {
      if (this.password == this.passwordAgain) {
        try {
          let { phone, password, code } = this;
          let data = {
            phone,
            code,
            password,
            nickName: "前端小菜鸟阿彬",
          };
          let r = this.$store.dispatch("actions_registerUser", data);
          if (r) {
            this.$router.push("/login");
          }
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert("二次密码不一致");
      }
    },
    async getCode() {
      console.log(this.phone, "phone..");
      try {
        if (this.phone) {
          let code = await this.$store.dispatch("actions_getCoed", this.phone);
          this.code = code;
        }
      } catch (err) {
        alert("获取code失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .getCode {
    height: 38px;
  }
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>