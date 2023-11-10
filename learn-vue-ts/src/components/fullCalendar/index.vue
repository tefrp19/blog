<template>
  <div>
    <FullCalendar style="width: 700px;" :options="calendarOptions" ref="fullCalendarRef">
      <!--    <template v-slot:eventContent='arg'>-->
      <!--    </template>-->
      <!--      <b>{{ arg.event.title }}aaa</b>-->
    </FullCalendar>
    <el-dialog
        draggable
        v-model="dialogOption.visible"
        :title="dialogOption.title"
        width="30%"
    >
      <FormCreate v-bind="formCreateOption" v-model:api="formCreateOption.fApi"/>

    </el-dialog>

  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
// import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import {CalendarOptions} from "@fullcalendar/core";
import formCreate, {Api, Options, Rule} from "@form-create/element-ui";

const fullCalendarRef = ref<InstanceType<typeof FullCalendar>>()
let date = +new Date()
const handleDateClick = (e) => {
  // for (let i = 0; i < 100000; i++) {
  //   // calendarOptions.value.events.push({title: `event ${++id}`, start: '2023-11-08', allDay: false})
  //   date += 1000 * 60 * 60 * 24
  //   calendarOptions.value.events.push({title: `event ${++id}`, start: new Date(date), allDay: false})
  //
  // }
  console.log(e, "e")
  const calendarApi = fullCalendarRef.value?.getApi()
  // console.log(calendarApi);
  console.log('Clicked on: ' + e.dateStr);
  // calendarApi?.changeView("listWeek")
}
let id = 3

const calendarOptions = ref<CalendarOptions>({
  locale: "zh-cn",
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dayMaxEventRows: true, // 限制显示事件条数
  views: {
    timeGrid: {
      dayMaxEventRows: 3 // adjust to 6 only for timeGridWeek/timeGridDay
    }
  },
  height: 500,
  customButtons: {
    addEventButton: {
      text: '添加事件',
      click: function () {
        dialogOption.value.title = "添加事件"
        dialogOption.value.visible = true
      }
    }
  },
  headerToolbar: {
    left: 'title',
    right: 'addEventButton today,prev,next',
    // right: 'today,prev,next,',

    center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', // buttons for switching between views
  },
  buttonText: {
    today: '今天',
    month: '月',
    week: '周',
    day: '日',
    list: '列表'
  },
  events: [
    {
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },{
      title: 'event1',
      start: '2023-11-08',
      id:"123456",
    },
    {
      title: 'event2',
      start: '2023-11-10',
      end: '2023-11-13',
    },
    {
      title: 'event3',
      start: '2023-11-08T12:30:00',
      end: "",
      allDay: false // will make the time show
    },
  ],
  // events: function(info, successCallback, failureCallback) {
  //   console.log(info, "info")
  //   const data=[
  //       {
  //         title: 'event1',
  //         start: '2023-11-08'
  //       },
  //       {
  //         title: 'event2',
  //         start: '2023-11-10',
  //         end: '2023-11-13',
  //       },
  //       {
  //         title: 'event3',
  //         start: '2023-11-08T12:30:00',
  //         end: "",
  //         allDay: false // will make the time show
  //       },
  //     ]
  //   successCallback(data)
  // },
  // eventSources: [
  //
  //   // your event source
  //   {
  //     url: 'http://1.1.1.2/myfeed',
  //     method: 'GET',
  //     extraParams: {
  //       custom_param1: 'something',
  //       custom_param2: 'somethingelse'
  //     },
  //     // failure: function() {
  //     //   alert('there was an error while fetching events!');
  //     // },
  //     color: 'yellow',   // a non-ajax option
  //     textColor: 'black' // a non-ajax option
  //   }
  //
  //   // any other sources...
  //
  // ],
  dateClick: handleDateClick,
  eventClick: function(info) {
    console.log(info, "info")
    console.log(info.event.id, "info.event.id")
    dialogOption.value.title="修改事件"
    dialogOption.value.visible=true
  }
})
const dialogOption = ref({
  title: "",
  visible: false,
})

interface FormCreateOption {
  fApi: Api,
  options: Options,
  rule: Rule,
}

const formCreateOption = ref({
  fApi: {},
  option: {
    onSubmit: (formData) => {
      console.log(formData)
    },
    resetBtn: true
  },
  rule: [
    {
      type: 'input',
      field: 'title',
      title: '事件名称',
      value: '',
      effect: {
        required: true
      }
    },
    {
      type: "DatePicker",
      field: "start",
      title: "开始时间",
      value: '',
      props: {
        type: "datetime",
      },
      effect: {
        required: true
      },
      control: [
        {
          // 选择了开始时间才允许选择结束时间
          handle(val) {
            return Boolean(val)
          },
          rule: [
            {
              type: 'DatePicker',
              field: 'end',
              title: '结束时间',
              value: '',
              props: {
                type: "datetime",
              },

            }
          ]
        }
      ]
    }
  ]

})

</script>

<style scoped>

</style>