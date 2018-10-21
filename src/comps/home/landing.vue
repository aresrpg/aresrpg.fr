<template>
	<div class="container">
		<div v-if="showVideo()" class="video-container">
			<trailer class="trailer" :sources=sources :poster=poster v-video.autoplay.muted.loop />
		</div>
		<img :src=logo alt="AresRPG logo">
		<div class="glassed">
			<span class="under">under</span>
			<span class="construct">construction</span>
			<div class="wip">
				<wip />
			</div>
		</div>
	</div>
</template>

<script>
import { applyAttributes } from '@core/directives'
import logo from '@rs/logo.png'
import wip from '@svg/wip.svg'
import mp4T from '@rs/trailer.mp4'
import webmT from '@rs/trailer.webm'
import poster from '@rs/snow-background.jpg'

const datas = {
	logo,
	poster,
	sources: [{ file: mp4T, format: 'video/mp4' }, { file: webmT, format: 'video/webm' }],
}

const directives = {
	video: applyAttributes,
}

export default {
	data: () => datas,
	directives,
	components: {
		wip,
		trailer: () => import('@sc_cmp/sceat-videoContainer.vue'),
	},
	methods: {
		showVideo: function() {
			const ismobile = this.$root.isMobile()
			console.log('Mobile Device =', ismobile)
			return !ismobile
		},
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/sceat-shadows'
@require '~@stl/fonts'
@require '~@stl/colors'
@require '~@stl/sceat-shapes'

$dotted = url('~@rs/dot.png')
$snow = url('~@rs/snow-background.jpg')
$low-fi = rgba($midnight, .4)

.container
	display flex
	flex-flow column nowrap
	text-align center
	justify-content space-evenly
	height 100vh
	font-family $raleway
	color silver
	text-transform uppercase
	align-items center
	background $snow, $dotted
	background-blend-mode darken
	background-position bottom
	text-transform uppercase
	text-shadow 2px 4px 3px rgba(0, 0, 0, .5)
	overflow hidden

	.video-container
		position absolute
		width calc(100vh * (1280 / 720))
		height calc(100vw * (720 / 1280))
		min-width 100%
		min-height 100%
		top 50%
		left 50%
		transform translate(-50%, -50%)

		.trailer
			width 100%
			height 100%
			top 0
			left 0
			position absolute

	img
		width 30vmin
		max-width 350px
		min-width 240px
		max-height 350px
		transform translateY(30%)

	.glassed
		display flex
		flex-flow row nowrap
		flex 1 0
		max-height 10vh
		width 100%
		align-items center
		justify-content space-around
		padding .8em 1em
		backdrop-filter brightness(1.2) blur(5px)

		.under
			color gold
			font-weight 900
			font-size 2em

		.construct
			font-size 2em
			font-weight 300
			padding-right 1em

		.wip
			filter drop-shadow(0 0 .2em black)

			&>*
				fill gold
				min-width 6vmax

@supports not (backdrop-filter: blur(0))
	.glassed
		border solid 1px $low-fi
		box-shadow 0 3px 6px rgba(0, 0, 0, .16), 0 3px 6px rgba(0, 0, 0, .23)
		border-radius 3px

@media screen and (max-width: 600px)
	.container
		.glassed
			display grid
			grid-template-rows 1fr 1fr
			flex 1 0
			max-height 10vh
			width 100vw
			align-items center
			justify-content center

			.construct
				letter-spacing 0
				font-size 1.5em
				padding-right 0

			.under
				font-size 1.5em
				font-weight 900
				justify-self self-end

			.wip>*
				visibility hidden
				position absolute

		img
			min-width 150px
</style>


