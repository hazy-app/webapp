<template>
  <appInnerContent 
    class="fv-padding-sm"
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
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
    <label class="fv-control-label fv-margin-bottom"> <appIcon icon="list" /> Answers: </label>
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
import appQuestion from '@/components/appQuestion.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appMessage,
    appNothingToShow,
    appAccountAccessLinks,
    appQuestion,
    appIcon
  },
  data() {
    return {
      isMine: false,
      question: {},
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
        }/messages?per_page=10&page=${ret.page}&question=${query.question ||
          'default'}`
      )
      ret.hasNext = response.hasNext
      ret.totalPages = response.totalPages
      ret.messages = response.result
    } catch (e) {
      return redirect('/login')
    }
    try {
      const response = await $axios.$get(
        `${process.env.BASE_URL}/users/${
          params.username
        }/questions/${query.question || 'default'}`
      )
      ret.question = response
    } catch (e) {}
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
