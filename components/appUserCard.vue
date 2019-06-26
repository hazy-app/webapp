<template>
  <div class="app-message fv-border fv-radius fv-shadow">
    <div class="fv-padding">
      <nuxt-link :to="'/' + user.username">
        <h3 
          class="highlight" 
          v-html="user.highlighted" />
      </nuxt-link>
      <div>
        <label> Unique ID: </label> <span>{{ user._id }}</span>
      </div>
      <div>
        <label> Joined to Hazy since </label> <span :title="user.create_date | dateReadable">
          {{ user.create_date | dateFromNow }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.app-message {
  overflow: hidden;

  & .header {
    // background: #f7f7f7;
    user-select: none;
    display: flex;
    flex-direction: row;

    & .fv-switch {
      top: -0.35em;
    }
  }

  // & .reply-body {
  //   background: rgba(0, 0, 0, 0.01);
  // }

  // & .highlight > span {
  //   max-width: 60%;
  //   margin: 0 20%;
  //   height: 1px;
  //   border-top: dotted 2px #e0e0e0;
  // }
}
</style>
