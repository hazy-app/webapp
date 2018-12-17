<template>
  <fvMain>
    <fvContent>
      <appHeader
        :inbox="$store.state.parsedToken.username"
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"
        :home="true">
        Message for @{{ $route.params.username }}
      </appHeader>

      <appInnerContent sm>

        <div class="fv-margin-top fv-flex">
          <div class="fv-margin-end-sm">
            <appAccountLink 
              size="3rem"/>
          </div>
          <div class="fv-border fv-shadow fv-radius fv-grow">
            <p 
              :style="{'direction': $calcDirection(message.text)}" 
              class="fv-padding-sm fv-font-lg message-text">{{ message.text }}</p>
            <small class="fv-flex fv-padding-sm fv-margin-top fv-padding-top">
              <div class="fv-grow" />
              <div 
                :title="message.create_date | dateReadable" 
                class="fv-margin-end fv-hidden-xs">
                <span class="fa fa-text-gray">
                  <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
                </span>
              </div>
            </small>
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
