<template>
  <fvHeader class="transparent header">
    <a 
      href="#"
      class="fv-button fv-margin-end"
      @click="$router.go(-1)"> <appIcon icon="chevron-left" /> <span class="fv-hidden-sm fv-hidden-xs"> Back </span> </a>
    <nuxt-link to="/">
      <appLogo class="logo"/>
    </nuxt-link>
    <div class="vertical-line fv-border-start" />
    <div class="fv-grow title">
      <h2> <slot name="title"/> </h2>
      <p class="fv-text-light fv-hidden-xs"> <slot name="description"/> </p>
    </div>

    <appSearchButton />

    <appAccountLink
      :username="$store.state.parsedToken.username || undefined"
      :clickable="false" 
      class="fv-button"
      @click.native="$store.commit('ui/openLoggedInUserPopup')">
      <appIcon 
        icon="chevron-down" 
        class="fv-hidden-xs fv-hidden-sm" />
    </appAccountLink>

    <a 
      href="https://github.com/hazy-app"
      target="_blank"
      rel="noreferrer"
      class="fv-button fv-hidden-xs fv-hidden-sm"> <appIcon icon="github" /> Github </a>
  </fvHeader>
</template>

<script>
import appLogo from '~/components/appLogo.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAvatar from '~/components/appAvatar.vue'
import appAccountActionsLinks from '~/components/appAccountActionsLinks.vue'
import appSearchButton from '~/components/appSearchButton.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appLogo,
    appAccountLink,
    appAvatar,
    appAccountActionsLinks,
    appSearchButton,
    appIcon
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: transparent;

  & /deep/ header {
    padding: 0.4em;

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
      margin: 0 0 0 4px;
      min-width: 40px;
      @media screen and (max-width: 768px) {
        border: 0 !important;
        padding-left: 0.1em !important;
        padding-right: 0.1em !important;
        &.search-btn.searching {
          padding-left: 0.5em !important;
        }
      }
    }
  }
}
</style>
