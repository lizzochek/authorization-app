import { createStore } from 'vuex';

export default createStore({
  state: {
    users: [],
    curUser: {},
    isLoggedIn: false,
    isAdmin: false,
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
    getCurUser(state) {
      return state.curUser;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    isAdmin(state) {
      return state.isAdmin;
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
    async removeUser(_, email) {
      await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    },
    async giveAdminRights(_, email) {
      await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    },
    async changePassword(state, { email, password }) {
      state.curUser.password = password;
      await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    },
    setCurrentUser(state, data) {
      state.curUser = data;
    },
    setAuthentication(state, { isLoggedIn, admin }) {
      state.isLoggedIn = isLoggedIn;
      state.isAdmin = admin;
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
    giveAdminRights({ commit }, email) {
      commit('giveAdminRights', email);
      commit('fetchAllUsers');
    },
    removeUser({ commit }, email) {
      commit('removeUser', email);
      commit('fetchAllUsers');
    },
    setAuthentication({ commit }, { isLoggedIn, admin }) {
      commit('setAuthentication', { isLoggedIn, admin });
    },
    changePassword({ commit }, { email, password }) {
      commit('changePassword', { email, password });
    },
  },
});
