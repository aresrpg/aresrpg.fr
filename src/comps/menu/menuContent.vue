<template>
    <div :class="$mq">
        <img src="@rs/logo.png" alt="">
        <div class="shadow" :class="{'drop-shadow':anim}">
            <div class="menu">
                <ul>
                    <li class="discover" v-rp @click="() => closeAndScroll('#discover')">
                        <i class="fas fa-shield-alt" />
                        <span>Discover</span>
                        <span>Join the adventure !</span>
                    </li>
                    <li class="community" v-rp @click="() => closeAndScroll('#community')">
                        <i class="fas fa-user-astronaut" />
                        <span>Community</span>
                        <span>What's new in the community ?</span>
                    <li class="media" v-rp @click="() => closeAndScroll('#media')">
                        <i class="fas fa-coffee" />
                        <span>Media</span>
                        <span>Read the latest devblog !</span>
                    </li>
                    <li class="contact" v-rp @click="() => closeAndScroll('#contact')">
                        <i class="far fa-comment-alt" />
                        <span>Contact</span>
                        <span>Need help ?</span>
                    </li>
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
			anim: false,
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
			this.anim = open
			if (this.scrollTo && !open) {
				this.$root.$emit(SCROLL_TO, this.scrollTo)
				this.scrollTo = undefined
			}
		},
	},
	mounted() {
		this.$root.$on(MENU_OPENNED, open => this.onMenu(open))
		this.$root.$on(MENU_FLOATING, () => (this.anim = false))
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

    img
        position absolute
        mix-blend-mode screen
        filter grayscale(1)


    .drop-shadow
        filter drop-shadow(0 0 4px black)

    .shadow
        width 100%

        .menu
            width 100%
            height 100vh
            background linear-gradient(to left, #F4511E, lighten(#F4511E, 20%), lighten(#F4511E, 40%))
            clip-path polygon(100% 13%, 100% 100%, 0 100%, 0 25%)
            display grid
            position relative

            ul
                display flex
                flex-flow column nowrap
                grid-area nav

                li
                    list-style none
                    text-transform uppercase
                    text-align center
                    color palette(1)
                    display grid
                    justify-items baseline
                    justify-content flex-start
                    align-items center
                    align-content center
                    flex 1 auto
                    box-shadow 0 5px 5px -5px rgba(black,.7)
                    position relative

                    &>:first-child
                        grid-area i
                        font-size 2.5em
                        justify-self center

                    &>:nth-child(2)
                        grid-area title
                        smFont(1)
                        font-size 1.5em
                        align-self end
                        // padding-top .2em

                    &>:nth-child(3)
                        grid-area caption
                        smFont(2)
                        font-size .8em
                        align-self start
                        text-transform initial

                .discover
                    background #F4511E
                    background linear-gradient(to left, #F4511E, lighten(#F4511E, 20%), lighten(#F4511E, 40%))
                    z-index 4

                .community
                    background #FB8C00
                    background linear-gradient(to left, #FB8C00, lighten(#FB8C00, 20%), lighten(#FB8C00, 40%))
                    z-index 3
                .media
                    background #FFB300
                    background linear-gradient(to left, #FFB300, lighten(#FFB300, 20%), lighten(#FFB300, 40%))
                    z-index 2

                .contact
                    background #FDD835
                    background linear-gradient(to left, #FDD835, lighten(#FDD835, 20%), lighten(#FDD835, 40%))
                    z-index 1

@keyframes float
    from
        transform translateY(-25px) scale(.5)

    to
        transform translateY(-15px) scale(.5)
</style>


<style scoped>
.sm .menu {
	grid: 'logo' 30vh 'nav' 70vh / 1fr;
}

.sm .menu li {
	grid: 'i title' max-content 'i caption' max-content / 120px 1fr;
}
</style>
