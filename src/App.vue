<template>
  <main>
    <home />
  </main>
</template>

<script>
import home from "./components/home"
export default {
  components: {
    home
  }
}
</script>


<style lang="stylus">
@import 'assets/styl/*'

*
  reset()
  disableScollBar()

main
  width 100%
  height 100vh
</style>
