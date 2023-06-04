<template lang="pug">
    div(class="ir-invest-in-us-main-regular" style="padding-bottom:25px; border:0px solid;")
        div(style="max-width:1000px; margin-left:auto; margin-right:auto; border:0px solid;")
            div(class="container-element")
                
                div(v-for="why in whys" :key="why.why_id" class="row-block mb-2" style="height:218px; overflow:hidden; border:0px solid;")
                    div(style="float:left; width:calc(100% - 250px); height:222.5px; border:0px solid;")
                        div(class="ml-2 mr-6" style="border:0px solid;")
                            h2(class="ellipsis mb-6" :title="why.title") {{ why.title }}
                            div(:title="why.detail" style="max-height:165px; overflow-y:scroll; overflow-x:hidden; border:0px solid;") {{ why.detail }}
                    div(style="float:left; width:250px; height:222.5px; overflow:hidden; border:0px solid;")
                        img(:src="why.img" style="width:100%;")
                        //- img(src="@/assets/katalysen-forest.svg" style="width:100%;")
                        //- img(src="@/assets/sensidose/sensidose-old-couple.svg" style="width:100%;")
                        //- img(src="@/assets/easyfill/easyfill-fridge.svg" style="width:100%;")
                        //- img(src="@/assets/absolicon/absolicon-pannels.svg" style="width:100%;")

                //- div(class="row-block mb-2" style="height:218px; overflow:hidden; border:0px solid;")
                //-     div(style="float:left; width:calc(100% - 250px); height:222.5px; border:0px solid;")
                //-         div(class="ml-2 mr-6" style="border:0px solid;")
                //-             h2(class="ellipsis mb-6" title="1. Access to exciting startup with expertise") 1. Access to exciting startup with expertise
                //-             div(style="max-height:165px; overflow-y:scroll; overflow-x:hidden; border:0px solid;") Unlisted investments hold tremendous potential but carry big risks. Katalysen Ventures give you access to this asset class in a complete unique way, letting your harvest the fruit, whilst we do the weeding. We have been doing this for a long time and have an experienced team, but we don’t have eyes everywhere. If you find companies we should look into please let us know. We value the relationships with our shareholders and see them as our partners.
                //-     div(style="float:left; width:250px; height:222.5px; overflow:hidden; border:0px solid;")
                //-         img(:src="whys[1].image" style="width:100%;")
                //-         //- img(src="@/assets/katalysen-cube.svg" style="width:100%;")
                //-         //- img(src="@/assets/sensidose/sensidose-milk-remote.svg" style="width:100%;")
                //-         //- img(src="@/assets/easyfill/easyfill-zugut.svg" style="width:100%;")
                //-         //- img(src="@/assets/absolicon/absolicon-pie-chart.svg" style="width:100%;")

                //- div(class="row-block mb-2" style="height:218px; overflow:hidden; border:0px solid;")
                //-     div(style="float:left; width:calc(100% - 250px); height:222.5px; border:0px solid;")
                //-         div(class="ml-2 mr-6" style="border:0px solid;")
                //-             h2(class="ellipsis mb-6" title="1. Access to exciting startup with expertise") 1. Access to exciting startup with expertise
                //-             div(style="max-height:165px; overflow-y:scroll; overflow-x:hidden; border:0px solid;") Unlisted investments hold tremendous potential but carry big risks. Katalysen Ventures give you access to this asset class in a complete unique way, letting your harvest the fruit, whilst we do the weeding. We have been doing this for a long time and have an experienced team, but we don’t have eyes everywhere. If you find companies we should look into please let us know. We value the relationships with our shareholders and see them as our partners.
                //-     div(style="float:left; width:250px; height:222.5px; overflow:hidden; border:0px solid;")
                //-         img(:src="whys[2].image" style="width:100%;")
                //-         //- img(src="@/assets/katalysen-people.svg" style="width:100%;")
                //-         //- img(src="@/assets/sensidose/sensidose-forest.svg" style="width:100%;")
                //-         //- img(src="@/assets/easyfill/easyfill-store.svg" style="width:100%;")
                //-         //- img(src="@/assets/absolicon/absolicon-robot.svg" style="width:100%;")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "InvestInUs",
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

.second-step {
    display: none;
}
</style>
