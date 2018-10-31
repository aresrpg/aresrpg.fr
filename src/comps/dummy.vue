<template>
	<div class="h-container" :style="{width: w, height: h}">
		<slot>Lorem ispum</slot>
		<div class="h-width"><span>{{dWidth}}</span> x <span>{{dHeight}}</span></div>
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
	grid 'name' 1fr '.' 1fr / 1fr

	@media screen and (max-width: 600px)
		grid 'name' 50% '.' max-content / 1fr

	justify-content center
	justify-items center
	background-color #CFD8DC
	align-items end
	font-size 1.5rem
	padding 5%
	text-align center
	overflow hidden

	h1
		grid-area name
		line-height 1.5em
		background-color #212121
		font-weight 100
		font-size 1.5em
		justify-self stretch
		padding 1em
		border-bottom 2px solid #1E88E5
		box-shadow 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)
		color #CFD8DC

	&>div
		align-self start
		font-size 1em
		justify-self stretch
		white-space nowrap
		color #CFD8DC
		background-color #212121
		span
			color #1E88E5

		border-top 1px solid darken(#CFD8DC, 20%)
		padding 1em 2em
		box-shadow 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)
</style>