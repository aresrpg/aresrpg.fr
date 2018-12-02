<template lang="pug">
	.container(:class="{ animate: !isMenuFloating }")
		.fantom(ref="fantom" :style="`opacity: ${((100 + this.menuOffset) / 100) * 0.8}`")
		nav.menu(ref="menu" :style="{background: '#'+bg, transform: `translate3D(${menuOffset}%,0,0)`}")
			slot
</template>

<script>
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import { Getter, Action, namespace } from 'vuex-class'
import { touchListen, touchRemove } from '@core/misc/touch'

const menu = namespace('menu')

const VELOCITY = 0.2

const isSwiping = velocity => Math.abs(velocity) >= VELOCITY
const isSwipingLeft = velocity => isSwiping(velocity) && velocity < 0
const isSwipingRight = velocity => isSwiping(velocity) && velocity > 0

@Component
export default class SmWrapper extends Vue {

  @Prop(String) bg

  menuOffset = -100

  @menu.Getter isMenuOpened
  @menu.Getter isMenuFloating
  @menu.Action openMenu
  @menu.Action notifyFloat

  @Watch('isMenuOpened')
  onMenu(openned) {
    this.menuOffset = openned ? 0 : -100;
    (openned ? this.$root.lockScroll : this.$root.unlockScroll)(this.$refs.menu)
  }

  onTouchStart({ touches: [{ pageX: x }] }) {
    if (this.isMenuOpened || x < 0.1 * window.innerWidth) {
      this.$root.lockScroll(this.$refs.menu)
      this.notifyFloat(true)
      this.lastX = x
      this.startX = x
      this.startTime = Date.now()
    }
  }

  onTouchMove({ touches: [{ pageX: x }] }) {
    if (this.isMenuFloating) {
      const deltaX = x - this.lastX
      const menuWidth = this.$refs.menu.offsetWidth
      this.menuOffset += (deltaX / menuWidth) * 100
      this.menuOffset = Math.min(0, Math.max(this.menuOffset, -100))
      this.lastX = x
    }
  }

  onTouchEnd() {
    if (this.isMenuFloating) {
      const velocity = (this.lastX - this.startX) / (Date.now() - this.startTime)
      if (isSwipingLeft(velocity) && this.isMenuOpened) this.openMenu(false)
      else if (isSwipingRight(velocity) && !this.isMenuOpened) this.openMenu(true)
      else {
        const open = this.menuOffset > -50;
        (open === this.isMenuOpened ? this.onMenu : this.openMenu)(open)
      }
    }
    this.notifyFloat(false)
  }

  registerEvents(val) {
    if (val) touchListen(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
    else touchRemove(this.onTouchStart, this.onTouchMove, this.onTouchEnd)
  }

  mounted() {
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
</style>

