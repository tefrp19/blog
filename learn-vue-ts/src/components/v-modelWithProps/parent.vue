<template>
  <div>
    <el-button  @click="dialogVisible = true">
      打开 dialog
    </el-button>
    <child :dialogVisible="dialogVisible" prop1=2 @close-dialog="closeDialog"/>

  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import child from "./child.vue"

const dialogVisible = ref(false)
const closeDialog=()=>{
  dialogVisible.value=false
}
</script>
<style scoped>

</style>
