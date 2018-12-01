<template lang="pug">
    div(:class="$mq")
        img(src="@rs/logo.png" alt="logo")
        .shadow(:class="{'drop-shadow':anim}")
            .menu
                ul
                    li.discover(v-rp)
                        fa(fas="shield-alt")
                        span Discover
                        span Join the adventure !
                    li.community(v-rp)
                        fa(fas="user-astronaut")
                        span Community
                        span What's new in the community ?
                    li.media(v-rp)
                        fa(fas="coffee")
                        span Media
                        span Read the latest devblog !
                    li.contact(v-rp)
                        fa(far="comment-alt")
                        span Contact
                        span Need help ?
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MenuContent extends Vue {
  anim = false

  onMenu(open) {
    this.anim = open
  }

  mounted() {
    this.onMenuFloat = () => (this.anim = false)
  }

}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'

.sm
  width 100%
  height 100%
  background #f0a30a
  background url('~@rs/triangles.png') no-repeat
  background-size cover
  position relative
  display flex
  justify-content center

  img
    position absolute
    mix-blend-mode screen
    filter grayscale(1)

  .drop-shadow
    filter drop-shadow(0 0 4px black)

  .shadow
    width 100%

    .menu
      width 100%
      height 100vh
      background linear-gradient(to left, #F4511E, lighten(#F4511E, 20%), lighten(#F4511E, 40%))
      clip-path polygon(100% 13%, 100% 100%, 0 100%, 0 25%)
      display grid
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
          justify-items baseline
          justify-content flex-start
          align-items center
          align-content center
          flex 1 auto
          box-shadow 0 5px 5px -5px rgba(black, .7)
          position relative

          &>:first-child
            grid-area i
            font-size 2.5em
            justify-self center

          &>:nth-child(2)
            grid-area title
            smFont(1)
            font-size 1.5em
            align-self end
            // padding-top .2em

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

@keyframes float
  from
    transform translateY(-25px) scale(.5)

  to
    transform translateY(-15px) scale(.5)
</style>


<style scoped>
.sm .menu {
  grid: "logo" 30vh "nav" 70vh / 1fr;
}

.sm .menu li {
  grid: "i title" max-content "i caption" max-content / 120px 1fr;
}
</style>
