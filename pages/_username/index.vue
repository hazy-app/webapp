<template>
  <fvMain>
    <fvContent>
      <!-- If it is not mine -->
      <appHeader>
        <template slot="title"> Hazy </template>
        <template slot="description"> Sending message to <appAccountLink 
          :username="user.username" 
          clickable/> </template>
      </appHeader>
      <!-- If it is mine -->
      <!-- <appHeader
        v-else
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"
        :home="true"
        :resetpw="$store.state.parsedToken.role && $store.state.parsedToken.role.indexOf('admin') > -1">
        @{{ $route.params.username }}
      </appHeader> -->

      <appInnerContent 
        class="fv-padding-smz"
        sm>
        <br>
        <appMessageSender 
          :user="$route.params.username" 
          save-button
          @sent="$router.push('/' + $route.params.username + '/messages/' + $event.uuid)"/>
          <!-- <fvButton> <i class="fa fa-send" /> Send Message to <appAccountLink 
          :username="user.username" 
          no-link/> </fvButton> -->
      </appInnerContent>

    </fvContent>
  </fvMain>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  data() {
    return {
      isMine: false,
      loading: false,
      user: {},
      form: {
        text: '',
        recaptcha: false
      }
    }
  },
  methods: {
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    },
    async send() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$post(
          `${process.env.BASE_URL}/users/${
            this.$route.params.username
          }/messages`,
          {
            text: this.form.text,
            recaptcha: this.form.recaptcha
          }
        )
        this.$root.$loading.finish()
        this.$alerts.toast(
          `Your message has been sent to ${
            this.$route.params.username
          } successfully!`,
          'success'
        )
        this.$router.push('/')
      } catch (e) {
        this.form.recaptcha = false
        this.$root.$loading.finish()
        this.$alerts.toast(e.response.data.message, 'failed')
      }
    }
  },
  head() {
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Send anonymous message to @${this.user.username}`
        }
      ]
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    try {
      ret.user = await $axios.$get(
        `${process.env.BASE_URL}/users/${params.username}`
      )
    } catch (e) {
      throw {
        statusCode: 404,
        message: 'User not found!'
      }
    }
    ret.isMine = store.state.parsedToken.username === params.username
    return ret
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  margin-bottom: -4rem;
}
</style>
