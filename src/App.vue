<template lang="pug">
    main
      router-view
      utils
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'

@Component({
  components: {
    utils: () => import('@cmp/utils/index.vue'),
    scrollBar: () => import('vue2-scrollbar')
  }
})
export default class App extends Vue { }
</script>

<style lang="stylus">
@require '~@stl/utils'
@import url('https://fonts.googleapis.com/css?family=Assistant:200,400,600,800')

:root
  font-size 18px

*
  sc-reset()
  sc-disableScollBar()
  font-family 'Assistant', sans-serif
  outline none
  scroll-behavior smooth

  a
    :active
      color #e1c79b
      fill #e1c79b
</style>
