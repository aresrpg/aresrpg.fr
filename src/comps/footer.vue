<i18n>
en:
    credits: "Designed and integrated by {link}"
fr:
    credits: "Conçu et intégré par {link}"
</i18n>

<template lang="pug">
    footer
        .socials
            a(href="https://twitter.com/AresRPG" target="_blank" rel="noopener noreferrer" aria-label="Twitter")
                fa(fab="twitter-square" size="3x")
            a(href="https://www.youtube.com/user/MrSceat" target="_blank" rel="noopener noreferrer" aria-label="Youtube")
                fa(fab="youtube-square" size="3x")
            a(href="https://github.com/HydreIO/aresrpg.com" target="_blank" rel="noopener noreferrer" aria-label="Github")
                fa(fab="github-square" size="3x")
        .bottom
            i18n(path="credits")
                a(place="link" href="https://hydre.io" target="_blank" rel="noopener noreferrer" aria-label="Hydre website").
                    Hydre #[sub io]
</template>

<style lang="stylus" scoped>
footer
  width 100%
  background #212121
  display flex
  flex-flow column nowrap
  align-items center

  .socials
    width 100%
    height 100%
    display flex
    flex-flow row wrap
    justify-content space-evenly
    align-items center
    padding 50px 0

    >:first-child
      color #55acee

    >:nth-child(2)
      color #cd201f

    >:last-child
      color white

  .bottom
    width 100%
    background darken(#212121, 20%)
    font-size .7em
    color silver
    text-align center
    padding 1em

    a
      text-decoration none
      color #F9A825
</style>

