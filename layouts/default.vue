<template>
  <div id="app-layout-wrapper">
    <fvMain>
      <fvContent>
        <appHeader>
          <template slot="title"> {{ $store.state.ui.headerTitle }} </template>
          <template 
            v-if="$store.state.ui.headerDescription" 
            slot="description"> {{ $store.state.ui.headerDescription }} </template>
        </appHeader>
        <nuxt/>
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
  </div>
</template>

<script>
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appAccountActionsLinks from '@/components/appAccountActionsLinks.vue'

export default {
  components: {
    appAccountAccessLinks,
    appAccountActionsLinks
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
  line-height: 1.5;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
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
  min-width: 200px;
  width: 200px;
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
