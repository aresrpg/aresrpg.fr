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
		<landing />

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
		loginBar: () => loadComponent('loginBar'),
		mobileMenu: () => loadComponent('menu/menuWrapper.sm'),
		desktopMenu: () => loadComponent('menu/menuWrapper.lg'),
		menuContent: () => loadComponent('menu/menuContent'),
		landing: () => loadComponent('landing'),
		aFooter: () => loadComponent('aFooter'),
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
