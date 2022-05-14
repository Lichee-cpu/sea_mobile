import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { i18n } from "./i18n";
import store from "./store/index";
import "./theme/global.less";
import "./theme/custom.css";
import { Button, ConfigProvider, Form, Field, CellGroup } from "vant";

const app = createApp(App);
app.use(ConfigProvider);
app.use(Button);
app.use(Form);
app.use(Field);
app.use(CellGroup);

app.use(router);
app.use(i18n);
app.use(store);
app.mount("#app");
