
<template>
  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="login">

          <v-input
            v-model="form.email"
            :value="form.email"
            :error="errors?.email"
            class="mt-10"
            label="Email"
            type="text"
            
          />

          <v-input
            v-model="form.password"
            :value="form.password"
            :error="errors?.password"
            class="mt-10"
            label="Senha"
            type="password"
            
          />

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Lembrar</label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"> Esqueceu sua senha? </a>
            </div>
          </div>

          <div>
            <button submit class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Entrar</button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500"> Ainda não possui uma conta ? <router-link to="register"  class="font-medium text-indigo-600 hover:text-indigo-500">Criar uma</router-link></span>
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
        email: '',
        password: ''
    })

    const { errors, authLogin } = useAuth()
    
    const login = async () => {
      await authLogin({ ...form })     
      // store.dispatch('auth/login', {email: 'gusttavo212@gmail.com', password: '12345678'})
    }

    return {
      login,
      form,
      errors
    }
  }
}
</script>