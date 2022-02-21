import { GetThreeList } from '@/api/index.js'

const state = {
    categoryList: [], //三级列表初始数据
}; //存储

const mutations = {
    CATEGORYLIST(state, res) { //修改state的方法名
        state.categoryList = res;
    }
}; //update state

const actions = {
    //异步获取三级列表数据
    async actions_categoryList({ commit }) {
        let result = await GetThreeList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    }
}; //可处理异步

const getters = {}; //理解为计算属性 使组件获取仓库数据更方便

export default {
    state,
    mutations,
    actions,
    getters
}