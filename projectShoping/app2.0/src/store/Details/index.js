import { GetGoodsInfo, AddOrUpdateShopCart } from '@/api/index.js'

//调用utils
import { Get_Uuid } from '@/utils/uuid_token'

const state = {
    getgoodsinfo: {},
    //临时令牌
    uuid_token: Get_Uuid(),
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
    },
    async actions_AddOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let r = await AddOrUpdateShopCart(skuId, skuNum);

        if (r.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('error'))
        }
    }
}; //可处理异步

const getters = {
    categoryView(state) {
        return state.getgoodsinfo.categoryView || {}
    },
    skuInfo(state) {
        return state.getgoodsinfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.getgoodsinfo.spuSaleAttrList || []
    }
}; //理解为计算属性 使组件获取仓库数据更方便

export default {
    state,
    mutations,
    actions,
    getters
}