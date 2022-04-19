import { getChartsList } from '@/api/home'
const state = {
    chartsList: {}
}

const mutations = {
    CHANGE_LIST: (state, result) => {
        state.chartsList = result;
    },
}


const actions = {
    async getCharts({ commit }) {
        let result = await getChartsList();
        if (result.code === 20000) {
            commit('CHANGE_LIST', result.data);
        }
    },
}
export default {
    state,
    mutations,
    actions
}
