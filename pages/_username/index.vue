<template>
  <fvMain>
    <fvContent>
      <!-- If it is not mine -->
      <appHeader>
        <!-- <template slot="title"> Hazy </template> -->
        <template slot="title"> Sending message to <appAccountLink 
          :username="user.username" 
          clickable/> </template>
      </appHeader>


      <appInnerContent 
        sm 
        class="fv-padding-sm">
        <div 
          class="fv-padding fv-text-center fv-margin-bottom fv-borderz fv-shadowz fv-radius">
          <p v-if="isMine"> <i class="fa fa-info-circle" /> Share your profile link to your friends to receive anonymous messages! </p>
          <div 
            v-if="isMine" 
            class="fv-margin-top">
            <fvButton 
              class="fv-primary" 
              @click="copyLink"> <i class="fa fa-copy" /> Copy Link </fvButton>
          </div>
        </div>
        <appMessageSender 
          :user="$route.params.username"
          class="fv-border fv-radius fv-shadow" 
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
    },
    copyLink() {
      const url = `${document.location.protocol}//${document.location.host}/${
        this.$route.params.username
      }`
      copy(url)
      this.$alerts.toast('Link copied to clipboard!')
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
