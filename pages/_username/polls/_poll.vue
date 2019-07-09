<template>
  <appInnerContent 
    class="fv-padding-sm" 
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username"
      only-profile 
      class="fv-margin-bottom" />
    <div 
      v-if="isMine"
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your poll link to your friends to receive anonymous votes! </p>
      <div  
        class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="copyLink"> <appIcon icon="copy" /> Copy Link </fvButton>
      </div>
    </div>
    <appPoll 
      :poll="poll"
      :edit-buttons="isMine"
      :watch-as="isMine ? 'creator' : 'user'"
      :open-button="false"
      :vote-form="!isMine"
      class="fv-margin-bottom"
      @remove="remove"
      @vote="vote" />
  </appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appPoll from '~/components/appPoll.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appPoll,
    appAccountLink,
    appAccountAccessLinks,
    appIcon
  },
  data() {
    return {
      isMine: false,
      poll: {}
    }
  },
  head() {
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Look at created poll by @${this.$route.params.username}!`
        }
      ]
    }
  },
  mounted() {
    if (this.isMine) {
      window.addEventListener('focus', this.sync)
    }
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.sync)
  },
  methods: {
    async sync() {
      this.poll = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${this.$route.params.username}/polls/${
          this.$route.params.poll
        }`
      )
    },
    async vote(data) {
      this.$root.$loading.start()
      try {
        const response = await this.$axios({
          method: 'patch',
          url: `${process.env.BASE_URL}/users/${
            this.$route.params.username
          }/polls/${data.uuid}`,
          headers: {
            'x-browser-fingerprint': data.fingerprint
          },
          data: {
            choice: data.choice,
            recaptcha: data.recaptcha
          }
        })
        await this.sync()
        this.$alerts.toast('Your vote has been successfully added!', 'success')
      } catch (e) {
        this.$alerts.toast(
          (((e || {}).response || {}).data || {}).message || 'Unhandled Error!',
          'failed'
        )
      }
      this.$root.$loading.finish()
    },
    async remove(poll) {
      this.$root.$loading.start()
      try {
        await this.$axios.$delete(
          `${process.env.BASE_URL}/users/${
            this.$store.state.parsedToken.username
          }/polls/${poll.uuid}`
        )
        this.$alerts.toast(
          'Your poll has been successfully deleted!',
          'success'
        )
        this.$root.$loading.finish()
        this.$router.push(`/${this.$route.params.username}/polls`)
      } catch (e) {
        console.log(e)
        this.$root.$loading.finish()
      }
    },
    copyLink() {
      copy(window.document.location.href)
      this.$alerts.toast('Link copied to clipboard!')
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    try {
      ret.poll = await $axios.$get(
        `${process.env.BASE_URL}/users/${params.username}/polls/${params.poll}`
      )
      if (store.state.parsedToken.username === params.username) {
        ret.isMine = true
      }
    } catch (e) {
      throw {
        statusCode: 404,
        message: 'Poll not found!'
      }
    }
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `Vote to created poll by @${params.username}`
    })
    return ret
  }
}
</script>
