<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<script setup lang="ts">

import {onBeforeMount} from "vue";
import {addRoutes} from "./router";

onBeforeMount(() => {
  console.log("onBeforeMount")
  // 尝试从 localstorage 中读取路由数据
  addRoutes()
})

</script>

<style>

</style>

