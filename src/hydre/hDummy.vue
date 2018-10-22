<template>
	<div class="h-container" v-bind:style="{width: w, height: h}">
		<h1><span>Dummy Component</span><br>{{w}} : {{h}}</h1>
		<div class="h-width">Width [{{dWidth}} px]</div>
		<div class="h-height">Height [{{dHeight}} px]</div>
	</div>
</template>

<script>
const throttle = (func, limit) => {
	let lastFunc, lastRan
	return function() {
		const context = this,
			args = arguments
		if (!lastRan) {
			func.apply(context, args)
			lastRan = Date.now()
		} else {
			clearTimeout(lastFunc)
			lastFunc = setTimeout(function() {
				if (Date.now() - lastRan >= limit) {
					func.apply(context, args)
					lastRan = Date.now()
				}
			}, limit - (Date.now() - lastRan))
		}
	}
}

export default {
	props: {
		w: { default: '100%' },
		h: { default: '100vh' },
	},
	data() {
		return {
			dWidth: 0,
			dHeight: 0,
		}
	},
	mounted() {
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	destroyed() {
		window.removeEventListener('resize', this.handleResize)
	},
	methods: {
		handleResize: throttle(function() {
			this.dWidth = this.$el.offsetWidth
			this.dHeight = this.$el.offsetHeight
		}, 200),
	},
}
</script>

<style lang="stylus" scoped>

.h-container
	width 100%
	display grid
	grid 'name name' 1fr '. .' 2fr / 1fr 1fr
	justify-content center
	justify-items center
	align-items end
	border .5em solid black
	grid-gap 1em
	padding 5%
	text-align center
	text-transform uppercase

	h1
		grid-area name
		line-height 1.5em
		background-color #B0BEC5
		color #37474F
		padding 1em
		border 1px solid black
		box-shadow 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)
	&>div
		align-self start
		border 1px solid black
		padding 1em 2em
		box-shadow 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)
	.h-width
		justify-self end
		color gold
		background-color #64B5F6
		color #0D47A1

	.h-height
		justify-self start
		color crimson
		background-color #FFCC80
		color #E65100
</style>