<template>
  <fvAvatar 
    :src="avatar" 
    :name="username" />
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      avatar: undefined,
      username: undefined
    }
  },
  async created() {
    this.avatar = this.user
      ? ''
      : (() => {
          return `https://randomuser.me/api/portraits/lego/${Math.floor(
            Math.random() * 11
          )}.jpg`
        })()
    this.username = this.user
      ? this.user.username
      : (() => {
          const list = [
            '!@#',
            '@$$',
            '%$#',
            '&^%',
            '*%#',
            '$&(',
            '@$!',
            '*%#',
            '%@_',
            '_-#',
            '%$#'
          ]
          return list[Math.floor(Math.random() * 11)]
        })()
    console.log(this.username)
  }
}
</script>
