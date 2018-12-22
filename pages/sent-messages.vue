<template>
  <fvMain>
    <fvContent>
      <appHeader
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"
        :home="true">
        Sent Messages
      </appHeader>

      <appInnerContent 
        class="fv-padding-sm"
        sm>
        <div 
          class="fv-padding fv-text-center fv-margin-bottom">
          <p
            v-if="messages.length === 0"
            class="fv-text-center">
            <i class="fa fa-circle-o" /> Local storage is empty!
          </p>
          <p
            v-else
            class="fv-text-center">
            <i class="fa fa-info-circle" /> Feel free to clear list anytime you want.
          </p>
          <div class="fv-margin-top">
            <fvButton 
              v-if="messages.length !== 0"
              class="fv-primary fv-size-sm" 
              @click="clear"> <i class="fa fa-trash" /> Clear </fvButton>
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
                :to="'/' + message.receiver + '/messages/' + message.uuid" 
                class="fv-block">{{ message.text }}</nuxt-link></p>
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
                  :to="'/' + message.receiver" 
                  class="fv-link fa-text-info">
                  <i class="fa fa-user-circle" /> @{{ message.receiver }}
                </nuxt-link>
              </div>
              <div class="fv-margin-end">
                <nuxt-link 
                  :to="'/' + message.receiver + '/messages/' + message.uuid" 
                  class="fv-link fa-text-info">
                  <i class="fa fa-envelope-o" /> Open
                </nuxt-link>
              </div>
            </small>
          </div>
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    this.load()
  },
  beforeDestroy() {
    window.removeEventListener('focus', this.load)
  },
  methods: {
    load() {
      this.messages = this.$sentMessages.getAll()
    },
    async clear() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to clear all your sent messages from your local storage?'
      )
      if (check) {
        this.$root.$loading.start()
        this.$sentMessages.clear()
        this.load()
        this.$root.$loading.finish()
      }
    }
  }
}
</script>
