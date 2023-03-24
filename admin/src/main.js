import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/utils/axios.config"

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store).use(Particles)
.use(router).use(ElementPlus).mount('#app')
