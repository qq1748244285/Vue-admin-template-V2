import { getCode, registerUser, userLogin, autoLogin, loginOut } from '@/api/index.js'

//引入获取token
import { SetToken, GetToken, RemoveToken } from '@/utils/token'

const state = {
    token: GetToken(),
    userInfo: {}
}; //存储

const mutations = {
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEARUSER(state) {
        state.token = '';
        state.userInfo = {};
        RemoveToken();
    }
}; //update state

const actions = {
    async actions_getCoed({ commit }, phone) {
        let r = await getCode(phone);
        if (r.code == 200) {
            return r.data
        } else {
            return Promise.reject(new Error('error_code'))
        }
    },
    async actions_registerUser({ commit }, data) {
        let r = await registerUser(data);
        if (r.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('error_register'))
        }
    },
    //登录页面 获取token
    async actions_userLogin({ commit }, data) {
        let r = await userLogin(data);
        if (r.code == 200) {
            commit('USERLOGIN', r.data.token);
            //持久化存储
            SetToken(r.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('获取token失败'))
        }
    },
    //自动登录 通过headres中的token
    async actions_autoLoign({ commit }) {
        let r = await autoLogin();
        if (r.code == 200) {
            commit('GETUSERINFO', r.data);
        } else {
            return Promise.reject(new Error('获取用户信息失败啊啊 '))
        }

    },
    //退出登录
    async actions_loginOut({ commit }) {
        let r = await loginOut;
        if (r) {
            // 清理用户信息
            commit('CLEARUSER');
            return 'ok'
        } else {
            return Promise.reject(new Error('跳转登录页'))
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