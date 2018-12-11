<i18n>
en:
  under: "under"
  construct: "construction"
  desc: "The lands of Aresrpg"
  subdescA: "A delightful mmorpg experience in minecraft !"
  subdescB: "Explore, fight, survive and become the most powerful warrior"
fr:
  under: "en"
  desc: "Les terres d'Aresrpg"
  subdescA: "Une expérience mmorpg inédite sur minecraft !"
  subdescB: "Explore, combat, survit et deviens le plus puissant guerrier"
</i18n>

<template lang="pug">
  - var trailer = "@rs/trailer"
  - var logo = "@rs/logo.png"
  - var alt = "AresRPG logo"
  
  mixin srcType(type)
    source(src=`${trailer}.${type}` type=`video/${type}`)
    
  .container.sm(v-if="$mq==='sm'")
    img.logo(:class="{'anim':!isMenuAnimating}" src=logo alt=alt)
    img.fake(:class="{'anim':!isMenuAnimating}" src=logo alt=alt)
    .glassed
      p.
        #[span.under(v-t="'under'")] #[span.construct(v-t="'construct'")]
  .container.lg(v-else)
      video(poster="@rs/snow-background.jpg" preload autoplay muted loop)
        +srcType('webm')
        +srcType('mp4')
      .middle
        img.logo(src=logo alt=alt)
        .box
          span(v-t="'under'")
          span(v-t="'construct'")
      .text
        h1(v-t="'desc'")
        p(v-t="'subdescA'")
        p(v-t="'subdescB'")
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
  &.lg
    position relative
    width 100%
    height 100vh
    display flex
    flex-flow column nowrap
    justify-content center
    align-items center
    overflow hidden

    &::after
      content ''
      position absolute
      width 100%
      height @width
      top 0
      left 0
      background url('~@rs/loggedbar.png'), rgba(#212121, .3)
      z-index 1

    video
      width 100%
      height 100%
      object-fit cover
      position absolute
      top 0
      left 0
      z-index 0

    .middle
      width 100%
      height 70%
      display flex
      flex-flow row nowrap
      justify-content center
      align-items center
      position relative
      display grid
      grid '. logo box' 1fr / 1fr max-content 1fr
      place-items center center
      padding-bottom 20vh

      .box
        display flex
        flex-flow column nowrap
        justify-content center
        text-align end
        grid-area box

        span
          font-size 3em
          text-transform uppercase
          // text-shadow 0 0 10px black
          opacity .7
          z-index 4

        span:first-of-type
          color #EEE
          font-weight 800

        span:last-of-type
          color #f0a30a
          font-weight 200

      img
        mix-blend-mode color-dodge
        position relative
        z-index 2
        grid-area logo
        animation grow 20s ease-in-out infinite alternate

    .text
      position relative
      width 100%
      padding 0 4em
      z-index 5
      opacity .7

      h1
        font-size 3em
        font-weight 200
        color white
        padding-bottom .2em

      p
        color #EEE
        font-size 1.2em
        padding-left 2em
        font-weight 400

      p:last-of-type
        padding-left 3em

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
        width 100%
        text-transform uppercase
        text-shadow 0 0 10px black
        padding 1em .5em
        backdrop-filter blur(3px)

        @supports not (backdrop-filter: blur(3px))
          material(2)
          border 1px solid rgba(#2c3e50, .8)

        .under
          font-weight 800
          color #f0a30a

        .construct
          font-weight 400
          color silver

@keyframes logo
  from
    opacity 1

  to
    opacity 0

@keyframes grow
  0%
    transform scale(1.5)
    filter grayscale(1) blur(10px)

  10%
    transform scale(1.7)
    filter grayscale(1) blur(3px)

  15%
    transform scale(1.5)
    filter grayscale(0) blur(10px) brightness(.5)

  20%
    transform scale(1.8)
    filter grayscale(1) blur(5px)

  40%
    transform scale(1.5)
    filter grayscale(1) blur(2px)

  75%
    transform scale(2)
    filter grayscale(.2) blur(2px)

  80%
    transform scale(2)
    filter grayscale(1) blur(5px)

  100%
    transform scale(2)
    filter grayscale(1) blur(1px)

@keyframes float
  from
    transform translateY(-5px) scale(.7)

  to
    transform translateY(5px) scale(.7)
</style>


