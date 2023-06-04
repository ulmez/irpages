<template lang="pug">
    div(class="ir-header-regular" :style="`background-image:url('${getCompany.banner_img}');`")
        div(class="ir-header-icon-regular")
            img(:src="getCompany.logo_img")

</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Header",
    computed: {
        ...mapGetters(['getCompany']),
    },
};
</script>

<!-- <style scoped>
.header-container {
    background-image: url("@/assets/katalysen-background.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 80px;
}
</style> -->
