<template lang="pug">
	div(ref="modal" :class="$mq")
		.darken(:class="{ 'fade': isClosing }" @click="$emit('outside')")
		.box.in(:class="{ 'out': isClosing }" ref="box" :style="{transform: `translate(${drag.offsetX}px,${drag.offsetY}px)`}")
			slot
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { touchListen, touchRemove } from '@core/misc/touch'
import { Getter, namespace } from 'vuex-class'
import dyn from 'dynamics.js'

const modals = namespace('modals')

function hasScrollableContent(el) {
  const height = el.offsetHeight
  for (let elem of el.getElementsByTagName('*')) if (elem.offsetHeight > height) return true
  return false
}

@Component
export default class Modal extends Vue {

  @modals.Getter isClosing

  drag = {
    active: false,
    lastX: 0,
    lastY: 0,
    offsetX: 0,
    offsetY: 0,
  }

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
  }

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
  }

  get box() {
    return this.$refs.box
  }

  mounted() {
    this.$root.lockScroll(this.$refs.modal)
    this.drag.from = { x: this.box.offsetWidth, y: this.box.offsetHeight }

    // we add the cool effect only if the bow will never be scrolled
    if (!hasScrollableContent(this.box)) touchListen(() => { }, this.dragMove, this.dragEnd)
  }

  beforeDestroy() {
    this.$root.unlockScroll(this.$refs.modal)
    touchRemove(() => { }, this.dragMove, this.dragEnd)
  }
}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'

.sm
  width 100%
  height 100vh
  position fixed
  display flex
  z-index 4
  top 0
  justify-content center
  align-items center

  .darken
    width 100%
    height 100%
    background rgba(#2c3e50, .8)
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
    background #2c3e50
    background linear-gradient(to left, darken(#2c3e50, 30%), #2c3e50)
    color silver
    border-radius 5px
    material(4)

    &.in
      backface-visibility visible !important
      animation-name flipInX
      animation-duration 400ms
      animation-direction alternate

    &.out
      animation-name fadeOutUp
      animation-duration 400ms
      animation-direction alternate
      animation-fill-mode forwards

@keyframes fadeOutUp
  from
    opacity 1

  to
    opacity 0
    transform translate3d(0, -50%, 0)

@keyframes flipInX
  from
    transform perspective(400px) rotate3d(1, 0, 0, 90deg)
    animation-timing-function ease-in
    opacity 0

  40%
    transform perspective(400px) rotate3d(1, 0, 0, -20deg)
    animation-timing-function ease-in

  60%
    transform perspective(400px) rotate3d(1, 0, 0, 10deg)
    opacity 1

  80%
    transform perspective(400px) rotate3d(1, 0, 0, -5deg)

  to
    transform perspective(400px)
</style>

