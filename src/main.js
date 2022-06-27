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
import TextArea from './components/Shared/textarea.vue'
import select from './components/Shared/select.vue'
import inputColor from './components/Shared/input-color.vue'
import BarChart from './components/Shared/bar-chart.vue'

import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toaster)
app.use(Vue3ColorPicker)

app.component('v-input', Input)
app.component('v-toggle', Toggle)
app.component('v-modal', Modal)
app.component('v-textarea', TextArea)
app.component('v-select', select)
app.component('v-input-color', inputColor)
app.component('v-bar-chart', BarChart)

app.config.globalProperties.$axios = axios;

app.mount('#app')