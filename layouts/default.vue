<template>
  <div id="app-layout-wrapper">
    <fvMain>
      <fvContent>
        <appHeader :hide-back-button="$store.state.ui.hideBackButton">
          <template slot="title"> {{ $store.state.ui.headerTitle }} </template>
          <template 
            v-if="$store.state.ui.headerDescription" 
            slot="description"> {{ $store.state.ui.headerDescription }} </template>
        </appHeader>
        <nuxt/>
        <fvFooter class="transparent fv-text-center fv-margin-top fv-font-sm fv-no-border">
          Licenced over <b>GPL v2</b>, Deployed on <a 
            href="https://fandogh.cloud" 
            target="_blank">
            <b> <appIcon icon="fandogh" /> Fandogh</b>
          </a>, Maintained using <a 
            class="fv-link"
            href="https://github.com" 
            target="_blank">
            <b> <appIcon icon="github" /> Github</b>
          </a>.
          <br>
          Copyright © 2018 by <b>Amir Momenian</b>, All rights reserved.
        </fvFooter>
      </fvContent>
    </fvMain>
    <fvMenu 
      :value="$store.state.ui.userPopup"
      class="app-menu app-user-profile-popup" 
      @input="$store.commit('ui/closeUserPopup')"
      @click.native="$store.commit('ui/closeUserPopup')">
      <appAccountAccessLinks :username="$store.state.ui.userPopupData" />
    </fvMenu>
    <fvMenu 
      :value="$store.state.ui.loggedInUserPopup"
      class="app-menu"
      @input="$store.commit('ui/closeLoggedInUserPopup')"
      @click.native="$store.commit('ui/closeLoggedInUserPopup')">
      <appAccountActionsLinks :username="$store.state.parsedToken.username || undefined" />
    </fvMenu>
    <fvDialog 
      :value="$store.state.ui.avatarChangerModal" 
      class="fv-col-sm-12 fv-col-md-8 fv-col-lg-6 fv-col-xl-4"
      @input="$store.commit('ui/closeAvatarChangerModal')">
      <appAvatarChanger 
        :username="$store.state.parsedToken.username || undefined" 
        @changed="$store.commit('ui/closeAvatarChangerModal')"/>
    </fvDialog>
  </div>
</template>

<script>
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appAccountActionsLinks from '@/components/appAccountActionsLinks.vue'
import appAvatarChanger from '@/components/appAvatarChanger.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountAccessLinks,
    appAccountActionsLinks,
    appAvatarChanger,
    appIcon
  }
}
</script>

<style lang="scss">
html,
body,
#__nuxt,
#__layout,
#app-layout-wrapper {
  min-height: 100%;
  height: 100%;
  line-height: 1.9;
  font-size: 15px;
  font-family: 'Source Sans Pro', sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: 'Lobster', sans-serif;
}

h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.3em;
}
h4 {
  font-size: 1.2em;
}
h5 {
  font-size: 1em;
}

.fv-main {
  overflow: unset !important;
}
.fv-content {
  display: block !important;
}
.app-menu {
  min-width: 230px;
  width: 230px;
}

.fv-button {
  &.link-active {
    border-color: #000;
    color: #000;

    &:hover {
      background-color: #fff;
    }
  }
}
</style>
