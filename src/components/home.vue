<template>
<header>
    <bgVideo class="viewPortVideo" :mp4=mp4 :webm=webm :poster=poster v-video.muted.autoplay />
    <div class="dotted"></div>
</header>
</template>

<script>
import { video } from "../core/directives.js"
import bgVideo from "./videoContainer"
import mp4 from "../assets/resources/trailer.mp4"
import webm from "../assets/resources/trailer.webm"
import poster from "../assets/resources/home_background.png"

export default {
  data() {
    return {
      mp4,
      webm,
      poster
    }
  },

  components: {
    bgVideo
  },

  directives: {
    video
  }
}
</script>

<style lang="stylus" scoped>
</style>
