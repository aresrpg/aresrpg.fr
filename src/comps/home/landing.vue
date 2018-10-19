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
@require '~@stl/landing'
</style>


