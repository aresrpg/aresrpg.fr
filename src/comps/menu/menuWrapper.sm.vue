<template>
	<div class="container">
		<div ref="fantom" />
		<v-touch ref="menu" class="swipe-container" @swipe="swipeMenu" @panmove="dragMenu" :pan-options="dragOption" :swipe-options="swipeOptions">
			<div tag="menu" ref="menuchild" v-rp.1000>
				<slot />
			</div>
		</v-touch>
	</div>
</template>

<script>
import anime from 'animejs'

const darken = (el, openned) =>
	anime({
		targets: el,
		opacity: openned ? 0.7 : 0,
		duration: 400,
	})

const swipeTranlate = (el, openned) => {
	anime({
		targets: el,
		translateX: openned ? ['-100vw', '0vw'] : '-100vw',
		duration: 300,
		easing: 'easeInOutSine',
	})
}

const dragTranlate = (el, offset) => {
	anime({
		targets: el,
		translateX: offset,
		duration: 0,
	})
}

let offset = 0,
	lastX = -window.innerWidth

const dragMenu = (el, child, deltaX) => {
	const x = deltaX
	const scrollableWidth = -child.offsetWidth
	const diff = x - lastX
	offset += diff
	if (offset > 0) offset = 0
	if (offset < scrollableWidth) offset = scrollableWidth
	lastX = x
	console.log(offset)
	dragTranlate(el, offset)
}

export default {
	data() {
		return {
			openned: false,
			swipeOptions: { direction: 'horizontal', threshold: 50 },
			dragOption: { direction: 'horizontal', threshold: 100 },
		}
	},
	methods: {
		swipeMenu({ deltaX }) {
			const open = deltaX > 0
			if ((open && this.openned) || (!open && !this.openned)) return
			darken(this.$refs.fantom.$el, open)
			swipeTranlate(this.$refs.menu.$el, open)
			this.openned = open
		},
		dragMenu({ deltaX }) {
			dragMenu(this.$refs.menu.$el, this.$refs.menuchild, deltaX)
		},
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/colors'

absolute()
	position absolute
	top 0
	left 0
	bottom 0
	right 0

.container
	width 100%
	position relative
	z-index 3

	&>:first-child // fantom
		width 100%
		absolute()
		background black
		opacity 0

	.swipe-container // menu
		width 106vw
		height 100vh
		position fixed
		border 1px solid crimson
		transform translateX(-100vw)

		&>:first-child
			width 100vw
			height 100%
			background lighten($color-b, 10%)
</style>

