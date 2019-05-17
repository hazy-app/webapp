<template>
  <div class="app-header">
    <a 
      v-if="!isHazyAppCom" 
      :href="hazyAppLink"
      class="fv-block fv-bg-danger fv-text-center fv-padding-start fv-padding-end top-alert">
      You are using old version of <b>Hazy</b>, switch to the new version by clicking here!
    </a>
    <div class="fv-flex">
      <div class="fv-grow fv-hidden-sm" />
      <div class="fv-col-md-8 fv-col-lg-6 fv-flex">
        <div class="fv-grow fv-dir-start">
          <h1 class="fv-font-xl">
            <img 
              class="logo"
              src="/hazy.svg" 
              alt="Hazy" >
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
        <span 
          v-if="$attrs.resetpw" 
          class="fv-margin-start" />
        <nuxt-link 
          v-if="$attrs.resetpw"
          :to="'/' + $route.params.username + '/reset-password?action=copy'"
          class="fv-link fv-text-danger">
          <i class="fa fa-edit"/> <span class="fv-hidden-xs"> Reset PW </span>
        </nuxt-link>
      </div>
      <div class="fv-grow fv-hidden-sm" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHazyAppCom: true,
      hazyAppLink: 'https://hazyapp.com'
    }
  },
  mounted() {
    if (
      window &&
      window.document &&
      (document.location.host !== 'hazyapp.com' &&
        document.location.host !== 'www.hazyapp.com')
    ) {
      this.isHazyAppCom = false
      this.hazyAppLink = document.location.href
        .replace(document.location.host, 'hazyapp.com')
        .replace('http://', 'https://')
    }
  },
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
  line-height: 2.6rem;
}
.top-alert {
  color: #fff;
}
.logo {
  vertical-align: middle;
  height: 2rem;
}
</style>
