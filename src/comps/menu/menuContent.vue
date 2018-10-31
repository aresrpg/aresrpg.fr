<template>
    <div :class="$mq">
        <img src="@rs/logo.png" alt="AresRPG logo">
        <div class="shadow" :class="{ 'drop-shadow': dropshadow }">
            <div class="menu">
                <img src="@rs/logo.png" alt="AresRPG logo">
                <ul>
                    <li v-rp @click="() => closeAndScroll('#discover')">Discover</li>
                    <li v-rp @click="() => closeAndScroll('#playnow')">Play Now</li>
                    <li v-rp @click="() => closeAndScroll('#team')">Team</li>
                    <li v-rp @click="() => closeAndScroll('#social')">Social</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { MENU_FLOATING, MENU_OPENNED, FORCE_MENU, SCROLL_TO } from '@core/events'

export default {
	data() {
		return {
			dropshadow: false,
			scrollTo: undefined,
		}
	},
	methods: {
		closeAndScroll(to) {
			const ctx = this
			setTimeout(() => {
				ctx.$root.$emit(FORCE_MENU, false)
				ctx.scrollTo = to
			}, 200)
		},
		onMenu(open) {
			this.dropshadow = open
			if (this.scrollTo && !open) {
				this.$root.$emit(SCROLL_TO, this.scrollTo)
				this.scrollTo = undefined
			}
		},
	},
	mounted() {
		const ctx = this
		this.$root.$on(MENU_OPENNED, open => ctx.onMenu(open))
		this.$root.$on(MENU_FLOATING, () => (ctx.dropshadow = false))
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/palette'
@require '~@stl/fonts'
@require '~@stl/material'

.sm
    width 100%
    height 100%
    background palette(2)
    background url('~@rs/triangles.png') no-repeat
    background-size cover
    position relative
    display flex
    justify-content center

    &>img
        position absolute
        transform scale(.7)
        width auto
        opacity .6
        filter grayscale(1) blur(2px)
        mix-blend-mode difference

    .shadow
        width 100%

        .menu
            width 100%
            height 100vh
            background linear-gradient(to right, #ffc500, darken(palette(2), 20%))
            clip-path polygon(100% 13%, 100% 100%, 0 100%, 0 25%)
            display grid

            img
                grid-area 'logo'
                transform scale(.7)
                justify-self center
                mix-blend-mode difference
                filter grayscale(1) brightness(.5)

            ul
                width 100%
                height 70%
                display flex
                flex-flow column nowrap
                justify-content center
                align-items center
                grid-area 'nav'

                li
                    list-style none
                    smFont(1)
                    text-transform uppercase
                    width 80%
                    text-align center
                    padding .8em
                    margin .5em 0
                    border 1px solid rgba(black, .5)
                    border-radius 5px
                    material(2)
                    background #232526
                    background url('~@rs/triangles.png') no-repeat
                    background-attachment fixed
                    color #414345
                    mix-blend-mode luminosity

    .drop-shadow
        filter drop-shadow(0 0 .2em rgba(black, .9))
        animation burn 2s ease-in-out infinite alternate

@keyframes burn
    from
        filter drop-shadow(0 0 .2em rgba(black, .9))

    to
        filter drop-shadow(0 0 .5em rgba(crimson, .9))
</style>

<style scoped>
.menu {
	grid: 'logo' 30% 'nav' minmax(1fr, 70%) / 1fr;
}
</style>
