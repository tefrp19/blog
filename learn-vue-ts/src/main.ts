import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import VXETable from 'vxe-table'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from "./router/index.ts"
import {createPinia} from "pinia";
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const pinia = createPinia()
export const app= createApp(App)
app.use(ElementPlus).use(VXETable).use(router).use(pinia).use(VueVideoPlayer)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount("#app")
