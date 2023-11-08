<template>

  <video-player
      src="http://localhost:8081/mp4.mp4"
      poster="http://localhost:8081/img.jpg"
      :width="900"
      :height="600"
      controls
      :loop="true"
      :volume="0.6"
  />
</template>

<script setup lang="ts">
import {VideoPlayer} from '@videojs-player/vue'
import 'video.js/dist/video-js.css'


</script>


<style scoped>

</style>