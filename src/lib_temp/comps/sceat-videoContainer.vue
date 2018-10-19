<template>
  <video :poster=poster>
    <source v-for="(source,index) in sources" :key=index :src=source.file :type=source.format>
  </video>
</template>

<script>
export default {
	props: ['sources', 'poster'],
}
</script>