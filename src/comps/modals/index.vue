<template lang="pug">
    .modals
        notReady
</template>

<script>
export default {
    components: {
		notReady:()=> import('@cmp/modals/notReadyModal.vue')
    }
}
</script>