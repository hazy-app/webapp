<template>
  <fvMain>
    <fvContent>
      <appHeader
        :inbox="$store.state.parsedToken.username"
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"> Hazy </appHeader>
      <appInnerContent sm>
        <div class="fv-text-center fv-padding-sm logo-container">
          <img 
            class="logo-container__logo"
            src="/hazy.svg" 
            alt="Hazy" >
          <div class="logo-container__text">
            <h2> Hazy </h2>
            <p> Send and Receive anonymous messages </p>
          </div>
          <br>
          <div class="logo-container__buttons">
            <a 
              href="https://github.com/hazy-app"
              class="fv-button"
              target="_blank"> <i class="fa fa-github" /> Github </a>
            <nuxt-link 
              v-if="!$store.state.parsedToken.username" 
              to="/login"
              class="fv-button"> <i class="fa fa-sign-in" /> Login </nuxt-link>
            <fvButton 
              v-if="$store.state.parsedToken.username"
              @click="$logout"> <i class="fa fa-sign-out" /> Logout </fvButton>
            <nuxt-link 
              v-if="!$store.state.parsedToken.username"
              to="/register"
              class="fv-button fv-primary"> <i class="fa fa-sign-in" /> Register </nuxt-link>
            <nuxt-link 
              v-if="$store.state.parsedToken.username" 
              :to="'/' + $store.state.parsedToken.username"
              class="fv-button fv-primary"> <i class="fa fa-inbox" /> Inbox </nuxt-link>
          </div>
        </div>
        <div class="fv-padding-top fv-padding-bottom"/>
        <div class="fv-flex fv-text-center fv-margin-sm fv-border fv-radius fv-shadow">
          <div class="fv-grow">
            <div class="fv-padding">
              <h2><appNumberBanner :number="report.total_users"/></h2>
              <p>Users</p>
            </div>
          </div>
          <div class="fv-grow fv-border-start">
            <div class="fv-padding">
              <h2><appNumberBanner :number="report.total_messages"/></h2>
              <p>Messages</p>
            </div>
          </div>
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import appNumberBanner from '~/components/appNumberBanner.vue'

export default {
  components: {
    appNumberBanner
  },
  data() {
    return {
      report: {}
    }
  },
  head() {
    return {
      title: 'Hazy'
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    try {
      ret.report = await $axios.$get(`${process.env.BASE_URL}/report`)
    } catch (e) {
      ret.report = {
        total_messages: undefined,
        total_users: undefined
      }
    }
    return ret
  }
}
</script>

<style lang="scss" scoped>
.logo-container__logo {
  height: 300px;
  max-width: 100%;
  margin: 0 auto;
}

.logo-container__text {
  & > p {
    font-size: 1.3em;
  }
}

.logo-container__buttons > * {
  margin: 0.25em;
}

.report-container__box {
  margin: 0.25em;
}
</style>
