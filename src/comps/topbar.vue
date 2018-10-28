<template>
    <div ref="container" class="container material-2" :class='$mq'>
        <div class="o-reveal" @click="notReady" v-rp><i v-show="$mq==='lg'" class="fas fa-sign-in-alt" /> login</div>
        <div class="o-reveal" @click="notReady" v-rp>register</div>
    </div>
</template>

<script>
import anime from 'animejs'
import { NOT_READY } from '@core/notification'

const factor = 1.5,
	hidden = 0.85
let offset = 0,
	lastY = 0

const smoothTranslate = (el, offset) =>
	anime({
		targets: el,
		translateY: -offset,
		duration: 0,
	})
const smoothHide = el => {
	offset = Math.max(0, Math.min(offset + (window.scrollY - lastY) / factor, el.offsetHeight * hidden))
	lastY = window.scrollY
	smoothTranslate(el, offset)
}

export default {
	methods: {
		notReady() {
			this.$snotify.warning(NOT_READY.text, NOT_READY.options)
		},
		onScroll() {
			smoothHide(this.$refs.container)
		},
	},
	mounted() {
		window.addEventListener('scroll', this.onScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll)
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/sceat-shadows'
@require '~@stl/fonts'
@require '~@stl/colors'

.container
    &.sm
        font-family $sm
        font-size 1.2rem
        font-weight 700
        text-transform uppercase
        text-shadow 0px 2px 3px rgba(0, 0, 0, .4), 0px 8px 13px rgba(0, 0, 0, .1), 0px 18px 23px rgba(0, 0, 0, .1)
        width 100%
        display flex
        flex-flow row wrap
        align-items center
        position fixed
        top 0
        z-index 2
        min-width 150px

        >div
            padding 1em 0
            text-align center
            flex 1 50%

        >:first-child
            color $color-b
            background-color $color-a
            border-right .6em solid $color-b

        >:last-child
            color $color-a
            background-color $color-b
            border-left .6em solid $color-a

    &.lg
        font-family $lg
        font-size 1.2rem
        text-transform uppercase
        color $text
        background url('~@rs/loggedbar.png')
        width 100%
        height 100%
        display flex
        flex-flow row nowrap
        justify-content flex-end

        i
            font-size .8em
            color rgba($text, .5)

        >div
            padding .6em 1em
            text-align center

            &:hover
                text-shadow 0px 0px 6px rgba(255, 255, 255, .2)
                cursor pointer

        // over animation
        .o-reveal
            display inline-block
            vertical-align middle
            transform perspective(1px) translateZ(0)
            box-shadow 0 0 1px rgba(0, 0, 0, 0)
            position relative
            overflow hidden

            &:hover
                transition-duration 300ms
                background-color darken($color-a, 20%)
                color $color-b

            &:before
                content ''
                position absolute
                z-index -1
                left 0
                right 0
                top 0
                background $color-b
                height 4px
                transform translateY(-4px)
                transition-property transform
                transition-duration .3s
                transition-timing-function ease-out

            &:hover:before, &:focus:before, &:active:before
                transform translateY(0)
</style>