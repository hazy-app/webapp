<template>
  <fvHeader class="transparent">
    <div class="fv-grow fv-dir-start">
      <h1 class="fv-font-xl">
        <slot />
      </h1>
    </div>    
    <span
      v-if="$attrs.myMessages" 
      class="fv-margin-start"/>
    <nuxt-link 
      v-if="$attrs['my-messages']"
      to="/messages"
      class="fv-link">
      <i class="fa fa-comments-o"/> My Messages
    </nuxt-link >
    <span 
      v-if="$attrs.logout || $attrs.login" 
      class="fv-margin-start" />
    <a 
      v-if="$attrs.logout"
      class="fv-link"
      @click="logout">
      <i class="fa fa-sign-out"/> Logout
    </a>
    <nuxt-link 
      v-if="$attrs.login"
      to="login"
      class="fv-link">
      <i class="fa fa-sign-in"/> Login / Reqister
    </nuxt-link>
  </fvHeader>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    async logout() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to leave Hazy?'
      )
      if (check) {
        await this.$store.dispatch('logout')
      }
    }
  }
}
</script>
