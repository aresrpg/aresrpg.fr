<template>
    <footer class="sc-midnightCity">
        <div class="sc-container">
            <div class="sc-author">
                footer placeholder
                <span>by</span><br>
                <span class="sc-hydre">hydre</span>
                <span>.</span>
                <span class="sc-io">io</span>
            </div>
        </div>
    </footer>
</template>

<script>
</script>

<style lang="stylus" scoped>
@require '~@stl/sceat-gradients'
@require '~@stl/fonts'

footer
    width 100%
    height 500px
    overflow hidden

    .sc-container
        width 100%
        height 100%
        background $snow, $dotted
        background-blend-mode darken
        background-attachment fixed
        display flex
        justify-content center
        align-items center

        .sc-author
            width 60%
            text-align justify
            font-family $raleway
            font-weight 200
            font-size 4em
            color silver
            color crimsom
            text-transform uppercase

            .sc-hydre
                font-weight 400

            .sc-io
                font-size .7em
                font-weight 100
                color lightgreen
</style>

