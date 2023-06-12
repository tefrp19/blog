# 注册组件

在使用 `<script setup>` 的单文件组件中，导入的组件可以直接在模板中使用，无需注册：

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

在vue2中：

```vue
<script>
import ComponentA from './ComponentA.vue' // 导入组件
export default{
    components: {
        'ComponentA':ComponentA // 注册组件
    }
}
</script>

<template>
  <ComponentA />
</template>
```



