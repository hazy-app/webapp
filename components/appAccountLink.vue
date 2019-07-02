<template>
  <a 
    v-if="clickable" 
    class="profile-link"
    @click="profileMenu = !profileMenu">
    @{{ username }}
    <fvMenu 
      v-model="profileMenu" 
      class="app-menu">
      <div class="fv-border-bottom fv-padding-sm fv-text-center fv-text-light fv-font-lg">
        <h2> <i class="fa fa-user-circle-o" /> </h2>
        <p> @{{ username }} </p>
      </div>
      <div class="fv-row">
        <div class="fv-col">
          <nuxt-link 
            :to="'/' + username" 
            class="fv-button fv-block"> <i class="fa fa-send" /> Send Message </nuxt-link>
        </div>
        <div class="fv-col">
          <nuxt-link 
            :to="'/' + username + '/messages'" 
            class="fv-button fv-block"> <i class="fa fa-inbox" /> Messages </nuxt-link>
        </div>
        <div class="fv-col">
          <nuxt-link 
            :to="'/' + username + '/polls'" 
            class="fv-button fv-block"> <i class="fa fa-check-circle-o" /> Polls </nuxt-link>
        </div>
      </div>
    </fvMenu>
  </a>
  <span 
    v-else 
    class="profile-link non-clickable"> @{{ username }} </span>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: 'anonymous'
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      profileMenu: false
    }
  },
  computed: {
    profileLink() {
      return `/${this.username}`
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-link {
  &:not(.non-clickable) {
    font-weight: bold;
  }
}
</style>
