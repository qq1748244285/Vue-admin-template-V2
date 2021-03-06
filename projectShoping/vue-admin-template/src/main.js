import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'development') {
  //只在开发环境下 使用mockXHR 避免登陆接口响应超时
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

//将封装的api 挂载到vue原型上方便调用
import proApi from '@/api/product/index'
Vue.prototype.$proApi = proApi;

//将权限相关api 挂载
import rApi from '@/api/acl/index';
Vue.prototype.$rApi = rApi;
console.log(rApi,'rapi')

//二次封装message方法
Vue.prototype.$msgSucc = function (message) { this.$message({ showClose: true, message, type: 'success' }); }
Vue.prototype.$msgError = function (message) { this.$message({ showClose: true, message, type: 'error' }); }
Vue.prototype.$msgInfo = function (message) { this.$message.info(message); }

//引入全局组件
import CategorySelect from '@/components/CategorySelect';
import tipsButton from '@/components/tipsButton';
//全局注册组件
Vue.component(CategorySelect.name, CategorySelect);
Vue.component(tipsButton.name, tipsButton);



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
