<template>
  <a 
    :class="{'non-clickable': !clickable}"
    :tabindex="clickable ? 0 : -1"
    class="profile-link"
    @click="onClick">
    <appAvatar 
      :username="username" 
      size="18px" /> <span class="fv-hidden-xs fv-hidden-sm"> {{ username }} </span>
  </a>
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
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClick() {
      if (this.clickable) {
        this.$store.commit('ui/openUserPopup', this.username)
      }
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
