<template lang="pug">
  section.site
    login-bar
    mobile-menu(v-if="$mq==='sm'" bg="f0a30a")
      menuContent
    landing
    aFooter
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    loginBar: () => import('@cmp/nav/loginBar.vue'),
    mobileMenu: () => import('@cmp/nav/menuWrapper.sm.vue'),
    menuContent: () => import('@cmp/nav/menuContent.vue'),
    landing: () => import('@cmp/landing.vue'),
    aFooter: () => import('@cmp/footer.vue')
  }
})
export default class UnderConstruction extends Vue { }
</script>