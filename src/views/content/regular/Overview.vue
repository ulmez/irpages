<template lang="pug">
    div(class="ir-overview-main-regular")
        div(class="main-element" style="max-width:1000px; margin-left:auto; margin-right:auto; border:0px solid;")
            v-container(fluid class="first-step row-block" style="border:0px solid;")
                v-row(style="border:0px solid;")
                    v-col(cols="9" class="pa-0" style="border:0px solid;")
                        v-container(fluid style="border:0px solid;")
                            v-row(class="pr-2" style="border:0px solid;")
                                v-col(cols="12" class="pa-0")
                                    div(style="border:0px solid;")
                                        h2 {{ getCompany.name }} - {{ getCompany.pitch_title }}
                                    div(style="height:50px; overflow-y:scroll; overflow-x:hidden; margin-bottom:5px; border:0px solid;")
                                        div {{ getCompany.pitch_detail }}
                                v-col(cols="6" class="pl-0 pt-0 pb-0 pr-1" style="height:170px; border:0px solid green;")
                                    iframe(:src="`https://www.youtube.com/embed/${getCompany.video_url_1}`" frameborder="0" allowfullscreen style="height:100%; width:100%; border:0px solid red;")
                                v-col(cols="6" class="p1-1 pt-0 pb-0 pr-0" style="height:170px; border:0px solid green;")
                                    iframe(:src="`https://www.youtube.com/embed/${getCompany.video_url_2}`" frameborder="0" allowfullscreen style="height:100%; width:100%; border:0px solid red;")
                    v-col(id="right-regular-elements" cols="3" class="pa-0" style="border:0px solid;")
                        div(class="pt-7" style="height:100%; overflow:hidden; border:0px solid;")
                            img(src="@/assets/katalysen-image-link.svg" style="height:100%; border:0px solid;")
                            //- img(src="@/assets/sensidose/sensidose-image-link.svg" style="height:100%; border:0px solid;")
                            //- img(src="@/assets/easyfill/easyfill-image-link.svg" style="height:100%; border:0px solid;")
                            //- img(src="@/assets/absolicon/absolicon-image-link.svg" style="height:100%; border:0px solid;")

            v-container(fluid class="second-step row-block" style="border:0px solid;")
                v-row(style="border:0px solid;")
                    v-col(cols="12" class="pa-0" style="border:0px solid;")
                        v-container(fluid style="border:0px solid;")
                            v-row(style="border:0px solid;")
                                v-col(cols="12" class="pa-0 mb-1")
                                    div(style="border:0px solid;")
                                        h2 {{ getCompany.name }} - {{ getCompany.pitch_title }}
                                    div(style="border:0px solid;")
                                        div {{ getCompany.pitch_detail }}
                                v-col(cols="4" class="pl-0 pt-0 pb-0 pr-1" style="height:calc(20vw - 5px); border:0px solid green;")
                                    iframe(:src="`https://www.youtube.com/embed/${getCompany.video_url_1}`" frameborder="0" allowfullscreen style="height:100%; width:100%; border:0px solid red;")
                                v-col(cols="4" class="pl-1 pt-0 pb-0 pr-1" style="height:calc(20vw - 5px); border:0px solid green;")
                                    iframe(:src="`https://www.youtube.com/embed/${getCompany.video_url_2}`" frameborder="0" allowfullscreen style="height:100%; width:100%; border:0px solid red;")
                                v-col(cols="4" class="pl-1 pt-0 pb-0 pr-0" style="overflow:hidden;")
                                    img(src="@/assets/katalysen-image-link.svg" style="height:20vw; border:0px solid;")
                                    //- img(src="@/assets/sensidose/sensidose-image-link.svg" style="height:20vw; border:0px solid;")
                                    //- img(src="@/assets/easyfill/easyfill-image-link.svg" style="height:20vw; border:0px solid;")
                                    //- img(src="@/assets/absolicon/absolicon-image-link.svg" style="height:20vw; border:0px solid;")

            v-container(fluid class="third-step row-block mt-3 mb-2" style="border:0px solid;")
                v-row(class="pa-2" style="border:0px solid;")
                    v-col(class="pa-0" cols="12" sm="6" md="8" lg="8" xl="8" style="background-color:#FFFFFF; border:0px solid;")
                        div(id="left-regular-chart-element" style="overflow:hidden; width:100%; height:100%; border:0px solid;")
                            ChartPrice(
                                :company_id="33028"
                                :stock_id="4036"
                                :legendView="false"
                                :single="true"
                                :leftToolbar="false"
                                :showrightSideBarLine="false"
                                :width="width - 3"
                                :height="height - 30"
                                page="main"
                                style="border:0px solid red;"
                                ref="chartPrice"
                            )

                    v-col(class="pa-0" cols="12" sm="6" md="4" lg="4" xl="4" style="border:0px solid red;")
                        div(class="right-menu" style="position:relative; height:100%; border:0px solid green;")
                            div(class="text-right" style="border:0px solid;")
                                v-btn(small class="pl-1 pr-2")
                                    v-icon(size="15") mdi-eye-outline
                                    span(class="ml-1") Add to Watchlist or Edger Finance
                            div(style="height:10px; border:0px solid;")
                            div(style="border:0px solid;")
                                v-container(fluid)
                                    v-row(style="border:0px solid green;")
                                        v-col(v-for="kpi in kpis" :key="kpi.row_to_json.kpi_id" cols="6" class="sparkline pa-2" style="border:0px solid;")
                                            div(class="ellipsis pl-2" :title="kpi.row_to_json.text_1" style="border:0px solid;") {{ kpi.row_to_json.text_1 }}
                                            CanvasGeneric(v-if="color !== null" :values="kpi.row_to_json.values" :color="color" style="width:100%; max-height:70px; border:0px solid;")
                                            div(class="mt-2 pl-2" style="color:#000000; overflow-y:scroll; overflow-x:hide; border:0px solid;")
                                                span {{ kpi.row_to_json.text_2 }}
                                                //- span(style="text-decoration:underline;") Read more.
                                        //- v-col(cols="6" class="sparkline pa-2" style="border:0px solid;")
                                            div(class="ellipsis pl-2" title="Management Fee" style="border:0px solid;") Management Fee
                                            CanvasGeneric(v-if="color !== null" :color="color" style="width:100%; max-height:70px; border:0px solid;")
                                            div(class="mt-2 pl-2" style="color:#000000; overflow-y:scroll; overflow-x:hide; border:0px solid;")
                                                span Portfolio valuation is the latest value in MEUR of the portfolio.
                                                span(style="text-decoration:underline;") Read more.

                            div(style="position:absolute; bottom:0; width:100%;")
                                div(style="float:left; width:calc(100% - 55px); color:#000000;")
                                    div(class="bottom-right-text ml-2 mr-2 pa-1") Custom KPIs and interface provided by edger.finance. Your go-to tool for navigating the stock market. You can easily add Katalysen Ventures to your watchlist on Edger by using the watchlist button above.
                                div(style="float:left; width:55px; color:#000000;")
                                    div(style="font-size:8px;") Powered by
                                    div
                                        img(src="@/assets/edger-finance-icon.svg")
