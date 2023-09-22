import {defineStore} from 'pinia'
import {ref} from "vue";
import {RouteRecordRaw} from "vue-router";

export const useAppStore = defineStore('appStore', () => {
    const routes = ref<RouteRecordRaw[]>([])
    const num = ref(0)

    const setRoutes=(routesParma:RouteRecordRaw[])=>{
        routes.value=routesParma
    }

    return {routes, num,setRoutes}
})
