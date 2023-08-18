<script setup lang="ts">
import {ref} from "vue";

const isExpanded = ref(false)
</script>

<template>
  <el-card>
    <div class="wrapper">
      <el-button @click="isExpanded=!isExpanded">展开/关闭</el-button>
      <Transition>
        <aside v-show="isExpanded"/>
      </Transition>
    </div>

  </el-card>

</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  height: 900px;
}

aside {
  border: 1px solid #000;
  width: 300px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>