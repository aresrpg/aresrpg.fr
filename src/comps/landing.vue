<template>
	<div class="container" :class="$mq">
		<div v-if="$mq==='lg'" class="video-container">
			<h-video class="trailer" :sources=sources :poster=poster v-video.autoplay.muted.loop />
		</div>
		<img class="logo" :class="{'anim':animateLogo}" :src=logo alt="AresRPG logo">
		<img class="fake" :class="{'anim':animateLogo}" :src=logo alt="AresRPG logo">
		<div class="glassed">
			<p>
				<span class="under">under</span>
				<span class="construct">construction</span>
			</p>
		</div>
	</div>
</template>

<script>
import { applyAttributes } from '@core/directives'
import mp4T from '@rs/trailer.mp4'
import webmT from '@rs/trailer.webm'
import poster from '@rs/snow-background.jpg'
import logo from '@rs/logo.png'

const { eventBus } = window

export default {
	data() {
		return {
			logo,
			poster,
			sources: [{ file: mp4T, format: 'video/mp4' }, { file: webmT, format: 'video/webm' }],
			animateLogo: true,
		}
	},
	directives: { video: applyAttributes },
	methods: {},
	components: {
		hVideo: () => loadComponent('fullScreenVideo'),
	},
	mounted() {
		this.onMenuOpenned = open => (this.animateLogo = !open)
		eventBus.on(MENU_OPENNED, this.onMenuOpenned)
	},
	beforeDestroy() {
		eventBus.off(MENU_OPENNED, this.onMenuOpenned)
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/material'
@require '~@stl/fonts'
@require '~@stl/palette'
@require '~@stl/sceat-shapes'

.container
	&.sm
		width 100%
		height 100vh
		min-height 480px
		background url('~@rs/snow-background.jpg') no-repeat
		background-size cover
		background-position center
		display flex
		justify-content space-between
		align-items center
		flex-flow column nowrap
		overflow hidden

		.logo
			padding-top 3em
			mix-blend-mode color-dodge
			filter grayscale(1)
			transform scale(.7)

			&.anim
				animation logo 4s ease-in-out 4s infinite alternate, float 4s ease-in-out infinite alternate

		.fake
			position absolute
			padding-top 3em
			top 0
			mix-blend-mode difference
			filter grayscale(1)
			transform scale(.7)

			&.anim
				animation logo 4s ease-in-out infinite alternate, float 4s ease-in-out infinite alternate

		.glassed
			width 100%
			height 50%
			display flex
			flex-flow column nowrap
			justify-content start
			align-items center

			p
				display flex
				flex-flow column nowrap
				text-align end
				font-size 10vmin
				text-transform uppercase
				text-shadow 0 0 10px black
				padding 1em 50%
				backdrop-filter blur(3px)

				@supports not (backdrop-filter: blur(3px))
					material(2)
					border 1px solid rgba(palette(1), .8)

				.under
					smFont(2)
					color palette(2)

				.construct
					smFont(1)
					color palette(3)

@keyframes logo
	from
		opacity 1

	to
		opacity 0

@keyframes float
	from
		transform translateY(-5px) scale(.7)

	to
		transform translateY(5px) scale(.7)
</style>


