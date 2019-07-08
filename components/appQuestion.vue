<template>
  <div class="app-message">
    <div class="fv-padding fv-flex header">
      <span>
        <appAccountLink :username="question.creator"/>
      </span>
      <div class="fv-grow" />
      <span 
        v-if="editButtons"
        class="fv-margin-end">
        <a 
          class="fv-link fv-text-danger"
          @click="remove">
          <appIcon icon="trash" /> <span class="fv-hidden-xs"> Remove </span>
        </a>
      </span>
      <span 
        v-if="question._id !== 'default'" 
        :title="question.create_date | dateReadable">
        <appIcon icon="calendar" /> {{ question.create_date | dateFromNow }}
      </span>
      <nuxt-link 
        v-if="viewRepliesButton" 
        :to="'/' + question.creator + '/messages?question=' + question._id" 
        class="fv-margin-start fv-link">
        <appIcon icon="list"/>
        <span class="fv-hidden-xs"> View Replies </span> 
      </nuxt-link>
      <nuxt-link 
        v-if="openButton && watchAs === 'creator'" 
        :to="'/' + question.creator + '/questions/' + question._id" 
        class="fv-margin-start fv-link">
        <span class="fv-hidden-xs"> Open </span>
        <appIcon icon="arrow-right"/>
      </nuxt-link>
    </div>
    <div class="fv-padding fv-font-lg">
      <p :style="{'direction': $calcDirection(question.text)}">
        {{ question.text }}
      </p>
    </div>
    <appMessageSender 
      v-if="sendForm" 
      :user="question.creator"
      :question="question._id" 
      class="fv-border-top"
      save-button
      @sent="$emit('answered', $event)"/>
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
    viewRepliesButton: {
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
