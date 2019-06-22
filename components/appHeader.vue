<template>
  <!-- <div class="app-header">
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
  </div> -->
  <fvHeader class="transparent header">
    <!-- <fvButton> Another Button </fvButton> -->
    <!-- <span class="fv-padding-start" /> -->
    <appLogo class="logo fv-hidden-xs"/>
    <div class="vertical-line fv-border-start fv-hidden-xs" />
    <div class="fv-grow title">
      <h2> <slot name="title"/> </h2>
      <p class="fv-text-light"> <slot name="description"/> </p>
    </div>
    <span class="fv-padding-start" />
    <fvButton
      v-if="!!$store.state.parsedToken.username"
      class="fv-primary"
      @click="accountMenu = true"> <i class="fa fa-user" /> <span class="fv-hidden-sm fv-hidden-xs"> <appAccountLink :username="$store.state.parsedToken.username" /> <i class="fa fa-chevron-down" /> </span> </fvButton>
    <nuxt-link 
      v-else 
      to="/register"
      class="fv-button fv-primary"> <i class="fa fa-sign-in" /> <span class="fv-hidden-sm fv-hidden-xs"> Register / Login </span> </nuxt-link>
    <span class="fv-padding-start" />
    <fvButton @click="quickAccessMenu = true"> <i class="fa fa-ellipsis-v" /> <span class="fv-hidden-sm fv-hidden-xs"> Quick Access <i class="fa fa-chevron-down" /> </span> </fvButton>
    <fvMenu 
      v-model="quickAccessMenu" 
      class="app-menu">
      <fvList 
        parent 
        autofocus>
        <fvListItem> <i class="fa fa-home" /> Home </fvListItem>
        <fvListItem> <i class="fa fa-commenting-o" /> Sent Messages </fvListItem>
        <fvListItem> <i class="fa fa-github" /> Server-Code Github </fvListItem>
        <fvListItem> <i class="fa fa-github" /> UI-Code Github </fvListItem>
      </fvList>
    </fvMenu>
    <fvMenu 
      v-model="accountMenu" 
      class="app-menu">
      <fvList 
        parent 
        autofocus>
        <fvListItem> <i class="fa fa-inbox" /> Inbox </fvListItem>
        <fvListItem> <i class="fa fa-sign-out" /> Logout </fvListItem>
      </fvList>
    </fvMenu>
  </fvHeader>
</template>

<script>
import appLogo from '~/components/appLogo.vue'
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appLogo,
    appAccountLink
  },
  data() {
    return {
      quickAccessMenu: false,
      accountMenu: false,
      isHazyAppCom: true,
      hazyAppLink: 'https://hazyapp.com'
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
.header {
  & > /deep/ header {
    padding: 0.4em 1em;
  }
  & .vertical-line {
    margin: 0 10px 0 4px;
    height: 2.5em;
    width: 1px;
  }
  & .title {
    line-height: 1.3;

    & > p {
      font-size: 0.9em;
    }
  }
}
</style>
