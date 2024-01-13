import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import VXETable from 'vxe-table'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import formCreate from '@form-create/element-ui'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from "./router/index.ts"
import {createPinia} from "pinia";
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import {createPermissionDirective} from "./components/learnVue/directive/createDirective.ts";

const pinia = createPinia()
export const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
}).use(VXETable).use(formCreate).use(router).use(pinia).use(VueVideoPlayer)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
createPermissionDirective(app)
app.mount("#app")
