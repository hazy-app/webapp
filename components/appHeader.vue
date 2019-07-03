<template>
  <fvHeader class="transparent header">
    <nuxt-link to="/">
      <appLogo class="logo"/>
    </nuxt-link>
    <div class="vertical-line fv-border-start" />
    <div class="fv-grow title">
      <h2> <slot name="title"/> </h2>
      <p class="fv-text-light"> <slot name="description"/> </p>
    </div>

    <appSearchButton />
    <a 
      class="fv-button" 
      @click="$store.commit('ui/openLoggedInUserPopup')">
      <appAccountLink 
        :username="$store.state.parsedToken.username || undefined" 
        :clickable="false"/>
    </a>
    <a 
      href="https://github.com/hazy-app"
      target="_blank"
      class="fv-button fv-hidden-xs fv-hidden-sm"> <i class="fa fa-github" /> Github </a>
  </fvHeader>
</template>

<script>
import appLogo from '~/components/appLogo.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAvatar from '~/components/appAvatar.vue'
import appAccountActionsLinks from '~/components/appAccountActionsLinks.vue'
import appSearchButton from '~/components/appSearchButton.vue'

export default {
  components: {
    appLogo,
    appAccountLink,
    appAvatar,
    appAccountActionsLinks,
    appSearchButton
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: transparent;

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
  & .fv-button {
    // padding: 0 0.7em;
    margin: 0 0 0 4px;
    min-width: 40px;
  }
}
</style>
