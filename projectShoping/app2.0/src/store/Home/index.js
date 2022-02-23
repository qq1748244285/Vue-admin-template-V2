import { GetThreeList, GetBannerList ,GetFloorList} from '@/api/index.js'

const state = {
    categoryList: [], //三级列表初始数据
    bannerList: [],//轮播图数据
    floorList: [], //floor数据
}; //存储

const mutations = {
    CATEGORYLIST(state, res) { //修改state的方法名
        state.categoryList = res;
    },
    BANNERLIST(state, res) {
        state.bannerList = res;
    },
    FLOORLIST(state, res) {
        state.floorList = res;
    }
}; //update state

const actions = {
    //异步获取三级列表数据
    async actions_categoryList({ commit }) {
        let result = await GetThreeList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //异步获取轮播图数据
    async actions_GetBannerList({ commit }) {
        let result = await GetBannerList();
        if (result.code == 200) {
            commit('BANNERLIST', result.data)
        }
    },
    //异步获取floor数据
    async actions_GetFloorList({commit}){
        let result = await GetFloorList();
        if(result.code==200){
            commit('FLOORLIST',result.data);
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