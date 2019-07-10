<template>
  <appInnerContent 
    class="fv-padding-sm" 
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      only-profile
      class="fv-margin-bottom" />
    <label class="fv-control-label fv-margin-bottom"> <appIcon icon="help-circle" /> Question: </label>
    <appQuestion 
      :question="question"
      :edit-buttons="false"
      :send-form="false"
      :view-replies-button="false"
      :open-button="true"
      :watch-as="isMine ? 'creator' : 'user'"
      class="fv-border fv-margin-bottom" />
    <label class="fv-control-label fv-margin-bottom"> <appIcon icon="message-circle" /> Answer: </label>
    <appMessage 
      :message="message"
      :edit-buttons="isMine"
      :open-button="false"
      @remove="remove"
      @privacyChange="privacyChange" />
  </appInnerContent>
</template>

<script>
import twitterCard from '~/utils/twitter-card.js'
import copy from 'clipboard-copy'
import appMessage from '~/components/appMessage.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appQuestion from '@/components/appQuestion.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appMessage,
    appAccountLink,
    appAccountAccessLinks,
    appQuestion,
    appIcon
  },
  data() {
    return {
      isMine: false,
      message: {},
      question: {}
    }
  },
  head() {
    return twitterCard(
      this.$route.params.username,
      undefined,
      `Look at anonymous message sent for @${this.$route.params.username}!`
    )
  },
  methods: {
    async reload() {
      this.$root.$loading.start()
      this.message = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${
          this.$route.params.username
        }/messages/${this.$route.params.message}`
      )
      this.$root.$loading.finish()
    },
    async privacyChange(message) {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$put(
          `${process.env.BASE_URL}/users/${
            this.$route.params.username
          }/messages/${message.uuid}`,
          {
            public: message.public
          }
        )
        this.message.public = message.public
      } catch (e) {
        this.message.public = !message.public
      }
      this.$root.$loading.finish()
    },
    async remove(message) {
      this.$root.$loading.start()
      try {
        await this.$axios.$delete(
          `${process.env.BASE_URL}/users/${
            this.$store.state.parsedToken.username
          }/messages/${message.uuid}`
        )
        this.$alerts.toast(
          'Your message has been successfully deleted!',
          'success'
        )
        this.$root.$loading.finish()
        this.$router.push(`/${this.$route.params.username}/messages`)
      } catch (e) {
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
      ret.message = await $axios.$get(
        `${process.env.BASE_URL}/users/${params.username}/messages/${
          params.message
        }`
      )
      if (store.state.parsedToken.username === params.username) {
        ret.isMine = true
      }
    } catch (e) {
      throw {
        statusCode: 404,
        message: 'Message not found!'
      }
    }
    try {
      const response = await $axios.$get(
        `${process.env.BASE_URL}/users/${params.username}/questions/${ret
          .message.question_id || 'default'}`
      )
      ret.question = response
    } catch (e) {}
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `Received message for @${params.username}`
    })
    return ret
  }
}
</script>
