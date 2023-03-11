/*
 * @Author: lxiang
 * @Date: 2022-05-30 18:02:07
 * @LastEditors: home 1400256031@qq.com
 * @LastEditTime: 2023-03-11 14:48:41
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
  Icon,
  Popup,
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
app.use(Icon);
app.use(Popup);

app.use(router);
app.use(i18n);
app.use(store);
app.config.globalProperties.$http = instance;
app.mount("#app");

Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
