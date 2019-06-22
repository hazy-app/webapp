<template>
  <div class="app-message fv-border fv-radius fv-shadow">
    <div class="fv-padding fv-flex fv-border-bottom header">
      <appAccountLink />
      <div class="fv-grow" />
      <span>
        <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
      </span>
    </div>
    <div class="fv-padding">
      <p :style="{'direction': $calcDirection(message.text)}">
        {{ message.text }}
      </p>
    </div>
</div></template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      a: false
    }
  },
  methods: {
    async logout() {
      const x = await this.$logout()
      if (x) {
        this.$router.push('/login')
      }
      this.accountMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-message {
  overflow: hidden;

  & > .header {
    background: #f7f7f7;
    user-select: none;
    font-size: 0.9em;
  }
}
</style>
