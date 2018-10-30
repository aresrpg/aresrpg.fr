<template>
	<div class="main">

		<login-bar title="login or register" @notready="()=>showModal(true)" />

		<!-- app menu -->
		<mobile-menu title="menu for small devices" v-if="$mq==='sm'">
			<menu-content />
		</mobile-menu>

		<!-- large screen menu -->
		<desktop-menu title="menu for large devices" v-else>
			<menu-content />
		</desktop-menu>

		<!-- content -->
		<h-dummy title="void content" class="dummy" h="300px">
			<h1>Top</h1>
		</h-dummy>

		<h-dummy title="void content" class="dummy" h="1000px">
			<h1>Under Construction</h1>
		</h-dummy>

		<a-footer title="the footer" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			modal: true,
		}
	},
	components: {
		loginBar: () => import('@cmp/loginBar.vue'),
		mobileMenu: () => import('@cmp/menu/menuWrapper.sm.vue'),
		desktopMenu: () => import('@cmp/menu/menuWrapper.lg.vue'),
		menuContent: () => import('@cmp/menu/menuContent.vue'),
		hDummy: () => import('@h/hDummy.vue'),
		aFooter: () => import('@cmp/aFooter.vue'),
		loading: () => import('@cmp/loading.vue'),
	},
	methods: {
		showModal(show) {
			this.modal = show
		},
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/fonts'

.dummy
	smFont(1) 
</style>
