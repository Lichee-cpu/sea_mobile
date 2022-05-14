
<template>
  <h1>{{ $t('home') }}</h1>
  <van-button type="primary" @click="changleLanguage">{{$t('language')}}</van-button>
</template>

<script>
import { useI18n } from 'vue-i18n/index'
// import useStore from 'vuex'

export default {
  setup() {
    const { locale } = useI18n()
    const changleLanguage = () => {
      locale.value = locale.value == 'cn' ? 'en' : 'cn'
    }
    return { changleLanguage }
  },
}
</script>
