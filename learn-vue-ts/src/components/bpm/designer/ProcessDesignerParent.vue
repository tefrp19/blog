<template>
  <div>
    <ElCard  shadow="never">
<!--      <template  #header>-->
<!--        <div class="flex items-center">-->
<!--          <span class="text-16px font-700">{{ title }}</span>-->
<!--          <ElTooltip v-if="message" effect="dark" placement="right">-->
<!--            <template #content>-->
<!--              <div class="max-w-200px">{{ message }}</div>-->
<!--            </template>-->
<!--            <Icon :size="14" class="ml-5px" icon="ep:question-filled" />-->
<!--          </ElTooltip>-->
<!--          <div class="flex flex-grow pl-20px">-->
<!--           -->
<!--          </div>-->
<!--        </div>-->
<!--      </template>-->
      <div>
        <!-- 流程设计器，负责绘制流程等 -->
        <MyProcessDesigner
            key="designer"
            v-if="xmlString !== undefined"
            v-model="xmlString"
            :value="xmlString"
            v-bind="controlForm"
            keyboard
            ref="processDesigner"
            @init-finished="initModeler"
            :additionalModel="controlForm.additionalModel"
            @save="save"
        />
        <!-- 流程属性器，负责编辑每个流程节点的属性 -->
        <MyProcessPenal
            key="penal"
            :bpmnModeler="modeler as any"
            :prefix="controlForm.prefix"
            class="process-panel"
            :model="model"
        />
      </div>
    </ElCard>


  </div>
</template>

<script setup lang="ts">
// import MyProcessDesigner from "./ProcessDesigner.vue"
import MyProcessPenal from "../penal/PropertiesPanel.vue"
import {onMounted, ref} from "vue";
import {MyProcessDesigner} from "@/components/bpm/index.ts"
const xmlString = ref(undefined) // BPMN XML
const modeler = ref(null) // BPMN Modeler
const controlForm = ref({
  simulation: true,
  labelEditing: false,
  labelVisible: false,
  prefix: 'flowable',
  headerButtonSize: 'mini',
  // additionalModel: [CustomContentPadProvider, CustomPaletteProvider]
  additionalModel: [{}, {}]
})
const model = ref() // 流程模型的信息


/** 初始化 modeler */
const initModeler = (item) => {
  setTimeout(() => {
    modeler.value = item
  }, 10)
}

/** 添加/修改模型 */
const save = async (bpmnXml) => {
  // const data = {
  //   ...model.value,
  //   bpmnXml: bpmnXml // bpmnXml 只是初始化流程图，后续修改无法通过它获得
  // } as unknown as ModelApi.ModelVO
  // // 提交
  // if (data.id) {
  //   await ModelApi.updateModel(data)
  //   message.success('修改成功')
  // } else {
  //   await ModelApi.createModel(data)
  //   message.success('新增成功')
  // }
  // // 跳转回去
  // close()
}

