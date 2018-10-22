<template>
    <div class="sc-container" :class='$mq'>
        <div class="i-forward o-reveal" @click='notReady()' v-rp><i v-show="$mq==='lg'" class="fas fa-sign-in-alt i"></i> login</div>
        <div class="o-reveal" :class="{'material-2':$mq==='sm'}" @click='notReady()' v-rp>register</div>
    </div>
</template>

<script>
export default {
	methods: {
		notReady() {
			console.log(this.$snotify)
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

.sc-container
    &.sm
        font-family $raleway
        font-size 1.2rem
        text-transform uppercase
        color text-color
        background-color #263238
        width 100%
        height 100%
        display flex
        flex-flow column nowrap
        align-items center

        >div
            padding 1em 0
            text-align center
            width 100%
            border-top 1px solid rgba(255, 255, 255, .3)
            border-bottom 1px solid rgba(0, 0, 0, .1)

        >:first-child
            background-color #303F9F

        >:last-child
            background-color #1A237E

    &.lg
        font-family $raleway
        font-size 1.2rem
        text-transform uppercase
        color text-color
        background-color bg-color
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

        .i-forward
            display inline-block
            vertical-align middle
            transform perspective(1px) translateZ(0)
            box-shadow 0 0 1px rgba(0, 0, 0, 0)
            transition-duration .1s

            .i
                transform translateZ(0)
                transition-duration .1s
                transition-property transform
                transition-timing-function ease-out

            &:hover .i, &:focus .i, &:active .i
                transform translateX(4px)
                color rgba($gold-light,.5)

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
                background-color lighten(bg-color,10)

            &:before
                content ''
                position absolute
                z-index -1
                left 0
                right 0
                top 0
                background #BDBDBD
                height 4px
                transform translateY(-4px)
                transition-property transform
                transition-duration .3s
                transition-timing-function ease-out

            &:hover:before, &:focus:before, &:active:before
                transform translateY(0)
</style>