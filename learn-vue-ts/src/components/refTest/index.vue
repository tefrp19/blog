<template>
  <MyComponent ref="myComponentRef"/>
</template>

<script setup lang="ts">
import MyComponent from "./myComponent.vue";
import {onMounted, ref} from "vue";

const myComponentRef=ref()

onMounted(()=>{
  console.log("myComponentRef",myComponentRef)
  console.log("myComponentRef.value?.state",myComponentRef.value?.state)
})

</script>


<style scoped>

</style>