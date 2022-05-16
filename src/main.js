import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import store from './store/index'
import router from './router';
import App from './App.vue'

import axios from './plugins/axios';

import './index.css'

import Input from './components/Shared/input.vue'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(Toaster)

app.component('v-input', Input)

app.config.globalProperties.$axios = axios;

app.mount('#app')