import Vue from 'vue'

import appHeader from '~/components/appHeader.vue'
import appSidebar from '~/components/appSidebar.vue'
import appInnerContent from '~/components/appInnerContent.vue'
import appInput from '~/components/appInput.vue'
import appUserLink from '~/components/appUserLink.vue'
Vue.component('appHeader', appHeader)
Vue.component('appSidebar', appSidebar)
Vue.component('appInnerContent', appInnerContent)
Vue.component('appInput', appInput)
Vue.component('appUserLink', appUserLink)

Vue.prototype.$getFileUrl = Vue.getFileUrl = src => {
  if (src.indexOf('http') === 0) {
    return src.trim()
  }
  return `${process.env.filemanagerUrl}/v3/${src.trim()}`
}
