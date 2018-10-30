<template>
	<div ref="modal" :class="$mq">
		<div class="darken" :class="{ fade }" @click="$emit('outside')" />
		<div class="box" ref="box" :style="{transform: `translate(${drag.offsetX}px,${drag.offsetY}px)`}">
			<slot />
		</div>
	</div>
</template>

<script>
import { touchListen, touchRemove } from '@core/touch'
import dyn from 'dynamics.js'
import { LOCK_MENU } from '@core/events'

function hasScrollableContent(el) {
	const height = el.offsetHeight
	for (let elem of el.getElementsByTagName('*')) if (elem.offsetHeight > height) return true
	return false
}

export default {
	props: {
		fade: {
			default: false,
		},
	},
	data() {
		return {
			drag: {
				active: false,
				lastX: 0,
				lastY: 0,
				offsetX: 0,
				offsetY: 0,
			},
		}
	},
	methods: {
		dragMove(e) {
			if (!this.drag.active) {
				this.drag.active = this.box.contains(e.target)
				this.drag.lastX = e.touches[0].pageX
				this.drag.lastY = e.touches[0].pageY
			} else {
				const x = this.drag.lastX - e.touches[0].pageX
				const y = this.drag.lastY - e.touches[0].pageY
				const sizeX = window.innerWidth
				const sizeY = window.innerHeight

				this.drag.offsetX -= x / 5
				this.drag.offsetY -= y / 5

				this.drag.lastX = e.touches[0].pageX
				this.drag.lastY = e.touches[0].pageY
			}
		},
		dragEnd(e) {
			if (this.drag.active) {
				dyn.animate(
					this.box,
					{
						translateX: 0,
						translateY: 0,
					},
					{
						type: dyn.spring,
						duration: 600,
						frequency: 423,
						friction: 300,
					},
				)
				this.drag.offsetX = 0
				this.drag.offsetY = 0
				this.drag.active = false
			}
		},
	},
	computed: {
		box() {
			return this.$refs.box
		},
	},
	mounted() {
		this.$root.$emit(LOCK_MENU, true)
		this.$root.lockScroll(this.$refs.modal)
		this.drag.from = { x: this.box.offsetWidth, y: this.box.offsetHeight }

		// we add the cool effect only if the bow will never be scrolled
		if (!hasScrollableContent(this.box)) touchListen(() => {}, this.dragMove, this.dragEnd)
	},
	beforeDestroy() {
		this.$root.$emit(LOCK_MENU, false)
		this.$root.unlockScroll(this.$refs.modal)
		touchRemove(() => {}, this.dragMove, this.dragEnd)
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/palette'
@require '~@stl/material'

.sm
	width 100%
	height 100vh
	position fixed
	display flex
	z-index 4
	top 0
	font-size 2rem
	justify-content center
	align-items center

	.darken
		width 100%
		height 100%
		background rgba(palette(1), .8)
		backdrop-filter blur(3px)
		transition opacity 200ms, backdrop-filter 200ms

	.fade
		opacity 0
		backdrop-filter blur(0)

	.box
		min-width min-content
		max-width 80vw
		min-height min-content
		max-height 80vh
		overflow-y scroll
		position fixed
		z-index 5
		background palette(1)
		background linear-gradient(to left, darken(palette(1), 30%), palette(1))
		color palette(3)
		border-radius 5px
		material(4)
</style>

