<template>
  <div class="app-account-access-links">
    <div class="fv-padding-top fv-text-center fv-font-lg">
      <appAvatar 
        :username="username" 
        size="64px"/>
      <b class="fv-block"> {{ username }} </b>
    </div>
    <div 
      v-if="!onlyProfile && username !== 'anonymous'" 
      class="fv-row">
      <div 
        class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/questions'" 
          exact-active-class="link-active"
          class="fv-button fv-block"> <appIcon icon="message-square" /> Questions </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/polls'" 
          exact-active-class="link-active"
          class="fv-button fv-block"> <appIcon icon="check-square" /> Polls </nuxt-link>
      </div>
    </div>
    <div 
      v-else-if="onlyProfile && username !== 'anonymous'" 
      class="fv-row">
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username" 
          exact-active-class="link-active"
          class="fv-button fv-block"> <appIcon icon="user" />View Profile </nuxt-link>
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
    },
    onlyProfile: {
      type: Boolean,
      default: false
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
