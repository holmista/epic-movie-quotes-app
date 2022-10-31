import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import "./config/vee-validate/rules";
import "./config/vee-validate/messages";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
