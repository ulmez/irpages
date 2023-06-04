<template lang="pug">
    div(id="header-mobile-element" class="ir-menu-mobile")
        v-app-bar(class="ir-navbar-mobile")
            v-icon(@click.stop="drawer = !drawer" class="ir-navbar-text-mobile") mdi-menu

        v-navigation-drawer(v-model="drawer" class="navigation-drawer" :style="`height:${drawerHeight}px !important;`")
            div(@click="activeOption = 0, openRouter('headline-overview')" :class="(activeOption === 0) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Overview
            div(@click="activeOption = 1, openRouter('headline-invest-in-us')" :class="(activeOption === 1) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Why Invest in us?
            div(@click="activeOption = 2, openRouter('headline-leadership-team')" :class="(activeOption === 2) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Leadership and team
            div(@click="activeOption = 3, openRouter('headline-press-releases-and-news')" :class="(activeOption === 3) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Press releases & News
            div(@click="activeOption = 4, openRouter('headline-earnings-and-reports')" :class="(activeOption === 4) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Reports & Media
            div(@click="activeOption = 5, openRouter('headline-company-calendar')" :class="(activeOption === 5) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Company calendar
            div(@click="activeOption = 6, openRouter('headline-corporate')" :class="(activeOption === 6) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") Corporate
            
            //- listing of generic pages
            div(v-for="(page, index) in pages" :key="index" @click="activeOption = (7 + index), openRouter('headline-generic-component'), setGenericHtml(page)" :class="(activeOption === (7 + index)) ? 'ir-menu-drawer-active-mobile' : ''" class="ir-menu-drawer-hover-mobile") {{ page.menu_display }}
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "MenuMobile",
    data() {
        return {
            drawer: false,
            activeOption: 0,
        };
    },
    computed: {
        ...mapGetters(['getCompany', 'getCompanyName', 'getGenericPage']),
        pages() {
            return this.getCompany.pages;
        },
        drawerHeight() {
            const extraHeight = this.pages.length * 20;

            return 195 + extraHeight;
        }
    },
    methods: {
        ...mapMutations(['setGenericPage']),
        openRouter(el) {
            this.$router.push({ path: '/x' });
            this.$router.push({ path: `/${this.getCompanyName}` });

            setTimeout(() => {
                const element = document.getElementById(el);

                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    // inline: 'center'
                });
            }, 50);
        },
        setGenericHtml(page) {
            this.setGenericPage(page);

            console.log(JSON.parse(JSON.stringify(this.getGenericPage)));
        }
    }
};
</script>

<style scoped>
.navigation-drawer {
    position: absolute;
    top: 56px !important;
    /* height: 195px !important; */
    width: 100% !important;
}
</style>
