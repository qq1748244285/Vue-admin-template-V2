import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入Home_Vuex
import Home from './Home'
//引入Search_Vuex
import Search from './Search'
//引入Details
import Details from './Details'
//引入ShopCart
import ShopCart from './ShopCart'
//模块化vuex
export default new Vuex.Store({
  modules: {
    Home,
    Search,
    Details,
    ShopCart
  }
})
