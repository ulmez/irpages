<template lang="pug">
    div(class="main-container" style="border:0px solid;")
        div(class="ml-2 mr-2")
            OverviewMobile
        div(class="ml-2 mr-2 mt-2")
            InvestInUsMobile
        div(class="ml-2 mr-2 mt-2")
            LeadershipTeamMobile
        div(class="ml-2 mr-2 mt-2")
            PressReleasesAndNewsMobile
        div(class="ml-2 mr-2 mt-2")
            EarningsAndReportsMobile
        div(class="ml-2 mr-2 mt-2")
            CompanyCalendarMobile
        div(class="ml-2 mr-2 mt-2")
            CorporateMobile
        div(class="ml-2 mr-2 mt-2")
            GenericComponentMobile
        div(class="mt-2")
            FooterMobile
</template>

<script>
import OverviewMobile from "@/views/content/mobile/OverviewMobile.vue";
import InvestInUsMobile from "@/views/content/mobile/InvestInUsMobile.vue";
import CompanyCalendarMobile from "@/views/content/mobile/CompanyCalendarMobile.vue";
import EarningsAndReportsMobile from "@/views/content/mobile/EarningsAndReportsMobile.vue";
import LeadershipTeamMobile from "@/views/content/mobile/LeadershipTeamMobile.vue";
import PressReleasesAndNewsMobile from "@/views/content/mobile/PressReleasesAndNewsMobile.vue";
import CorporateMobile from "@/views/content/mobile/CorporateMobile.vue";
import GenericComponentMobile from "@/views/content/mobile/GenericComponentMobile.vue";
import FooterMobile from "@/views/footer/FooterMobile.vue";

export default {
    name: "MobileMainContent",
    components: {
        OverviewMobile,
        InvestInUsMobile,
        CompanyCalendarMobile,
        EarningsAndReportsMobile,
        LeadershipTeamMobile,
        PressReleasesAndNewsMobile,
        CorporateMobile,
        GenericComponentMobile,
        FooterMobile,
    },
};
</script>

<style scoped>
.main-container {
    padding-top: 50px;
}
</style>
