<template>
  <el-row>
    <el-col :span="4">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <router-link to="/login">
          <el-menu-item index="1">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <template #title>
              登录
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/for-ppt">
          <el-menu-item index="2">
            <el-icon>
              <icon-menu/>
            </el-icon>
            <template #title>
              多个图表
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/form-validation">
          <el-menu-item index="3">
            <el-icon>
              <document/>
            </el-icon>
            <template #title>
              表单校验文件是否上传
            </template>
          </el-menu-item>
        </router-link>
        <router-link to="/task">
          <el-menu-item index="4">
            <el-icon>
              <setting/>
            </el-icon>
            <template #title>task</template>
          </el-menu-item>
        </router-link>
        <router-link to="/table-validation">
          <el-menu-item index="5">
            <el-icon>
              <setting/>
            </el-icon>
            <template #title>可编辑表格校验</template>
          </el-menu-item>
        </router-link>
        <el-button @click="login">登录</el-button>
        <el-button @click="logout">登出</el-button>
      </el-menu>
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
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {RouteRecordRaw, useRouter} from "vue-router";
import router from "./router";

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

// 1. 重置路由映射规则
// 2. 重置菜单视图
const resetRouter = () => {
  const routes = [
    {
      path: '/form-validation',
      name: "formValidation",
      component: () => import("/src/components/formValidation/index.vue")
    },
    {
      path: '/task',
      name: 'task',
      component: () => import("/src/components/Task/index.vue")
    },
  ]
  const router = useRouter()
  router.addRoute()
}

// 1. 添加动态路由
const login = () => {
  const newRoutes = [
    {
      path: '/task',
      name: 'task',
      component: () => import("/src/components/Task/index.vue"),
      meta: {
        isDynamic: true
      }
    },
  ]
  newRoutes.forEach(route => {
    router.addRoute(route)
  })
}

// 1. 删除动态路由
const logout = () => {
  router.getRoutes().forEach(route => {
    const {isDynamic}=route.meta
    if (isDynamic){
      const {name}=route
      console.log("name",name)
      router.removeRoute(name as string)
    }
  })
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

