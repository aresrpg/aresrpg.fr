<template>
  <main>
    <a-header />
    <h-dummy h="1000px" />
    <router-view />
    <a-footer />
  </main>
</template>

<script>
export default {
	components: {
		aHeader: () => import('@cmp/aHeader.vue'),
		aFooter: () => import('@cmp/aFooter.vue'),
		hDummy: () => import('@h/hDummy.vue'),
	},
}
</script>

<style lang="stylus">
@import '~@stl/utils'
@import '~vuetify/src/stylus/main'

*
  sc-reset()
  sc-disableScollBar()
</style>

