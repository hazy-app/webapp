<template>
  <div 
    class="app-message">
    <div class="fv-padding fv-flex header">
      <span>
        <appAccountLink :username="question.creator"/>
      </span>
      <div class="fv-grow" />
      <span 
        v-if="editButtons && question._id !== 'default'"
        class="fv-margin-end">
        <a 
          class="fv-link fv-text-danger"
          @click.stop="remove">
          <appIcon icon="trash" /> <span class="fv-hidden-xs"> Remove </span>
        </a>
      </span>
      <span 
        v-if="question._id !== 'default'" 
        :title="question.create_date | dateReadable">
        <appIcon icon="calendar" /> {{ question.create_date | dateFromNow }}
      </span>
      <nuxt-link 
        v-if="openButton" 
        :to="selfLink" 
        class="fv-margin-start fv-link">
        <appIcon 
          v-if="watchAs === 'user'"  
          icon="message-square"/>
        <span 
          v-if="watchAs === 'creator'" 
          class="fv-hidden-xs"> Open </span>
        <span v-else> Reply </span> 
        <appIcon 
          v-if="watchAs === 'creator'" 
          icon="arrow-right"/>
      </nuxt-link>
    </div>
    <div 
      class="fv-padding fv-font-lg" 
      @click="$router.push(openButton ? selfLink : '')">
      <p :style="{'direction': $calcDirection(question.text)}">
        {{ question.text }}
      </p>
    </div>
    <div 
      v-if="sendForm" 
      class="fv-border-top">
      <div class="fv-padding fv-flex header">
        <span>
          Reply as <appAccountLink />
        </span>
      </div>
      <appMessageSender 
        v-if="sendForm" 
        :user="question.creator"
        :question="question._id"
        save-button
        @sent="$emit('message-sent', $event)"/>
    </div>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'
import appIcon from '@/components/appIcon.vue'
import appMessageSender from '~/components/appMessageSender.vue'

export default {
  components: {
    appAccountLink,
    appIcon,
    appMessageSender
  },
  props: {
    question: {
      type: Object,
      default: () => ({})
    },
    openButton: {
      type: Boolean,
      default: false
    },
    editButtons: {
      type: Boolean,
      default: false
    },
    sendForm: {
      type: Boolean,
      default: false
    },
    watchAs: {
      type: String,
      validator: v => ['creator', 'user'].indexOf(v) > -1,
      default: 'creator'
    }
  },
  data() {
    return {
      recaptcha: false
    }
  },
  computed: {
    selfLink() {
      return `/${this.question.creator}/questions/${this.question._id}`
    }
  },
  methods: {
    async remove() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to delete this question?'
      )
      if (check) {
        this.$emit('remove', this.question)
      }
    }
  }
}
</script>
