/* eslint-disable */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CompanyCalendar from "@/views/content/regular/CompanyCalendar.vue";
import Overview from "@/views/content/regular/Overview.vue";
import InvestInUs from "@/views/content/regular/InvestInUs.vue";
import EarningsAndReports from "@/views/content/regular/EarningsAndReports.vue";
import LeadershipTeam from "@/views/content/regular/LeadershipTeam.vue";
import PressReleasesAndNews from "@/views/content/regular/PressReleasesAndNews.vue";
import Corporate from "@/views/content/regular/Corporate.vue";
import GenericComponent from "@/views/content/regular/GenericComponent.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/:name",
        name: "home",
        component: Overview,
    },
    {
        path: "/:name/investInUs",
        name: "investInUs",
        component: InvestInUs,
    },
    {
        path: "/:name/companyCalendar",
        name: "companyCalendar",
        component: CompanyCalendar,
    },
    {
        path: "/:name/earningsAndReports",
        name: "earningsAndReports",
        component: EarningsAndReports,
    },
    {
        path: "/:name/leadershipTeam",
        name: "leadershipTeam",
        component: LeadershipTeam,
    },
    {
        path: "/:name/pressReleasesAndNews",
        name: "pressReleasesAndNews",
        component: PressReleasesAndNews,
    },
    {
        path: "/:name/corporate",
        name: "corporate",
        component: Corporate,
    },
    {
        path: "/:name/genericComponent/:display",
        name: "genericComponent",
        component: GenericComponent,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
