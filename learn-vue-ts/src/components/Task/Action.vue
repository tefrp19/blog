<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')
</script>

<template>
    <header>
        <el-input v-model="input" placeholder="Please input" @input="$emit('filterTasks',input)"/>
    </header>
</template>

<style scoped>
header {
    display: flex;
    margin: 50px auto;
    height: 100px;
    width: 100%;
    background-color: rgb(222, 215, 250);
    justify-content: center;
    align-items: center;
}
</style>