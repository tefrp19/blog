<script setup lang="ts">
import TaskTable from './Table.vue'
import Action from './Action.vue'
import { reactive, ref } from 'vue';
import { task } from './index.js';

// export interface task {
//     userId: number,
//     id: number,
//     title: string,
//     completed: boolean
// }
const data: task[] = [
    {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": true
    },
    {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "userId": 1,
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    }
]

const tasks:task[] = reactive(data)

function changeCompleted(task: task) {
    // console.log(task);
    // console.log(task.completed);
    task.completed=task.completed
}
</script>

<template>
    <div class="container">
        <Action />
        <TaskTable :tasks="tasks" @change-completed="changeCompleted" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    height: 800px;
    width: 1600px;
    /* background-color: antiquewhite; */
}
</style>