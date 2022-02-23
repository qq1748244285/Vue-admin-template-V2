import { GetSearchInfo } from '@/api/index.js'

const state = {
    searchList: {}
}; //存储

const mutations = {
    SEARCHLIST(state, res) {
        state.searchList = res;
    }

}; //update state

const actions = {
    //获取搜索数据
    async acitons_getSearchList({ commit }, params = {}) {
        //params discpath接受参数
        let result = await GetSearchInfo(params)
        if (result.code == 200) {
            commit('SEARCHLIST', result.data)
        }
    }
}; //可处理异步

const getters = {
    //state - > 当前仓库的state
    goodsList(state){
        return state?.searchList?.goodsList||[]
    },
    trademarkList(){
        return state?.searchList?.trademarkList||[]
    },
    attrsList(){
        return state?.searchList?.attrsList||[]
    }
}; //理解为计算属性 使组件获取仓库数据更方便

export default {
    state,
    mutations,
    actions,
    getters
}