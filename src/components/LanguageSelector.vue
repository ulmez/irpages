<template lang="pug">
    div
        div(class="d-flex justify-end" style="margin-left:auto; margin-right:auto; max-width:1000px; border:0px solid;")
            //- Do if more than one language selection
            v-menu(v-if="getAvailableLanguages.length > 1" offset-y)
                template(v-slot:activator="{ on, attrs }")
                    div(v-bind="attrs" v-on="on" class="mb-2" style="width:200px; height:22px; border:1px solid #E4E4E4;")
                        div(style="float:left; width:70%; height:22px; line-height:19px; color:#5B5B5B; padding-left:2px; border:0px solid;") {{ getSelectedLanguage.title }}
                        div(class="text-right" style="float:left; width:30%; height:22px; border:0px solid;")
                            img(:src="getSelectedLanguage.icon" style="width:28px; padding-top:1px; padding-right:2px;")
                v-list(class="overflow-y-auto pa-0" style="max-height:75px;")
                    div(v-for="(item, index) in getAvailableLanguages" :key="item.language")
                        div(@click="setLanguage(item.language)" class="d-flex justify-space-between pl-1 pr-1" style="width:100%; cursor:pointer; border:0px solid;")
                            div(class="ellipsis" style="width:155px; height:25px; border:0px solid;") {{ getLanguageOnCode(item.language).title }}
                            img(:src="getLanguageOnCode(item.language).icon" style="width:30px; border:0px solid;")

            //- Do if only one language selection
            v-menu(v-else offset-y)
                template(v-slot:activator="{ on, attrs }")
                    div(class="mb-2" style="width:200px; height:22px; border:1px solid #E4E4E4;")
                        div(style="float:left; width:70%; height:22px; line-height:19px; color:#5B5B5B; padding-left:2px; border:0px solid;") {{ getSelectedLanguage.title }}
                        div(class="text-right" style="float:left; width:30%; height:22px; border:0px solid;")
                            img(:src="getSelectedLanguage.icon" style="width:28px; padding-top:1px; padding-right:2px;")
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: 'LanguageSelector',
    data() {
        return {
            selectedLanguageCode: null,
            items: [
                {
                    title: 'Svenska',
                    language: 'sv',
                    icon: '/images/swedish-flag-icon.svg'
                },
                {
                    title: 'English',
                    language: 'en',
                    icon: '/images/english-flag-icon.svg'
                },
            ],
        };
    },
    created() {
        this.selectedLanguageCode = localStorage.getItem('language');
    },
    computed: {
        ...mapGetters(['getCompany']),
        getAvailableLanguages() {
            return this.getCompany.languages_available;
        },
        getSelectedLanguage() {
            return this.items.find((l) => l.language.toLowerCase() === this.selectedLanguageCode.toLowerCase());
        },
    },
    methods: {
        ...mapActions(['loadCompany']),
        getLanguageOnCode(language) {
            return this.items.find((i) => i.language === language);
        },
        async setLanguage(language) {
            localStorage.setItem('language', language);

            this.selectedLanguageCode = localStorage.getItem('language');

            console.log(this.selectedLanguageCode);

            console.log({
                company_id: 5470600,
                language: this.selectedLanguageCode,
            });

            await this.loadCompany({
                company_id: 5470600,
                // language: 'en',
                language: this.selectedLanguageCode,
            });
        }
    },
}
</script>

<style scoped>
.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}
</style>
