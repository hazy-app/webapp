<template>
  <a 
    :class="{'non-clickable': !clickable}"
    :tabindex="clickable ? 0 : -1"
    class="profile-link"
    @click="onClick">
    <i 
      :class="username === 'anonymous' ? 'fa-user-secret' : 'fa-user'" 
      class="fa" /> @{{ username }}
  </a>
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
  methods: {
    onClick() {
      this.$store.commit('ui/openUserPopup', this.username)
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
