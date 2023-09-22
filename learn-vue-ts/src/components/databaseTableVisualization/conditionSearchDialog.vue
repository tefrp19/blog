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
        label-width="120px"
    >
      <el-form-item v-for="item in formItems" :key="item.name" :label="item.name+'：'" :prop="'name'">
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
        <!-- 文本型 -->
        <template v-if="item.type.includes('char')">
          <el-row gutter="20">
            <el-col span="6">
              <el-select v-model="item.pattern" style="width: 120px;" placeholder="选择查询方式">
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
        <!-- 日期和日期时间型 -->
        <template v-if="item.type==='date'||item.type==='timestamp'">
          <el-row gutter="20">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                    :type="item.type==='date'?'date':'datetime'"
                    v-model="item.startTime"
                    placeholder="开始时间"
                    value-format="x"
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
                />
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!-- 布尔型 -->
        <template v-if="item.type==='boolean'">
          <el-select v-model="item.value" style="width: 120px;" placeholder="选择布尔型">
            <el-option
                :key="'like'"
                :label="'true'"
                :value="true"
            />
            <el-option
                :key="'equal'"
                :label="'false'"
                :value="false"
            />
          </el-select>
        </template>
        <!-- 下拉型 -->
        <template v-if="item.type==='drop'">
          <el-select v-model="item.condition" style="width: 120px;" placeholder="选择类型">
            <el-option
                v-for="option in item.data"
                :key="option.value"
                :label="option.label"
                :value="option.value"
            />
          </el-select>
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
import { ref} from 'vue'
import {FormItem} from "./index.ts"

const dialogVisible = ref(false)

const initComponent = () => {
  dialogVisible.value = true
  setConditionQueryFormItems()
}

const formItems = ref<FormItem[]>([])
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
    {
      name: "col6",
      type: "boolean",
      value: null,
    },
    {
      name: "col7",
      type: "drop",
      data: [
        {
          label: "正常",
          value: "1",
        },
        {
          label: "异常",
          value: "0",
        },
        {
          label: "欠压",
          value: "-1",
        },
        {
          label: "过压",
          value: "-2",
        },
      ],
      pattern: "equal",
      condition: null,
    }
  ]
}

const emit = defineEmits<{
  (e: 'setConditionQueryParams', value: FormItem[]): void
}>()

/**
 * 设置条件查询参数
 */
const setConditionQueryParams = () => {
  emit("setConditionQueryParams", formItems.value)
  dialogVisible.value = false
}

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
      case item.type.includes("char"): {
        item.pattern = "like"
        item.condition = null
        break
      }
      case item.type === "date" || item.type === "timestamp": {
        item.startTime = null
        item.endTime = null
        break
      }
      case item.type === "boolean": {
        item.value = null
        break
      }
      case item.type === "drop": {
        item.condition = null
        break
      }
    }
  })
}


</script>

<style scoped>

</style>