// stores/counter.js
import { defineStore } from 'pinia'
import {ref} from "vue";

export const appStore = defineStore('counter', () => {
    const menuList=ref([])


    return { menuList }
})