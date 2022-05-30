import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { createToaster } from "@meforma/vue-toaster";
import dataFormat from "../service/dataFormat";
import Cookie from "../service/cookie";
import {useUserStore} from '../store/useUserStore'

export default function useAuth() {
    const errors = ref({})
    const router = useRouter()
    const store = useUserStore()
    const toaster = createToaster({
        position: "top-right"
    });
    
    const authLogin = async (params) => {        
        errors.value = {}

        try {
            const response = await axios.post('/login', params)

            const token = `${response.data.token_type} ${response.data.access_token}`
            Cookie.setToken(token)          
            router.push({name: 'index'})

        } catch (e) {
            if (e.response.status === 422) {  
                toaster.warning("Verifique os campos")
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
            }
        }       
    }

    const authRegister = async (data) => {
        errors.value = ''
        try {
            const response = await axios.post('/register', data)
            const token = `${response.data.token_type} ${response.data.access_token}`
            Cookie.setToken(token)           
            router.push({name: 'index'})
        } catch (e) {
            if (e.response.status === 422) {  
                toaster.warning("Verifique os campos")
                errors.value = dataFormat.formatErrors(e.response.data.errors)
            }else if(e.response.status === 401){
                toaster.warning(e.response.data.message)
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