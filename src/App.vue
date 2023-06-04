<template lang="pug">
    v-app(id="app" class="ir-base-app")
        Main(v-if="finishedLoading")
</template>

<script>
import Main from "@/views/Main.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
    name: "App",
    components: {
        Main
    },
    data() {
        return {
            finishedLoading: false,
            selectedLanguageCode: null,
        };
    },
    async mounted() {
        // Katalysen
        const testStyle = `
            .ir-base-app {
                background-color: #F9F8F8 !important;
            }

            /* regular --------------------------- */
            /* header block regular ************ */
            .ir-header-regular {
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                min-height: 102px;
            }

            .ir-header-icon-regular {
                height: 102px;
            }

            .ir-header-icon-regular img {
                height: 100px;
            }
            /* *********************************** */

            /* footer block regular *************** */
            .ir-footer-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #000000;
                background-color: #EEEEEE;
            }
            /* ************************************* */

            /* menu block regular ************ */
            .ir-menu-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
            }

            .ir-menu-regular .menu-drawer {
                background-color: #F9F8F8 !important;
            }

            .ir-menu-drawer-hover-regular:hover {
                cursor: pointer;
                background-color: #0077FF;
                color: #FFFFFF;
            }

            .ir-menu-drawer-active-regular {
                background-color: #0077FF !important;
                color: #FFFFFF !important;
            }
            /* *********************************** */

            /* overview block regular ************ */
            .ir-overview-main-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-overview-main-regular .row-block:nth-child(3) {
                background-color: #EFEFEF;
                border-radius: 10px;
                box-shadow: 1px 3px 4px 0px rgba(0, 0, 0, 0.3);
            }

            .ir-overview-main-regular .right-menu .v-btn {
                font-size: 7px;
                background-color: #0077FF;
                color: #FFFFFF;
                text-transform: none;
                height: 16px;
            }

            .ir-overview-main-regular .right-menu .sparkline div:nth-child(1) {
                font-size: 12px;
                font-weight: 600;
            }

            .ir-overview-main-regular .right-menu .bottom-right-text {
                font-size: 6px;
                background-color: #D9D9D9;
                border-radius: 10px;
            }
            /* *********************************** */

            /* invest-in-us block regular ******** */
            .ir-invest-in-us-main-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-invest-in-us-main-regular .row-block:nth-child(1) {
                background-color: #0077FF;
                color: #FFFFFF;
            }

            .ir-invest-in-us-main-regular .row-block:nth-child(2) {
                background-color: #FFFFFF;
                /* color: brown; */
            }

            .ir-invest-in-us-main-regular .row-block:nth-child(3) {
                background-color: #D9D9D9;
                color: #000000;
            }
            /* *********************************** */

            /* leadership-team block regular ***** */
            .ir-leadership-team-main-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-leadership-team-main-regular .row-block:nth-child(1) {
                background-color: #0077FF;
                color: #FFFFFF;
            }

            .ir-leadership-team-main-regular .row-block:nth-child(2) {
                background-color: #FFFFFF;
                color: #000000;
            }

            .ir-leadership-team-main-regular .row-block:nth-child(3) {
                background-color: #0077FF;
                color: #FFFFFF;
            }
            /* *********************************** */

            /* press-releases-and-news block regular */
            .ir-press-releases-and-news-main-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #000000;
            }

            .ir-press-releases-and-news-main-regular .row-block .ticker {
                font-size: 8px;
            }

            .ir-press-releases-and-news-main-regular .row-block .tag {
                font-size: 8px;
                background-color: #7A9296;
                color: #FFFFFF;
                border-radius: 8px;
            }

            .ir-press-releases-and-news-main-regular .row-block .time-stamp {
                font-size: 8px;
            }

            .ir-press-releases-and-news-main-regular .row-block .topic {
                font-size: 8px;
            }

            .ir-press-releases-and-news-main-regular .row-block .message {
                font-size: 12px;
                line-height: 1.3;
            }

            .ir-press-releases-and-news-main-regular hr {
                height: 1px;
                background-color: lightgrey;
                border: none;
            }
            /* ************************************* */

            /* earnings-and-reports block regular ** */
            .ir-earnings-and-reports-main-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #000000;
            }

            .ir-earnings-and-reports-main-regular .v-expansion-panel-content {
                background-color: #F9F8F8;
            }

            .ir-earnings-and-reports-main-regular .header-block {
                font-size: 10px;
            }

            .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(1) {
                font-family: "Times New Roman", Times, serif;
                font-size: 14px;
                width: 42%;
                height: 25px;
                background-color: #edebeb;
                color: #0077FF;
                padding-top: 6px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(2) {
                font-weight: bold;
                width: 23%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 6px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(3) {
                opacity: 0;
                font-weight: bold;
                width: 19%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 7px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(4) {
                font-weight: bold;
                width: 16%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 6px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-regular .unused-block {
                font-family: "Times New Roman", Times, serif;
                font-size: 14px;
                width: 100%;
                height: 25px;
                background-color: #edebeb;
                color: #0077FF;
                padding-top: 2px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(1) {
                width: 41%;
                height: 22px;
                padding-top: 2px;
            }

            .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(2) {
                width: 22.5%;
                height: 22px;
            }

            .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(3) {
                width: 18.5%;
                height: 22px;
                padding-top: 2px;
            }

            .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(4) {
                width: 18%;
                height: 22px;
                padding-top: 2px;
            }
            /* ************************************* */

            /* company-calendar block regular ****** */
            .ir-company-calendar-main-regular {
                font-family: "Poppins";
                font-size: 12px;
                color: #474747;
            }

            .ir-company-calendar-main-regular .v-btn {
                font-size: 8px !important;
                height: 16px !important;
                background-color: #EBEBEB !important;
                color: #28407E !important;
                text-transform: none !important;
                padding-left: 2px !important;
                padding-right: 5px !important;
                border: 1px solid #28407E !important;
            }

            .ir-company-calendar-main-regular .header-block .col-block:nth-child(1) {
                font-size: 12px;
                width: 25%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-regular .header-block .col-block:nth-child(2) {
                font-size: 12px;
                width: 14%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-regular .header-block .col-block:nth-child(3) {
                font-size: 12px;
                width: 20%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-regular .header-block .col-block:nth-child(4) {
                font-size: 12px;
                width: 11%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-regular .header-block .col-block:nth-child(5) {
                font-size: 12px;
                width: 30%;
                height: 25px;
                background-color: #edebeb;
            }

            .ir-company-calendar-main-regular .row-block .col-block:nth-child(1) {
                font-size: 11px;
                width: 25%;
            }

            .ir-company-calendar-main-regular .row-block .col-block:nth-child(2) {
                font-size: 11px;
                width: 14%;
            }

            .ir-company-calendar-main-regular .row-block .col-block:nth-child(3) {
                font-size: 11px;
                width: 20%;
            }

            .ir-company-calendar-main-regular .row-block .col-block:nth-child(4) {
                font-size: 11px;
                width: 11%;
            }

            .ir-company-calendar-main-regular .row-block .col-block:nth-child(5) {
                font-size: 11px;
                width: 11%;
                opacity: 0.3;
            }

            .ir-company-calendar-main-regular .row-block .col-block:nth-child(6) {
                font-size: 11px;
                width: 19%;
            }
            /* ************************************* */

            /* corporate block regular ************* */
            .ir-corporate-regular {
                font-size: 12px;
                color: #474747;
            }

            .ir-corporate-regular .header-block {
                font-family: "Courier New";
                height: 27px;
            }

            .ir-corporate-regular .header-block .col-block:nth-child(1) {
                font-weight: bold;
                width: 27%;
                height: 25px;
                /* background-color: #edebeb; */
                padding-top: 3px;
            }

            .ir-corporate-regular .header-block .col-block:nth-child(2) {
                font-weight: bold;
                width: 27%;
                height: 25px;
                /* background-color: #edebeb; */
                padding-top: 3px;
            }

            .ir-corporate-regular .header-block .col-block:nth-child(3) {
                font-weight: bold;
                width: 46%;
                height: 25px;
                /* background-color: #edebeb; */
                padding-top: 3px;
            }

            .ir-corporate-regular .row-block {
                font-family: Courier;
                height: 27px;
            }

            .ir-corporate-regular .row-block .col-block:nth-child(1) {
                width: 27%;
            }

            .ir-corporate-regular .row-block .col-block:nth-child(2) {
                width: 27%;
            }

            .ir-corporate-regular .row-block .col-block:nth-child(3) {
                width: 46%;
            }

            .ir-corporate-regular hr {
                height: 1px;
                background-color: lightgrey;
                border: none;
            }
            /* ************************************* */

            /* generic block regular *************** */
            .ir-generic-component-regular {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }
            /* ************************************* */
            /* ----------------------------------- */




            /* mobile ---------------------------- */
            /* navbar block mobile ***************** */
            .ir-navbar-mobile {
                background-color: #0077FF !important;
            }

            .ir-navbar-text-mobile {
                color: #FFFFFF !important;
            }
            /* *********************************** */

            /* menu block mobile ***************** */
            .ir-menu-mobile {
                font-family: Arial, Helvetica, sans-serif;
            }

            .ir-menu-drawer-hover-mobile:hover {
                cursor: pointer;
                background-color: #0077FF;
                color: #FFFFFF;
            }

            .ir-menu-drawer-active-mobile {
                background-color: #0077FF !important;
                color: #FFFFFF !important;
            }
            /* *********************************** */

            /* footer block mobile **************** */
            .ir-footer-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 12px;
                color: #000000;
                background-color: #EEEEEE;
            }
            /* ************************************* */

            /* overview block mobile ************* */
            .ir-overview-main-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-overview-main-mobile .row-block:nth-child(2) {
                background-color: #EFEFEF;
            }

            .ir-overview-main-mobile .right-menu .v-btn {
                font-size: 7px;
                background-color: #0077FF;
                color: white;
                text-transform: none;
                height: 16px;
            }

            .ir-overview-main-mobile .right-menu .sparkline div:nth-child(1) {
                font-size: 12px;
                font-weight: 600;
            }

            .ir-overview-main-mobile .right-menu .bottom-right-text {
                font-size: 6px;
                background-color: #D9D9D9;
                border-radius: 10px;
            }
            /* *********************************** */

            /* invest-in-us block mobile ********* */
            .ir-invest-in-us-main-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-invest-in-us-main-mobile .row-block:nth-child(1) {
                background-color: #0077FF;
                color: #FFFFFF;
                border: 1px solid grey;
            }

            .ir-invest-in-us-main-mobile .row-block:nth-child(2) {
                background-color: #FFFFFF;
                /* color: brown; */
                border: 1px solid grey;
            }

            .ir-invest-in-us-main-mobile .row-block:nth-child(3) {
                background-color: #D9D9D9;
                color: #000000;
                border: 1px solid grey;
            }
            /* *********************************** */

            /* leadership-team block mobile ****** */
            .ir-leadership-team-main-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-leadership-team-main-mobile .row-block:nth-child(1) {
                background-color: #0077FF;
                color: #FFFFFF;
            }

            .ir-leadership-team-main-mobile .row-block:nth-child(2) {
                background-color: #FFFFFF;
                color: #000000;
            }

            .ir-leadership-team-main-mobile .row-block:nth-child(3) {
                background-color: #0077FF;
                color: #FFFFFF;
            }
            /* *********************************** */

            /* press-releases-and-news block mobile */
            .ir-press-releases-and-news-main-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #000000;
            }

            .ir-press-releases-and-news-main-mobile .headline-main-title {
                color: #0077FF;
            }

            .ir-press-releases-and-news-main-mobile .row-block .ticker {
                font-size: 8px;
            }

            .ir-press-releases-and-news-main-mobile .row-block .tag {
                font-size: 8px;
                background-color: #7A9296;
                color: #FFFFFF;
                border-radius: 8px;
            }

            .ir-press-releases-and-news-main-mobile .row-block .time-stamp {
                font-size: 8px;
            }

            .ir-press-releases-and-news-main-mobile .row-block .topic {
                font-size: 8px;
            }

            .ir-press-releases-and-news-main-mobile .row-block .message {
                font-size: 12px;
                line-height: 1.3;
            }

            .ir-press-releases-and-news-main-mobile hr {
                height: 1px;
                background-color: lightgrey;
                border: none;
            }
            /* ************************************ */

            /* earnings-and-reports block mobile ** */
            .ir-earnings-and-reports-main-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-earnings-and-reports-main-mobile .v-expansion-panel-content {
                background-color: #F9F8F8;
            }

            .ir-earnings-and-reports-main-mobile .header-block {
                font-size: 10px;
            }

            .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(1) {
                font-family: "Times New Roman", Times, serif;
                font-size: 14px;
                width: 42%;
                height: 25px;
                background-color: #edebeb;
                color: #0077FF;
                padding-top: 6px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(2) {
                font-weight: bold;
                width: 23%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 6px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(3) {
                opacity: 0;
                font-weight: bold;
                width: 19%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 7px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(4) {
                font-weight: bold;
                width: 16%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 6px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-mobile .unused-block {
                font-family: "Times New Roman", Times, serif;
                font-size: 14px;
                width: 100%;
                height: 25px;
                background-color: #edebeb;
                color: #0077FF;
                padding-top: 2px;
                margin-bottom: 2px;
            }

            .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(1) {
                width: 41%;
                height: 22px;
                padding-top: 2px;
            }

            .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(2) {
                width: 22.5%;
                height: 22px;
            }

            .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(3) {
                width: 18.5%;
                height: 22px;
                padding-top: 2px;
            }

            .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(4) {
                width: 18%;
                height: 22px;
                padding-top: 2px;
            }
            /* ************************************* */

            /* company-calendar block mobile ****** */
            .ir-company-calendar-main-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }

            .ir-company-calendar-main-mobile .v-btn {
                font-size: 8px !important;
                height: 16px !important;
                background-color: #EBEBEB !important;
                color: #28407E !important;
                text-transform: none !important;
                padding-left: 2px !important;
                padding-right: 5px !important;
                border: 1px solid #28407E !important;
            }

            .ir-company-calendar-main-mobile .header-block {
                height: 25px;
            }

            .ir-company-calendar-main-mobile .header-block .col-block:nth-child(1) {
                font-size: 12px;
                width: 28%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-mobile .header-block .col-block:nth-child(2) {
                font-size: 12px;
                width: 15%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-mobile .header-block .col-block:nth-child(3) {
                font-size: 12px;
                width: 57%;
                height: 25px;
                background-color: #edebeb;
                padding-top: 3px;
            }

            .ir-company-calendar-main-mobile .row-block {
                height: 22px;
            }

            .ir-company-calendar-main-mobile .row-block .col-block:nth-child(1) {
                width: 28%;
            }

            .ir-company-calendar-main-mobile .row-block .col-block:nth-child(2) {
                width: 15%;
            }

            .ir-company-calendar-main-mobile .row-block .col-block:nth-child(3) {
                width: 18%;
            }

            .ir-company-calendar-main-mobile .row-block .col-block:nth-child(4) {
                width: 15%;
                opacity: 0.3;
            }

            .ir-company-calendar-main-mobile .row-block .col-block:nth-child(5) {
                width: 24%;
            }
            /* ************************************* */

            /* corporate block mobile ************** */
            .ir-corporate-mobile {
                font-size: 12px;
                color: #474747;
            }

            .ir-corporate-mobile h2 {
                font-size: 14px;
                color: #0077FF;
            }

            .ir-corporate-mobile .header-block {
                font-family: "Courier New";
                height: 27px;
            }

            .ir-corporate-mobile .header-block .col-block:nth-child(1) {
                font-weight: bold;
                width: 27%;
                height: 25px;
                /* background-color: #edebeb; */
                padding-top: 3px;
            }

            .ir-corporate-mobile .header-block .col-block:nth-child(2) {
                font-weight: bold;
                width: 27%;
                height: 25px;
                /* background-color: #edebeb; */
                padding-top: 3px;
            }

            .ir-corporate-mobile .header-block .col-block:nth-child(3) {
                font-weight: bold;
                width: 46%;
                height: 25px;
                /* background-color: #edebeb; */
                padding-top: 3px;
            }

            .ir-corporate-mobile .row-block {
                font-family: Courier;
                height: 27px;
            }

            .ir-corporate-mobile .row-block .col-block:nth-child(1) {
                width: 27%;
            }

            .ir-corporate-mobile .row-block .col-block:nth-child(2) {
                width: 27%;
            }

            .ir-corporate-mobile .row-block .col-block:nth-child(3) {
                width: 46%;
            }

            .ir-corporate-mobile hr {
                height: 1px;
                background-color: lightgrey;
                border: none;
            }
            /* ************************************* */

            /* generic block mobile **************** */
            .ir-generic-component-mobile {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 10px;
                color: #0077FF;
            }
            /* ************************************* */
            /* ----------------------------------- */
        `;













        // Sensidose
        // const testStyle = `
        //     .ir-base-app {
        //         background-color: #FFFFFF !important;
        //     }

        //     /* regular --------------------------- */
        //     /* header block regular ************ */
        //     .ir-header-regular {
        //         background-color: #1B91FF;
        //     }

        //     .ir-header-icon-regular {
        //         background-image: url("images/sensidose/sensidose.svg");
        //         background-origin: content-box;
        //         background-position: left;
        //         height: 102px;
        //         padding-left: 10px;
        //     }
        //     /* *********************************** */

        //     /* footer block regular *************** */
        //     .ir-footer-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000;
        //         background-color: #EEEEEE;
        //     }
        //     /* ************************************* */

        //     /* menu block regular ************ */
        //     .ir-menu-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 14px;
        //     }

        //     .ir-menu-regular .menu-drawer {
        //         background-color: #FFFFFF !important;
        //     }

        //     .ir-menu-drawer-hover-regular:hover {
        //         cursor: pointer;
        //         background-color: #1B91FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-menu-drawer-active-regular {
        //         background-color: #1B91FF !important;
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* overview block regular ************ */
        //     .ir-overview-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #1B91FF;
        //     }

        //     /* .ir-overview-main-regular .row-block:nth-child(1),
        //     .ir-overview-main-regular .row-block:nth-child(2) {
        //         background-color: yellow;
        //     } */

        //     .ir-overview-main-regular .row-block:nth-child(3) {
        //         background-color: #EFEFEF;
        //         border-radius: 10px;
        //         box-shadow: 1px 3px 4px 0px rgba(0, 0, 0, 0.3);
        //     }

        //     /* .ir-overview-main-regular .right-menu {
        //         color: green;
        //     } */

        //     .ir-overview-main-regular .right-menu .v-btn {
        //         font-size: 7px;
        //         background-color: #DB6E2D;
        //         color: #FFFFFF;
        //         text-transform: none;
        //         height: 16px;
        //     }

        //     .ir-overview-main-regular .right-menu .sparkline div:nth-child(1) {
        //         font-size: 12px;
        //         font-weight: 600;
        //     }

        //     /* .ir-overview-main-regular .right-menu .sparkline div:nth-child(3) {
        //         color: red !important;
        //     } */

        //     .ir-overview-main-regular .right-menu .bottom-right-text {
        //         font-size: 6px;
        //         background-color: #D9D9D9;
        //         color: #000000;
        //         border-radius: 10px;
        //     }
        //     /* *********************************** */

        //     /* invest-in-us block regular ******** */
        //     .ir-invest-in-us-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //     }

        //     /* .ir-invest-in-us-main-regular h2 {
        //         font-size: 30px;
        //     } */

        //     .ir-invest-in-us-main-regular .row-block:nth-child(1) {
        //         background-color: #EFEFEF;
        //         color: #1C1B1F;
        //     }

        //     .ir-invest-in-us-main-regular .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #1C1B1F;
        //     }

        //     .ir-invest-in-us-main-regular .row-block:nth-child(3) {
        //         background-color: #1B91FF;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* leadership-team block regular ***** */
        //     .ir-leadership-team-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(1) {
        //         background-color: #1B91FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(2) {
        //         background-color: #EFEFEF;
        //         color: #000000;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(3) {
        //         background-color: #1B91FF;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* press-releases-and-news block regular */
        //     .ir-press-releases-and-news-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .ticker {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .tag {
        //         font-size: 8px;
        //         background-color: #7A9296;
        //         color: #FFFFFF;
        //         border-radius: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .time-stamp {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .topic {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .message {
        //         font-size: 12px;
        //         line-height: 1.3;
        //     }

        //     .ir-press-releases-and-news-main-regular hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* earnings-and-reports block regular ** */
        //     .ir-earnings-and-reports-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(1) {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 42%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 10%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 18%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(4) {
        //         font-weight: bold;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(5) {
        //         font-weight: bold;
        //         width: 16%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .unused-block {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 100%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(1) {
        //         width: 42%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(2) {
        //         width: 10%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(3) {
        //         width: 18%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(4) {
        //         width: 14%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(5) {
        //         width: 16%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }
        //     /* ************************************* */

        //     /* company-calendar block regular ****** */
        //     .ir-company-calendar-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(1) {
        //         font-size: 12px;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(2) {
        //         font-size: 12px;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(3) {
        //         font-size: 12px;
        //         width: 20%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(4) {
        //         font-size: 12px;
        //         width: 11%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(5) {
        //         font-size: 12px;
        //         width: 30%;
        //         height: 25px;
        //         background-color: #edebeb;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(1) {
        //         width: 25%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(2) {
        //         width: 14%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(3) {
        //         width: 20%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(4) {
        //         width: 11%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(5) {
        //         width: 11%;
        //         opacity: 0.3;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(6) {
        //         width: 19%;
        //     }
        //     /* ************************************* */

        //     /* corporate block regular ************* */
        //     .ir-corporate-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000; 
        //     }

        //     .ir-corporate-regular .header-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(1) {
        //         font-weight: bold;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 60%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .row-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(1) {
        //         width: 15%;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(2) {
        //         width: 25%;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(3) {
        //         width: 60%;
        //     }

        //     .ir-corporate-regular hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* generic block regular *************** */
        //     .ir-generic-component-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #1B91FF;
        //     }
        //     /* ************************************* */
        //     /* ----------------------------------- */




        //     /* mobile ---------------------------- */
        //     /* navbar block mobile ***************** */
        //     .ir-navbar-mobile {
        //         background-color: #0077FF !important;
        //     }

        //     .ir-navbar-text-mobile {
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* menu block mobile ***************** */
        //     .ir-menu-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //     }

        //     .ir-menu-drawer-hover-mobile:hover {
        //         cursor: pointer;
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-menu-drawer-active-mobile {
        //         background-color: #0077FF !important;
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* overview block mobile ************* */
        //     .ir-overview-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     /* .ir-overview-main-mobile .row-block:nth-child(1) {
        //         background-color: yellow;
        //     } */

        //     .ir-overview-main-mobile .row-block:nth-child(2) {
        //         background-color: #EFEFEF;
        //     }

        //     .ir-overview-main-mobile .right-menu .v-btn {
        //         font-size: 7px;
        //         background-color: #0077FF;
        //         color: white;
        //         text-transform: none;
        //         height: 16px;
        //     }

        //     .ir-overview-main-mobile .right-menu .sparkline div:nth-child(1) {
        //         font-size: 12px;
        //         font-weight: 600;
        //     }

        //     /* .ir-overview-main-mobile .right-menu .sparkline div:nth-child(3) {
        //         color: red !important;
        //     } */

        //     .ir-overview-main-mobile .right-menu .bottom-right-text {
        //         font-size: 6px;
        //         background-color: #D9D9D9;
        //         border-radius: 10px;
        //     }
        //     /* *********************************** */

        //     /* invest-in-us block mobile ********* */
        //     .ir-invest-in-us-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     /* .ir-invest-in-us-main-mobile h2 {
        //         font-size: 20px;
        //     } */

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(1) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //         border: 1px solid grey;
        //     }

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         /* color: brown; */
        //         border: 1px solid grey;
        //     }

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(3) {
        //         background-color: #D9D9D9;
        //         color: #000000;
        //         border: 1px solid grey;
        //     }
        //     /* *********************************** */

        //     /* leadership-team block mobile ****** */
        //     .ir-leadership-team-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(1) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #000000;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(3) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* press-releases-and-news block mobile */
        //     .ir-press-releases-and-news-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-press-releases-and-news-main-mobile .headline-main-title {
        //         color: #0077FF;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .ticker {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .tag {
        //         font-size: 8px;
        //         background-color: #7A9296;
        //         color: #FFFFFF;
        //         border-radius: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .time-stamp {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .topic {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .message {
        //         font-size: 12px;
        //         line-height: 1.3;
        //     }

        //     .ir-press-releases-and-news-main-mobile hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************ */

        //     /* earnings-and-reports block mobile ** */
        //     .ir-earnings-and-reports-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-earnings-and-reports-main-mobile .container-element {
        //         color: #000000;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(1) {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 42%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 10%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 18%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(4) {
        //         font-weight: bold;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(5) {
        //         font-weight: bold;
        //         width: 16%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block {
        //         height: 27px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block {
        //         height: 30px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(1) {
        //         width: 42%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(2) {
        //         width: 10%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(3) {
        //         width: 18%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(4) {
        //         width: 14%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(5) {
        //         width: 16%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .unused-block {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 100%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }
        //     /* ************************************* */

        //     /* company-calendar block mobile ****** */
        //     .ir-company-calendar-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-company-calendar-main-mobile .header-block {
        //         height: 25px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(1) {
        //         font-size: 12px;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(2) {
        //         font-size: 12px;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(3) {
        //         font-size: 12px;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(4) {
        //         font-size: 12px;
        //         width: 11%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(5) {
        //         font-size: 12px;
        //         width: 35%;
        //         height: 25px;
        //         background-color: #edebeb;
        //     }

        //     .ir-company-calendar-main-mobile .row-block {
        //         height: 22px;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(1) {
        //         width: 25%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(2) {
        //         width: 14%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(3) {
        //         width: 15%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(4) {
        //         width: 11%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(5) {
        //         width: 13%;
        //         opacity: 0.3;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(6) {
        //         width: 22%;
        //     }
        //     /* ************************************* */

        //     /* corporate block mobile ************** */
        //     .ir-corporate-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-corporate-mobile .container-element {
        //         font-size: 12px;
        //         color: #000000;
        //     }

        //     .ir-corporate-mobile .header-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(1) {
        //         font-weight: bold;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 60%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .row-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(1) {
        //         width: 15%;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(2) {
        //         width: 25%;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(3) {
        //         width: 60%;
        //     }

        //     .ir-corporate-mobile hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* generic block mobile **************** */
        //     .ir-generic-component-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }
        //     /* ************************************* */

        //     /* footer block mobile **************** */
        //     .ir-footer-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000;
        //         background-color: #EEEEEE;
        //     }
        //     /* ************************************* */
        //     /* ----------------------------------- */
        // `;












        // EasyFill
        // const testStyle = `
        //     .ir-base-app {
        //         background-color: #FFFFFF !important;
        //     }

        //     /* regular --------------------------- */
        //     /* header block regular ************ */
        //     .ir-header-regular {
        //         background-image: url("images/easyfill/easyfill-background.svg");
        //         background-position: center;
        //         background-repeat: no-repeat;
        //         background-size: cover;
        //         min-height: 102px;
        //     }

        //     .ir-header-icon-regular {
        //         background-image: url("images/easyfill/easyfill.svg");
        //         background-origin: content-box;
        //         background-position: left;
        //         height: 102px;
        //         padding-left: 10px;
        //     }
        //     /* *********************************** */

        //     /* footer block regular *************** */
        //     .ir-footer-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000;
        //         background-color: #EEEEEE;
        //     }
        //     /* ************************************* */

        //     /* menu block regular ************ */
        //     .ir-menu-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 14px;
        //     }

        //     .ir-menu-regular .menu-drawer {
        //         background-color: #FFFFFF !important;
        //     }

        //     .ir-menu-drawer-hover-regular:hover {
        //         cursor: pointer;
        //         background-color: #DB6E2D;
        //         color: #FFFFFF;
        //     }

        //     .ir-menu-drawer-active-regular {
        //         background-color: #DB6E2D !important;
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* overview block regular ************ */
        //     .ir-overview-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #215269;
        //     }

        //     /* .ir-overview-main-regular .row-block:nth-child(1),
        //     .ir-overview-main-regular .row-block:nth-child(2) {
        //         background-color: yellow;
        //     } */

        //     .ir-overview-main-regular .row-block:nth-child(3) {
        //         background-color: #EFEFEF;
        //         border-radius: 10px;
        //         box-shadow: 1px 3px 4px 0px rgba(0, 0, 0, 0.3);
        //     }

        //     /* .ir-overview-main-regular .right-menu {
        //         color: green;
        //     } */

        //     .ir-overview-main-regular .right-menu .v-btn {
        //         font-size: 7px;
        //         background-color: #DB6E2D;
        //         color: #FFFFFF;
        //         text-transform: none;
        //         height: 16px;
        //     }

        //     .ir-overview-main-regular .right-menu .sparkline div:nth-child(1) {
        //         font-size: 12px;
        //         font-weight: 600;
        //     }

        //     /* .ir-overview-main-regular .right-menu .sparkline div:nth-child(3) {
        //         color: red !important;
        //     } */

        //     .ir-overview-main-regular .right-menu .bottom-right-text {
        //         font-size: 6px;
        //         background-color: #D9D9D9;
        //         color: #000000;
        //         border-radius: 10px;
        //     }
        //     /* *********************************** */

        //     /* invest-in-us block regular ******** */
        //     .ir-invest-in-us-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //     }

        //     /* .ir-invest-in-us-main-regular h2 {
        //         font-size: 30px;
        //     } */

        //     .ir-invest-in-us-main-regular .row-block:nth-child(1) {
        //         background-color: #215269;
        //         color: #FFFFFF;
        //     }

        //     .ir-invest-in-us-main-regular .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #000000;
        //     }

        //     .ir-invest-in-us-main-regular .row-block:nth-child(3) {
        //         background-color: #EBF2F4;
        //         color: #1C1B1F;
        //     }
        //     /* *********************************** */

        //     /* leadership-team block regular ***** */
        //     .ir-leadership-team-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(1) {
        //         background-color: #215269;
        //         color: #FFFFFF;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #1C1B1F;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(3) {
        //         background-color: #215269;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* press-releases-and-news block regular */
        //     .ir-press-releases-and-news-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .ticker {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .tag {
        //         font-size: 8px;
        //         background-color: #7A9296;
        //         color: #FFFFFF;
        //         border-radius: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .time-stamp {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .topic {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .message {
        //         font-size: 12px;
        //         line-height: 1.3;
        //     }

        //     .ir-press-releases-and-news-main-regular hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* earnings-and-reports block regular ** */
        //     .ir-earnings-and-reports-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(1) {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 42%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 10%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 18%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(4) {
        //         font-weight: bold;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(5) {
        //         font-weight: bold;
        //         width: 16%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .unused-block {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 100%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(1) {
        //         width: 42%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(2) {
        //         width: 10%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(3) {
        //         width: 18%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(4) {
        //         width: 14%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(5) {
        //         width: 16%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }
        //     /* ************************************* */

        //     /* company-calendar block regular ****** */
        //     .ir-company-calendar-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(1) {
        //         font-size: 12px;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(2) {
        //         font-size: 12px;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(3) {
        //         font-size: 12px;
        //         width: 20%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(4) {
        //         font-size: 12px;
        //         width: 11%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(5) {
        //         font-size: 12px;
        //         width: 30%;
        //         height: 25px;
        //         background-color: #edebeb;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(1) {
        //         width: 25%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(2) {
        //         width: 14%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(3) {
        //         width: 20%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(4) {
        //         width: 11%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(5) {
        //         width: 11%;
        //         opacity: 0.3;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(6) {
        //         width: 19%;
        //     }
        //     /* ************************************* */

        //     /* corporate block regular ************* */
        //     .ir-corporate-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000; 
        //     }

        //     .ir-corporate-regular .header-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(1) {
        //         font-weight: bold;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 60%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .row-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(1) {
        //         width: 15%;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(2) {
        //         width: 25%;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(3) {
        //         width: 60%;
        //     }

        //     .ir-corporate-regular hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* generic block regular *************** */
        //     .ir-generic-component-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #215269;
        //     }
        //     /* ************************************* */
        //     /* ----------------------------------- */




        //     /* mobile ---------------------------- */
        //     /* navbar block mobile ***************** */
        //     .ir-navbar-mobile {
        //         background-color: #0077FF !important;
        //     }

        //     .ir-navbar-text-mobile {
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* menu block mobile ***************** */
        //     .ir-menu-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //     }

        //     .ir-menu-drawer-hover-mobile:hover {
        //         cursor: pointer;
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-menu-drawer-active-mobile {
        //         background-color: #0077FF !important;
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* overview block mobile ************* */
        //     .ir-overview-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     /* .ir-overview-main-mobile .row-block:nth-child(1) {
        //         background-color: yellow;
        //     } */

        //     .ir-overview-main-mobile .row-block:nth-child(2) {
        //         background-color: #EFEFEF;
        //     }

        //     .ir-overview-main-mobile .right-menu .v-btn {
        //         font-size: 7px;
        //         background-color: #0077FF;
        //         color: white;
        //         text-transform: none;
        //         height: 16px;
        //     }

        //     .ir-overview-main-mobile .right-menu .sparkline div:nth-child(1) {
        //         font-size: 12px;
        //         font-weight: 600;
        //     }

        //     /* .ir-overview-main-mobile .right-menu .sparkline div:nth-child(3) {
        //         color: red !important;
        //     } */

        //     .ir-overview-main-mobile .right-menu .bottom-right-text {
        //         font-size: 6px;
        //         background-color: #D9D9D9;
        //         border-radius: 10px;
        //     }
        //     /* *********************************** */

        //     /* invest-in-us block mobile ********* */
        //     .ir-invest-in-us-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     /* .ir-invest-in-us-main-mobile h2 {
        //         font-size: 20px;
        //     } */

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(1) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //         border: 1px solid grey;
        //     }

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         /* color: brown; */
        //         border: 1px solid grey;
        //     }

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(3) {
        //         background-color: #D9D9D9;
        //         color: #000000;
        //         border: 1px solid grey;
        //     }
        //     /* *********************************** */

        //     /* leadership-team block mobile ****** */
        //     .ir-leadership-team-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(1) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #000000;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(3) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* press-releases-and-news block mobile */
        //     .ir-press-releases-and-news-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-press-releases-and-news-main-mobile .headline-main-title {
        //         color: #0077FF;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .ticker {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .tag {
        //         font-size: 8px;
        //         background-color: #7A9296;
        //         color: #FFFFFF;
        //         border-radius: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .time-stamp {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .topic {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .message {
        //         font-size: 12px;
        //         line-height: 1.3;
        //     }

        //     .ir-press-releases-and-news-main-mobile hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************ */

        //     /* earnings-and-reports block mobile ** */
        //     .ir-earnings-and-reports-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-earnings-and-reports-main-mobile .container-element {
        //         color: #000000;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(1) {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 42%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 10%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 18%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(4) {
        //         font-weight: bold;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(5) {
        //         font-weight: bold;
        //         width: 16%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block {
        //         height: 27px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block {
        //         height: 30px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(1) {
        //         width: 42%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(2) {
        //         width: 10%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(3) {
        //         width: 18%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(4) {
        //         width: 14%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(5) {
        //         width: 16%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .unused-block {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 100%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }
        //     /* ************************************* */

        //     /* company-calendar block mobile ****** */
        //     .ir-company-calendar-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-company-calendar-main-mobile .header-block {
        //         height: 25px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(1) {
        //         font-size: 12px;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(2) {
        //         font-size: 12px;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(3) {
        //         font-size: 12px;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(4) {
        //         font-size: 12px;
        //         width: 11%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(5) {
        //         font-size: 12px;
        //         width: 35%;
        //         height: 25px;
        //         background-color: #edebeb;
        //     }

        //     .ir-company-calendar-main-mobile .row-block {
        //         height: 22px;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(1) {
        //         width: 25%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(2) {
        //         width: 14%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(3) {
        //         width: 15%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(4) {
        //         width: 11%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(5) {
        //         width: 13%;
        //         opacity: 0.3;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(6) {
        //         width: 22%;
        //     }
        //     /* ************************************* */

        //     /* corporate block mobile ************** */
        //     .ir-corporate-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-corporate-mobile .container-element {
        //         font-size: 12px;
        //         color: #000000;
        //     }

        //     .ir-corporate-mobile .header-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(1) {
        //         font-weight: bold;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 60%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .row-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(1) {
        //         width: 15%;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(2) {
        //         width: 25%;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(3) {
        //         width: 60%;
        //     }

        //     .ir-corporate-mobile hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* generic block mobile **************** */
        //     .ir-generic-component-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }
        //     /* ************************************* */

        //     /* footer block mobile **************** */
        //     .ir-footer-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000;
        //         background-color: #EEEEEE;
        //     }
        //     /* ************************************* */
        //     /* ----------------------------------- */
        // `;








        // Absolicon
        // const testStyle = `
        //     .ir-base-app {
        //         background-color: #FFFFFF !important;
        //     }

        //     /* regular --------------------------- */
        //     /* header block regular ************ */
        //     .ir-header-regular {
        //         background-color: #13225E;
        //     }

        //     .ir-header-icon-regular {
        //         background-image: url("images/absolicon/absolicon.svg");
        //         background-origin: content-box;
        //         background-position: left;
        //         height: 102px;
        //         padding-left: 10px;
        //     }
        //     /* *********************************** */

        //     /* footer block regular *************** */
        //     .ir-footer-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000;
        //         background-color: #EEEEEE;
        //     }
        //     /* ************************************* */

        //     /* menu block regular ************ */
        //     .ir-menu-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 14px;
        //     }

        //     .ir-menu-regular .menu-drawer {
        //         background-color: #FFFFFF !important;
        //     }

        //     .ir-menu-drawer-hover-regular:hover {
        //         cursor: pointer;
        //         background-color: #4DAAE9;
        //         color: #FFFFFF;
        //     }

        //     .ir-menu-drawer-active-regular {
        //         background-color: #4DAAE9 !important;
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* overview block regular ************ */
        //     .ir-overview-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #13225E;
        //     }

        //     /* .ir-overview-main-regular .row-block:nth-child(1),
        //     .ir-overview-main-regular .row-block:nth-child(2) {
        //         background-color: yellow;
        //     } */

        //     .ir-overview-main-regular .row-block:nth-child(3) {
        //         background-color: #4DAAE9;
        //         border-radius: 10px;
        //         box-shadow: 1px 3px 4px 0px rgba(0, 0, 0, 0.3);
        //     }

        //     /* .ir-overview-main-regular .right-menu {
        //         color: green;
        //     } */

        //     .ir-overview-main-regular .right-menu .v-btn {
        //         font-size: 7px;
        //         background-color: #13225E;
        //         color: #4DAAE9;
        //         text-transform: none;
        //         height: 16px;
        //     }

        //     .ir-overview-main-regular .right-menu .sparkline div:nth-child(1) {
        //         font-size: 12px;
        //         font-weight: 600;
        //     }

        //     /* .ir-overview-main-regular .right-menu .sparkline div:nth-child(3) {
        //         color: red !important;
        //     } */

        //     .ir-overview-main-regular .right-menu .bottom-right-text {
        //         font-size: 6px;
        //         background-color: #13225E;
        //         color: #4DAAE9;
        //         border-radius: 10px;
        //     }
        //     /* *********************************** */

        //     /* invest-in-us block regular ******** */
        //     .ir-invest-in-us-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //     }

        //     /* .ir-invest-in-us-main-regular h2 {
        //         font-size: 30px;
        //     } */

        //     .ir-invest-in-us-main-regular .row-block:nth-child(1) {
        //         background-color: #13225E;
        //         color: #4DAAE9;
        //     }

        //     .ir-invest-in-us-main-regular .row-block:nth-child(2) {
        //         background-color: #F8F8F8;
        //         color: #1C1B1F;
        //     }

        //     .ir-invest-in-us-main-regular .row-block:nth-child(3) {
        //         background-color: #FFFFFF;
        //         color: #1C1B1F;
        //     }
        //     /* *********************************** */

        //     /* leadership-team block regular ***** */
        //     .ir-leadership-team-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(1) {
        //         background-color: #13225E;
        //         color: #FFFFFF;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #1C1B1F;
        //     }

        //     .ir-leadership-team-main-regular .row-block:nth-child(3) {
        //         background-color: #13225E;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* press-releases-and-news block regular */
        //     .ir-press-releases-and-news-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .ticker {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .tag {
        //         font-size: 8px;
        //         background-color: #7A9296;
        //         color: #FFFFFF;
        //         border-radius: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .time-stamp {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .topic {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-regular .row-block .message {
        //         font-size: 12px;
        //         line-height: 1.3;
        //     }

        //     .ir-press-releases-and-news-main-regular hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* earnings-and-reports block regular ** */
        //     .ir-earnings-and-reports-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(1) {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 42%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 10%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 18%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(4) {
        //         font-weight: bold;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .header-block .col-block:nth-child(5) {
        //         font-weight: bold;
        //         width: 16%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .unused-block {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 100%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(1) {
        //         width: 42%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(2) {
        //         width: 10%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(3) {
        //         width: 18%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(4) {
        //         width: 14%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-regular .row-block .col-block:nth-child(5) {
        //         width: 16%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }
        //     /* ************************************* */

        //     /* company-calendar block regular ****** */
        //     .ir-company-calendar-main-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(1) {
        //         font-size: 12px;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(2) {
        //         font-size: 12px;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(3) {
        //         font-size: 12px;
        //         width: 20%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(4) {
        //         font-size: 12px;
        //         width: 11%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-regular .header-block .col-block:nth-child(5) {
        //         font-size: 12px;
        //         width: 30%;
        //         height: 25px;
        //         background-color: #edebeb;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(1) {
        //         width: 25%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(2) {
        //         width: 14%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(3) {
        //         width: 20%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(4) {
        //         width: 11%;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(5) {
        //         width: 11%;
        //         opacity: 0.3;
        //     }

        //     .ir-company-calendar-main-regular .row-block .col-block:nth-child(6) {
        //         width: 19%;
        //     }
        //     /* ************************************* */

        //     /* corporate block regular ************* */
        //     .ir-corporate-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000; 
        //     }

        //     .ir-corporate-regular .header-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(1) {
        //         font-weight: bold;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 60%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-regular .row-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(1) {
        //         width: 15%;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(2) {
        //         width: 25%;
        //     }

        //     .ir-corporate-regular .row-block .col-block:nth-child(3) {
        //         width: 60%;
        //     }

        //     .ir-corporate-regular hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* generic block regular *************** */
        //     .ir-generic-component-regular {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #13225E;
        //     }
        //     /* ************************************* */
        //     /* ----------------------------------- */




        //     /* mobile ---------------------------- */
        //     /* navbar block mobile ***************** */
        //     .ir-navbar-mobile {
        //         background-color: #0077FF !important;
        //     }

        //     .ir-navbar-text-mobile {
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* menu block mobile ***************** */
        //     .ir-menu-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //     }

        //     .ir-menu-drawer-hover-mobile:hover {
        //         cursor: pointer;
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-menu-drawer-active-mobile {
        //         background-color: #0077FF !important;
        //         color: #FFFFFF !important;
        //     }
        //     /* *********************************** */

        //     /* overview block mobile ************* */
        //     .ir-overview-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     /* .ir-overview-main-mobile .row-block:nth-child(1) {
        //         background-color: yellow;
        //     } */

        //     .ir-overview-main-mobile .row-block:nth-child(2) {
        //         background-color: #EFEFEF;
        //     }

        //     .ir-overview-main-mobile .right-menu .v-btn {
        //         font-size: 7px;
        //         background-color: #0077FF;
        //         color: white;
        //         text-transform: none;
        //         height: 16px;
        //     }

        //     .ir-overview-main-mobile .right-menu .sparkline div:nth-child(1) {
        //         font-size: 12px;
        //         font-weight: 600;
        //     }

        //     /* .ir-overview-main-mobile .right-menu .sparkline div:nth-child(3) {
        //         color: red !important;
        //     } */

        //     .ir-overview-main-mobile .right-menu .bottom-right-text {
        //         font-size: 6px;
        //         background-color: #D9D9D9;
        //         border-radius: 10px;
        //     }
        //     /* *********************************** */

        //     /* invest-in-us block mobile ********* */
        //     .ir-invest-in-us-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     /* .ir-invest-in-us-main-mobile h2 {
        //         font-size: 20px;
        //     } */

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(1) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //         border: 1px solid grey;
        //     }

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         /* color: brown; */
        //         border: 1px solid grey;
        //     }

        //     .ir-invest-in-us-main-mobile .row-block:nth-child(3) {
        //         background-color: #D9D9D9;
        //         color: #000000;
        //         border: 1px solid grey;
        //     }
        //     /* *********************************** */

        //     /* leadership-team block mobile ****** */
        //     .ir-leadership-team-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(1) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(2) {
        //         background-color: #FFFFFF;
        //         color: #000000;
        //     }

        //     .ir-leadership-team-main-mobile .row-block:nth-child(3) {
        //         background-color: #0077FF;
        //         color: #FFFFFF;
        //     }
        //     /* *********************************** */

        //     /* press-releases-and-news block mobile */
        //     .ir-press-releases-and-news-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #000000;
        //     }

        //     .ir-press-releases-and-news-main-mobile .headline-main-title {
        //         color: #0077FF;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .ticker {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .tag {
        //         font-size: 8px;
        //         background-color: #7A9296;
        //         color: #FFFFFF;
        //         border-radius: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .time-stamp {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .topic {
        //         font-size: 8px;
        //     }

        //     .ir-press-releases-and-news-main-mobile .row-block .message {
        //         font-size: 12px;
        //         line-height: 1.3;
        //     }

        //     .ir-press-releases-and-news-main-mobile hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************ */

        //     /* earnings-and-reports block mobile ** */
        //     .ir-earnings-and-reports-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-earnings-and-reports-main-mobile .container-element {
        //         color: #000000;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(1) {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 42%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 10%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 18%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(4) {
        //         font-weight: bold;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 4px;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block .col-block:nth-child(5) {
        //         font-weight: bold;
        //         width: 16%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         margin-bottom: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .header-block {
        //         height: 27px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block {
        //         height: 30px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(1) {
        //         width: 42%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(2) {
        //         width: 10%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(3) {
        //         width: 18%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(4) {
        //         width: 14%;
        //         height: 22px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .row-block .col-block:nth-child(5) {
        //         width: 16%;
        //         height: 22px;
        //         padding-top: 2px;
        //     }

        //     .ir-earnings-and-reports-main-mobile .unused-block {
        //         font-family: 'Times New Roman', Times, serif;
        //         font-size: 14px;
        //         width: 100%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         color: #0077FF;
        //         padding-top: 2px;
        //         margin-bottom: 2px;
        //     }
        //     /* ************************************* */

        //     /* company-calendar block mobile ****** */
        //     .ir-company-calendar-main-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-company-calendar-main-mobile .header-block {
        //         height: 25px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(1) {
        //         font-size: 12px;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(2) {
        //         font-size: 12px;
        //         width: 14%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(3) {
        //         font-size: 12px;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(4) {
        //         font-size: 12px;
        //         width: 11%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-company-calendar-main-mobile .header-block .col-block:nth-child(5) {
        //         font-size: 12px;
        //         width: 35%;
        //         height: 25px;
        //         background-color: #edebeb;
        //     }

        //     .ir-company-calendar-main-mobile .row-block {
        //         height: 22px;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(1) {
        //         width: 25%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(2) {
        //         width: 14%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(3) {
        //         width: 15%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(4) {
        //         width: 11%;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(5) {
        //         width: 13%;
        //         opacity: 0.3;
        //     }

        //     .ir-company-calendar-main-mobile .row-block .col-block:nth-child(6) {
        //         width: 22%;
        //     }
        //     /* ************************************* */

        //     /* corporate block mobile ************** */
        //     .ir-corporate-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }

        //     .ir-corporate-mobile .container-element {
        //         font-size: 12px;
        //         color: #000000;
        //     }

        //     .ir-corporate-mobile .header-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(1) {
        //         font-weight: bold;
        //         width: 15%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(2) {
        //         font-weight: bold;
        //         width: 25%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .header-block .col-block:nth-child(3) {
        //         font-weight: bold;
        //         width: 60%;
        //         height: 25px;
        //         background-color: #edebeb;
        //         padding-top: 3px;
        //     }

        //     .ir-corporate-mobile .row-block {
        //         height: 27px;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(1) {
        //         width: 15%;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(2) {
        //         width: 25%;
        //     }

        //     .ir-corporate-mobile .row-block .col-block:nth-child(3) {
        //         width: 60%;
        //     }

        //     .ir-corporate-mobile hr {
        //         height: 1px;
        //         background-color: lightgrey;
        //         border: none;
        //     }
        //     /* ************************************* */

        //     /* generic block mobile **************** */
        //     .ir-generic-component-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 10px;
        //         color: #0077FF;
        //     }
        //     /* ************************************* */

        //     /* footer block mobile **************** */
        //     .ir-footer-mobile {
        //         font-family: Arial, Helvetica, sans-serif;
        //         font-size: 12px;
        //         color: #000000;
        //         background-color: #EEEEEE;
        //     }
        //     /* ************************************* */
        //     /* ----------------------------------- */
        // `;

        // this.addStyle(testStyle);

        this.setCompanyName(this.name);

        const languageItem = (await axios.get("https://geolocation-db.com/json/")).data;
        let countryCode = languageItem.country_code;

        console.log('*********// your location //*************', countryCode);
        console.log(localStorage.getItem('language'));

        if(localStorage.getItem('language') === null) {
            if(countryCode === 'SE') {
                countryCode = 'sv';
            } else {
                countryCode = 'en';
            }

            localStorage.setItem('language', countryCode);
        }

        console.log(localStorage.getItem('language'));

        this.selectedLanguageCode = localStorage.getItem('language');

        console.log(this.selectedLanguageCode);

        await this.loadCompany({
            company_id: 5470600,
            // language: 'en',
            language: this.selectedLanguageCode,
        });

        // console.log(JSON.parse(JSON.stringify(this.getCompany)));

        this.addStyle(this.getCompany.css_styles);

        this.finishedLoading = true;
    },
    computed: {
        ...mapGetters(['getCompany']),
        name() {
            return this.$route.params.name;
        },
    },
    methods: {
        ...mapActions(['loadCompany']),
        ...mapMutations(['setCompanyName']),
        addStyle(styleString) {
            const style = document.createElement('style');

            style.textContent = styleString;

            document.head.append(style);
        },
    },
}
</script>

<!-- <style scoped>
div {
    background-color: #F9F8F8 !important;
}
</style> -->
