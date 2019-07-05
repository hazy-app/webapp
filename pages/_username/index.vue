<template>
  <appInnerContent 
    sm 
    class="fv-padding-sm">
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-border-top fv-border-start fv-border-end" />
    <div 
      v-if="isMine"
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your profile link to your friends to receive anonymous messages! </p>
      <div  
        class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="copyLink"> <appIcon icon="copy" /> Copy Link </fvButton>
      </div>
    </div>
    <appMessageSender 
      :user="$route.params.username"
      class="fv-border" 
      save-button
      @sent="$router.push('/' + $route.params.username + '/messages/' + $event.uuid)"/>
  </appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appAccountAccessLinks,
    appIcon
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
        this.$alerts.toast(
          (((e || {}).response || {}).data || {}).message || 'Unhandled Error!',
          'failed'
        )
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
          content: `Send anonymous message to @${this.$route.params.username}`
        }
      ]
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    ret.isMine = store.state.parsedToken.username === params.username
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `Send anonymous message to @${params.username}`
    })
    return ret
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  margin-bottom: -4rem;
}
</style>
