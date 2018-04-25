import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    resizable: false,
    adaptive: false,
    draggable: false,
    islogin: false
  },
  mutations: {
    change (state, payload) {
      state.resizable = payload.resizable
      state.adaptive = payload.adaptive
      state.draggable = payload.draggable
    },
    token (state, payload) {
      localStorage.setItem('token', payload.token)
      state.islogin = true
    },
    logout (state) {
      localStorage.removeItem('token')
      state.islogin = false
    }
  },
  actions: {

  }
})
