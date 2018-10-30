<template>
    <h-dummy class="dummy" h="50px"><h1>MENU BAR</h1>   
    </h-dummy>
</template>

<script>
export default {
    components: {
		hDummy: () => import('@h/hDummy.vue'),
	}
}
</script>

<style lang="stylus" scoped>
@require '~@stl/fonts'

.dummy
	smFont(1)
</style>
