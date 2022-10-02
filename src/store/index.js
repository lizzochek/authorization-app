import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [],
    curUser: {},
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getCurUser(state) {
      return state.curUser;
    },
  },
  mutations: {
    async fetchAllUsers(state) {
      const response = await fetch('/api/users');
      const users = await response.json();
      state.users = users;
    },
    async createUser(_, data) {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: data }),
      });
      return await response.json();
    },
    async getCurrentUser(state, email) {
      const user = state.users.find((el) => el.email === email);
      this.state.curUser = user;
    },
    setCurrentUser(state, data) {
      state.curUser = data;
    },
  },
  actions: {
    fetchAllUsers({ commit }) {
      commit('fetchAllUsers');
    },
    createUser({ commit }, data) {
      commit('createUser', data);
    },
    getCurrentUser({ commit }, email) {
      commit('getCurrentUser', email);
    },
    setCurrentUser({ commit }, data) {
      commit('setCurrentUser', data);
    },
  },
  modules: {},
});
