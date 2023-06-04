<template lang="pug">
    div(class="ir-footer-mobile")
        div(class="pl-1 pt-2 pb-2" style="border:0px solid;")
            div(class="pl-2" style="border:0px solid;")
                div(v-html="getCompany.post_address")
            div(class="mt-2" style="border:0px solid;")
                div(class="pl-2" style="border:0px solid;") Tel. {{ getCompany.ir_telephone }}
                div(class="pl-2" style="border:0px solid;") {{ getCompany.ir_email }}
            div(class="mt-2" style="height:40px; border:0px solid;")
                div(style="float:left; width:200px; border:0px solid;")
                    div(class="pl-2" style="border:0px solid;") Org nr. {{ getCompany.org_nr }}
                    div(class="pl-2" style="border:0px solid;")
                        a(href="#" style="color:#000000;") {{ getCompany.ir_url }}
                div(class="text-right" style="float:left; width:calc(100% - 200px); padding-right:75px; border:0px solid;")
                    div(style="border:0px solid;")
                        img(src="@/assets/linkedin-icon.svg" title="LinkedIn" style="height:35px;")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "FooterMobile",
    computed: {
        ...mapGetters(['getCompany']),
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
