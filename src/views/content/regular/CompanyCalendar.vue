<template lang="pug">
    div(class="ir-company-calendar-main-regular")
        div(style="max-width:1000px; margin-left:auto; margin-right:auto; border:0px solid;")
            div(class="container-element mt-2" style="border:0px solid;")
                //- header
                div(class="header-block")
                    div(class="col-block pl-2" style="float:left; border:0px solid;") Event Name
                    div(class="col-block" style="float:left; border:0px solid;") Period
                    div(class="col-block" style="float:left; border:0px solid;") Date
                    div(class="col-block" style="float:left; border:0px solid;") Time
                    div(class="col-block" style="float:left; border:0px solid;") &nbsp;
                
                //- body
                div(v-for="calendar in calendars" class="row-block")
                    div(class="col-block ellipsis pl-2 mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.name }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.period }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.date }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.time }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ getDayName(calendar.date) }}
                    div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                        v-btn Add to Calendar

                //- {
                //-     "event_id": 77,
                //-     "company_id": 1,
                //-     "period": "2023-Q1",
                //-     "date": "2023-01-30",
                //-     "time": "08:00",
                //-     "type": "interim",
                //-     "name": "interim report Q1",
                //-     "description": null
                //- }

                //- div(class="row-block")
                //-     div(class="col-block ellipsis pl-2 mt-1 mb-1" style="float:left; border:0px solid;") AGM - Acme Co. & Sons
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 2023-05-03
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") Tuesday
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                //-         v-btn Add to Calendar

                //- div(class="row-block")
                //-     div(class="col-block ellipsis pl-2 mt-1 mb-1" style="float:left; border:0px solid;") Interim Report K4 20022
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 2022-Q4
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 2023-08-03
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 08:00
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") Tuesday
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                //-         v-btn Add to Calendar

                //- div(class="row-block")
                //-     div(class="col-block ellipsis pl-2 mt-1 mb-1" style="float:left; border:0px solid;") Interim Report K1 20023
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 2021-Q1
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 2023-11-09
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") 08:00
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") Tuesday
                //-     div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                //-         v-btn Add to Calendar
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
    name: "CompanyCalendar",
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.getCompany)));
        console.log(JSON.parse(JSON.stringify(this.calendars)));
        console.log(this.getCompany.name);
        console.log(moment().format('dddd'));
    },
    computed: {
        ...mapGetters(['getCompany']),
        calendars() {
            return this.getCompany.calendar;
        }
    },
    methods: {
        getDayName(date) {
            return moment(date).format('dddd');
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
