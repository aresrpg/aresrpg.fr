<i18n>
en:
    text: "Login and registrations are disabled, make sur to follow {link} on {twitter} to get the latest news!"
fr:
    text: "Il est actuellement impossible de se connecter, suivez {link} sur {twitter} pour rester informé!"
</i18n>

<template lang="pug">
      modal.modal(v-if="hasNotReady" @outside="closeModal()")
          .container
              fa(fas="frog" size="lg")
              i18n.lang(path="text")
                  a(href="https://twitter.com/AresRPG" target="_blank" rel="noopener noreferrer" place="link") @Aresrpg
                  span(place="twitter") twitter
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'

const modals = namespace('modals')

@Component({
  components: {
    modal: () => import('@cmp/modals/modal.vue')
  }
})
export default class NotReady extends Vue {
  @modals.Getter hasNotReady
  @modals.Action closeModal

}
</script>

<style lang="stylus" scoped>
.container
  width 100%
  height 100%
  display flex
  flex-flow column nowrap
  justify-content center
  align-items center
  border-left 5px solid #F9A825
  border-right 5px solid #F9A825

  i
    padding .6em
    color #F9A825
    width 100%
    text-align center

  .lang
    font-size .875em
    padding 1em

    a
      text-decoration none
      color #55acee
</style>
