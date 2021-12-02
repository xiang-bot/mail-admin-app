import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false,
    // 上面是用于切换菜单的闭合状态
    user: getUserCookie(),
    // 上面的是你的用户信息
    menuRoutes: [],
    // 存储菜单的路由
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    changMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
      // 这里主要是你登录了 你的信息在刷新后就没有了 所以要
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    changMenuRoutes({ commit }, routes) {
      commit('changMenuRoutes', routes);
    },
  },
  modules: {
  },
});
