<template>
    <modal class="modal in" :class="{'modal out':modalOut}" @outside="close" :fade="modalOut">
        <div class="icon">
            <i class="fas" :class="icon" v-rp></i>
        </div>
        <slot />
    </modal>
</template>

<script>
import modal from '@cmp/modals/modal.vue'
export default {
	props: {
		icon: {
			default: 'fa-exclamation',
		},
	},
	data() {
		return {
			modalOut: false,
		}
	},
	methods: {
		close() {
			this.modalOut = true
			const ctx = this
			setTimeout(() => ctx.$emit('close'), 500)
		},
	},
	components: {
		modal,
	},
}
</script>

<style lang="stylus" scoped>
@require '~@anim/flipInX'
@require '~@anim/fadeOutUp'
@require '~@stl/palette'

.icon
    width 100%
    background #ba8b02 /* fallback for old browsers */
    background linear-gradient(to right, #ba8b02, #181818)
    clip-path polygon(0 100%, 69% 0, 0 0)
    shape-outside polygon(0 100%, 69% 0, 0 0)
    shape-margin 10px
    float left

    .fas
        padding 10px
        margin-bottom 10px
        text-shadow 0 0 .15em black
        color darken(palette(2), 10%)

.modal
    &.in
        &>:nth-child(2)
            flipInX()
            animation-duration 400ms
            animation-direction alternate

    &.out
        &>:nth-child(2)
            fadeOutUp()
            animation-duration 400ms
            animation-direction alternate
            animation-fill-mode forwards
</style>
