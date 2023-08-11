<template>
  <el-input-number v-model="num" @change="handleChange" @blur="handleBlur"/>
  <input type="number" @change="handleNativeChange" @blur="handleNativeBlur" @keypress="handleNativeKeydown">
</template>

<script setup lang="ts">
import {ref} from "vue";

const num = ref()

const handleChange = (value) => {
  console.log("change",value)
}

const handleBlur = (e) => {
  console.dir("blur", e)
  // console.dir("blur", e.target)
  console.log("num",num.value)
}

const handleNativeChange=(e)=>{

  // console.log(e.target.value)
}

const handleNativeBlur=(e)=>{
  console.dir(e.target)
  console.dir(e.target.value)
}

const handleNativeKeydown=(e)=>{
  // console.log("keyCode",e.keyCode)
  // console.log("String",String.fromCharCode(e.keyCode))
  // return (/[\d]/.test(String.fromCharCode(e.keyCode)))
  // if (String.fromCharCode(e.keyCode)==="1") return
}

</script>

<style scoped>

</style>