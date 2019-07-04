<template>
  <div class="app-user-card fv-border">
    <div class="fv-padding">
      <nuxt-link :to="'/' + user.username">
        <h3 
          class="highlight" 
          v-html="user.highlighted" />
      </nuxt-link>
      <div>
        <label> Unique ID: </label> <span>{{ user._id }}</span>
      </div>
      <div>
        <label> Joined to Hazy since </label> <span :title="user.create_date | dateReadable">
          {{ user.create_date | dateFromNow }}
        </span>
      </div>
    </div>
    <div class="fv-border-top fv-row">
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + user.username" 
          class="fv-button fv-block"> <appIcon icon="send" /> Send Anonymous Message </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + user.username + '/messages'" 
          class="fv-button fv-block"> <appIcon icon="inbox" /> Messages </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + user.username + '/polls'" 
          class="fv-button fv-block"> <appIcon icon="check-square" /> Polls </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appIcon
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
