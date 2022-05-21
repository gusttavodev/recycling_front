import { createStore, createLogger } from 'vuex'
import auth from './modules/Auth'
import createPersistedState from 'vuex-persistedstate'


const store = createStore({
  modules: {
    plugins:[
      createPersistedState(),
      createLogger()
    ],
    auth
  }
})

export default store
