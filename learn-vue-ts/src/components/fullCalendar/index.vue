<template>
  <FullCalendar :options="calendarOptions" ref="fullCalendarRef">
    <!--    <template v-slot:eventContent='arg'>-->
    <!--      <b>{{ arg.event.title }}aaa</b>-->
    <!--    </template>-->
  </FullCalendar>

</template>

<script setup lang="ts">
import {ref} from "vue";
// import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
// import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {CalendarOptions} from "@fullcalendar/core";

const fullCalendarRef = ref<InstanceType<typeof FullCalendar>>()
const calendarApi = fullCalendarRef.value?.getApi()

const handleDateClick = (e) => {
  calendarOptions.value.events.push({title: `event ${++id}`, start: '2023-11-08', allDay: false})
  console.log(e, "e")
}

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
  headerToolbar: {center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'}, // buttons for switching between views
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
      start: '2023-11-08'
    },
    {
      title: 'event2',
      start: '2023-11-10',
      end: '2023-11-13',
    },
    {
      title: 'event3',
      start: '2023-11-08T12:30:00',
      // end: '2023-11-08T12:30:00',
      allDay: false // will make the time show
    },
  ],
  dateClick: handleDateClick,
})

let id = 3


</script>

<style scoped>

</style>