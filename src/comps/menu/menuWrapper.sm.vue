<template>
	<div class="container" :class="{ animate: !dragging }">
		<div class="fantom" ref="fantom" :style="fantom" />
		<nav class="menu" ref="menu" :style="`transform: translate3D(${menuOffset}%,0,0)`">
			<slot />
		</nav>
	</div>
</template>

<script>
import { touchListen, touchRemove } from '@core/touch'

const { eventBus } = window
const { TRIGGER_MENU_LOCK, TRIGGER_MENU, MENU_OPENNED, MENU_FLOATING } = eventBus

const VELOCITY = 0.2

const isSwiping = velocity => Math.abs(velocity) >= VELOCITY
const isSwipingLeft = velocity => isSwiping(velocity) && velocity < 0
const isSwipingRight = velocity => isSwiping(velocity) && velocity > 0

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
			if (this.opened || x < 0.1 * window.innerWidth) {
				this.$root.lockScroll(this.$refs.menu)
				eventBus.send(MENU_FLOATING)
				this.dragging = true
				this.lastX = x
				this.startX = x
				this.startTime = Date.now()
			}
		},
		onTouchMove({ touches: [{ pageX: x }] }) {
			if (this.dragging) {
				const deltaX = x - this.lastX
				const menuWidth = this.$refs.menu.offsetWidth
				this.menuOffset += (deltaX / menuWidth) * 100
				this.menuOffset = Math.min(0, Math.max(this.menuOffset, -100))
				this.lastX = x
			}
		},
		onTouchEnd() {
			if (this.dragging) {
				const velocity = (this.lastX - this.startX) / (Date.now() - this.startTime)
				if (isSwipingLeft(velocity) && this.opened) this.openMenu(false)
				else if (isSwipingRight(velocity) && !this.opened) this.openMenu(true)
				else this.openMenu(this.menuOffset > -50)
			}
			this.dragging = false
		},
		openMenu(open) {
			this.opened = open
			this.menuOffset = open ? 0 : -100
			if (!open) this.$root.unlockScroll(this.$refs.menu)
			setTimeout(() => eventBus.send(MENU_OPENNED, open), 400)
		},
		registerEvents(val) {
			if (val) touchListen(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
			else touchRemove(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
		},
	},
	mounted() {
		this.opened = false
		this.regIfUnlocked = lock => this.registerEvents(!lock)
		eventBus.on(TRIGGER_MENU_LOCK, this.regIfUnlocked)
		eventBus.on(TRIGGER_MENU, this.openMenu)
		this.registerEvents(true)
	},
	beforeDestroy() {
		this.registerEvents(false)
		eventBus.off(TRIGGER_MENU_LOCK, this.regIfUnlocked)
		eventBus.off(TRIGGER_MENU, this.openMenu)
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

	.fantom
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
</style>

