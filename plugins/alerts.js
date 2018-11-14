import Vue from 'vue'
import appAlerts from '~/components/appAlerts.vue'

Vue.prototype.$alerts = new (Vue.extend(appAlerts))()
Vue.alerts = Vue.prototype.$alerts
