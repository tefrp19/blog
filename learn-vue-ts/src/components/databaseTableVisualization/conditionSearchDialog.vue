<template>
  <el-button type="primary" @click="initComponent">查询</el-button>
  <el-dialog
      v-model="dialogVisible"
      width="700"
      top="4vh"
      append-to-body
      draggable
  >
    <el-form
        ref="ruleFormRef"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <el-form-item v-for="item in formItems" :label="item.name+'：'" :prop="'name'">
        <!--        数值型-->
        <template v-if="item.type.includes('int')||item.type.includes('float')">
          <el-row gutter="20">
            <el-col span="10">
              <el-input-number v-model="item.greaterThan"/>
            </el-col>
            <el-col span="4">
          <span>
            --
          </span>
            </el-col>
            <el-col span="10">
              <el-input-number v-model="item.lessThan"/>
            </el-col>
          </el-row>
        </template>
        <!--        文本型-->
        <template v-if="item.type==='varchar'">
          <el-row gutter="20">
            <el-col span="6">
              <el-select v-model="item.pattern" style="width: 120px;" placeholder="选择">
                <el-option
                    :key="'like'"
                    :label="'模糊查询'"
                    :value="'like'"
                />
                <el-option
                    :key="'equal'"
                    :label="'精确查询'"
                    :value="'equal'"
                />
              </el-select>
            </el-col>
            <el-col span="18">
              <el-input v-model=" item.condition"/>
            </el-col>
          </el-row>
        </template>
        <!--日期和日期时间型-->
        <template v-if="item.type==='date'||item.type==='timestamp'">
          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                    :type="item.type==='date'?'date':'datetime'"
                    v-model="item.startTime"
                    placeholder="开始时间"
                    value-format="x"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
              <span class="text-gray-500">--</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-date-picker
                    :type="item.type==='date'?'date':'datetime'"
                    v-model="item.endTime"
                    placeholder="结束时间"
                    value-format="x"
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </el-form-item>

      <!--      <el-form-item :label="'列1数值型'+'：'" :prop="'name'">-->
      <!--        <el-row gutter="20">-->
      <!--          <el-col span="10">-->
      <!--            <el-input-number v-model="ruleForm.greaterThan"/>-->
      <!--          </el-col>-->
      <!--          <el-col span="4">-->
      <!--          <span>-->
      <!--            &#45;&#45;-->
      <!--          </span>-->
      <!--          </el-col>-->
      <!--          <el-col span="10">-->
      <!--            <el-input-number v-model="ruleForm.lessThan"/>-->

      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'列2文本型'+'：'" :prop="'name'">-->
      <!--        <el-row gutter="20">-->
      <!--          <el-col span="6">-->
      <!--            <el-select v-model="ruleForm.pattern" style="width: 120px;" placeholder="选择">-->
      <!--              <el-option-->
      <!--                  :key="'like'"-->
      <!--                  :label="'模糊查询'"-->
      <!--                  :value="'like'"-->
      <!--              />-->
      <!--              <el-option-->
      <!--                  :key="'equal'"-->
      <!--                  :label="'精确查询'"-->
      <!--                  :value="'equal'"-->
      <!--              />-->
      <!--            </el-select>-->
      <!--          </el-col>-->
      <!--          <el-col span="18">-->
      <!--            <el-input v-model=" ruleForm.condition"/>-->
      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'列3日期型'+'：'" :prop="'name'" required>-->
      <!--        <el-row gutter="20">-->
      <!--          <el-col :span="11">-->
      <!--            <el-form-item prop="date1">-->
      <!--              <el-date-picker-->
      <!--                  v-model="ruleForm.startTime"-->
      <!--                  placeholder="开始时间"-->
      <!--                  style="width: 100%"-->
      <!--              />-->
      <!--            </el-form-item>-->
      <!--          </el-col>-->
      <!--          <el-col class="text-center" :span="2">-->
      <!--            <span class="text-gray-500">&#45;&#45;</span>-->
      <!--          </el-col>-->
      <!--          <el-col :span="11">-->
      <!--            <el-form-item prop="date2">-->
      <!--              <el-date-picker-->
      <!--                  v-model="ruleForm.endTime"-->
      <!--                  placeholder="结束时间"-->
      <!--                  style="width: 100%"-->
      <!--              />-->
      <!--            </el-form-item>-->
      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="'列4日期时间型'+'：'" :prop="'name'" required>-->
      <!--        <el-row gutter="20">-->
      <!--          <el-col :span="11">-->
      <!--            <el-form-item prop="date1">-->
      <!--              <el-date-picker-->
      <!--                  type="datetime"-->
      <!--                  v-model="ruleForm.startTime"-->
      <!--                  placeholder="开始时间"-->
      <!--                  style="width: 100%"-->
      <!--              />-->
      <!--            </el-form-item>-->
      <!--          </el-col>-->
      <!--          <el-col class="text-center" :span="2">-->
      <!--            <span class="text-gray-500">&#45;&#45;</span>-->
      <!--          </el-col>-->
      <!--          <el-col :span="11">-->
      <!--            <el-form-item prop="date2">-->
      <!--              <el-date-picker-->
      <!--                  type="datetime"-->
      <!--                  v-model="ruleForm.endTime"-->
      <!--                  placeholder="结束时间"-->
      <!--                  style="width: 100%"-->
      <!--              />-->
      <!--            </el-form-item>-->
      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="setConditionQueryParams">
          查询
        </el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {formItem} from "./index.ts"
const dialogVisible = ref(false)

const initComponent = () => {
  dialogVisible.value = true
  setConditionQueryFormItems()
}

const formItems = ref<formItem[]>([])
/**
 * 动态设置表单项
 */
const setConditionQueryFormItems = async () => {
  formItems.value = [
    {
      name: "col1",
      type: "int4",
      greaterThan: null,
      lessThan: null,
    },
    {
      name: "col2",
      type: "float8",
      greaterThan: null,
      lessThan: null,
    },
    {
      name: "col3",
      type: "varchar",
      pattern: "like",
      condition: null,
    },
    {
      name: "col4",
      type: "date",
      startTime: null,
      endTime: null,
    },
    {
      name: "col5",
      type: "timestamp",
      startTime: null,
      endTime: null,
    },
  ]
}

const emit=defineEmits<{
  (e: 'setConditionQueryParams', value: formItem[]): void
}>()

/**
 * 设置条件查询参数
 */
const setConditionQueryParams = () => {
  emit("setConditionQueryParams",formItems.value)
  dialogVisible.value=false
}

const ruleFormRef = ref<FormInstance>()

/**
 * 重置表单项内容
 */
const resetForm = () => {
  formItems.value.forEach(item => {
    switch (true) {
      case item.type.includes("int") || item.type.includes("float"): {
        item.greaterThan = null
        item.lessThan = null
        break
      }
      case item.type === "varchar": {
        item.pattern = "like"
        item.condition = null
        break
      }
      case item.type === "date" || item.type === "timestamp": {
        item.startTime = null
        item.endTime = null
        break
      }
    }
  })
}


</script>

<style scoped>

</style>