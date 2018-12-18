<template>
  <div class="app-header">
    <div class="fv-flex">
      <div class="fv-grow fv-hidden-sm" />
      <div class="fv-col-md-8 fv-col-lg-6 fv-flex">
        <div class="fv-grow fv-dir-start">
          <h1 class="fv-font-xl">
            <slot />
          </h1>
        </div>
        <span 
          v-if="$attrs.home" 
          class="fv-margin-start" />
        <nuxt-link 
          v-if="$attrs.home"
          to="/"
          class="fv-link">
          <i class="fa fa-home"/> <span class="fv-hidden-xs"> Home </span>
        </nuxt-link>
        <span 
          v-if="$attrs.inbox" 
          class="fv-margin-start" />
        <nuxt-link 
          v-if="$attrs.inbox"
          :to="'/' + $store.state.parsedToken.username"
          class="fv-link">
          <i class="fa fa-inbox"/> <span class="fv-hidden-xs"> Inbox </span>
        </nuxt-link>
        <span 
          v-if="$attrs.logout || $attrs.login || $attrs.profile" 
          class="fv-margin-start" />
        <a 
          v-if="$attrs.logout"
          class="fv-link"
          @click="logout">
          <i class="fa fa-sign-out"/> <span class="fv-hidden-xs"> Logout </span>
        </a>
        <nuxt-link 
          v-if="$attrs.login"
          to="/login"
          class="fv-link">
          <i class="fa fa-sign-in"/> <span class="fv-hidden-xs"> Enter </span>
        </nuxt-link>
      </div>
      <div class="fv-grow fv-hidden-sm" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 4rem;
  max-height: 4rem;
  min-height: 4rem;
  line-height: 2.6rem;
}
</style>
