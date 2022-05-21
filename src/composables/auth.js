import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { createToaster } from "@meforma/vue-toaster";
import dataFormat from "../service/dataFormat";
import Cookie from "../service/cookie";

export default function useAuth() {
    const errors = ref({})
    const router = useRouter()
    const store = useStore()
    const toaster = createToaster({
        position: "top-right"
    });
    
    const authLogin = async (params) => {        
        errors.value = {}

        try {
            const response = await axios.post('/login', params)

            const token = `${response.data.token_type} ${response.data.access_token}`
            Cookie.setToken(token)
            store.dispatch('auth/login', response.data.data)
            router.push({name: 'index'})

        } catch (e) {
            if (e.response.status === 422) {  
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }       
    }

    const authRegister = async (data) => {
        errors.value = ''
        try {
            await axios.post('/register', data)
            // await router.push({ name: 'companies.index' })
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value += e.response.data.errors[key][0] + ' ';
                }
            }else if(e.response.status === 401){
                console.log("e.response => ", e.response)
                // toaster()
            }
        }

    }

    const authLogout = async () => {
        try {
            await axios.post('/logout')
            Cookie.deleteToken()
            await router.push({ name: 'login' })
        } catch (e) {
            console.log("e.response => ", e.response)
        }

    }

    return {
        errors,
        authLogin,
        authRegister,
        authLogout,
        store
    }
}