import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(Avue,{axios});
app.use(createPinia())
app.use(router)

app.mount('#app')
