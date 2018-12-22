<template>
  <fvMain>
    <fvContent>
      <!-- If it is not mine -->
      <appHeader
        v-if="!isMine"
        :inbox="$store.state.parsedToken.username"
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"
        :home="true">
        @{{ $route.params.username }}
      </appHeader>
      <!-- If it is mine -->
      <appHeader
        v-else
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"
        :home="true">
        Inbox
      </appHeader>

      <!-- If it is not mine -->
      <appInnerContent 
        v-if="!isMine" 
        class="fv-padding-sm"
        sm>
        <div class="fv-text-center profile-container">
          <appAccountLink size="8rem" />
        </div>
        <appMessageSender 
          :user="$route.params.username" 
          class="fv-border fv-shadow fv-radius form"
          save-button
          @sent="$router.push('/' + $route.params.username + '/messages/' + $event.uuid)"/>
      </appInnerContent>

      <!-- If it is mine -->
      <appInnerContent 
        v-else 
        class="fv-padding-sm"
        sm>
        <div 
          class="fv-padding fv-text-center fv-margin-bottom">
          <p
            v-if="messages.length === 0"
            class="fv-text-center">
            <i class="fa fa-circle-o" /> You dont have an any messages yet!
          </p>
          <p> <i class="fa fa-info-circle" /> Share this page to your friends to receive anonymous messages! </p>
          <div class="fv-margin-top">
            <fvButton 
              class="fv-primary fv-size-sm" 
              @click="copyLink"> <i class="fa fa-copy" /> Copy Link </fvButton>
          </div>
        </div>

        <div 
          v-for="message in messages"
          :key="message._id" 
          class="fv-margin-bottom fv-flex">
          <div class="fv-border fv-shadow fv-radius fv-grow">
            <p 
              :style="{'direction': $calcDirection(message.text)}" 
              class="fv-padding-sm fv-font-lg message-text fv-padding-bottom"><nuxt-link 
                :to="'/' + $route.params.username + '/messages/' + message.uuid" 
                class="fv-block"><span class="fv-text-light">@anonymous:</span> {{ message.text }}</nuxt-link></p>
            <small class="fv-flex fv-padding-sm fv-padding-top">
              <div class="fv-grow" />
              <div 
                :title="message.create_date | dateReadable" 
                class="fv-margin-end fv-hidden-xs">
                <span class="fa fa-text-gray">
                  <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
                </span>
              </div>
              <div class="fv-margin-end">
                <nuxt-link 
                  :to="'/' + $route.params.username + '/messages/' + message.uuid" 
                  class="fv-link fa-text-info">
                  <i 
                    :class="{'fa-envelope-o': !message.reply_date, 'fa-envelope-open-o': message.reply_date}" 
                    class="fa" /> Open
                </nuxt-link>
              </div>
              <div>
                <a 
                  class="fv-link fv-text-danger" 
                  @click="remove(message)">
                  <i class="fa fa-trash" /> Delete
                </a>
              </div>
            </small>
          </div>
        </div>
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

export default {
  components: {
    appAccountLink
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
      copy(window.document.location.href)
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
    },
    async remove(message) {
      const check = await this.$alerts.confirm(
        'Are you sure you want to delete this message?'
      )
      if (check) {
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
        } catch (e) {
          this.$root.$loading.finish()
        }
      }
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
    if (store.state.parsedToken.username === params.username) {
      ret.page = query.page ? parseInt(query.page) : 1
      try {
        const response = await $axios.$get(
          `${process.env.BASE_URL}/users/${
            store.state.parsedToken.username
          }/messages?per_page=10&page=${ret.page}`
        )
        ret.hasNext = response.hasNext
        ret.totalPages = response.totalPages
        ret.messages = response.result
        ret.isMine = true
      } catch (e) {
        return redirect('/login')
      }
    }
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
