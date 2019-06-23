<template>
  <fvMain>
    <fvContent>
      <appHeader>
        <template slot="title"> Hazy </template>
        <template slot="description"> Sent Messages </template>
      </appHeader>

      <appInnerContent 
        sm 
        class="fv-padding-sm">
        <div 
          class="fv-padding fv-text-center fv-margin-bottom fv-borderz fv-shadowz fv-radius">
          <p v-if="messages.length !== 0"> <i class="fa fa-info-circle" /> Feel free to clear list anytime you want. </p>
          <div class="fv-margin-top">
            <fvButton 
              v-if="messages.length !== 0"
              class="fv-primary" 
              @click="clear"> <i class="fa fa-trash" /> Clear </fvButton>
          </div>
        </div>
        <p
          v-if="messages.length === 0"
          class="fv-text-center">
          <i class="fa fa-circle-o" /> Local storage is empty!
        </p>
        <appMessage 
          v-for="message in messages"
          :key="'a' + message._id" 
          :message="message"
          :edit-button="false"
          :reply-section="false"
          is-mine
          watch-as="sender"
          class="fv-margin-bottom"/>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import appMessage from '~/components/appMessage.vue'

export default {
  components: {
    appMessage
  },
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