/** 初始化 */
onMounted(async () => {
  // 查询模型
  const data = mockData
  if (!data.bpmnXml) {
    // 首次创建的 Model 模型，它是没有 bpmnXml，此时需要给它一个默认的
    data.bpmnXml = ` <?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.activiti.org/processdef">
  <process id="${data.key}" name="${data.name}" isExecutable="true" />
  <bpmndi:BPMNDiagram id="BPMNDiagram">
    <bpmndi:BPMNPlane id="${data.key}_di" bpmnElement="${data.key}" />
  </bpmndi:BPMNDiagram>
</definitions>`
  }
  model.value = {
    ...data,
    // bpmnXml: undefined // 清空 bpmnXml 属性
  }
  xmlString.value = data.bpmnXml
})
const mockData:any={
  "id": "fb59af3d-f64c-11ee-9228-2cf05dbc9b52",
  "key": "workFlow2",
  "name": "自定义请假流程",
  "icon": "http://test.yudao.iocoder.cn/6284cac074d3aeee1d05f9d00fd49fc849e399f502226d13b53dc75dab72b1b6.png",
  "description": null,
  "category": "category1",
  "categoryName": null,
  "formType": 10,
  "formId": null,
  "formName": null,
  "formCustomCreatePath": null,
  "formCustomViewPath": null,
  "createTime": 1712652098997,
  "bpmnXml": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<definitions xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:flowable=\"http://flowable.org/bpmn\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" targetNamespace=\"http://www.activiti.org/processdef\"><process id=\"workFlow2\" name=\"自定义请假流程\" isExecutable=\"true\"><startEvent id=\"Event_04suj4w\"><extensionElements><flowable:formData /></extensionElements><outgoing>Flow_1n3k9q2</outgoing></startEvent><userTask id=\"Activity_03nzhdx\" name=\"请假\" flowable:formKey=\"27\" flowable:candidateStrategy=\"30\" flowable:candidateParam=\"1\"><extensionElements><flowable:formData /></extensionElements><incoming>Flow_1n3k9q2</incoming><outgoing>Flow_0m3rhgx</outgoing></userTask><sequenceFlow id=\"Flow_1n3k9q2\" sourceRef=\"Event_04suj4w\" targetRef=\"Activity_03nzhdx\" /><userTask id=\"Activity_0ssou4q\" name=\"领导审批\" flowable:formKey=\"28\" flowable:candidateStrategy=\"30\" flowable:candidateParam=\"1\"><extensionElements><flowable:formData /></extensionElements><incoming>Flow_0m3rhgx</incoming><outgoing>Flow_17qo7n7</outgoing></userTask><sequenceFlow id=\"Flow_0m3rhgx\" sourceRef=\"Activity_03nzhdx\" targetRef=\"Activity_0ssou4q\" /><exclusiveGateway id=\"Gateway_1w4f0lg\"><incoming>Flow_17qo7n7</incoming><outgoing>Flow_0rvh4ex</outgoing><outgoing>Flow_0x7mnhj</outgoing></exclusiveGateway><sequenceFlow id=\"Flow_17qo7n7\" sourceRef=\"Activity_0ssou4q\" targetRef=\"Gateway_1w4f0lg\" /><endEvent id=\"Event_1n34hxr\"><incoming>Flow_0rvh4ex</incoming><incoming>Flow_1wf9x5n</incoming></endEvent><sequenceFlow id=\"Flow_0rvh4ex\" sourceRef=\"Gateway_1w4f0lg\" targetRef=\"Event_1n34hxr\"><conditionExpression xsi:type=\"tFormalExpression\">${approval==\"no\"}</conditionExpression></sequenceFlow><userTask id=\"Activity_1hxlc72\" name=\"人事添加备注\" flowable:candidateStrategy=\"30\" flowable:candidateParam=\"1\"><extensionElements><flowable:formData /></extensionElements><incoming>Flow_0x7mnhj</incoming><outgoing>Flow_1wf9x5n</outgoing></userTask><sequenceFlow id=\"Flow_0x7mnhj\" sourceRef=\"Gateway_1w4f0lg\" targetRef=\"Activity_1hxlc72\"><conditionExpression xsi:type=\"tFormalExpression\">${approval==\"yes\"}</conditionExpression></sequenceFlow><sequenceFlow id=\"Flow_1wf9x5n\" sourceRef=\"Activity_1hxlc72\" targetRef=\"Event_1n34hxr\" /></process><bpmndi:BPMNDiagram id=\"BPMNDiagram\"><bpmndi:BPMNPlane id=\"workFlow2_di\" bpmnElement=\"workFlow2\"><bpmndi:BPMNEdge id=\"Flow_1wf9x5n_di\" bpmnElement=\"Flow_1wf9x5n\"><di:waypoint x=\"470\" y=\"90\" /><di:waypoint x=\"516\" y=\"90\" /><di:waypoint x=\"516\" y=\"180\" /><di:waypoint x=\"542\" y=\"180\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"Flow_0x7mnhj_di\" bpmnElement=\"Flow_0x7mnhj\"><di:waypoint x=\"320\" y=\"155\" /><di:waypoint x=\"320\" y=\"90\" /><di:waypoint x=\"370\" y=\"90\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"Flow_0rvh4ex_di\" bpmnElement=\"Flow_0rvh4ex\"><di:waypoint x=\"345\" y=\"180\" /><di:waypoint x=\"542\" y=\"180\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"Flow_17qo7n7_di\" bpmnElement=\"Flow_17qo7n7\"><di:waypoint x=\"230\" y=\"180\" /><di:waypoint x=\"295\" y=\"180\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"Flow_0m3rhgx_di\" bpmnElement=\"Flow_0m3rhgx\"><di:waypoint x=\"70\" y=\"180\" /><di:waypoint x=\"130\" y=\"180\" /></bpmndi:BPMNEdge><bpmndi:BPMNEdge id=\"Flow_1n3k9q2_di\" bpmnElement=\"Flow_1n3k9q2\"><di:waypoint x=\"-82\" y=\"180\" /><di:waypoint x=\"-30\" y=\"180\" /></bpmndi:BPMNEdge><bpmndi:BPMNShape id=\"Event_04suj4w_di\" bpmnElement=\"Event_04suj4w\"><dc:Bounds x=\"-118\" y=\"162\" width=\"36\" height=\"36\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Activity_03nzhdx_di\" bpmnElement=\"Activity_03nzhdx\"><dc:Bounds x=\"-30\" y=\"140\" width=\"100\" height=\"80\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Activity_0ssou4q_di\" bpmnElement=\"Activity_0ssou4q\"><dc:Bounds x=\"130\" y=\"140\" width=\"100\" height=\"80\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Gateway_1w4f0lg_di\" bpmnElement=\"Gateway_1w4f0lg\" isMarkerVisible=\"true\"><dc:Bounds x=\"295\" y=\"155\" width=\"50\" height=\"50\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Event_1n34hxr_di\" bpmnElement=\"Event_1n34hxr\"><dc:Bounds x=\"542\" y=\"162\" width=\"36\" height=\"36\" /></bpmndi:BPMNShape><bpmndi:BPMNShape id=\"Activity_1hxlc72_di\" bpmnElement=\"Activity_1hxlc72\"><dc:Bounds x=\"370\" y=\"50\" width=\"100\" height=\"80\" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></definitions>",
  "processDefinition": null
}


</script>

<style scoped>

</style>