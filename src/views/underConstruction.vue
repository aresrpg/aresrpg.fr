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
import { SCROLL_TO } from '@core/events'

export default {
	data() {
		return {
			modal: true,
		}
	},
	components: {
		loginBar: () => loadComponent('loginBar'),
		mobileMenu: () => loadComponent('menu/menuWrapper.sm'),
		desktopMenu: () => loadComponent('menu/menuWrapper.lg'),
		menuContent: () => loadComponent('menu/menuContent'),
		hDummy: () => import('@h/hDummy'),
		aFooter: () => loadComponent('aFooter'),
	},
	methods: {
		showModal(show) {
			this.modal = show
		},
	},
	mounted() {
		this.$root.$on(SCROLL_TO, () => {
			// TODO
		})
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/fonts'

.dummy
	smFont(1)
</style>
