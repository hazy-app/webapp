<template>
  <fvMain>
    <fvContent>
      <appHeader
        :inbox="$store.state.parsedToken.username"
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"> Hazy </appHeader>
      <appInnerContent sm>
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
          <div class="logo-container__buttons">
            <a 
              href="https://github.com/hazy-app"
              class="fv-button"
              target="_blank"> <i class="fa fa-github" /> Github </a>
            <nuxt-link 
              v-if="!$store.state.parsedToken.username"
              to="/register"
              class="fv-button fv-primary"> <i class="fa fa-sign-in" /> Register </nuxt-link>
            <fvButton 
              v-if="$store.state.parsedToken.username"
              @click="$logout"> <i class="fa fa-sign-out" /> Logout </fvButton>
            <nuxt-link 
              v-if="!$store.state.parsedToken.username" 
              to="/login"
              class="fv-button"> <i class="fa fa-sign-in" /> Login </nuxt-link>
            <nuxt-link 
              v-if="$store.state.parsedToken.username" 
              :to="'/' + $store.state.parsedToken.username"
              class="fv-button fv-primary"> <i class="fa fa-inbox" /> Inbox </nuxt-link>
          </div>
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
export default {
  head() {
    return {
      title: 'Hazy - Send and Receive anonymous messages'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-container__logo {
  width: 300px;
  max-width: 100%;
  margin: 0 auto;
}

.logo-container__text {
  & > p {
    font-size: 1.4em;
  }
}

.logo-container__buttons > * {
  margin: 0.25em;
}
</style>
