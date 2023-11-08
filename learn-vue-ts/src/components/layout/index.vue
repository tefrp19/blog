<template>
  <el-row>
    <el-col :span="4">
      <DynamicMenus :b="2"/>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="logout">登出</el-button>
    </el-col>
    <el-col :span="20">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import router, {addRoutes, constantRoutes, getDynamicRoutes, removeRoutes} from "../../router";
import {useAppStore} from "../../store";
import DynamicMenus from "./dynamicMenus.tsx"

// const handleOpen = (key: string, keyPath: string[]) => {
//   // console.log(key, keyPath)
// }
// const handleClose = (key: string, keyPath: string[]) => {
//   // console.log(key, keyPath)
// }

const {routes} = useAppStore()
const login = async () => {
  const newRoutes = await getDynamicRoutes()
  const newRoutesStr = JSON.stringify(newRoutes)
  localStorage.setItem("dynamicRoutes", newRoutesStr)
//  添加动态路由并更新视图
  addRoutes()
}

// 1. 删除动态路由
const logout = () => {
  removeRoutes()
}


</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

