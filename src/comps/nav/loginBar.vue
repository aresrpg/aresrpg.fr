<template>
    <div class="sc-container material-2" :class='$mq'>
        <div class="o-reveal" @click='notReady()' v-rp><i v-show="$mq==='lg'" class="fas fa-sign-in-alt" /> login</div>
        <div class="o-reveal" @click='notReady()' v-rp>register</div>
    </div>
</template>

<script>
export default {
	methods: {
		notReady() {
			this.$snotify.warning('AresRPG is not ready', {
				timeout: 2000,
				showProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				backdrop: 0.4,
				position: 'centerTop',
			})
		},
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/fonts'
@require '~@stl/colors'
@require '~@stl/sceat-shadows'

bg-color = #263238
text-color = silver
amber = #f0a30a
midnight = #2c3e50

.sc-container
    &.sm
        font-family $sm
        font-size 1.2rem
        font-weight 700
        text-transform uppercase
        text-shadow 0px 2px 3px rgba(0, 0, 0, .4), 0px 8px 13px rgba(0, 0, 0, .1), 0px 18px 23px rgba(0, 0, 0, .1)
        width 100%
        height 100%
        display flex
        flex-flow row wrap
        align-items center

        >div
            padding 1em 0
            text-align center
            flex 1 50%

        >:first-child
            color midnight
            background-color amber
            border-right 2px solid midnight

        >:last-child
            color amber
            background-color midnight
            border-left 1px solid amber

    &.lg
        font-family $lg
        font-size 1.2rem
        text-transform uppercase
        color text-color
        background url('~@rs/loggedbar.png')
        width 100%
        height 100%
        display flex
        flex-flow row nowrap
        justify-content flex-end

        i
            font-size .8em
            color rgba(text-color, .5)

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
                background-color darken(bg-color, 20%)
                color $gold-light

            &:before
                content ''
                position absolute
                z-index -1
                left 0
                right 0
                top 0
                background $gold-light
                height 4px
                transform translateY(-4px)
                transition-property transform
                transition-duration .3s
                transition-timing-function ease-out

            &:hover:before, &:focus:before, &:active:before
                transform translateY(0)
</style>