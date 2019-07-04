<template>
  <appInnerContent 
    class="fv-padding-sm"
    sm>
    <div class="fv-padding-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-border fv-margin-bottom" />
    <div
      v-if="isMine" 
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your profile link to your friends to receive anonymous messages! </p>
      <div class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="copyLink"> <appIcon icon="copy" /> Copy Link </fvButton>
      </div>
    </div>
    <appNothingToShow 
      v-if="messages.length === 0" 
    />
    <appMessage 
      v-for="message in messages"
      :key="'msg' + message._id" 
      :message="message"
      :edit-buttons="false"
      :open-button="true"
      class="fv-margin-bottom" />
    <div class="fv-text-center">
      <fvButton 
        v-if="hasNext && !loading" 
        @click="loadMore">
        <appIcon icon="more-horizontal" /> Load More
      </fvButton>
      <fvLoading v-if="loading" />
    </div>
  </appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appMessage from '~/components/appMessage.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appMessage,
    appNothingToShow,
    appAccountAccessLinks,
    appIcon
  },
  data() {
    return {
      isMine: false,
      page: 1,
      hasNext: true,
      loading: false,
      messages: [],
      form: {
        text: '',
        recaptcha: false
      }
    }
  },
  mounted() {
    if (this.isMine) {
      this.$eventBus.$on('newMessage', this.insertNewMessage)
      window.addEventListener('focus', this.sync)
    }
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.sync)
  },
  methods: {
    async sync() {
      this.loading = true
      const response = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${
          this.$store.state.parsedToken.username
        }/messages?per_page=10&page=1`
      )
      const messages = response.result
        .filter(
          msgn => this.messages.findIndex(msgo => msgo._id === msgn._id) === -1
        )
        .reverse()
        .forEach(this.insertNewMessage)
      this.loading = false
    },
    insertNewMessage(message) {
      this.messages.unshift(message)
    },
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    },
    copyLink() {
      const url = `${document.location.protocol}//${document.location.host}/${
        this.$route.params.username
      }`
      copy(url)
      this.$alerts.toast('Link copied to clipboard!')
    },
    async gotoMessage(message) {
      this.$router.push(`/${message.receiver}/messages/${message.uuid}`)
    },
    async loadMore() {
      this.loading = true
      this.page++
      const response = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${
          this.$store.state.parsedToken.username
        }/messages?per_page=10&page=${this.page}`
      )
      this.messages = this.messages.concat(response.result)
      this.hasNext = response.hasNext

      this.loading = false
    }
  },
  head() {
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Look at anonymous messages sent for @${
            this.$route.params.username
          }!`
        }
      ]
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    ret.page = query.page ? parseInt(query.page) : 1
    try {
      const response = await $axios.$get(
        `${process.env.BASE_URL}/users/${
          params.username
        }/messages?per_page=10&page=${ret.page}`
      )
      ret.hasNext = response.hasNext
      ret.totalPages = response.totalPages
      ret.messages = response.result
    } catch (e) {
      return redirect('/login')
    }
    ret.isMine = store.state.parsedToken.username === params.username
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `List of received messages of @${params.username}`
    })
    return ret
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  margin-bottom: -4rem;
}
.form {
  padding-top: 4rem;
}
</style>
