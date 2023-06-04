<template lang="pug">
    div(class="ir-footer-regular footer-container")
        div(class="mt-2" style="max-width:900px; height:50px; margin-left:auto; margin-right:auto; border:0px solid;")
            div(style="float:left; height:50px; width:26%; border:0px solid;")
                div(class="pl-2" style="height:25px; border:0px solid;")
                    div(v-html="getCompany.post_address")
                //- div(class="pl-2" style="height:25px; border:0px solid;") Birgerjarlsgatan 22
                //- div(class="pl-2" style="height:25px; border:0px solid;") 101 23 Stockholm
            div(style="float:left; height:50px; width:26%; border:0px solid;")
                div(class="pl-2" style="height:25px; border:0px solid;") Tel. {{ getCompany.ir_telephone }}
                div(class="pl-2" style="height:25px; border:0px solid;") {{ getCompany.ir_email }}
            div(style="float:left; height:50px; width:26%; border:0px solid;")
                div(class="pl-2" style="height:25px; border:0px solid;") Org nr. {{ getCompany.org_nr }}
                div(class="pl-2" style="height:25px; border:0px solid;")
                    a(href="#" style="color:#000000;") {{ getCompany.ir_url }}
            div(class="text-right" style="float:left; height:50px; width:22%; padding-right:75px; padding-top:5px; border:0px solid;")
                img(src="@/assets/linkedin-icon.svg" title="LinkedIn" style="height:35px;")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Footer",
    computed: {
        ...mapGetters(['getCompany']),
    },
};
</script>

<style scoped>
.footer-container {
    position: fixed;
    bottom: 0;
    height: 65px;
    width: 100%;
}

.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

@media (max-width: 599px) {
    .footer-container {
        display: none;
    }
}
</style>
