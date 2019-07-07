<template>
  <appInnerContent 
    sm 
    class="fv-padding-sm">
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <div 
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Feel free to clear list anytime you want. There is nothing related to your account. </p>
      <div 
        v-if="messages.length !== 0" 
        class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="clear"> <appIcon icon="trash" /> Clear </fvButton>
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
      :reply-section="false"
      open-button
      is-mine
      watch-as="sender"
      class="fv-margin-bottom"/>
  </appInnerContent>
</template>

<script>
import appMessage from '~/components/appMessage.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appMessage,
    appNothingToShow,
    appIcon
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
  },
  asyncData({ store }) {
    store.commit('ui/setHeader', {
      title: 'Hazy',
      description: 'Your sent messages'
    })
  }
}
</script>
