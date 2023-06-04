<template lang="pug">
    div(class="ir-earnings-and-reports-main-regular")
        div(style="max-width:1000px; margin-left:auto; margin-right:auto; border:0px solid;")
            div(class="container-element" style="border:0px solid;")
                div(v-for="(year, index) in years" :key="year" class="mb-1")
                    v-expansion-panels(:value="(index < 2) ? 0 : 1" flat tile)
                        v-expansion-panel
                            v-expansion-panel-header(style="background-color: #edebeb;")
                                div(class="header-block")
                                    div(class="col-block ellipsis pl-2" style="float:left; border:0px solid;") {{ year }}
                                    div(class="col-block ellipsis" style="float:left; border:0px solid;") &nbsp;
                                    div(class="col-block ellipsis" style="float:left; border:0px solid;") Presentation
                                    //- div(class="col-block ellipsis" style="float:left; border:0px solid;") Webinar
                                    div(class="col-block ellipsis" style="float:left; border:0px solid;") &nbsp;
                            v-expansion-panel-content
                                div(v-for="item in getReportsOnYear(year)" :key="item.period" class="row-block")
                                    div(class="col-block ellipsis pl-2 pr-2 mt-1 mb-1" style="float:left; border:0px solid;") {{ getCompany.name }} {{ item.period }}
                                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                                        a(:href="`https://documents.millistream.com/${item.pdf_link}`" target="_blank")
                                            img(src="@/assets/pdf-icon.svg" style="height:100%;")
                                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                                        img(src="@/assets/presentation-icon.svg" style="width:25px;")
                                    //- div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                                        img(src="@/assets/media-icon.svg" style="height:100%;")
                                    div(class="col-block ellipsis text-right mt-1 mb-1 pr-2" style="float:left; border:0px solid;") {{ item.date_report }}
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
    name: "EarningsAndReports",
    data() {
        return {
            counter: 0,
        };
    },
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.getCompany)));
        console.log(JSON.parse(JSON.stringify(this.reports)));
        console.log(this.years);
        console.log(JSON.parse(JSON.stringify(this.getReportsOnYear('2022'))));
    },
    computed: {
        ...mapGetters(['getCompany']),
        reports() {
            return this.getCompany.reports;
        },
        years() {
            let yearsTemp = [];

            for(const item of this.reports) {
                yearsTemp.push(this.getYear(item.period));
            }

            yearsTemp = _.uniq(yearsTemp);
            yearsTemp = yearsTemp.sort().reverse();

            return yearsTemp;
        },
    },
    methods: {
        getYear(stringValue) {
            return Number(stringValue.substring(0, 4));
        },
        getReportsOnYear(year) {
            const yearTemp = Number(year);
            const reportsTemp = [];

            for(const report of this.reports) {
                if(this.getYear(report.period) === yearTemp) {
                    reportsTemp.push(report);
                }
            }

            return reportsTemp;
        }
    },
};
</script>

<style scoped>
.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

.v-expansion-panels .v-expansion-panel-header {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    min-height: auto;
}

.v-expansion-panels .v-expansion-panel--active .v-expansion-panel-header {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
}

>>> .v-expansion-panel-content__wrap {
    padding-left: 0;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
}

.ir-earnings-and-reports-main-regular .v-expansion-panel-header--active .header-block .col-block:nth-child(3) {
    opacity: 1;
}

/* .ir-earnings-and-reports-main-regular .v-expansion-panel-header--active .header-block .col-block:nth-child(4) {
    opacity: 1;
} */

/* >>> .v-expansion-panel-header__icon {
    display: none;
} */
</style>
