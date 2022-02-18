import Vue from 'vue'
import VueRouter from 'vue-router'

//解决重复访问路由的bug 3.0以上Router
const Rpush = VueRouter.prototype.push; //备份push方法
const Replace = VueRouter.prototype.replace; //备份replace方法
VueRouter.prototype.push = function push(localtion, resolve, reject) {
  if (resolve && reject) {
    return Rpush.call(this, localtion)
  } else {
    return Rpush.call(this, localtion,()=>{},()=>{})
  }
}
VueRouter.prototype.replace = function replace(localtion, resolve, reject) {
  if (resolve && reject) {
    return Replace.call(this, localtion)
  } else {
    return Replace.call(this, localtion,()=>{},()=>{})
  }
}

Vue.use(VueRouter)




//引入必要组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
    meta: {
      showFooter: true
    }
  },
  {
    path: '/search/:val?',
    component: Search,
    props: true,
    meta: {
      showFooter: true
    },
    name: 'search'
  },
  {
    path: '/login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/Register',
    component: Register,
    meta: {
      showFooter: false
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
