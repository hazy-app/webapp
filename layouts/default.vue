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
      <div class="fv-border-bottom fv-padding-sm fv-text-center fv-text-light fv-font-lg">
        <h2> <i 
          :class="$store.state.ui.userPopupData === 'anonymous' ? 'fa-user-secret' : 'fa-user'" 
          class="fa" /> </h2>
        <p> @{{ $store.state.ui.userPopupData }} </p>
      </div>
      <appAccountAccessLinks 
        v-if="$store.state.ui.userPopupData !== 'anonymous'" 
        :username="$store.state.ui.userPopupData" />
      <div 
        v-else 
        class="fv-padding">
        We don't have any data from this person.
      </div>
    </fvMenu>
  </div>
</template>

<script>
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
export default {
  components: {
    appAccountAccessLinks
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
  font-family: 'Quicksand', sans-serif;
}
/* h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: 'Lobster', cursive;
  } */
h1 {
  font-size: 2.5em;
}
h2 {
  font-size: 1.8em;
}
h3 {
  font-size: 1.6em;
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
</style>
