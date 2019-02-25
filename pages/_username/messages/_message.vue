<template>
  <fvMain>
    <fvContent>
      <appHeader
        :inbox="$store.state.parsedToken.username"
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"
        :home="true">
        Message for <nuxt-link :to="'/' + $route.params.username"> @{{ $route.params.username }} </nuxt-link>
      </appHeader>

      <appInnerContent 
        class="fv-padding-sm" 
        sm>
        <div 
          class="fv-padding fv-text-center fv-margin-bottom">
          <p v-if="isMine"> <i class="fa fa-info-circle" /> You can share this message! </p>
          <p v-else-if="!isMine"> <i class="fa fa-info-circle" /> If you are not <nuxt-link :to="'/' + $route.params.username"> @{{ $route.params.username }} </nuxt-link>, be careful for sharing this message to public places. </p>
          <div class="fv-margin-top">
            <fvButton 
              class="fv-primary fv-size-sm" 
              @click="copyLink"> <i class="fa fa-copy" /> Copy Link </fvButton>
            <span 
              v-if="isMine" 
              class="fv-padding-sm"> | </span>
            <fvFormElement 
              v-if="isMine" 
              class="public-switch"
              inline
              single-line
              label="Show on My Profile">
              <fvSwitch
                :value="message.public"
                class="fv-default fv-size-sm"
                @input="changePrivacy" />
            </fvFormElement>
          </div>
        </div>

        <div class="fv-margin-top fv-flex">
          <div class="fv-border fv-shadow fv-radius fv-grow">
            <p 
              :style="{'direction': $calcDirection(message.text)}" 
              class="fv-padding-sm fv-font-lg message-text fv-padding-bottom"><span class="fv-text-light">@anonymous:</span> {{ message.text }}</p>
            <small class="fv-flex fv-padding-sm fv-padding-top">
              <div class="fv-grow" />
              <div 
                :title="message.create_date | dateReadable">
                <span class="fa fa-text-gray">
                  <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
                </span>
              </div>
            </small>
            <div class="fv-border-bottom"/>
            <div 
              v-if="!isMine && !message.reply">
              <p class="fv-padding-sm fv-text-light">
                @{{ $route.params.username }} didn't replied yet. </p>
            </div> 
            <appMessageSender 
              v-else-if="isMine && !message.reply"
              :user="$route.params.username" 
              :message="message.uuid" 
              :recaptcha="false"
              message-label="Reply to message"
              button-text="Reply"
              button-icon="fa fa-reply"
              @sent="reload"/>
            <div 
              v-else>
              <p 
                :style="{'direction': $calcDirection(message.reply)}" 
                class="fv-padding-sm fv-font-lg message-text"><span class="fv-text-light">@{{ $route.params.username }}:</span> {{ message.reply }}</p>
              <small class="fv-flex fv-padding-sm fv-margin-top fv-padding-top">
                <div class="fv-grow" />
                <div 
                  :title="message.reply_date | dateReadable">
                  <span class="fa fa-text-gray">
                    <i class="fa fa-calendar" /> {{ message.reply_date | dateFromNow }}
                  </span>
                </div>
              </small>
            </div> 
          </div>
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
    async changePrivacy(newValue) {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$put(
          `${process.env.BASE_URL}/users/${
            this.$route.params.username
          }/messages/${this.$route.params.message}`,
          {
            public: newValue
          }
        )
        this.message.public = newValue
      } catch (e) {
        this.message.public = this.message.public
      }
      this.$root.$loading.finish()
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

<style lang="scss" scoped>
.public-switch {
  display: inline-flex;
}
</style>
