<template lang="pug">
    div(class="ir-menu-regular" style="width:200px; border:0px solid;")
        v-navigation-drawer(permanent class="menu-drawer")
            div(@click="activeOption = 0, openRouter(`/${name}`)" :class="(activeOption === 0) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Overview
            div(@click="activeOption = 1, openRouter(`/${name}/investInUs`)" :class="(activeOption === 1) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Why Invest in us?
            div(@click="activeOption = 2, openRouter(`/${name}/leadershipTeam`)" :class="(activeOption === 2) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Leadership and team
            div(@click="activeOption = 3, openRouter(`/${name}/pressReleasesAndNews`)" :class="(activeOption === 3) ? 'ir-menu-drawer-active-regular' : ''" id="pressReleasesElement" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Press releases & News
            div(@click="activeOption = 4, openRouter(`/${name}/earningsAndReports`)" :class="(activeOption === 4) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Reports & Media
            div(@click="activeOption = 5, openRouter(`/${name}/companyCalendar`)" :class="(activeOption === 5) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Company calendar
            div(@click="activeOption = 6, openRouter(`/${name}/corporate`)" :class="(activeOption === 6) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") Corporate
            
            //- listing of generic pages
            div(v-for="(page, index) in pages" :key="index" @click="activeOption = (7 + index), openRouter(`/${name}/genericComponent/${page.menu_display}`)" :class="(activeOption === (7 + index)) ? 'ir-menu-drawer-active-regular' : ''" class="ir-menu-drawer-hover-regular pl-2 pr-2" style="border:0px solid;") {{ page.menu_display }}
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Menu",
    data() {
        return {
            activeOption: 0,
        };
    },
    mounted() {
        console.log('pages', JSON.parse(JSON.stringify(this.pages)));
    },
    computed: {
        ...mapGetters(['getCompany']),
        name() {
            return this.$route.params.name;
        },
        pages() {
            return this.getCompany.pages;
        },
    },
    methods: {
        openRouter(router) {
            const routerTemp = (router !== '') ? router : '/';

            this.$router.push({ path: routerTemp });
        }
    }
};
</script>

<style scoped>
.menu-drawer >>> .v-navigation-drawer__border {
    display: none;
}
</style>
