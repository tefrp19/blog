<!--使用 model-value 单向绑定 dialog visible 值，不使用 v-model 进行双向绑定-->
<template>
  <el-dialog
      :model-value="dialogVisible"
      @close="emit('closeDialog')"
      title="Tips"
  >
  </el-dialog>
  <el-button @click="fn(dialogVisible)">测试在template中解构props</el-button>
  <el-button @click="testProps">测试props</el-button>
</template>

<script setup lang="ts">
const props=defineProps<{
  dialogVisible:boolean,
  prop1: number
}>()
const emit=defineEmits(["closeDialog"])
const fn=(param:boolean)=>{
  console.log(param)
}

const testProps=()=>{
  console.log("props.prop1",props)
}
</script>



<style scoped>

</style>