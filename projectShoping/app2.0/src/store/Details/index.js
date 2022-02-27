import { GetGoodsInfo } from '@/api/index.js'

const state = {
    getgoodsinfo: {}
}; //存储

const mutations = {
    GetGoodsInfo(state, result) {
        state.getgoodsinfo = result
    }

}; //update state

const actions = {
    async actions_GetGoodsInfo({ commit }, id) {
        let result = await GetGoodsInfo(id);
        if (result.code == 200) {
            commit('GetGoodsInfo', result.data)
        }
    }
}; //可处理异步

const getters = {
    categoryView(state){
        return state.getgoodsinfo.categoryView||{}
    },
    skuInfo(state){
        return state.getgoodsinfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.getgoodsinfo.spuSaleAttrList||[]
    }
}; //理解为计算属性 使组件获取仓库数据更方便

export default {
    state,
    mutations,
    actions,
    getters
}