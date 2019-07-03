<template>
  <div>
    <div class="fv-border-bottom fv-padding-sm fv-text-center fv-text-light fv-font-lg">
      <appAvatar 
        :username="username" 
        size="48px"/>
      <p> @{{ username }} </p>
    </div>
    <div 
      v-if="username !== 'anonymous'" 
      class="fv-row">
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username" 
          exact-active-class="fv-disabled"
          class="fv-button fv-block"> <i class="fa fa-send" /> Send Message </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/messages'" 
          exact-active-class="fv-disabled"
          class="fv-button fv-block"> <i class="fa fa-inbox" /> Inbox </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/polls'" 
          exact-active-class="fv-disabled"
          class="fv-button fv-block"> <i class="fa fa-check-circle-o" /> Polls </nuxt-link>
      </div>
    </div>
    <div 
      v-else 
      class="fv-padding">
      We don't have any data from this person.
    </div>
  </div>
</template>

<script>
import appAvatar from '@/components/appAvatar.vue'

export default {
  components: {
    appAvatar
  },
  props: {
    username: {
      type: String,
      default: ''
    }
  }
}
</script>
