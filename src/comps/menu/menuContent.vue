<template>
    <div :class="$mq">
        <div class="shadow" :class="{ 'animate': animate }">
            <div class="menu">
                <ul>
                    <li>Discover</li>
                    <li>Play Now</li>
                    <li>News</li>
                    <li>Media</li>
                    <li>Forum</li>
                    <li>Social</li>
                    <li>Team</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { MENU_OPENNED } from '@core/events'

export default {
	data() {
		return {
			animate: false,
		}
	},
	mounted() {
		const ctx = this
		this.$root.$on(MENU_OPENNED, opened => setTimeout(() => (ctx.animate = opened)), 200)
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/palette'

.sm
    width 100%
    height 100%
    background palette(2)
    background linear-gradient(to right, #ffc500, darken(palette(2), 20%))

    .shadow
        filter drop-shadow(0 0 0 white)

        .menu
            width 100%
            height 100vh
            background linear-gradient(to left, #ffc500, darken(palette(2), 20%))
            clip-path polygon(100% 13%, 100% 100%, 0 100%, 0 25%)
            display flex
            flex-flow column nowrap
            justify-content flex-end
            align-items center

            li
                list-style none

    .animate
        animation light 10s infinite ease-in-out alternate

@keyframes light
    from
        filter drop-shadow(0 0 .2em rgba(black, .9))

    to
        filter drop-shadow(0 -10px .5em rgba(white, .7))
</style>