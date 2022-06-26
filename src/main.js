/*
 * @Author: lxiang
 * @Date: 2022-05-30 18:02:07
 * @LastEditors: lxiang
 * @LastEditTime: 2022-06-26 13:37:49
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { instance } from "./axios/index";
import { i18n } from "./i18n";
import store from "./store/index";
import "./theme/global.less";
import "./theme/custom.css";
import {
  Button,
  ConfigProvider,
  Form,
  Field,
  CellGroup,
  Tabbar,
  TabbarItem,
  Search,
  NavBar,
} from "vant";

const app = createApp(App);
app.use(ConfigProvider);
app.use(Button);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Search);
app.use(NavBar);

app.use(router);
app.use(i18n);
app.use(store);
app.config.globalProperties.$http = instance;
app.mount("#app");
