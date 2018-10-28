<template>
    <div class="loading">
        <div class="cubes">
            <div class="cube" v-for="i in 36" :key=i />
        </div>
    </div>
</template>

<script>
import anime from 'animejs'

const logoAnimation = () => {
	anime({
		targets: '.cubes',
		rotate: '1turn',
		duration: 2000,
		loop: true,
		delay: 200,
		elsaticity: 400,
	})
}

const loadingAnimation = () =>
	anime({
		targets: '.cube',
		direction: 'alternate',
		translateZ: 0,
		easing: 'easeInQuint',
		scale: 0.8,
		loop: true,
		delay: 0,
		duration: (el, i, l) => 50 + i * 50,
	})

const destroy = () => anime.remove(['.cubes', '.cube'])

export default {
	mounted() {
		loadingAnimation()
		logoAnimation()
	},
	beforeDestroy() {
		destroy()
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/colors'

.loading
    width 100%
    height 100vh
    background-color $color-a
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
        mask embedurl('../assets/svg/logo.svg', 'utf8') no-repeat
        mask-position 50%
        mask-size 40%

        div
            width 1.6em
            height 1.6em
            background-color $color-b
            // box-shadow 0 10px 20px rgba(0, 0, 0, .19), 0 6px 6px rgba(0, 0, 0, .23)
            border-radius 5%
</style>
