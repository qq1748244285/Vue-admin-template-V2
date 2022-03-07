import Vue from 'vue'
import VueRouter from 'vue-router'

import { GetToken } from '@/utils/token'

//引入路由配置表
import routes from './router'
//引入仓库vx
import store from '@/store'

//解决重复访问路由的bug 3.0以上Router
const Rpush = VueRouter.prototype.push; //备份push方法
const Replace = VueRouter.prototype.replace; //备份replace方法
VueRouter.prototype.push = function push(localtion, resolve, reject) {
  if (resolve && reject) {
    return Rpush.call(this, localtion)
  } else {
    return Rpush.call(this, localtion, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function replace(localtion, resolve, reject) {
  if (resolve && reject) {
    return Replace.call(this, localtion)
  } else {
    return Replace.call(this, localtion, () => { }, () => { })
  }
}

Vue.use(VueRouter)


const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动条滚动到顶部y:0 
    return { y: 0 }
  }
})




router.beforeEach(async (to, from, next) => {
  let token = GetToken();
  let userInfo = store.state.UserLogin.userInfo.name;


  if (token && to.name == 'login') {
    return alert('您已登录无需重复登录!')
  } else {
    //已登录前往其他页面 需要先获取用户信息是否已存在
    if (userInfo) {
      next();
    } else {
      //获取用户信息 然后再进行跳转
      try {
        store.dispatch("actions_autoLoign");
        next();
      } catch (err) {
        alert('获取个人信息失败,Token失效!请重新登录');
        await  store.actions_loginOut('CLEARUSER'); 
        next('login')
      }
    }
  }
})



export default router
