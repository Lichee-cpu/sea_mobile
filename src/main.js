/*
 * @Author: lxiang
 * @Date: 2023-03-21 21:36:23
 * @LastEditors: lxiang
 * @LastEditTime: 2023-03-23 14:58:26
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
import wx from "./utils/init-wechat";

// 判断是不是微信中打开
const ua = navigator.userAgent.toLowerCase();
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
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  app.config.globalProperties.$wx = wx;
}
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
