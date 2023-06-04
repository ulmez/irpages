<template lang="pug">
    div(class="ir-press-releases-and-news-main-mobile")
        div(id="headline-press-releases-and-news")
            h2(class="headline-main-title") Press releases & News
        div(class="mb-2" style="position:relative; height:508px; overflow-y:scroll; overflow-x:hidden; border:0px solid lightgrey;")
            v-collapse-group(:onlyOneActive="false")
                v-collapse-wrapper(v-for="(item, index) in news" :key="index" style="border:0px solid;")
                    div(@click="setNewsBlockActive(index)" class="row-block pa-2" style="position:relative; cursor:pointer; border:0px solid;" v-collapse-toggle)
                        div(class="mb-1" style="border:0px solid;")
                            div(style="display:inline-block; border:0px solid;")
                                div(class="ticker" style="border:0px solid;") Fortnox {{ getCompany.name }}
                            div(class="ml-2" style="display:inline-block; border:0px solid;")
                                div(class="tag pa-1" style="border:0px solid;") PRESS RELEASE
                            div(class="ml-2" style="display:inline-block; border:0px solid;")
                                div(class="time-stamp" style="border:0px solid;") {{ item.date }}
                        div(style="border:0px solid;")
                            div(style="border:0px solid;")
                                h2(class="ellipsis" :title="item.title" style="border:0px solid;") {{ item.title }}
                        div(style="position:absolute; top:0; right:0; border:0px solid;")
                            v-icon(v-if="activeNewsBlocks[index]") mdi-chevron-up
                            v-icon(v-else-if="!activeNewsBlocks[index]") mdi-chevron-down
                            v-icon(v-else)

                    div(:id="`element${index}`" class="row-block" :style="activeNewsBlocks[index] ? `transition:max-height .3s ease-in; max-height:${getElementsHeight(index)}px;` : ''" style="overflow:hidden;" v-collapse-content)
                        div(class="message pl-2 pb-2" style="border:0px solid;")
                            div(v-html="item.newstext")
                        div(class="mt-2 mb-2" style="border:0px solid;")
                            div(class="topic" style="display:inline-block; border:0px solid;") TOPICS
                            div(v-for="(tag, index) in item.tags" :key="index" class="ml-2" style="display:inline-block; border:0px solid;")
                                div(class="tag pa-1" style="border:0px solid;") {{ getTagName(tag) }}

                    //- use this block to dynamically get the height of each element
                    div(:id="`element2${index}`" class="row-block" style="position:absolute; bottom:0; visibility:hidden;")
                        div(class="message pl-2 pb-2" style="border:0px solid;")
                            div(v-html="item.newstext")
                        div(class="mt-2 mb-2" style="border:0px solid;")
                            div(class="topic" style="display:inline-block; border:0px solid;") TOPICS
                            div(v-for="(tag, index) in item.tags" :key="index" class="ml-2" style="display:inline-block; border:0px solid;")
                                div(class="tag pa-1" style="border:0px solid;") {{ getTagName(tag) }}

                    div(style="border:0px solid;")
                        hr

        //- block 1
        //- div(class="row-block")
            div(class="mb-1" style="border:0px solid;")
                div(style="display:inline-block; border:0px solid;")
                    div(class="ticker" style="border:0px solid;") Fortnox
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") PRESS RELEASE
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="time-stamp" style="border:0px solid;") Today 12:30
            div(style="border:0px solid;")
                div(style="border:0px solid;")
                    h2 Grundpelare identifierade av Fortnox nya VD
                    div(class="message" style="border:0px solid;") Fortnox nya vd Tommy Eklund har identifierat fyra nya grundpelare som han vill fokusera på, skriver introduce i en feedback från mötet. De fyra pelarna är ett starkare kärnerbjudande, etablering av ett mer rörligt system där kärnlösningar kan jobba sömlöst med andra tillägg, ökad fokus på...
            div(class="mt-2" style="border:0px solid;")
                div(class="topic" style="display:inline-block; border:0px solid;") TOPICS
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") CLEANTECH
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") IPO
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") CURRENCIES
            div(class="mt-2" style="border:0px solid;")
                hr
        
        //- block 2
        //- div(class="row-block")
            div(class="mb-1 mt-4" style="border:0px solid;")
                div(style="display:inline-block; border:0px solid;")
                    div(class="ticker" style="border:0px solid;") Fortnox
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") PRESS RELEASE
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="time-stamp" style="border:0px solid;") Today 12:30
            div(style="border:0px solid;")
                div(style="border:0px solid;")
                    h2 Grundpelare identifierade av Fortnox nya VD
                    div(class="message" style="border:0px solid;") Fortnox nya vd Tommy Eklund har identifierat fyra nya grundpelare som han vill fokusera på, skriver introduce i en feedback från mötet. De fyra pelarna är ett starkare kärnerbjudande, etablering av ett mer rörligt system där kärnlösningar kan jobba sömlöst med andra tillägg, ökad fokus på...
            div(class="mt-2" style="border:0px solid;")
                div(class="topic" style="display:inline-block; border:0px solid;") TOPICS
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") CLEANTECH
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") IPO
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") CURRENCIES
            div(class="mt-2" style="border:0px solid;")
                hr

        //- block 3
        //- div(class="row-block")
            div(class="mb-1 mt-4" style="border:0px solid;")
                div(style="display:inline-block; border:0px solid;")
                    div(class="ticker" style="border:0px solid;") Fortnox
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") PRESS RELEASE
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="time-stamp" style="border:0px solid;") Today 12:30
            div(style="border:0px solid;")
                div(style="border:0px solid;")
                    h2 Grundpelare identifierade av Fortnox nya VD
                    div(class="message" style="border:0px solid;") Fortnox nya vd Tommy Eklund har identifierat fyra nya grundpelare som han vill fokusera på, skriver introduce i en feedback från mötet. De fyra pelarna är ett starkare kärnerbjudande, etablering av ett mer rörligt system där kärnlösningar kan jobba sömlöst med andra tillägg, ökad fokus på...
            div(class="mt-2" style="border:0px solid;")
                div(class="topic" style="display:inline-block; border:0px solid;") TOPICS
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") CLEANTECH
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") IPO
                div(class="ml-2" style="display:inline-block; border:0px solid;")
                    div(class="tag pa-1" style="border:0px solid;") CURRENCIES
            div(class="mt-2" style="border:0px solid;")
                hr
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "PressReleasesAndNewsMobile",
    data() {
        return {
            activeNewsBlocks: []
        };
    },
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.getCompany)));
        console.log(JSON.parse(JSON.stringify(this.news)));

        for(const item of this.news) {
            this.activeNewsBlocks.push(false);
        }

        console.log(this.activeNewsBlocks);
    },
    computed: {
        ...mapGetters(['getCompany']),
        news() {
            return this.getCompany.news;
        },
    },
    methods: {
        setNewsBlockActive(index) {
            const tempArr = JSON.parse(JSON.stringify(this.activeNewsBlocks));

            this.activeNewsBlocks = [];

            console.log(index);
            
            tempArr[index] = !tempArr[index];

            this.activeNewsBlocks = tempArr;

            console.log(this.activeNewsBlocks);
        },
        getTagName(tag) {
            let tagName = '';
            const checkIfStartWithFWN = tag.substring(0, 4);
            const checkIfStartWithTA = tag.substring(0, 3);

            tagName = `tag_${tag}`;

            if(checkIfStartWithFWN === 'FWN:') {
                tagName = `tag_fwn_${tag.substring(4, tag.length)}`;
            } else if(checkIfStartWithTA === 'TA:') {
                tagName = `tag_ta_${tag.substring(3, tag.length)}`;
            }

            return this.$t(`${tagName}`);
        },
        getElementsHeight(index) {
            return document.getElementById(`element2${index}`).offsetHeight;
        },
    },
};
</script>

<style scoped>
.row-block h2 {
    width: calc(100vw - 36px);
}

.ellipsis {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
}

>>> table {
    border-spacing: 0;
    border-collapse: collapse;
}

>>> td {
    border: 1px solid;
    padding: 5px;
}

.v-collapse-content{
    max-height: 0;
    transition: max-height .3s ease-out;
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>
