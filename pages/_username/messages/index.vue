<template>
  <fvMain>
    <fvContent>
      <!-- If it is not mine -->
      <appHeader>
        <template 
          v-if="isMine" 
          slot="title"> Inbox </template>
        <template 
          v-if="!isMine" 
          slot="title"> Inbox of <appAccountLink 
            :username="user.username" 
            clickable/> </template>
        <template 
          v-if="!isMine" 
          slot="description"> We show only public messages to you! </template>
      </appHeader>


      <appInnerContent 
        class="fv-padding-sm"
        sm>
        <div class="fv-padding-sm" />
        <div
          v-if="isMine" 
          class="fv-padding fv-text-center fv-border fv-shadow fv-radius fv-margin-bottom">
          <p> <i class="fa fa-info-circle" /> Share your profile link to your friends to receive anonymous messages! </p>
          <div class="fv-margin-top">
            <fvButton 
              class="fv-primary" 
              @click="copyLink"> <i class="fa fa-copy" /> Copy Link </fvButton>
          </div>
        </div>

        <appNothingToShow 
          v-if="messages.length === 0" 
        />
        <appMessage 
          v-for="message in messages"
          :key="'msg' + message._id" 
          :message="message"
          :edit-button="false"
          :is-mine="isMine"
          class="fv-margin-bottom"
          @reply="gotoMessage"/>
        <div class="fv-text-center">
          <fvButton 
            v-if="hasNext && !loading" 
            @click="loadMore">
            <i class="fa fa-ellipsis-h" /> Load More
          </fvButton>
          <fvLoading v-if="loading" />
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appMessage from '~/components/appMessage.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'

export default {
  components: {
    appAccountLink,
    appMessage,
    appNothingToShow
  },
  data() {
    return {
      isMine: false,
      page: 1,
      hasNext: true,
      loading: false,
      messages: [],
      user: {},
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
