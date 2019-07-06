<template>
  <div class="app-message fv-border">
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
        v-if="openButton" 
        :to="'/' + question.creator + '/send-message/' + question._id" 
        class="fv-margin-start fv-link">
        <appIcon 
          v-if="watchAs === 'user'"  
          icon="message-circle"/>
        <span 
          v-if="watchAs === 'creator'" 
          class="fv-hidden-xs"> Open </span>
        <span v-else> Answer </span> 
        <appIcon 
          v-if="watchAs === 'creator'" 
          icon="arrow-right"/>
      </nuxt-link>
    </div>
    <div class="fv-padding">
      <p :style="{'direction': $calcDirection(question.text)}">
        {{ question.text }}
      </p>
    </div>
    <fvForm 
      v-if="false" 
      class="fv-padding fv-border-top choices"
      method="POST"
      @submit="vote">
      <fvFormElement inline>
        <div 
          v-for="(choice, index) in poll.choices"
          :key="'choice' + index" 
          class="fv-flex choice">
          <fvCheck 
            v-model="selectedChoice"
            :content="index"
            class="fv-margin-end"
            tabindex="-1"> {{ choice }} </fvCheck>
        </div>
      </fvFormElement>
      <fvFormElement class="fv-col-12">
        <div class="fv-text-center">
          <no-ssr>
            <appRecaptcha v-model="recaptcha" />
          </no-ssr>
        </div>
      </fvFormElement>
      <div class="fv-flex">
        <fvButton 
          type="submit" 
          class="fv-primary fv-grow">
          <appIcon icon="check" /> Submit
        </fvButton>
      </div>
    </fvForm>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appIcon
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
    watchAs: {
      type: String,
      validator: v => ['creator', 'user'].indexOf(v) > -1,
      default: 'creator'
    }
  },
  data() {
    return {
      selectedChoice: undefined,
      userFingerprint: undefined,
      recaptcha: false,
      infoPopupItem: undefined,
      infoPopup: false
    }
  },
  computed: {
    totalVotes() {
      return this.poll.answers.reduce(
        (total, item) => (total = total + item),
        0
      )
    },
    activeChoices() {
      return this.poll.choices
        .map((choice, index) => {
          return {
            choice,
            index
          }
        })
        .filter((choice, index) => {
          return this.poll.answers[index] > 0
        })
    },
    votesPercetange() {
      const totalVotes = this.totalVotes
      return this.poll.answers.map(vote => (vote * 100) / totalVotes)
    }
  },
  methods: {
    async remove() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to delete this question?'
      )
      if (check) {
        this.$emit('remove', this.poll)
      }
    },
    async vote() {
      const fingerprint = await this.$getFingerprint()
      this.$emit('vote', {
        choice: this.selectedChoice,
        fingerprint,
        recaptcha: this.recaptcha,
        uuid: this.poll.uuid
      })
    },
    toggleInfoPopup(index) {
      this.infoPopup = !this.infoPopup
      this.infoPopupItem = index
    }
  }
}
</script>
