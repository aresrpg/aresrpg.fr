<template lang="pug">
    .utils
        return-to-top(v-if="$mq==='lg'")
        toasts
        modals
        langs
</template>

<script>
export default {
  components: {
    returnToTop: () => import('@cmp/nav/returnToTop.vue'),
    toasts: () => import('@cmp/toasts/index.vue'),
    modals: () => import('@cmp/modals/index.vue'),
    langs: () => import('@cmp/utils/langs.vue')
  }
}
</script>