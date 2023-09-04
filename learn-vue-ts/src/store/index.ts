import {defineStore} from 'pinia'
import {ref} from "vue";
import {RouteRecordRaw} from "vue-router";

export const useAppStore = defineStore('appStore', () => {
    const menuList = ref<RouteRecordRaw[]>([])
    const num = ref(0)


    return {menuList, num}
})
