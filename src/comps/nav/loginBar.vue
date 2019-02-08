<i18n>
en:
  log: "login"
  reg: "register"
fr:
  log: "connexion"
  reg: "s'enregistrer"
</i18n>

<template lang="pug">
    .login
        .container(ref="container" :class='$mq' :style="`transform: translateY(${-offset}px)`")
            .login(v-rp)
                fa(fas="sign-in-alt" v-show="$mq==='lg'")
                .icon(@click="openMenu" v-if="$mq==='sm'")
                    fa(fas="bars")
                    .divider
                span(@click="showM()" v-t="'log'")
            .register(@click="showM()" v-rp)
                span(v-t="'reg'")
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Action, namespace } from 'vuex-class'
import { Modals } from '@core/stores/modules/modals'

const menu = namespace('menu')
const modals = namespace('modals')

const FACTOR = 2
const HIDDEN = 0.85

@Component
export default class LoginBar extends Vue {
  offset = 0

  @menu.Action openMenu
  @modals.Action showModal

  showM() {
    this.showModal({ name: Modals.NOT_READY_MODAL, val: true })
  }

  onScroll() {
    const deltaY = window.pageYOffset - this.lastY
    const height = this.$refs.container.offsetHeight * HIDDEN

    this.offset += deltaY / FACTOR
    if (this.offset > height) this.offset = height
    if (this.offset < 0) this.offset = 0
    this.lastY = window.pageYOffset
  }

  mounted() {
    this.lastY = window.pageYOffset
		window.addEventListener('scroll', this.onScroll,{passive: true})
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll,{passive: true})
  }
}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'

.container

  &.sm
    smFont(2)
    material(2)
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
      justify-content space-evenly

      span
        flex 1 1 70%
        transform translateX(-9%)

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
    font-size .9rem
    text-transform uppercase
    color lighten(#f0a30a, 20%)
    width 100%
    height 100%
    display flex
    flex-flow row nowrap
    justify-content flex-end
    align-items center
    position fixed
    width 100%
    height 40px
    z-index 3

    i
      color rgba(lighten(#f0a30a, 20%), .5)
      padding-right 10px

    >div
      box-shadow 0 0 1px rgba(0, 0, 0, 0)
      position relative
      overflow hidden
      padding .6em 1em
      text-align center

      &:hover
        transition-duration 300ms
        color #f0a30a
        text-shadow 0px 0px 6px rgba(255, 255, 255, .2)
        cursor pointer

      &:before
        content ''
        position absolute
        z-index 1
        left 0
        top 0
        background #f0a30a
        width 100%
        height 7px
        transition height 300ms ease-out

      &:hover:before, &:focus:before, &:active:before
        height 0
</style>