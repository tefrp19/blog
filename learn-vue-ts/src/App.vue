<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<script setup lang="ts">

import {onBeforeMount, onMounted} from "vue";
import {addRoutes} from "./router";

onBeforeMount(async () => {
  addRoutes()
})

</script>

<style>

</style>

