<script setup>
import List from "./List";
import Input from "./Input";
import {reactive} from "vue";

const tasks = reactive([
  {
    id: 1,
    checked: true,
    name: 'doA',
  }
  , {
    id: 2,
    checked: false,
    name: 'doBa',
  }])

function changeChecked(task) {
  task.checked = !task.checked
}

function deleteTask(taskId) {
  tasks.splice(tasks.findIndex(task => task.id === taskId), 1)
}

function addTask(taskName) {
  if (taskName) {
    tasks.push({
      id: new Date(),
      checked: false,
      name: taskName
    })
  }
}

</script>

<template>
  <Input @add-task="addTask"/>
  <List :tasks="tasks" @change-checked="changeChecked" @delete-task="deleteTask"/>

</template>

