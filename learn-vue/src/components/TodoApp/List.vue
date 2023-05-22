<script setup>

defineProps(['tasks'])

</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id" :class="task.checked?'checked':''">
      <input type="checkbox" :checked="task.checked" @click="$emit('changeChecked',task)">
      <span>{{ task.name }}</span>
      <button @click="$emit('deleteTask',task.id)">delete</button>
    </li>
  </ul>
</template>

<style scoped>
li {
  margin: 5px 0;
}

span {
  margin: 0 10px;
}

.checked span {
  text-decoration-line: line-through;
}
</style>

