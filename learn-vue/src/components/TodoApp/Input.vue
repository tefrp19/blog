<script setup>
import {ref} from "vue";

const emit = defineEmits(['addTask'])
const text = ref('')

function handleClick() {
  emit('addTask',text.value)
  text.value=''
}
</script>

<template>
  <input v-model="text"/>
  <button @click="handleClick">add</button>
</template>

