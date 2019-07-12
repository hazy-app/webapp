<template>
  <nuxt-link 
    :to="selfLink" 
    class="fv-padding fv-text-center fv-font-xl fv-block">
    <appAvatar 
      :username="username" 
      size="128px"/>
    <h3 > {{ username }} </h3>
  </nuxt-link>
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
      default: ''
    },
    onlyProfile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMine() {
      return (
        this.$store.state.parsedToken.username &&
        this.username === this.$store.state.parsedToken.username
      )
    },
    selfLink() {
      return this.username !== 'anonymous' ? `/${this.username}` : '/'
    }
  }
}
</script>
