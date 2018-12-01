<template lang="pug">
	.container(:class="{ animate: !dragging }")
		.fantom(ref="fantom" :style="fantom")
		nav.menu(ref="menu" :style="`transform: translate3D(${menuOffset}%,0,0)`")
			slot
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { touchListen, touchRemove } from '@core/misc/touch'

const VELOCITY = 0.2

const isSwiping = velocity => Math.abs(velocity) >= VELOCITY
const isSwipingLeft = velocity => isSwiping(velocity) && velocity < 0
const isSwipingRight = velocity => isSwiping(velocity) && velocity > 0

@Component
export default class SmWrapper extends Vue {
  menuOffset = -100
  dragging = false
  get fantom() {
    return {
      opacity: ((100 + this.menuOffset) / 100) * 0.8,
    }
  }
  onTouchStart({ touches: [{ pageX: x }] }) {
    if (this.opened || x < 0.1 * window.innerWidth) {
      this.$root.lockScroll(this.$refs.menu)
      eventBus.send(MENU_FLOATING)
      this.dragging = true
      this.lastX = x
      this.startX = x
      this.startTime = Date.now()
    }
  }

  onTouchMove({ touches: [{ pageX: x }] }) {
    if (this.dragging) {
      const deltaX = x - this.lastX
      const menuWidth = this.$refs.menu.offsetWidth
      this.menuOffset += (deltaX / menuWidth) * 100
      this.menuOffset = Math.min(0, Math.max(this.menuOffset, -100))
      this.lastX = x
    }
  }

  onTouchEnd() {
    if (this.dragging) {
      const velocity = (this.lastX - this.startX) / (Date.now() - this.startTime)
      if (isSwipingLeft(velocity) && this.opened) this.openMenu(false)
      else if (isSwipingRight(velocity) && !this.opened) this.openMenu(true)
      else this.openMenu(this.menuOffset > -50)
    }
    this.dragging = false
  }

  openMenu(open) {
    this.opened = open
    this.menuOffset = open ? 0 : -100
    if (!open) this.$root.unlockScroll(this.$refs.menu)
  }

  registerEvents(val) {
    if (val) touchListen(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
    else touchRemove(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
  }

  mounted() {
    this.opened = false
    this.regIfUnlocked = lock => this.registerEvents(!lock)
    this.registerEvents(true)
  }

  beforeDestroy() {
    this.registerEvents(false)
  }
}
</script>


<style lang="stylus" scoped>

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
    background lighten(#f0a30a, 10%)
</style>

