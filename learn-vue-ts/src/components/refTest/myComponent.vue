<template>
  <div>自定义组件</div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const state = ref(1)
const fn = () => {
  console.log("fn")
}
defineExpose({
  state,
  fn
})
</script>


<style scoped>

</style>