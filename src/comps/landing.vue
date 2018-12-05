<i18n>
en:
  under: "under"
  construct: "construction"
fr:
  under: "en"
</i18n>

<template lang="pug">
  - var trailer = "@rs/trailer"
  - var logo = "@rs/logo.png"
  - var alt = "AresRPG logo"
  
  mixin srcType(type)
    source(src=`${trailer}.${type}` type=`video/${type}`)
    
  .container(:class="$mq")
    div.video-container(v-if="$mq === 'lg'")
      video(poster="@rs/snow-background.jpg" preload autoplay muted loop)
        +srcType('webm')
        +srcType('mp4')
    img.logo(:class="{'anim':!isMenuAnimating}" src=logo alt=alt)
    img.fake(:class="{'anim':!isMenuAnimating}" src=logo alt=alt)
    .glassed
    p.
      #[span.under(v-t="'under'")] #[span.construct(v-t="'construct'")]
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'

const menu = namespace('menu')

@Component
export default class Landing extends Vue {
  @menu.Getter isMenuAnimating

  mounted() {
    this.onMenuOpenned = open => (this.animateLogo = !open)
  }

}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'

.container
  &.sm
    width 100%
    height 100vh
    min-height 480px
    background url('~@rs/snow-background.jpg') no-repeat
    background-size cover
    background-position center
    display flex
    justify-content space-between
    align-items center
    flex-flow column nowrap
    overflow hidden

    .logo
      padding-top 3em
      mix-blend-mode color-dodge
      filter grayscale(1)
      transform scale(.7)

      &.anim
        animation logo 4s ease-in-out 4s infinite alternate, float 4s ease-in-out infinite alternate

    .fake
      position absolute
      padding-top 3em
      top 0
      mix-blend-mode difference
      filter grayscale(1)
      transform scale(.7)

      &.anim
        animation logo 4s ease-in-out infinite alternate, float 4s ease-in-out infinite alternate

    .glassed
      width 100%
      height 50%
      display flex
      flex-flow column nowrap
      justify-content start
      align-items center

      p
        display flex
        flex-flow column nowrap
        text-align end
        font-size 10vmin
        text-transform uppercase
        text-shadow 0 0 10px black
        padding 1em 50%
        backdrop-filter blur(3px)

        @supports not (backdrop-filter: blur(3px))
          material(2)
          border 1px solid rgba(#2c3e50, .8)

        .under
          smFont(2)
          color #f0a30a

        .construct
          smFont(1)
          color silver

@keyframes logo
  from
    opacity 1

  to
    opacity 0

@keyframes float
  from
    transform translateY(-5px) scale(.7)

  to
    transform translateY(5px) scale(.7)
</style>


