<template>
  <fvMain>
    <fvContent>
      <appHeader>
        <template slot="title"> Hazy </template>
        <template slot="description"> Message for <appAccountLink :username="$route.params.username" /> </template>
      </appHeader>

      <appInnerContent 
        class="fv-padding-sm" 
        sm>
        <div class="fv-padding-sm" />

        <div class="fv-margin-top">
          <appMessage 
            :message="message"
            :edit-buttons="isMine"
            :is-mine="isMine"
            @remove="remove"
            @privacyChange="privacyChange" />
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import copy from 'clipboard-copy'
import appMessage from '~/components/appMessage.vue'
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appMessage,
    appAccountLink
  },
  data() {
    return {
      isMine: false,
      message: {}
    }
  },
  head() {
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Look at anonymous message sent for @${
            this.$route.params.username
          }!`
        }
      ]
    }
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
        const index = this.messages.findIndex(msg => msg._id === message._id)
        this.messages.splice(index, 1)
        this.$alerts.toast(
          'Your message has been successfully deleted!',
          'success'
        )
        this.$root.$loading.finish()
        this.$router.push(`/users/${this.$route.params.username}/messages`)
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
    return ret
  }
}
</script>
