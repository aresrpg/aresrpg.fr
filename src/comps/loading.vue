<template>
    <div class="loading">
        <logo class="logo" />
    </div>
</template>

<script>
import anime from 'animejs'

const logoAnimation = () => {
	anime({
		targets: '.logo path',
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500,
		delay: function(el, i) {
			return i * 250
		},
		direction: 'alternate',
		loop: true,
	})
}

const destroy = () => anime.remove('.logo')

export default {
	mounted() {
		logoAnimation()
	},
	beforeDestroy() {
		destroy()
	},
	components: {
		logo: () => import('@svg/logo.svg'),
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/palette'

.loading
    width 100%
    height 100vh
    background-color palette(1)
    position fixed
    top 0
    z-index 3

    .cubes
        width 100%
        height 100%
        display grid
        grid-template-columns repeat(6, 1.5em)
        grid-template-rows repeat(6, 1.5em)
        justify-content center
        align-items center
        justify-items center
        align-content center
        background-color palette(2)

        .logo
            box-shadow 0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23)
</style>
