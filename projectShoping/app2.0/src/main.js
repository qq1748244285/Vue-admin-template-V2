import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//注册三级联动为全局组件
import TypeNav from '@/components/TypeNav'
 
 


//名称 及 组件
Vue.component(TypeNav.name,TypeNav);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
