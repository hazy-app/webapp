import Vue from 'vue'
import timeago from 'timeago.js'
import { getPromise as getFingerprint } from 'fingerprintjs2'
import appAlerts from '~/components/appAlerts.vue'
import appHeader from '~/components/appHeader.vue'
import appInnerContent from '~/components/appInnerContent.vue'
import appInput from '~/components/appInput.vue'
import appRecaptcha from '~/components/appRecaptcha.vue'
import appMessageSender from '~/components/appMessageSender.vue'
import md5 from '~/utils/md5.js'

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

// from https://stackoverflow.com/a/8831937
function hashCode(str) {
  var hash = 0
  if (str.length == 0) {
    return hash
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

export default ({ app, store, router }, inject) => {
  inject('eventBus', new Vue())

  inject('alerts', new (Vue.extend(appAlerts))())

  inject('md5', md5)

  inject('hashCode', hashCode)

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
    return new Promise((resolve, reject) => {
      const timeout = window.requestIdleCallback
        ? window.requestIdleCallback
        : action => setTimeout(action, 500)
      timeout(() => {
        getFingerprint({
          excludes: { language: true, userAgent: true, enumerateDevices: true }
        })
          .then(data => {
            resolve(hashCode(JSON.stringify(data)).toString())
          })
          .catch(reject)
      })
    })
  })
}
