<template>
    <header>
        <div class="container deepSpace">
            <ul class="social">
                <component v-for="(value,index) in datas" :key=index :is='value' />
            </ul>
        </div>
    </header>
</template>

<script>
import twitter from '@svg/twitter.svg'
import github from '@svg/github.svg'
import youtube from '@svg/youtube.svg'
import discord from '@svg/discord.svg'

export default {
	data() {
		return {
			datas: ['twitter', 'github', 'youtube', 'discord'],
		}
	},
	components: {
		twitter,
		github,
		youtube,
		discord,
	},
}
</script>


<style lang="stylus" scoped>
@require '~@stl/navbar'
</style>
