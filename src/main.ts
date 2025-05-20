import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { useDark } from '@vueuse/core'
import 'amfe-flexible';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './style.css'
import App from './App.vue'

const app = createApp(App);
useDark();
(window as any)._AMapSecurityConfig = {
    securityJsCode: "a767621926c659769e5b28adeec9c6f8",
};

app.use(ElementPlus)
app.mount('#app')
