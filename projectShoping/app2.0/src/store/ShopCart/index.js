import { GetCartList, DelGoods, ChangeGoodsCheck } from '@/api/index'
const state = {
    getcartlist: []
};

const mutations = {
    GETCARTLIST(state, result) {
        state.getcartlist = result;
    }
};

const actions = {
    async actions_getCartList({ commit }) {
        let result = await GetCartList();
        if (result.code == 200) {
            commit('GETCARTLIST', result.data);
        }
    },
    async actions_delGoods({ commit }, skuId) {
        let result = await DelGoods(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('error'))
        }
    },
    async actions_ChangeChecked({ commit }, { skuId, isChecked }) {
        let result = await ChangeGoodsCheck(skuId, isChecked);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('error'))
        }
    }
};

const getters = {
    cartList(state) {
        return state.getcartlist[0] || {}
    },

};

export default {
    state,
    mutations,
    actions,
    getters
}

