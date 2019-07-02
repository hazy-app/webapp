<template>
  <div>
    <div class="fv-row">
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username" 
          exact-active-class="fv-disabled"
          class="fv-button fv-block"> <i class="fa fa-send" /> Send Message {{ mention ? 'to ' + mentionText : '' }} </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/messages'" 
          exact-active-class="fv-disabled"
          class="fv-button fv-block"> <i class="fa fa-inbox" /> {{ mentionText }} Inbox </nuxt-link>
      </div>
      <div class="fv-col">
        <nuxt-link 
          :to="'/' + username + '/polls'" 
          exact-active-class="fv-disabled"
          class="fv-button fv-block"> <i class="fa fa-check-circle-o" /> {{ mentionText }} Polls </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: ''
    },
    mention: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mentionText() {
      if (this.mention) {
        return `@${this.username}`
      }
    }
  }
}
</script>
