<template>
	<main>
		<h-dummy class="dummy" h="600px">
			<h1>Under Construction</h1>
		</h-dummy>
	</main>
</template>

<script>
export default {
	components: {
		hDummy: () => import('@h/hDummy.vue'),
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/fonts'

.dummy
	font-family $sm
</style>
