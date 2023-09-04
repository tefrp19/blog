<script setup lang="ts">
import TaskTable from './Table.vue'
import Action from './Action.vue'
import { onMounted, ref } from 'vue';
import { task } from './index.js';

const tasks = ref<task[]>([])

onMounted(async () => {
    try {
        const data: task[] = await (await fetch('https://jsonplaceholder.typicode.com/todos')).json()
        tasks.value = data
    } catch (error) {
        console.log(error);
    }


})


async function filterTasks(taskId: number) {
    try {
        const data: task = await (await fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`)).json()
        tasks.value = [data]
    } catch (error) {
        console.log(error);
    }
}
</script>

<template>
    <div class="container">
        <Action @filter-tasks="filterTasks" />
        <TaskTable :tasks="tasks" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    height: 800px;
    width: 1600px;
}
</style>