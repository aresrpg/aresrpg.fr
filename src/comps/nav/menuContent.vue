<i18n>
en:
  cardA:
    title: "Discover"
    caption: "Join the adventure !"
  cardB:
    title: "Community"
    caption: "What's new in the community ?"
  cardC:
    title: "Media"
    caption: "Read the latest devblog !"
  cardD:
    title: "Contact"
    caption: "Need help ?"
fr:
  cardA:
    title: "Découvrir"
    caption: "Rejoindre l'aventure !"
  cardB:
    title: "Communauté"
    caption: "Les news de la communauté"
  cardC:
    title: "Média"
    caption: "Lisez le dernier devblog !"
  cardD:
    title: "Contact"
    caption: "Besoin d'aide ?"
</i18n>

<template lang="pug">
    - var shadow = {':class': "{'drop-shadow': !isMenuAnimating}"}
    div(:class="$mq")
        img(src="@rs/logo.png" alt="logo")
        .shadow&attributes(shadow)
            .menu
                ul
                    li.discover(v-rp)
                        fa(fas="shield-alt")
                        span(v-t="'cardA.title'")
                        span(v-t="'cardA.caption'")
                    li.community(v-rp)
                        fa(fas="user-astronaut")
                        span(v-t="'cardB.title'")
                        span(v-t="'cardB.caption'")
                    li.media(v-rp)
                        fa(fas="coffee")
                        span(v-t="'cardC.title'")
                        span(v-t="'cardC.caption'")
                    li.contact(v-rp)
                        fa(far="comment-alt")
                        span(v-t="'cardD.title'")
                        span(v-t="'cardD.caption'")
        .lang&attributes(shadow)
          .fr(v-if="locale === 'en'" @click="changeLocale('fr')")
            fr
          .gb(v-else @click="changeLocale('en')")
            gb
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace, Getter, Action } from 'vuex-class'

const menu = namespace('menu')
const lang = namespace('lang')

@Component({
  components: {
    fr: () => import('@svg/lang/fr.svg'),
    gb: () => import('@svg/lang/gb.svg')
  }
})
export default class MenuContent extends Vue {
  @menu.Getter isMenuFloating
  @menu.Getter isMenuOpened
  @menu.Getter isMenuAnimating
  @lang.Getter locale
  @lang.Action changeLocale

  clicked() {
    console.log('slt')
  }

}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'

.sm
  width 100%
  height 100%
  background #f0a30a
  background url('~@rs/triangles.jpg') no-repeat
  background-size cover
  position relative
  display flex
  justify-content center

  img
    position absolute
    mix-blend-mode screen
    filter grayscale(1)

  .shadow
    width 100%

    &.drop-shadow
      filter drop-shadow(0 0 4px black)

    .menu
      width 100%
      height 100vh
      background linear-gradient(to left, #F4511E, lighten(#F4511E, 20%), lighten(#F4511E, 40%))
      clip-path polygon(100% 13%, 100% 100%, 0 100%, 0 25%)
      display grid
      grid 'logo' 30vh 'nav' 70vh / 1fr
      position relative

      ul
        display flex
        flex-flow column nowrap
        grid-area nav

        li
          list-style none
          text-transform uppercase
          text-align center
          color #2c3e50
          display grid
          grid 'i title' max-content 'i caption' max-content / 120px 1fr
          justify-items baseline
          justify-content flex-start
          align-items center
          align-content center
          flex 1 auto
          box-shadow 0 5px 5px -5px rgba(black, .7)
          position relative
          order 1

          &>:first-child
            grid-area i
            font-size 2.5em
            justify-self center

          &>:nth-child(2)
            grid-area title
            smFont(1)
            font-size 1.5em
            align-self end

          &>:nth-child(3)
            grid-area caption
            smFont(2)
            font-size .8em
            align-self start
            text-transform initial

        .discover
          background #F4511E
          background linear-gradient(to left, #F4511E, lighten(#F4511E, 20%), lighten(#F4511E, 40%))
          z-index 4

        .community
          background #FB8C00
          background linear-gradient(to left, #FB8C00, lighten(#FB8C00, 20%), lighten(#FB8C00, 40%))
          z-index 3

        .media
          background #FFB300
          background linear-gradient(to left, #FFB300, lighten(#FFB300, 20%), lighten(#FFB300, 40%))
          z-index 2

        .contact
          background #FDD835
          background linear-gradient(to left, #FDD835, lighten(#FDD835, 20%), lighten(#FDD835, 40%))
          z-index 1

  .lang
    width 30px
    position absolute
    top 10px
    left 10px
    z-index 2

    &.drop-shadow
      filter drop-shadow(0 0 10px black)
</style>