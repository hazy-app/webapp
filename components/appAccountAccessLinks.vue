<template>
  <div class="app-account-access-links">
    <div class="fv-border-bottom fv-padding fv-text-center fv-font-lg">
      <appAvatar 
        :username="username" 
        size="54px"/>
      <b class="fv-block"> {{ username }} </b>
    </div>
    <div 
      v-if="username !== 'anonymous'" 
      class="fv-row">
      <div 
        v-if="!isMine" 
        class="fv-col">
        <nuxt-link 
          :to="'/' + username" 
          exact-active-class="link-active"
          class="fv-button fv-block"> <appIcon icon="send" /> Send Message </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/messages'" 
          exact-active-class="link-active"
          class="fv-button fv-block"> <appIcon icon="inbox" /> Messages </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/polls'" 
          exact-active-class="link-active"
          class="fv-button fv-block"> <appIcon icon="check-square" /> Polls </nuxt-link>
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
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAvatar,
    appIcon
  },
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  computed: {
    isMine() {
      return (
        this.$store.state.parsedToken.username &&
        this.username === this.$store.state.parsedToken.username
      )
    }
  }
}
</script>
