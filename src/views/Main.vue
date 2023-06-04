<template lang="pug">
    div(style="border:0px solid;")
        v-container(fluid)
            v-row
                v-col(cols="12" class="pa-0")
                    Header(id="header-element")
                    MenuMobile(id="header-mobile-element")

                v-col(cols="12" class="cards pa-0 mt-3" style="border:0px solid;")
                    div(id="menu-element" style="border:0px solid;")
                        Menu

                    div(v-if="innerWidth > 599" id="main-element" class="ml-2 mr-2" style="border:0px solid;")
                        div(style="border:0px solid;")
                            LanguageSelector
                        div(style="height:calc(100vh - 215px); overflow-y:scroll; overflow-x:hidden; border:0px solid;")
                            router-view

                    div(v-if="innerWidth <= 599" id="mobile-main-content-element" style="border:0px solid;")
                        MobileMainContent

        Footer

        EdgerFinance
</template>

<script>
import Header from "@/views/header/Header.vue";
import Menu from "@/views/menu/Menu.vue";
import MenuMobile from "@/views/menu/MenuMobile.vue";
import EdgerFinance from "@/views/edgerFinance/EdgerFinance.vue";
import MobileMainContent from "@/views/content/mobile/MobileMainContent.vue";
import Footer from "@/views/footer/Footer.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";

export default {
    name: "Main",
    components: {
        Header,
        Menu,
        MenuMobile,
        EdgerFinance,
        MobileMainContent,
        Footer,
        LanguageSelector,
    },
    data() {
        return {
            innerWidth: null,
        };
    },
    mounted() {
        window.addEventListener('resize', this.onResize);

        // setTimeout(() => {
            this.onResize();
        // }, 50);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onResize() {
            this.innerWidth = window.innerWidth;
        }
    },
};
</script>

<style scoped>
.cards {
    display: grid;
    grid-template-columns: 200px 1fr;
}

#header-mobile-element,
#mobile-main-content-element {
    display: none;
}

@media (max-width: 599px) {
    .cards {
        grid-template-columns: 1fr;
    }

    #header-element,
    #menu-element,
    #main-element {
        display: none;
    }

    #header-mobile-element {
        display: block;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100000;
    }

    #mobile-main-content-element {
        display: block;
    }
}
</style>
