<template lang="pug">
    div(class="ir-invest-in-us-main-mobile" style="border:0px solid;")
        div(id="headline-invest-in-us")
            h2 Why Invest in us?
        div(class="container-element" style="border:0px solid;")
            div(v-for="why in whys" :key="why.why_id" class="row-block mb-2")
                div(style="border:0px solid;")
                    img(:src="why.img" style="width:100%;")
                div(style="border:0px solid;")
                    h2(class="ellipsis pl-2 pr-2" style="border:0px solid;") {{ why.title }}
                    div(class="mt-1 pl-2 pr-2 pb-2" style="border:0px solid;") {{ why.detail }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "InvestInUsMobile",
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.getCompany)));
        console.log(JSON.parse(JSON.stringify(this.whys)));
    },
    computed: {
        ...mapGetters(['getCompany']),
        whys() {
            return this.getCompany.whys;
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
