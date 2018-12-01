<template lang="pug">
    .login
        .container(ref="container" :class='$mq' :style="`transform: translateY(${-offset}px)`")
            .o-reveal(v-rp)
                fa(fas="sign-in-alt" v-show="$mq==='lg'")
                .icon(@click="openMenu")
                    fa(fas="bars")
                    .divider
                span(@click="") login
            .o-reveal(@click="" v-rp)
                span register
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

const FACTOR = 2
const HIDDEN = 0.85

@Component
export default class LoginBar extends Vue {
  offset = 0
  modal = false

  onScroll() {
    const deltaY = window.pageYOffset - this.lastY
    const height = this.$refs.container.offsetHeight * HIDDEN

    this.offset += deltaY / FACTOR
    if (this.offset > height) this.offset = height
    if (this.offset < 0) this.offset = 0
    this.lastY = window.pageYOffset
  }

  openMenu() {
    eventBus.send(TRIGGER_MENU, true)
  }

  mounted() {
    this.lastY = window.pageYOffset
    window.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>


<style lang="stylus" scoped>
@require '~@stl/material'

.container
  material(2)

  &.sm
    smFont(2)
    font-size .9rem
    text-transform uppercase
    text-shadow 0px 2px 3px rgba(0, 0, 0, .4), 0px 8px 13px rgba(0, 0, 0, .1), 0px 18px 23px rgba(0, 0, 0, .1)
    width 100%
    height 50px
    display flex
    flex-flow row nowrap
    align-items center
    position fixed
    top 0
    z-index 2
    min-width 150px
    overflow hidden

    >div
      text-align center
      flex 1 50%
      padding 1em 0

    >:first-child
      color #f0a30a
      background-color #2c3e50
      background linear-gradient(to right, lighten(#2c3e50, 20%), #2c3e50)
      border-right .6em solid #f0a30a
      display flex
      align-items center

      span
        flex 1 1 70%
        transform translateX(-9%)
        padding 2em // increase clickable surface

      .icon
        display flex
        justify-content space-evenly
        align-items center
        width 100%
        flex .4 0 30%

        .divider
          width 1px
          height 34px
          align-self center
          border-right 1px solid rgba(white, .4)

    >:last-child // register
      color #2c3e50
      background-color #f0a30a
      background linear-gradient(to right, lighten(#f0a30a, 20%), #f0a30a)
      border-left .6em solid #2c3e50

  &.lg
    font-family $lg
    font-size 1.2rem
    text-transform uppercase
    color lighten(#f0a30a, 20%)
    background url('~@rs/loggedbar.png')
    width 100%
    height 100%
    display flex
    flex-flow row nowrap
    justify-content flex-end

    i
      font-size .8em
      color rgba(lighten(#f0a30a, 20%), .5)

    >div
      padding .6em 1em
      text-align center

      &:hover
        text-shadow 0px 0px 6px rgba(255, 255, 255, .2)
        cursor pointer

    // over animation
    .o-reveal
      display inline-block
      vertical-align middle
      transform perspective(1px) translateZ(0)
      box-shadow 0 0 1px rgba(0, 0, 0, 0)
      position relative
      overflow hidden

      &:hover
        transition-duration 300ms
        background-color darken(#2c3e50, 20%)
        color #f0a30a

      &:before
        content ''
        position absolute
        z-index -1
        left 0
        right 0
        top 0
        background #f0a30a
        height 4px
        transform translateY(-4px)
        transition-property transform
        transition-duration .3s
        transition-timing-function ease-out

      &:hover:before, &:focus:before, &:active:before
        transform translateY(0)
</style>