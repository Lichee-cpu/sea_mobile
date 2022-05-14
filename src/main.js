import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import store from "./store/index";
import { Button, ConfigProvider } from "vant";
import "./theme/global.less";
import "./theme/custom.css";

const app = createApp(App);
app.use(ConfigProvider);
app.use(Button);
app.use(router);
app.use(i18n);
app.use(store);
app.mount("#app");
