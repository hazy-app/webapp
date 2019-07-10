<template>
  <appInnerContent 
    class="fv-padding-sm fv-text-center" 
    xs>
    <div class="fv-text-center logo-container">
      <img 
        class="logo-container__logo"
        src="/hazy.svg" 
        alt="Hazy" >
      <div class="logo-container__text">
        <h1> Hazy </h1>
        <p> Send and Receive anonymous messages </p>
      </div>
      <br>
      <div class="logo-container__buttons fv-row">
        <a 
          href="https://github.com/hazy-app"
          class="fv-button fv-col"
          rel="noreferrer"
          target="_blank"> <appIcon icon="github" /> Github </a>
        <nuxt-link 
          to="/sent-messages"
          class="fv-button fv-col"> <appIcon icon="lock" /> Sent Messages </nuxt-link>
        <nuxt-link 
          v-if="!$store.state.parsedToken.username" 
          to="/login"
          class="fv-button fv-col"> <appIcon icon="log-in" /> Login </nuxt-link>
        <fvButton 
          v-if="$store.state.parsedToken.username"
          @click="$logout"> <appIcon icon="log-out" /> Logout </fvButton>
        <nuxt-link 
          v-if="!$store.state.parsedToken.username"
          to="/register"
          class="fv-button fv-primary fv-col"> <appIcon icon="user-plus" /> Register </nuxt-link>
        <nuxt-link 
          v-if="$store.state.parsedToken.username" 
          :to="'/' + $store.state.parsedToken.username"
          class="fv-button fv-primary fv-col"> <appIcon icon="user" /> My Profile </nuxt-link>
      </div>
    </div>
  </appInnerContent>
</template>

<script>
import twitterCard from '~/utils/twitter-card.js'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  },
  data() {
    return {
      report: {}
    }
  },
  head() {
    return twitterCard(
      undefined,
      undefined,
      'Send and Receive anonymous messages',
      `Hazy`
    )
  },
  asyncData({ store }) {
    store.commit('ui/setHeader', {
      title: 'Hazy',
      description: 'Send and Receive anonymous messages'
    })
  }
}
</script>

<style lang="scss" scoped>
.logo-container__logo {
  height: 340px;
  // max-width: 290px;
  margin: 0 auto -20px auto;
}

.logo-container__text {
  line-height: 1.2;

  & > h1 {
    font-size: 3.5em;
    margin: 0;
    padding: 0;
  }
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
