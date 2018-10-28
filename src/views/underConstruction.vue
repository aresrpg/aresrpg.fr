<template>
	<div class="main">
		<nav-head />

		<!-- app menu -->
		<mobile-menu v-if="$mq==='sm'">
			<menu-content />
		</mobile-menu>

		<!-- large screen menu -->
		<desktop-menu v-else>
			<menu-content />
		</desktop-menu>

		<!-- content -->
		<h-dummy class="dummy" h="300px">
			<h1>Top</h1>
		</h-dummy>

		<h-dummy class="dummy" h="1000px">
			<h1>Under Construction</h1>
		</h-dummy>

		<a-footer />

		<!-- notifications system -->
		<vue-snotify />
	</div>
</template>

<script>
export default {
	components: {
		navHead: () => import('@cmp/topbar.vue'),
		mobileMenu: () => import('@cmp/menu/menuWrapper.sm.vue'),
		desktopMenu: () => import('@cmp/menu/menuWrapper.lg.vue'),
		menuContent: () => import('@cmp/menu/menuContent.vue'),
		hDummy: () => import('@h/hDummy.vue'),
		aFooter: () => import('@cmp/aFooter.vue'),
		loading: () => import('@cmp/loading.vue'),
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/fonts'
@require '~vue-snotify/styles/material.css'

.dummy
	font-family $sm
</style>
