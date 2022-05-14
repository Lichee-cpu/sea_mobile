import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import { Button, ConfigProvider } from "vant";

const app = createApp(App);
app.use(ConfigProvider);
app.use(Button);
app.use(router);
app.use(i18n);
app.mount("#app");
