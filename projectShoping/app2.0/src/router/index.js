import Vue from 'vue'
import VueRouter from 'vue-router'


//引入路由配置表
import routes from './router'


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
    return {y:0}
  }
})

export default router
