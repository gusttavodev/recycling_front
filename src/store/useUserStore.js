import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: [],
    /** @type {boolean} */
    authenticated: false
  }),
  getters: {
    authenticated(state) {
      return state.authenticated
    },
    user(state){
        return state.user
    }
  },
  actions: {
    login(){
        return axios.get('/me').then(({data})=> {
            this.authenticated = true
            this.user = data
        }).catch(()=>{
            this.authenticated = false
            this.user = {}
        })
    },
    logout(){
        this.authenticated = false
        this.user = {}
    }
  },
})