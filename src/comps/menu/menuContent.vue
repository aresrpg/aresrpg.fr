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
export default {
	components: {
		logo: ()=> import('@svg/logo.svg')
	},
}
</script>

<style lang="stylus" scoped>
@require '~@stl/palette'

.sm
    li
        list-style none

    .ares
        fill palette(1)
        transform scale(.7)
</style>

