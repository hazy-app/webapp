<template>
  <fvAvatar 
    :name="username"
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
    size: {
      type: String,
      default: '48px'
    }
  },
  computed: {
    bgColor() {
      if (this.username !== 'anonymous') {
        return this.calcColor(this.username)
      }
      return '#eee'
    }
  },
  methods: {
    calcColor(str) {
      const ascii = str.charCodeAt(0) % 256
      const section = str.charCodeAt(str.length - 2) % 3
      const arr = new Array(3).fill(187)
      arr[section] = ascii
      return `rgba(${arr.join(',')}, 0.2)`
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
