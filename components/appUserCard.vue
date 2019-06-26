<template>
  <div class="app-user-card fv-border fv-radius fv-shadow">
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
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
