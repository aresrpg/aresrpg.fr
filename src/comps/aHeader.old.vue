<template>
    <header>
        
    </header>
</template>

<script>
export default {
}
</script>


<style lang="stylus" scoped>
@require '~@stl/colors'
@require '~@stl/sceat-shapes'
@require '~@stl/sceat-gradients'
@require '~@stl/sceat-shadows'

ease-light = cubic-bezier(.87, .06, .64, 1.35)

header
    animation lights 5s ease-light infinite alternate
    position relative
    z-index 9999

    .sc-container
        position fixed
        height 20vh
        width 100%
        clip-path $bottom-poly-1
        display flex
        justify-content center
        align-items center

    .sc-social
        display grid
        grid-template-columns 25% 25% auto 25% 25%
        grid-template-areas 'one two space three four'
        grid-gap 5vmax
        width auto
        margin-bottom 2em
        justify-items center
        justify-content center

        // align-items center
        & > *
            width 100%
            max-width 5vh
            min-width 68px
            fill rgba(0, 0, 0, .5)
            transition all .5s cubic-bezier(.25, .8, .25, 1)

        &>:nth-child(1)
            grid-area one

            &:hover
                fill #55acee

        &>:nth-child(2)
            grid-area two

            &:hover
                fill #C0C7C4

        &>:nth-child(3)
            grid-area three

            &:hover
                fill #920504

        &>:nth-child(4)
            grid-area four

            &:hover
                fill #863BE3

@keyframes lights
    from
        filter drop-shadow(0 0 .5em #0050ef)

    to
        filter drop-shadow(0 0 1em $red-light)
</style>
