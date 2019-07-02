<template>
  <span>
    <a 
      :class="{'non-clickable': !clickable}"
      :tabindex="clickable ? 0 : -1"
      class="profile-link"
      @click="onClick">
      @{{ username }}
    </a>
    <fvMenu 
      v-if="isMounted"
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
  </span>
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
      profileMenu: false,
      isMounted: false
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    onClick() {
      if (this.clickable) {
        this.profileMenu = !this.profileMenu
      }
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