</template>

<script>
import ChartPrice from "@/components/ChartPrice.vue";
import CanvasGeneric from "@/components/CanvasGeneric.vue";
import { mapGetters } from "vuex";

export default {
    name: "Overview",
    components: {
        ChartPrice,
        CanvasGeneric,
    },
    data() {
        return {
            widthOnContainer: 0,
            width: 0,
            height: 0,
            color: null,
        };
    },
    mounted() {
        this.color = this.getColor();

        window.addEventListener('resize', this.onResize);

        this.onResize();

        console.log(JSON.parse(JSON.stringify(this.getCompany)));
        // console.log(JSON.parse(JSON.stringify(this.kpis)));
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    computed: {
        ...mapGetters(['getCompany']),
        kpis() {
            return this.getCompany.kpis;
        },
    },
    methods: {
        getColor() {
            const element = document.getElementsByClassName('ir-overview-main-regular')[0];
            const style = getComputedStyle(element);

            return style.color;
        },
        onResize() {
            if(document.getElementById('left-regular-chart-element') !== null) {
                const containerElement = document.getElementsByClassName('main-element')[0];
                const element = document.getElementById('left-regular-chart-element');

                element.style.height = '300px';

                this.widthOnContainer = containerElement.offsetWidth;
                this.width = element.offsetWidth;
                this.height = element.offsetHeight;

                this.$refs.chartPrice.updateChart();
            }
        },
    },
};
</script>

<style scoped>
/* >>> text {
    color: #000000;
} */

.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.second-step {
    display: none;
}

@media (max-width: 1130px) {
    .first-step {
        display: none;
    }

    .second-step {
        display: block;
    }
}
</style>
