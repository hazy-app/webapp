<template>
  <div class="app-account-access-links">
    <div class="fv-padding-top fv-text-center fv-font-lg">
      <appAvatar 
        :username="username" 
        size="64px"/>
      <h3> {{ username }} </h3>
    </div>
    <div 
      class="fv-row">
      <div 
        v-if="username !== 'anonymous'" 
        class="fv-col" >
        <nuxt-link 
          :to="'/' + username" 
          class="fv-button fv-block"> <appIcon icon="user" /> View Profile </nuxt-link>
      </div>
      <div class="fv-col" >
        <nuxt-link 
          :to="'/sent-messages'" 
          class="fv-button fv-block"> <appIcon icon="lock" /> Sent Messages </nuxt-link>
      </div>
      <div 
        v-if="username === 'anonymous'" 
        class="fv-col">
        <nuxt-link 
          to="/register" 
          class="fv-button fv-block"> <appIcon icon="user-plus" /> Register </nuxt-link>
      </div>
      <div 
        v-if="username === 'anonymous'" 
        class="fv-col">
        <nuxt-link 
          to="/login" 
          class="fv-button fv-block"> <appIcon icon="log-in" /> Login </nuxt-link>
      </div>
      <div 
        v-if="username !== 'anonymous'" 
        class="fv-col">
        <a 
          class="fv-button fv-block"
          @click="logout"> <appIcon icon="log-out" /> Logout </a>
      </div>
    </div>
  </div>
</template>

<script>
import appAvatar from '@/components/appAvatar.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAvatar,
    appIcon
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
