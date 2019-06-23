<template>
  <nuxt-link 
    v-if="clickable" 
    :to="profileLink"
    class="profile-link">
    @{{ username }}
  </nuxt-link>
  <span 
    v-else 
    class="profile-link non-clickable"> @{{ username }} </span>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: 'anonymous'
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    profileLink() {
      return `/${this.username}`
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-link {
  &:not(.non-clickable) {
    font-weight: bold;
  }
}
</style>
