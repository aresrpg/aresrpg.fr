<template>
	<header>
		<nav-head />
		<nav-menu />
	</header>
</template>

<script>
export default {
	components: {
		navHead: () => import('@cmp/nav/loginBar.vue'),
		navMenu: () => import('@cmp/nav/menu.vue'),
	},
}
</script>