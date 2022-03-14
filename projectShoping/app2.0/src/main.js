import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//引入自适应插件
import 'lib-flexible'

//注册三级联动为全局组件
import TypeNav from '@/components/TypeNav'

//注册分页器为全局组件 
import Pagintion from '@/components/Pagination'

//执行mock 
import '@/mock/mockServe'

//引入Swiper插件需要的CSS
import 'swiper/css/swiper.css'

//统一引入api文件中的所有抛出项 并命名为Api
import * as Api from '@/api'

//名称 及 组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagintion.name, Pagintion);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  //配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$Api = Api;
  },
}).$mount('#app')
