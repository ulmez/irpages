<template lang="pug">
    div(class="ir-company-calendar-main-mobile" style="border:0px solid;")
        div(id="headline-company-calendar")
            h2 Company calendar
        div(class="container-element" style="color:#000000; border:0px solid;")
            //- header
            div(class="header-block")
                div(class="col-block pl-2" style="float:left; border:0px solid;") Event Name
                div(class="col-block" style="float:left; border:0px solid;") Period
                div(class="col-block" style="float:left; border:0px solid;") Date
            
            //- body
            div(v-for="calendar in calendars" class="row-block")
                div(class="col-block ellipsis pl-2 mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.name }}
                div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.period }}
                div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ calendar.date }}
                div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;") {{ getDayName(calendar.date) }}
                div(class="col-block ellipsis mt-1 mb-1" style="float:left; border:0px solid;")
                    v-btn Add to Calendar
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
    name: "CompanyCalendarMobile",
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
