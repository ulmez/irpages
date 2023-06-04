<template lang="pug">
    div(class="ir-generic-component-regular" style="padding-bottom:25px; border:0px solid;")
        div(style="max-width:1000px; margin-left:auto; margin-right:auto;")
            div(v-html="getPageContent")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "GenericComponent",
    mounted() {
        console.log(this.selectedPage);
        console.log(this.getPageContent);
    },
    computed: {
        ...mapGetters(['getCompany']),
        selectedPage() {
            return this.$route.params.display;
        },
        getPageContent() {
            return this.getCompany.pages.find((p) => p.menu_display === this.selectedPage).html_page;
        },
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
