import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster";
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import './index.css'
import Input from './components/Shared/input.vue'
import axios from './plugins/axios';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toaster)

app.component('v-input', Input)

app.config.globalProperties.$axios = axios;

app.mount('#app')