<template>
  <fvMain>
    <fvContent>
      <appHeader>
        <template slot="title"> Hazy </template>
      </appHeader>
      <appInnerContent 
        class="fv-padding-sm fv-text-center" 
        xs>
        <div class="fv-text-center logo-container">
          <img 
            class="logo-container__logo"
            src="/hazy.svg" 
            alt="Hazy" >
          <div class="logo-container__text">
            <h2> Hazy </h2>
            <p> Send and Receive anonymous messages </p>
          </div>
          <br>
          <div class="logo-container__buttons fv-row">
            <a 
              href="https://github.com/hazy-app"
              class="fv-button fv-col"
              target="_blank"> <i class="fa fa-github" /> Github </a>
            <nuxt-link 
              to="/sent-messages"
              class="fv-button fv-col"> <i class="fa fa-commenting-o" /> Sent Messages </nuxt-link>
            <nuxt-link 
              v-if="!$store.state.parsedToken.username" 
              to="/login"
              class="fv-button fv-col"> <i class="fa fa-sign-in" /> Login </nuxt-link>
            <fvButton 
              v-if="$store.state.parsedToken.username"
              @click="$logout"> <i class="fa fa-sign-out" /> Logout </fvButton>
            <nuxt-link 
              v-if="!$store.state.parsedToken.username"
              to="/register"
              class="fv-button fv-primary fv-col"> <i class="fa fa-user-plus" /> Register </nuxt-link>
            <nuxt-link 
              v-if="$store.state.parsedToken.username" 
              :to="'/' + $store.state.parsedToken.username + '/messages'"
              class="fv-button fv-primary fv-col"> <i class="fa fa-inbox" /> Inbox </nuxt-link>
          </div>
        </div>
        <!-- <div class="fv-padding-top fv-padding-bottom"/>
        <div class="fv-text-center fv-padding-start fv-padding-end fv-border fv-radius fv-shadow report-container">
          <span class="fv-inline-block">
            <div class="fv-padding">
              <h2><appNumberBanner :number="report.total_users"/></h2>
              <p>Users</p>
            </div>
          </span>
          <span class="fv-inline-block">
            <div class="fv-padding">
              <h2><appNumberBanner :number="report.total_messages"/></h2>
              <p>Messages</p>
            </div>
          </span>
        </div> -->
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
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: 'Send and Receive anonymous messages'
        }
      ]
    }
  }
  // async asyncData({ params, query, store, $axios, redirect }) {
  //   const ret = {}
  //   try {
  //     ret.report = await $axios.$get(`${process.env.BASE_URL}/report`)
  //   } catch (e) {
  //     ret.report = {
  //       total_messages: undefined,
  //       total_users: undefined
  //     }
  //   }
  //   return ret
  // }
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

.report-container {
  max-width: calc(100% - 1.5em);
  margin: 0 auto;
}
</style>
