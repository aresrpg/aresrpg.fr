<template>
    <footer class="midnightCity">
        <div class="container ">
            <div class="author">
                footer placeholder
                <span>by</span><br>
                <span class="hydre">hydre</span>
                <span>.</span>
                <span class="io">io</span>
            </div>
        </div>
    </footer>
</template>

<script>
</script>

<style lang="stylus" scoped>
@require '~@sc_stl/sceat-gradients'
@require '~@stl/fonts'

footer
    width 100%
    height 500px
    overflow hidden

    .container
        width 100%
        height 100%
        background $snow, $dotted
        background-blend-mode darken
        background-attachment fixed
        display flex
        justify-content center
        align-items center

        .author
            width 60%
            text-align justify
            font-family $raleway
            font-weight 200
            font-size 4em
            color silver
            color crimsom
            text-transform uppercase

            .hydre
                font-weight 400

            .io
                font-size .7em
                font-weight 100
                color lightgreen
</style>

