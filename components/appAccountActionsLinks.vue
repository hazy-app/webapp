<template>
  <div class="app-account-access-links">
    <div class="fv-border-bottom fv-padding fv-text-center fv-font-lg">
      <appAvatar 
        :username="username" 
        size="48px"/>
      <b class="fv-block"> {{ username }} </b>
    </div>
    <div 
      class="fv-row">
      <div 
        v-if="username !== 'anonymous'" 
        class="fv-col" >
        <nuxt-link 
          :to="'/' + username + '/messages'" 
          class="fv-button fv-block"> <i class="fa fa-user-circle" /> View Profile </nuxt-link>
      </div>
      <div class="fv-col" >
        <nuxt-link 
          :to="'/sent-messages'" 
          class="fv-button fv-block"> <i class="fa fa-user-secret" /> Sent Messages </nuxt-link>
      </div>
      <div 
        v-if="username === 'anonymous'" 
        class="fv-col">
        <nuxt-link 
          to="/register" 
          class="fv-button fv-block"> <i class="fa fa-user-plus" /> Register </nuxt-link>
      </div>
      <div 
        v-if="username === 'anonymous'" 
        class="fv-col">
        <nuxt-link 
          to="/login" 
          class="fv-button fv-block"> <i class="fa fa-sign-in" /> Login </nuxt-link>
      </div>
      <div 
        v-if="username !== 'anonymous'" 
        class="fv-col">
        <a 
          class="fv-button fv-block"
          @click="logout"> <i class="fa fa-sign-out" /> Logout </a>
      </div>
    </div>
  </div>
</template>

<script>
import appAvatar from '@/components/appAvatar.vue'

export default {
  components: {
    appAvatar
  },
  props: {
    username: {
      type: String,
      default: 'anonymous'
    }
  },
  methods: {
    async logout() {
      const x = await this.$logout()
      if (x) {
        this.$router.push('/login')
      }
    }
  }
}
</script>
