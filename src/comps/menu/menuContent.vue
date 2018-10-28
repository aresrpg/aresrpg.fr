<template>
    <div :class="$mq">
        <logo class="ares" />
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
</template>

<script>
import logo from '@svg/logo.svg'

export default {
	components: {
		logo,
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/colors'

.sm
    li
        list-style none

    .ares
        fill $color-a
        transform scale(.7)
</style>

