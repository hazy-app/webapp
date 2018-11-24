import Vue from 'vue'
import moment from 'moment'
import Modela from 'modela'
import appAlerts from '~/components/appAlerts.vue'

import appHeader from '~/components/appHeader.vue'
import appInnerContent from '~/components/appInnerContent.vue'
import appInput from '~/components/appInput.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appRecaptcha from '~/components/appRecaptcha.vue'

Vue.component('appHeader', appHeader)
Vue.component('appInnerContent', appInnerContent)
Vue.component('appInput', appInput)
Vue.component('appAccountLink', appAccountLink)
Vue.component('appRecaptcha', appRecaptcha)

Vue.filter('dateFromNow', date => {
  return moment(date).fromNow()
})
export default ({ app }, inject) => {
  inject('modela', (param = {}) => {
    return new Modela(param)
  })
  inject('alerts', new (Vue.extend(appAlerts))())
}
