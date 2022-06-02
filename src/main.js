import { createApp } from 'vue'
import Toaster from "@meforma/vue-toaster"
import axios from './plugins/axios';
;
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import './index.css'

import Input from './components/Shared/input.vue'
import Toggle from './components/Shared/toggle.vue'
import Modal from './components/Shared/modal.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toaster)

app.component('v-input', Input)
app.component('v-toggle', Toggle)
app.component('v-modal', Modal)

app.config.globalProperties.$axios = axios;

app.mount('#app')