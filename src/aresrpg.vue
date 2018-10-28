<template>
  <router-view />
</template>

<style lang="stylus">
@require '~@stl/utils'
@require '~@stl/fonts'

:root
  font-size 18px

*
  sc-reset()
  sc-disableScollBar()

.snotifyToast__body
  font-family $sm
  text-transform uppercase
  font-size 1em
  font-weight 700
</style>

