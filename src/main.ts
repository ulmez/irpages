import Vue from "vue";
import vuetify from "./plugins/vuetify";
import i18n from './plugins/i18n';
import App from "./App.vue";
import router from "./router";
import store from "./stores";
// import axios from 'axios';
import VueCollapse from "vue2-collapse";

Vue.config.productionTip = false;

// interface ILanguage {
//     country_code: string,
//     country_name: string,
//     city: string,
//     postal: string,
//     latitude: number,
//     longitude: number,
// }

Vue.use(VueCollapse);

new Vue({
    i18n,
    vuetify,
    router,
    store,
    // async mounted() {
    //     const languageItem: ILanguage = (await axios.get("https://geolocation-db.com/json/")).data;
    //     const countryCode: string = languageItem.country_code;

    //     console.log('*********// your location //*************', countryCode);
    //     console.log(localStorage.getItem('language'));

    //     if(localStorage.getItem('language') === null) {
    //         console.log('step 1');
    //         if(countryCode === 'SE') {
    //             console.log('step 2');
    //             i18n.locale = 'sv';
    //         } else {
    //             console.log('step 3');
    //             i18n.locale = 'en';
    //         }
    //         console.log('step 4');
    //         localStorage.setItem('language', i18n.locale);
    //     }

    //     const languageString: string = localStorage.getItem('language') || 'en';

    //     console.log('mmmm');
    //     console.log('mmmm');
    //     console.log('mmmm');
    //     console.log('mmmm');
    //     console.log(languageString);

    //     i18n.locale = languageString;

    //     console.log(localStorage.getItem('language'));
    // },
    render: (h) => h(App),
}).$mount("#app");
