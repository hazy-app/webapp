<template>
  <fvAvatar 
    :name="username"
    :src="gravatarUrl"
    :title="avatar"
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
      gravatar: this.avatar
    }
  },
  computed: {
    bgColor() {
      if (this.username !== 'anonymous') {
        return this.calcColor(this.username)
      }
      return '#444'
    },
    gravatarUrl() {
      const avat = this.avatar || this.gravatar || undefined
      if (!avat) {
        return undefined
      }
      return `https://www.gravatar.com/avatar/${avat}?size=${parseInt(
        this.size
      )}`
    }
  },
  // async beforeMount() {
  //   if (!this.avatar && this.username && this.username !== 'anonymous') {
  //     const response = await this.$axios.$get(
  //       `${process.env.BASE_URL}/users/${this.username}`
  //     )
  //     this.gravatar = response.gravatar
  //   }
  // },
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
