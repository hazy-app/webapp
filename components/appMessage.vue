<template>
  <div class="app-message fv-border fv-radius fv-shadow">
    <div class="fv-padding fv-flex header">
      <span v-if="watchAs === 'sender'">
        To <appAccountLink 
          :username="message.receiver" 
          clickable/>
      </span>
      <span v-else-if="watchAs === 'receiver'">
        <appAccountLink />
      </span>
      <div class="fv-grow" />
      <span 
        v-if="editButtons"
        class="fv-margin-end">
        <i class="fa fa-globe" />: <fvSwitch 
          :value="message.public" 
          class="fv-size-xs" 
          @input="privacyChange"/>
      </span>
      <span 
        v-else-if="message.public"
        :title="'This message is public!'"
        class="fv-margin-end">
        <i class="fa fa-globe"/> Public
      </span>
      <span 
        v-if="editButtons"
        class="fv-margin-end">
        <a 
          class="fv-link fv-text-danger"
          @click="remove">
          <i class="fa fa-trash" /> <span class="fv-hidden-xs"> Remove </span>
        </a>
      </span>
      <span :title="message.create_date | dateReadable">
        <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
      </span>
      <nuxt-link 
        v-if="openButton" 
        :to="'/' + message.receiver + '/messages/' + message.uuid" 
        class="fv-margin-start fv-link"> <i class="fa fa-commenting-o" /> Open </nuxt-link>
    </div>
    <div class="fv-padding">
      <p :style="{'direction': $calcDirection(message.text)}">
        {{ message.text }}
      </p>
    </div>
    <div 
      v-if="replySection" 
      class="fv-border-top">
      <div v-if="editButtons && !message.reply_date">
        <appMessageSender 
          :user="message.receiver" 
          :message="message.uuid" 
          :recaptcha="false"
          message-label="Reply to message"
          button-text="Reply"
          button-icon="fa fa-reply"/>
      </div>
      <div 
        v-else-if="message.reply_date"
        class="reply-body">
        <div class="fv-padding fv-flex header">
          <span>
            <appAccountLink :username="message.receiver" />
          </span>
          <div class="fv-grow" />
          <span :title="message.reply_date | dateReadable">
            <i class="fa fa-calendar" /> {{ message.reply_date | dateFromNow }}
          </span>
        </div>
        <div class="fv-padding">
          <p :style="{'direction': $calcDirection(message.reply)}">
            {{ message.reply }}
          </p>
        </div>
      </div>
      <div 
        v-else 
        class="fv-padding reply-body fv-flex">
        <p class="fv-text-light">
          <appAccountLink :username="message.receiver" /> didn't replied yet.
        </p>
        <span class="fv-grow" />
      </div>
    </div>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  props: {
    message: {
      type: Object,
      default: () => ({})
    },
    editButtons: {
      type: Boolean,
      default: false
    },
    openButton: {
      type: Boolean,
      default: false
    },
    replySection: {
      type: Boolean,
      default: true
    },
    watchAs: {
      type: String,
      validator: v => ['receiver', 'sender'].indexOf(v) > -1,
      default: 'receiver'
    }
  },
  methods: {
    async remove() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to delete this message?'
      )
      if (check) {
        this.$emit('remove', this.message)
      }
    },
    reply() {
      this.$emit('reply', this.message)
    },
    privacyChange() {
      this.$emit('privacyChange', this.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-message {
  overflow: hidden;

  & .header {
    user-select: none;
    display: flex;
    flex-direction: row;

    & .fv-switch {
      top: -0.35em;
    }
  }
}
</style>
