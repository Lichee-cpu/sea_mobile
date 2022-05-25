/*
 * @Author: lxiang
 * @Date: 2022-05-16 09:50:42
 * @LastEditors: lxiang
 * @LastEditTime: 2022-05-25 20:18:44
 * @description: Modify here please
 * @FilePath: \sea_mobile\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import { i18n } from './i18n'
import store from './store/index'
import './theme/global.less'
import './theme/custom.css'
import {
  Button,
  ConfigProvider,
  Form,
  Field,
  CellGroup,
  Collapse,
  CollapseItem,
  Uploader,
  Popup,
} from 'vant'

const app = createApp(App)
app.use(ConfigProvider)
app.use(Button)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Collapse)
app.use(CollapseItem)
app.use(Uploader)
app.use(Popup)

app.use(router)
app.use(i18n)
app.use(store)
app.config.globalProperties.$http = axios
app.mount('#app')
