<template>
	<div class="container" :class="{ animate: !dragging }">
		<div class="fantom" ref="fantom" :style="fantom" />
		<nav class="menu" ref="menu" :style="`transform: translateX(${menuOffset}%)`">
			<div class="inner" v-rp.1000>
				<slot />
			</div>
		</nav>
	</div>
</template>

<script>
import { touchListen, touchRemove } from '@core/touch'

const VELOCITY = 0.2

export default {
	data() {
		return {
			menuOffset: -100,
			dragging: false,
		}
	},
	computed: {
		fantom() {
			return {
				opacity: ((100 + this.menuOffset) / 100) * 0.8,
			}
		},
	},
	methods: {
		onTouchStart({ touches: [{ pageX: x }] }) {
			if (this.opened || x < 0.3 * window.innerWidth) {
				this.$root.lockScroll(this.$refs.menu)
				this.dragging = true
				this.lastX = x
				this.startX = x
				this.startTime = Date.now()
			}
		},
		onTouchMove({ touches: [{ pageX: x }] }) {
			if (this.dragging) {
				const deltaX = x - this.lastX
				const width = this.$refs.menu.offsetWidth

				this.menuOffset += (deltaX / width) * 100
				this.menuOffset = Math.min(0, Math.max(this.menuOffset, -100))

				this.lastX = x
			}
		},
		onTouchEnd() {
			if (this.dragging) {
				const velocity = (this.lastX - this.startX) / (Date.now() - this.startTime)

				if (Math.abs(velocity) >= VELOCITY) {
					this.opened = !this.opened
				} else {
					this.opened = this.menuOffset > -50
				}
				this.menuOffset = this.opened ? 0 : -100
				this.$root.unlockScroll(this.$refs.menu)
			}
			this.dragging = false
		},
		registerEvents(val) {
			if (val) touchListen(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
			else touchRemove(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
		},
	},
	mounted() {
		const ctx = this
		this.opened = false
		this.$root.$on('modal', modal => ctx.registerEvents(!modal)) // if a modal is openned then whe prevent menu from being interracted with
		this.registerEvents(true)
	},
	beforeDestroy() {
		this.registerEvents(false)
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/palette'

.container
	width 100%
	position relative
	z-index 3

	&.animate
		&>:first-child
			transition opacity 200ms linear

		.menu
			transition transform 200ms linear

	.fantom // fantom
		width 100vw
		height 100vh
		position fixed
		top 0
		left 0
		background black
		pointer-events none

	.menu // menu
		width 100vw
		height 100vh
		position fixed
		background lighten(palette(2), 10%)

		.inner
			height 100%
			width 100%
</style>

