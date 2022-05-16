import { createStore, createLogger } from 'vuex'
import auth from './modules/Auth'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  plugins:[
    createPersistedState(),
    createLogger()
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth
  },
})

export default store
