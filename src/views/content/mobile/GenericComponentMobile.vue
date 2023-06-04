<template lang="pug">
    div(class="ir-generic-component-mobile" style="border:0px solid;")
        div(id="headline-generic-component")
            h2 {{ getGenericPage.menu_display }}
        div(v-html="getGenericPage.html_page")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "GenericComponentMobile",
    computed: {
        ...mapGetters(['getGenericPage']),
    },
};
</script>

<!-- <style scoped>
.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style> -->
