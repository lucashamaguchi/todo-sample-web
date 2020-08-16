import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./plugins/i18n";
import store from './store/';
import './plugins/';


Vue.config.productionTip = false;

const vue = new Vue({
    render: h => h(App),
    router,
    i18n,
    store,
});

vue.$mount("#app");
