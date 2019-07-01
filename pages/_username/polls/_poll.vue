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
          <appPoll 
            :poll="poll"
            :edit-buttons="isMine"
            :is-mine="isMine"
            watch-as="user"
            @remove="remove" />
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import copy from 'clipboard-copy'
import appPoll from '~/components/appPoll.vue'
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appPoll,
    appAccountLink
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
    return ret
  }
}
</script>
