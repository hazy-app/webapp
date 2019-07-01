import Vue from 'vue'
import timeago from 'timeago.js'
import Fingerprint from 'fingerprintjs2'
import Modela from 'modela'

import appAlerts from '~/components/appAlerts.vue'
import appHeader from '~/components/appHeader.vue'
import appInnerContent from '~/components/appInnerContent.vue'
import appInput from '~/components/appInput.vue'
import appRecaptcha from '~/components/appRecaptcha.vue'
import appMessageSender from '~/components/appMessageSender.vue'

Vue.component('appHeader', appHeader)
Vue.component('appInnerContent', appInnerContent)
Vue.component('appInput', appInput)
Vue.component('appRecaptcha', appRecaptcha)
Vue.component('appMessageSender', appMessageSender)

Vue.filter('dateFromNow', date => {
  return timeago().format(date)
})

Vue.filter('dateReadable', date => {
  const dt = new Date(date)
  return `${dt.toDateString()} ${dt.toTimeString()}`
})

export default ({ app, store, router }, inject) => {
  inject('modela', (param = {}) => {
    return new Modela(param)
  })

  inject('eventBus', new Vue())

  inject('alerts', new (Vue.extend(appAlerts))())

  inject('calcDirection', str => {
    if (!str || !/^[\u0600-\u06FF]+$/.test(str.substr(0, 1))) {
      return 'ltr'
    }
    return 'rtl'
  })
  inject('logout', async () => {
    const check = await app.$alerts.confirm(
      'Are you sure you want to leave Hazy?'
    )
    if (check) {
      await store.dispatch('logout')
      return true
    }
    return false
  })

  inject('getFingerprint', async () => {
    //https://stackoverflow.com/a/7616484
    function hashCode(str) {
      return str
        .split('')
        .reduce(
          (prevHash, currVal) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        )
    }
    return new Promise((resolve, reject) => {
      const timeout = window.requestIdleCallback
        ? window.requestIdleCallback
        : action => setTimeout(action, 1000)
      timeout(() => {
        Fingerprint.getPromise({
          excludes: { language: true, userAgent: true, enumerateDevices: true }
        })
          .then(data => {
            // console.log(JSON.stringify(data, '', 2))
            resolve(hashCode(JSON.stringify(data)))
          })
          .catch(reject)
      })
    })
  })
}
