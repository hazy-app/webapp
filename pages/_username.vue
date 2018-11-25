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
        @{{ user.username }}
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
        sm>
        <div class="fv-text-center profile-container">
          <appAccountLink size="8rem" />
        </div>
        <fvForm 
          class="fv-row fv-border fv-shadow fv-radius form"
          @submit="send">
          <fvFormElement 
            class="fv-col-12" 
            label="Message">
            <fvTextarea 
              v-model="form.text" 
              placeholder="Enter your message"
              class="fv-size-lg"
              autofocus
              auto-height
              required/>
          </fvFormElement>
          <fvFormElement
            class="fv-col-12">
            <div class="fv-text-center">
              <no-ssr>
                <appRecaptcha v-model="form.recaptcha" />
              </no-ssr>
            </div>
          </fvFormElement>
          <div class="fv-col-12 fv-text-light">
            <p> <i class="fa fa-info-circle" /> @{{ user.username }} never understand who you are! </p>
            <p> <i class="fa fa-info-circle" /> You can receive anonymous messages too! <nuxt-link 
              class="fv-link" 
              to="/login"> Click here </nuxt-link> to register! </p>
          </div>
          <div class="fv-flex fv-col-12">
            <fvButton 
              type="submit" 
              class="fv-primary fv-grow fv-size-lg">
              <i class="fa fa-send" /> Send
            </fvButton>
          </div>
        </fvForm>
      </appInnerContent>

      <!-- If it is mine -->
      <appInnerContent 
        v-else 
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
          :key="message.id" 
          class="fv-margin-bottom fv-flex">
          <div class="fv-margin-end-sm">
            <appAccountLink 
              size="3rem"/>
          </div>
          <div class="fv-border fv-shadow fv-radius fv-grow">
            <p class="fv-padding-sm fv-font-lg message-text">{{ message.text }}</p>
            <small class="fv-flex fv-padding-sm fv-margin-top">
              <div class="fv-grow" />
              <div 
                :title="message.create_date" 
                class="fv-margin-end-sm fa-text-gray">
                <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
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

export default {
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
  methods: {
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
            }/messages/${message._id}`
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
      title: 'Hazy'
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
