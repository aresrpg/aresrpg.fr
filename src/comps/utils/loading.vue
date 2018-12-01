<template lang="pug">
    .loading
        img(src="@rs/loadingcircle.png" alt="logo")
        .logo(ref="logo")
            loading-logo
        </div>
    </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import dyn from 'dynamics.js'

const gravityBounce = el => {
  dyn.animate(
    el,
    {
      rotateZ: 45,
      scale: 0.3,
    },
    {
      type: dyn.forceWithGravity,
      duration: 2000,
      bounciness: 573,
      elasticity: 325,
      returnsToSelf: true,
    },
  )
}

const destroy = el => dyn.stop(el)

@Component({
  components: {
    loadingLogo: () => import('@svg/loading-logo.svg')
  }
})
export default class Loading extends Vue {
  mounted() {
    const ctx = this
    gravityBounce(this.$refs.logo)
    this.itv = setInterval(() => gravityBounce(ctx.$refs.logo), 2500)
  }

  beforeDestroy() {
    destroy(this.$refs.logo)
    clearInterval(this.itv)
  }
}
</script>


<style lang="stylus" scoped>
.loading
  width 100%
  height 100vh
  background #2c3e50
  background linear-gradient(to right, lighten(black, 10%), darken(#2c3e50, 40%))
  position fixed
  top 0
  z-index 3
  display flex
  justify-content center
  align-items center

  img
    position absolute
    width 160px
    height 160px
    animation loading 10s infinite linear

  .logo
    transform scale(.3)

@keyframes loading
  to
    transform rotate(360deg)
</style>
