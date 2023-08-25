<template>
  <el-row>
    <el-col :span="4">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
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

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

