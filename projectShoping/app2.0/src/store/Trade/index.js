import { GetAddressInfo, GetOrderInfo } from '@/api/index.js'

const state = {
    addressinfo: [],
    getorderinfo:[]
}; //存储

const mutations = {
    ADDRESSINFO(state, r) {
        state.addressinfo = r;
    },
    GetOrderInfo(state, r) {
        state.getorderinfo = r;
    }
}; //update state

const actions = {
    async actions_getAddressInfo({commit}) {
        let result = await GetAddressInfo();
        if (result.code == 200) {
            commit('ADDRESSINFO',result.data)
            return 'ok'
        } else {
            return Promise.reject('获取地址信息失败')
        }
    },
    async actions_GetOrderInfo({commit}) {
        let r = await GetOrderInfo();
        if (r.code == 200) {
            commit('GetOrderInfo',r.data)
            return 'ok'
        } else {
            return Promise.reject('获取订单信息')
        }
    }
}; //可处理异步

const getters = {
}; //理解为计算属性 使组件获取仓库数据更方便

export default {
    state,
    mutations,
    actions,
    getters
}