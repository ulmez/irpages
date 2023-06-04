<template lang="pug">
    div(class="ir-leadership-team-main-mobile" style="border:0px solid;")
        div(id="headline-leadership-team" style="border:0px solid;")
            h2 Leadership and team
        div(class="container-element" style="border:0px solid;")
            div(v-for="member in members" :key="member.team_id" class="row-block" style="border:0px solid;")
                div(style="overflow:hidden; border:0px solid;")
                    img(:src="member.photo_img" style="width:calc(100% + 10px);")
                div(class="pa-4" style="position:relative; border:0px solid;")
                    div(class="ellipsis" style="font-size:14px; font-weight:bold; width:calc(100vw - 50px); border:0px solid;") {{ member.name }}, {{ member.position }}
                    div(class="mt-2 mr-8" style="border:0px solid;") {{ member.bio }}
                    div(class="ellipsis mt-2" style="border:0px solid;")
                        span(style="font-weight:bold; border:0px solid;") Shares:
                        span(class="ml-1") 101 500 (12% of {{ getCompany.name }}))
                        span(class="ml-1" style="font-weight:bold;") Email:
                        span(class="ml-1") {{ member.email }}
                    img(src="@/assets/linkedin-icon.svg" title="LinkedIn" style="position:absolute; bottom:40px; right:8px;")
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "LeadershipTeamMobile",
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
