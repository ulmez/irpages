<template lang="pug">
    div(class="ir-leadership-team-main-regular" style="padding-bottom:25px; border:0px solid;")
        div(style="max-width:1000px; margin-left:auto; margin-right:auto; border:0px solid;")
            div(class="container-element")
                div(v-for="member in members" class="row-block" :key="member.team_id" style="height:155px; border:0px solid;")
                    div(style="float:left; width:165px; height:155px; overflow:hidden; border:0px solid;")
                        img(:src="member.photo_img" style="height:155px;")
                        //- img(src="@/assets/sensidose/sensidose-person-1.svg" style="height:155px;")
                        //- img(src="@/assets/easyfill/easyfill-person-1.svg" style="height:155px;")
                        //- img(src="@/assets/absolicon/absolicon-person-1.svg" style="height:155px;")
                    div(style="float:left; position:relative; width:calc(100% - 165px); height:155px; overflow:hidden; border:0px red;")
                        div(class="pl-4 pt-4 pb-4" style="height:135px; border:0px solid;")
                            h2(class="ellipsis mr-4" title="Peter Almberg, Founder CEO & Member of Board" style="border:0px solid;") {{ member.name }}, {{ member.position }}
                            div(class="mt-2 mr-12" :title="member.bio" style="max-width:700px; height:75px; overflow-y:scroll; overflow-x:hidden; border:0px solid;") {{ member.bio }}
                            div(class="ellipsis mt-2 mr-12" :title="`Shares: 101 500 (12% of ${getCompany.name}) Email: ${member.email}`" style="max-width:700px; border:0px solid;")
                                span(style="font-weight:bold; border:0px solid;") Shares:
                                span(class="ml-1") 101 500 (12% of {{ getCompany.name }})
                                span(class="ml-1" style="font-weight:bold;") Email:
                                span(class="ml-1") {{ member.email }}
                        img(src="@/assets/linkedin-icon.svg" title="LinkedIn" style="position:absolute; bottom:8px; right:8px;")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "LeadershipTeam",
    mounted() {
        console.log(JSON.parse(JSON.stringify(this.getCompany)));
        console.log(JSON.parse(JSON.stringify(this.members)));
        console.log(this.getCompany.name);
    },
    computed: {
        ...mapGetters(['getCompany']),
        members() {
            return this.getCompany.team;
        }
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
