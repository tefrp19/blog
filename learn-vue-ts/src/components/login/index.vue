<template>
  <el-button @click="login">登录</el-button>
</template>

<script setup lang="ts">
import {addRoutes, constantRoutes, getDynamicRoutes} from "../../router";
import {useAppStore} from "../../store";

const appStore = useAppStore()
const login = async () => {
  const newRoutes = await getDynamicRoutes()
  const newRoutesStr = JSON.stringify(newRoutes)
  localStorage.setItem("dynamicRoutes", newRoutesStr)
// 1. 添加动态路由
  addRoutes()
// 2. 更新菜单视图
  appStore.menuList = constantRoutes
  appStore.num++
}
</script>


<style scoped>

</style>