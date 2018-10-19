<template>
  <main>
    <navbar />
    <notYet />
    <aresFooter />
  </main>
</template>

<script>
export default {
	components: {
		navbar: () => import('@cmp/navbar.vue'),
		aresFooter: () => import('@cmp/aresFooter.vue'),
		notYet: () => import('@cmp/home/landing.vue'),
	},
}
</script>

<style lang="stylus" scoped>
</style>

