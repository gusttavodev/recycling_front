import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
    authenticated: false
  }),
  getters: {
    // authenticated(state) {
    //   return state.authenticated
    // },
    authUser(state){
      return state.user
    }
  },
  actions: {
    storeUser(data){
      this.authenticated = true
      this.user = data
    },
    logout(){
        this.authenticated = false
        this.user = {}
    }
  },
})