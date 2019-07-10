<template>
  <appInnerContent 
    class="fv-padding-sm"
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-margin-bottom" />
    <div 
      v-if="isMine"
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your question link to your friends to receive anonymous answers! </p>
      <div  
        class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="copyLink"> <appIcon icon="copy" /> Copy Link </fvButton>
      </div>
    </div>
    <appQuestion 
      :question="question"
      :edit-buttons="isMine"
      :watch-as="isMine ? 'creator' : 'user'"
      :open-button="false"
      :send-form="!isMine"
      class="fv-border fv-margin-bottom"
      @remove="remove"
      @message-sent="mySentMessages = loadMySentMessages()" />
    <label class="fv-control-label fv-margin-bottom"> <appIcon icon="message-square" /> Replies: </label>
    <appNothingToShow 
      v-if="messages.length === 0 && mySentMessages.length === 0" 
      class="fv-margin-bottom"
    />
    <appMessage 
      v-for="message in mySentMessages"
      :key="'msg' + message._id" 
      :message="message"
      :edit-buttons="false"
      :open-button="true"
      :reply-section="false"
      class="fv-margin-bottom i-sent" />
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
import twitterCard from '~/utils/twitter-card.js'
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
      mySentMessages: [],
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
    this.mySentMessages = this.loadMySentMessages()
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.sync)
  },
  methods: {
    loadMySentMessages() {
      return this.$sentMessages.getAll().filter(message => {
        const toThisUser = message.receiver === this.$route.params.username
        const isDefaultQuestion =
          this.$route.params.question === 'default' ||
          !this.$route.params.question
        return (
          toThisUser &&
          (isDefaultQuestion
            ? !message.question
            : message.question === this.$route.params.question)
        )
      })
    },
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
      copy(window.document.location.href)
      this.$alerts.toast('Link copied to clipboard!')
    },
    async remove(question) {
      this.$root.$loading.start()
      try {
        await this.$axios.$delete(
          `${process.env.BASE_URL}/users/${
            this.$store.state.parsedToken.username
          }/questions/${question._id}`
        )
        this.$alerts.toast(
          'Your question has been successfully deleted!',
          'success'
        )
        this.$root.$loading.finish()
        this.$router.push(`/${this.$route.params.username}/questions`)
      } catch (e) {
        console.log(e)
        this.$root.$loading.finish()
      }
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
    return twitterCard(
      this.$route.params.username,
      'Question',
      this.question.text
    )
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    ret.page = query.page ? parseInt(query.page) : 1
    params.question = params.question || 'default'
    try {
      const response = await $axios.$get(
        `${process.env.BASE_URL}/users/${
          params.username
        }/messages?per_page=10&page=${ret.page}&question=${params.question}`
      )
      ret.hasNext = response.hasNext
      ret.totalPages = response.totalPages
      ret.messages = response.result
    } catch (e) {
      return redirect('/login')
    }
    try {
      const response = await $axios.$get(
        `${process.env.BASE_URL}/users/${params.username}/questions/${
          params.question
        }`
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

.i-sent {
  opacity: 0.5;
}
</style>
