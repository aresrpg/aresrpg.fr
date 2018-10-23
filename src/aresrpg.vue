<template>
  <main>
    <a-header />
    <router-view />
    <vue-snotify />
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
@require '~@stl/utils'
@require '~@stl/fonts'
@require '~vue-snotify/styles/material.css'

:root
  font-size 18px

*
  sc-reset()
  sc-disableScollBar()

.snotifyToast__body
  font-family $sm
  text-transform uppercase
  font-size 1em
  font-weight 700
</style>

