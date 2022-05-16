import axios from 'axios'

const state = {
    authenticated:false,
    user:{}
}

// getters
const getters = {
    authenticated: (state) => {
        return state.authenticated
    },
    user(state){
        return state.user
    }
}

// actions
const actions = {
    login({commit}){
        return axios.get('/api/user').then(({data})=>{
            commit(SET_USER,data)
            commit(SET_AUTHENTICATED,true)
            router.push({name:'dashboard'})
        }).catch(({response:{data}})=>{
            commit(SET_USER,{})
            commit(SET_AUTHENTICATED,false)
        })
    },

    logout({commit}){
        commit(SET_USER,{})
        commit(SET_AUTHENTICATED,false)
    }
}

// mutations
const mutations = {
    SET_AUTHENTICATED (state, value) {
        state.authenticated = value
    },
    SET_USER (state, value) {
        state.user = value
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}