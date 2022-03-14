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



//路由前置守卫
router.beforeEach(async (to, from, next) => {
  let token = GetToken();
  let name = store.state.UserLogin.userInfo.name;
  if (token) {
    //已登录无需重复登陆
    if (to.path == '/login') {
      console.log('当前已登录无需再次登录')
      next('/')
    }
    //已登录前往其他页面 需要先获取用户信息是否已存在
    if (name) {
      next();
    } else {
      //获取用户信息 然后再进行跳转
      try {
        console.log('獲取成功')
        await store.dispatch("actions_autoLoign");
        next();
      } catch (err) {
        console.log('獲取失敗')
        await store.dispatch('actions_loginOut');
        next('/login')
      }
    }
  } else {
    //如果未登录不可以前往支付相关类页面
    let toPath = to.path;
    //如果未登录 只允许前往首页/登录页/注册页 
    if (to.path != '/home' && to.path != '/login' && to.path != '/' && to.path != '/register') {
      next('/login?redirect='+toPath);
    } else {
      next();
    }
  }
})



export default router
