import { createI18n } from 'vue-i18n/index'
import en from './lang/en'
import cn from './lang/cn'
import zhCN from 'vant/es/locale/lang/zh-CN'
import enUS from 'vant/es/locale/lang/en-US'

const messages = {
  cn: {
    ...zhCN,
    ...cn,
  },
  en: {
    ...enUS,
    ...en,
  },
}
export const i18n = createI18n({
  locale: 'cn', // 设置默认语言
  messages: messages, //设置资源文件对象
  globalInjection: true,
  legacy: false,
})
