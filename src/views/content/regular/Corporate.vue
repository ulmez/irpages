<template lang="pug">
    div(class="ir-corporate-regular")
        div(style="max-width:1000px; margin-left:auto; margin-right:auto; border:0px solid;")
            div(class="container-element" style="border:0px solid;")
                //- header
                div(class="header-block")
                    div(class="col-block pl-2" style="float:left; border:0px solid;") Title
                    div(class="col-block" style="float:left; border:0px solid;") File
                    div(class="col-block" style="float:left; border:0px solid;") Published

                //- body
                div(v-for="doc in docs" :key="doc.doc_id" class="row-block")
                    div(class="col-block ellipsis pl-2 mt-1 mb-1" style="float:left; border:0px solid;") {{ doc.file_name }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ doc.url }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                        span {{ doc.date }}
                        v-icon(class="ml-5" size="16" color="black") mdi-file-outline
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Corporate",
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.docs)));
    },
    computed: {
        ...mapGetters(['getCompany']),
        docs() {
            return this.getCompany.docs;
        },
    },
};
</script>

<style scoped>
.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style>
