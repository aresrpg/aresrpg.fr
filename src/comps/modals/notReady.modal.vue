<template>
    <!-- :fade to remove dark transparent layer -->
    <icon-modal icon='fa-exclamation' @close="$emit('close')">
        <div class="wrapdown">
            <p>login and registrations are disabled, make sur to follow
                <a href="https://twitter.com/AresRPG">@aresrpg</a>
                on <span>twitter</span> to get the latest news
            </p>
        </div>
    </icon-modal>
</template>

<script>
import iconModal from '@cmp/modals/icon.modal.vue'
export default {
	methods: {
		close() {
			const ctx = this
			setTimeout(() => ctx.$emit('close'), 500)
		},
	},
	components: {
		iconModal,
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/palette'
@require '~@stl/fonts'

.wrapdown
    clear both

p
    smFont(1)
    text-transform uppercase
    width 100%
    font-size .5em
    color palette(3)
    padding 1em

a
    text-decoration none
    color #55acee
</style>

