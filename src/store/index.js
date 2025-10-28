import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    token: null
  },
  
  mutations: {
    SET_AUTH(state, { user, token }) {
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      
      // Store in localStorage for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    },
    
    CLEAR_AUTH(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
  },
  
  actions: {
    login({ commit }, { username, token }) {
      const user = { username };
      commit('SET_AUTH', { user, token });
    },
    
    logout({ commit }) {
      commit('CLEAR_AUTH');
    },
    
    // Check for existing auth on app start
    checkAuth({ commit }) {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('auth_user');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        commit('SET_AUTH', { user, token });
      }
    }
  },
  
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user
  }
});