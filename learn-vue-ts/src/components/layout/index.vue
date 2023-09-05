<template>
  <el-row>
    <el-col :span="4">
      <el-menu
          default-active="1"
          :default-openeds="['3']"
          class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="1">
            <el-icon>
              <icon-menu/>
            </el-icon>
              首页
          </el-menu-item>
        </router-link>
        <router-link to="/for-ppt">
          <el-menu-item index="2">
            <el-icon>
              <icon-menu/>
            </el-icon>
              多个图表（动态路由）
          </el-menu-item>
        </router-link>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
<!--            <span>业务（动态路由）</span>-->
          </template>
          <router-link to="/business/form-validation">
            <el-menu-item index="3-1">表单校验文件是否上传</el-menu-item>
          </router-link>
          <router-link to="/business/task">
            <el-menu-item index="3-2">task</el-menu-item>
          </router-link>
          <router-link to="/business/table-validation">
            <el-menu-item index="3-3">可编辑表格校验</el-menu-item>
          </router-link>
        </el-sub-menu>
        <router-link to="/v-model-with-props">
          <el-menu-item index="6">
            <el-icon>
              <setting/>
            </el-icon>
            v-model-with-props
          </el-menu-item>
        </router-link>
      </el-menu>
      <DynamicMenus :b="1"/>
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

