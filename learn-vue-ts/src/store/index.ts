import {defineStore} from 'pinia'
import {ref} from "vue";
import {RouteRecordRaw} from "vue-router";

export const useAppStore = defineStore('appStore', () => {
    const routes = ref<RouteRecordRaw[]>([])

    const setRoutes = (routesParma: RouteRecordRaw[]) => {
        routes.value = routesParma
    }

    return {routes, setRoutes}
})

export const useTestStore = defineStore("testStore", () => {
    const testStore = ref(1)
    const setTestStore = (testStore) => {
        console.log(testStore, "testStore")
        testStore.value = testStore
    }
    const increment=()=> {
        testStore.value++
    }
    return {testStore, setTestStore,increment}
})
