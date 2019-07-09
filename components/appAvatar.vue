<template>
  <fvAvatar 
    :name="username"
    :src="avatarUrl"
    :size="size" 
    :style="{ backgroundColor: bgColor }"
    :class="{ anonymous: username === 'anonymous'}"
    class="app-avatar square" />

</template>

<script>
export default {
  props: {
    username: {
      type: String,
      default: 'anonymous'
    },
    avatar: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: '48px'
    }
  },
  data() {
    return {
      u:
        this.$store.state.ui.avatarsCustomRefreshHash[this.username] ||
        'default'
    }
  },
  computed: {
    bgColor() {
      if (this.username !== 'anonymous') {
        return this.calcColor(this.username)
      }
      return '#444'
    },
    avatarUrl() {
      if (this.avatar) {
        return `https://www.gravatar.com/avatar/${this.avatar}?size=${parseInt(
          this.size
        )}`
      } else if (this.username && this.username !== 'anonymous') {
        return `${process.env.BASE_URL}/users/${
          this.username
        }/avatar.jpg?size=${parseInt(this.size)}&u=${this.u}`
      }
    }
  },
  created() {
    this.$eventBus.$on('avatarChange', this.onChange)
  },
  beforeDestroy() {
    this.$eventBus.$off('avatarChange', this.onChange)
  },
  methods: {
    calcColor(str) {
      const ascii = str.charCodeAt(0) % 256
      const ascii2 = str.charCodeAt(1) % 256
      const section = str.charCodeAt(str.length - 1) % 3
      const section2 = str.charCodeAt(str.length - 2) % 3
      const arr = new Array(3).fill(197)
      arr[section] = ascii
      arr[section2] = ascii2
      return `rgba(${arr.join(',')}, 0.5)`
    },
    onChange(user) {
      if (user === this.username) {
        this.u =
          this.$store.state.ui.avatarsCustomRefreshHash[this.username] ||
          'default'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-avatar {
  & /deep/ .text {
    font-weight: normal;
  }

  &.anonymous {
    & /deep/ .text {
      display: none;
    }
  }
}
</style>
