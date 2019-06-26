<template>
  <fvHeader class="transparent header">

    <appLogo class="logo"/>
    <div class="vertical-line fv-border-start" />
    <div class="fv-grow title">
      <h2> <slot name="title"/> </h2>
      <p class="fv-text-light"> <slot name="description"/> </p>
    </div>

    <a 
      :class="{'searching': searchQuery !== null, 'link-active': $route.name === 'search-query' }"
      class="fv-button"
      tabindex="0"
      @click="enterSearch"> <i class="fa fa-search" /> <span 
        v-if="searchQuery === null" 
        ref="searchBox"
        class="fv-hidden-sm fv-hidden-xs"> Search </span><input 
          v-else 
          ref="searchBox"
          v-model="searchQuery"
          placeholder="Start typing" 
          class="search-query" 
          minlength="3"
          size="5"
          @blur="cancelSearch"
          @keyup.enter="startSearch"> </a>
    <div class="fv-hidden-xs fv-hidden-sm">
      <nuxt-link 
        v-if="!!$store.state.parsedToken.username" 
        :to="'/'+$store.state.parsedToken.username+'/messages'"
        active-class="link-active"
        class="fv-button"> <i class="fa fa-inbox" /> Inbox </nuxt-link>
      <nuxt-link 
        v-if="!!$store.state.parsedToken.username" 
        :to="'/'+$store.state.parsedToken.username+'/polls'"
        active-class="link-active"
        class="fv-button" 
        disabled> <i class="fa fa-check-circle-o" /> Polls </nuxt-link>
      <nuxt-link 
        to="/sent-messages"
        active-class="link-active"
        class="fv-button"> <i class="fa fa-commenting-o" /> Sent Messages </nuxt-link>
      <a 
        href="https://github.com/hazy-app"
        target="_blank"
        class="fv-button"> <i class="fa fa-github" /> Github </a>
      <nuxt-link 
        v-if="!$store.state.parsedToken.username" 
        active-class="link-active"
        to="/register"
        class="fv-button"> <i class="fa fa-user-plus" /> Register </nuxt-link>
      <nuxt-link 
        v-if="!$store.state.parsedToken.username" 
        active-class="link-active"
        to="/login"
        class="fv-button"> <i class="fa fa-sign-in" /> Login </nuxt-link>
      <a 
        v-if="!!$store.state.parsedToken.username" 
        class="fv-button"
        @click="logout"> <i class="fa fa-sign-out" /> Logout </a>
    </div>
    <div class="fv-hidden-md fv-hidden-lg fv-hidden-xl">
      <fvButton @click="menu = !menu"> <i class="fa fa-bars" /> </fvButton>
    </div>
    <fvMenu 
      v-model="menu"
      class="menu">
      <fvList 
        parent 
        autofocus>
        <fvListItem 
          v-if="!!$store.state.parsedToken.username" 
          @click="$router.push('/'+$store.state.parsedToken.username+'/messages')"> <i class="fa fa-inbox" /> Inbox </fvListItem>
        <fvListItem 
          v-if="!!$store.state.parsedToken.username" 
          disabled
          @click="$router.push('/'+$store.state.parsedToken.username+'/polls')"> <i class="fa fa-check-circle-o" /> Polls </fvListItem>
        <fvListItem @click="$router.push('/sent-messages')"> <i class="fa fa-commenting-o" /> Sent Messages </fvListItem>
        <fvListItem @click="goToUrl('https://github.com/hazy-app/api')"> <i class="fa fa-github" /> Github </fvListItem>
        <fvListItem 
          v-if="!$store.state.parsedToken.username" 
          @click="$router.push('/register')"> <i class="fa fa-user-plus" /> Register </fvListItem>
        <fvListItem 
          v-if="!$store.state.parsedToken.username" 
          @click="$router.push('/login')"> <i class="fa fa-sign-in" /> Login </fvListItem>
        <fvListItem 
          v-if="!!$store.state.parsedToken.username" 
          @click="menu = false; logout()"> <i class="fa fa-sign-out" /> Logout </fvListItem>
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
      menu: false,
      searchQuery: null
    }
  },
  methods: {
    async logout() {
      const x = await this.$logout()
      if (x) {
        this.$router.push('/login')
      }
      this.accountMenu = false
    },
    enterSearch() {
      this.searchQuery = ''
      this.$nextTick(() => {
        this.$refs.searchBox.focus()
      })
    },
    cancelSearch() {
      this.searchQuery = null
    },
    startSearch() {
      this.$router.push(`/search/${this.searchQuery}`)
    },
    goToUrl(url) {
      const win = window.open(url, '_blank')
      win.focus()
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
  & .searching {
    background: #f5f5f5;
    @media screen {
    }
  }
  & .search-query {
    border: none;
    box-shadow: none;
    background: transparent;
  }
  & .fv-button {
    border: none !important;
    box-shadow: none !important;
    padding: 0 0.7em;
    margin: 0 1px;

    &.link-active {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-bottom: solid 2px #000 !important;
    }
  }
}
</style>
