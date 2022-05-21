
<template>
  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="register">
          <v-input
            v-model="form.name"
            :value="form.name"
            :error="errors?.name"
            class="mt-10"
            label="Nome"
            type="text"
            
          />
          <v-input
            v-model="form.email"
            :value="form.email"
            :error="errors?.email"
            class="mt-10"
            label="Email"
            type="email"
            
          />
          <v-input
            v-model="form.password"
            :value="form.password"
            :error="errors?.password"
            class="mt-10"
            label="Senha"
            type="password"
            
          />
         <v-input
            v-model="form.password_confirmation"
            :value="form.password_confirmation"
            :error="errors?.password_confirmation"
            class="mt-10"
            label="Confirmar Senha"
            type="password"            
          />
         
          <div>
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Registrar</button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Já possui uma conta ? <router-link to="login"  class="font-medium text-indigo-600 hover:text-indigo-500">Entrar</router-link></span>
            </div>
          </div>
        </div>
      </div>
</template>
<script >
import { reactive } from 'vue'
import useAuth from '../../composables/auth'
import { ExclamationCircleIcon } from '@heroicons/vue/solid'

export default {
  components: {
    ExclamationCircleIcon
  },
  setup () {
    const form = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    })

    const { errors, authRegister } = useAuth()
    
    const register = async () => {
      await authRegister({ ...form })     
    }

    return {
      register,
      form,
      errors
    }
  }
}
</script>