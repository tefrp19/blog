<script setup lang="ts">
import {ref} from "vue";

const isExpanded = ref(false)
</script>

<template>
  <el-card>
    <div class="wrapper">
      <el-button @click="isExpanded=!isExpanded">展开/关闭</el-button>
      <aside v-show="isExpanded"/>
    </div>

  </el-card>

</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
}

aside {
  border: 1px solid #000;
  width: 300px;
  height: 900px;
}
</style>