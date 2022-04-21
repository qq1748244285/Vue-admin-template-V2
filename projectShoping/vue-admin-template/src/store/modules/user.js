import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'

//引入路由
import router from '@/router'

// //获取异步路由列表 用于对比判断哪些路由应该显示
const ValidateRouters = (asyncRoutes, routes) => {
  return asyncRoutes.reduce((box, item) => {
    if (routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        ValidateRouters(item.children, routes);
      }
      box.push(item)
    }
    return box
  }, [])
}




const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [], //服务器返回的菜单信息[根据角色返回的标记-元素为字符串]
    buttons: [],//服务器返回的按钮权限信息[元素为字符串]
    roles: [],//角色信息
    AsyncRoutes: [],//权限验证完毕后的路由列表
    AllRoutes: [], //普通列表 +  验证结束列表 + 错误路由  集合
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, data) => {
    state.name = data.name;
    state.avatar = data.avatar;
    //菜单权限标记
    state.routes = data.routes;
    //按钮权限标记
    state.buttons = data.buttons;
    //角色按钮标记
    state.roles = data.roles;
  },
  SET_RESULT_ROUTERS: (state, result) => {
    state.AsyncRoutes = result; 

    //拼接最终显示的完整路由列表 - 已根据权限鉴权处理后的路由列表
    state.AllRoutes = [...constantRoutes,...result,  anyRoutes];
    //向路由列表中添加处理后的路由
    router.addRoutes(state.AllRoutes);
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    if (result.code == 20000) {
      commit('SET_TOKEN', result.data.token);
      setToken(result.data.token);
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data;
        //通过匹配计算出该角色下拥有的菜单和路由权限
        commit('SET_RESULT_ROUTERS', ValidateRouters(asyncRoutes, data.routes));
        commit('SET_USER_INFO', data);
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

