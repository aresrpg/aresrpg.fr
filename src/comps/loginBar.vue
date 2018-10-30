<template>
    <div class="login">
        <div ref="container" class="container" :class='$mq' :style="`transform: translateY(${-offset}px)`">
            <div class="o-reveal" v-rp>
                <i v-show="$mq==='lg'" class="fas fa-sign-in-alt" />
                <div class="icon" @click="openMenu">
                    <i class="fas fa-bars" />
                    <div class="divider" />
                </div>
                <span @click="modal = true">login</span>
            </div>
            <div class="o-reveal" @click="modal = true" v-rp>
                <span>register</span>
            </div>
        </div>
        <not-ready-modal v-if="modal" @close="modal = false" />
    </div>
</template>

<script>
import { FORCE_MENU } from '@core/events'

const FACTOR = 2
const HIDDEN = 0.85

export default {
	data() {
		return {
			offset: 0,
			modal: false,
		}
	},
	methods: {
		onScroll() {
			const deltaY = window.pageYOffset - this.lastY
			const height = this.$refs.container.offsetHeight * HIDDEN

			this.offset += deltaY / FACTOR
			if (this.offset > height) this.offset = height
			if (this.offset < 0) this.offset = 0
			this.lastY = window.pageYOffset
		},
		openMenu() {
			this.$root.$emit(FORCE_MENU, true)
		},
	},
	components: {
		notReadyModal: () => loadComponent('modals/notReady.modal'),
	},
	mounted() {
		this.lastY = window.pageYOffset
		window.addEventListener('scroll', this.onScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScroll)
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/material'
@require '~@stl/fonts'
@require '~@stl/palette'

.container
    material(2)

    &.sm
        smFont(2)
        font-size .9rem
        text-transform uppercase
        text-shadow 0px 2px 3px rgba(0, 0, 0, .4), 0px 8px 13px rgba(0, 0, 0, .1), 0px 18px 23px rgba(0, 0, 0, .1)
        width 100%
        height 50px
        display flex
        flex-flow row nowrap
        align-items center
        position fixed
        top 0
        z-index 2
        min-width 150px
        overflow hidden

        >div
            text-align center
            flex 1 50%
            padding 1em 0

        >:first-child
            color palette(2)
            background-color palette(1)
            background linear-gradient(to right, lighten(palette(1), 20%), palette(1))
            border-right .6em solid palette(2)
            display flex
            align-items center

            span
                flex 1 1 70%
                transform translateX(-9%)

            .icon
                display flex
                justify-content space-evenly
                align-items center
                width 100%
                flex .4 0 30%

                .divider
                    width 1px
                    height 34px
                    align-self center
                    border-right 1px solid rgba(white, .4)

        >:last-child // register
            color palette(1)
            background-color palette(2)
            background linear-gradient(to right, lighten(palette(2), 20%), palette(2))
            border-left .6em solid palette(1)

    &.lg
        font-family $lg
        font-size 1.2rem
        text-transform uppercase
        color lighten(palette(2), 20%)
        background url('~@rs/loggedbar.png')
        width 100%
        height 100%
        display flex
        flex-flow row nowrap
        justify-content flex-end

        i
            font-size .8em
            color rgba(lighten(palette(2), 20%), .5)

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
                background-color darken(palette(1), 20%)
                color palette(2)

            &:before
                content ''
                position absolute
                z-index -1
                left 0
                right 0
                top 0
                background palette(2)
                height 4px
                transform translateY(-4px)
                transition-property transform
                transition-duration .3s
                transition-timing-function ease-out

            &:hover:before, &:focus:before, &:active:before
                transform translateY(0)
</style>