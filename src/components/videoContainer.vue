<template>
<video :poster=poster>
  <source :src=mp4 type="video/mp4">
  <source :src=webm type="video/webm">
</video>
</template>

<script>
export default {
  props: ["mp4", "webm", "poster"]
}
</script>
