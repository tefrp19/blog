<script lang="ts" setup>
import { task } from './index.js'
defineProps<{
    tasks: task[]
}>()

</script>
<template>
    <el-table :data="tasks" border>
        <el-table-column prop="id" label="事项id" />
        <el-table-column prop="userId" label="用户id" />
        <el-table-column prop="title" label="名称" />
        <el-table-column prop="completed" label="是否完成">
            <template #default="scope">
                <el-switch v-model="scope.row.completed" @change="$emit('changeCompleted',scope.row)"/>
            </template>
        </el-table-column>

    </el-table>
</template>
  
 
  