import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "@/config/i18n/index.js";

import "./index.css";
import "./config/vee-validate/rules";
import "./config/vee-validate/messages";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
