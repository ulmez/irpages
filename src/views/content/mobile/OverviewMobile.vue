<template lang="pug">
    div(class="ir-overview-main-mobile" style="border:0px solid;")
        div(class="container-element" style="border:0px solid;")
            v-container(fluid class="row-block" style="border:0px solid;")
                v-row(style="border:0px solid;")
                    v-col(cols="12" class="pa-0 mb-1")
                        div(id="headline-overview" style="border:0px solid;")
                            h2 {{ getCompany.name }} - {{ getCompany.pitch_title }}
                        div(style="border:0px solid;")
                            div {{ getCompany.pitch_detail }}
                    v-col(cols="4" class="pl-0 pt-0 pb-0 pr-1" style="height:calc(26.5vw); border:0px solid green;")
                        iframe(:src="`https://www.youtube.com/embed/${getCompany.video_url_1}`" frameborder="0" allowfullscreen style="height:100%; width:100%; border:0px solid red;")
                    v-col(cols="4" class="pl-1 pt-0 pb-0 pr-0" style="height:calc(26.5vw); border:0px solid green;")
                        iframe(:src="`https://www.youtube.com/embed/${getCompany.video_url_2}`" frameborder="0" allowfullscreen style="height:100%; width:100%; border:0px solid red;")
                    v-col(cols="4" class="pl-1 pt-0 pb-0 pr-0")
                        img(src="@/assets/katalysen-image-link.svg" style="width:100%; border:0px solid green;")

            v-container(fluid class="row-block mt-3" style="border:0px solid;")
                v-row(class="pa-2" style="border-radius:10px; box-shadow: 1px 3px 4px 0px rgba(0, 0, 0, 0.3); border:0px solid;")
                    v-col(class="pa-0" cols="6" sm="7" md="8" lg="8" xl="8" style="background-color:#FFFFFF; border:0px solid;")
                        div(id="mobile-chart-element" style="overflow:hidden; width:100%; height:100%; border:0px solid;")
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
                                ref="chartPrice2"
                            )

                    v-col(class="pa-0" cols="6" sm="5" md="4" lg="4" xl="4" style="border:0px solid red;")
                        div(class="right-menu" style="position:relative; height:100%; border:0px solid green;")
                            div(class="text-right" style="border:0px solid;")
                                v-btn(small class="pl-1 pr-2")
                                    v-icon(size="15") mdi-eye-outline
                                    span(class="ml-1") Add to Watchlist or Edger Finance
                            div(style="height:5px; border:0px solid;")
                            div(style="border:0px solid;")
                                v-container(fluid)
                                    v-row(style="border:0px solid green;")
                                        v-col(v-for="kpi in kpis" :key="kpi.row_to_json.kpi_id" cols="6" class="sparkline pa-2" style="border:0px solid;")
                                            div(class="ellipsis pl-2" style="border:0px solid;") {{ kpi.row_to_json.text_1 }}
                                            CanvasGeneric(v-if="color !== null" :values="kpi.row_to_json.values" :color="color" style="width:100%; max-height:70px; border:0px solid;")
                                            div(class="mt-2 pl-2" style="color:#000000; overflow-y:scroll; overflow-x:hide; border:0px solid;")
                                                span {{ kpi.row_to_json.text_2 }}
                                        //- v-col(cols="6" class="sparkline pa-2" style="border:0px solid;")
                                            div(class="ellipsis pl-2" title="Management Fee" style="border:0px solid;") Management Fee
                                            CanvasGeneric(style="width:100%; max-height:70px; border:0px solid;")
                                            div(class="mt-2 pl-2" style="color:#000000; border:0px solid;")
                                                span Portfolio valuation is the latest value in MEUR of the portfolio.
                                                span(style="text-decoration:underline;") Read more.

                            div(style="position:absolute; bottom:0; width:100%; border:0px solid red;")
                                div(style="float:left; width:calc(100% - 55px); color:#000000; border:0px solid;")
                                    div(class="bottom-right-text ml-2 mr-2 pa-1") Custom KPIs and interface provided by edger.finance. Your go-to tool for navigating the stock market. You can easily add Katalysen Ventures to your watchlist on Edger by using the watchlist button above.
                                div(style="float:left; width:55px; color:#000000; border:0px solid;")
                                    div(style="font-size:8px;") Powered by
                                    div
                                        img(src="@/assets/edger-finance-icon.svg")
</template>

<script>
import ChartPrice from "@/components/ChartPrice.vue";
import CanvasGeneric from "@/components/CanvasGeneric.vue";
import { mapGetters } from "vuex";

export default {
    name: "OverviewMobile",
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

        setTimeout(() => {
            this.onResize();
        }, 100);

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
            const element = document.getElementsByClassName('ir-overview-main-mobile')[0];
            const style = getComputedStyle(element);

            return style.color;
        },
        onResize() {
            if(document.getElementById('mobile-chart-element') !== null) {
                const containerElement = document.getElementsByClassName('container-element')[0];
                const element = document.getElementById('mobile-chart-element');

                console.log(containerElement);

                element.style.height = '300px';

                this.widthOnContainer = containerElement.offsetWidth;
                this.width = element.offsetWidth;
                this.height = element.offsetHeight;

                this.$refs.chartPrice2.updateChart();
            }
        },
    },
};
</script>

<style scoped>
>>> text {
    color: #000000;
}

.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style>
