<template>
  <div class="app-message fv-border fv-radius fv-shadow">
    <div class="fv-padding fv-flex header">
      <span>
        <appAccountLink 
          :username="poll.creator" 
          clickable/>
      </span>
      <div class="fv-grow" />
      <span 
        v-if="editButtons"
        class="fv-margin-end">
        <a 
          class="fv-link fv-text-danger"
          @click="remove">
          <i class="fa fa-trash" /> <span class="fv-hidden-xs"> Remove </span>
        </a>
      </span>
      <span :title="poll.create_date | dateReadable">
        <i class="fa fa-calendar" /> {{ poll.create_date | dateFromNow }}
      </span>
      <nuxt-link 
        v-if="openButton" 
        :to="'/' + poll.creator + '/polls/' + poll.uuid" 
        class="fv-margin-start fv-link"> <i class="fa fa-commenting-o" /> Open </nuxt-link>
    </div>
    <div class="fv-padding">
      <p :style="{'direction': $calcDirection(poll.title)}">
        {{ poll.title }}
      </p>
    </div>
    <div 
      class="fv-border-top choices">
      <div 
        v-if="totalVotes > 0" 
        class="choices-chart fv-bg-info">
        <div 
          v-for="(choice, index) in activeChoices"
          :key="'choice' + index"
          :style="{width: votesPercetange[index] + '%'}"
          :title="choice + ', <br>' + poll.answers[index]" 
          :class="{ 'open': infoPopup === true && infoPopupItem === index }"
          class="choice fv-pointer"
          @click="toggleInfoPopup(index)">
          <b 
            :style="{'direction': $calcDirection(choice)}" 
            v-text="choice"/> {{ parseFloat(votesPercetange[index]).toFixed(1) }}%
        </div>
        <fvMenu 
          v-model="infoPopup" 
          class="app-menu">
          <b 
            :style="{'direction': $calcDirection(poll.choices[infoPopupItem])}" 
            class="fv-padding fv-block fv-border-bottom" > {{ poll.choices[infoPopupItem] }} </b>
          <div class="fv-padding">
            <p> <label class="fv-text-light"> Votes: </label> <span> {{ poll.answers[infoPopupItem] }}</span> </p>
            <p> <label class="fv-text-light"> Votes(%): </label> <span> {{ parseFloat(votesPercetange[infoPopupItem]).toFixed(2) }}%</span> </p>
            <p> <label class="fv-text-light"> Total Votes: </label> <span> {{ totalVotes }}</span> </p>
          </div>
        </fvMenu>
      </div>
      <div 
        v-else 
        class="choices-chart fv-bg-warning">
        <div 
          class="choice" 
          style="width: 100%"> There is no vote yet! </div>
      </div>
      <p 
        class="fv-padding fv-border-top"> <label class="fv-text-light"> Total votes: </label> {{ totalVotes }} </p>
    </div>
    <fvForm 
      v-if="voteForm" 
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
          <i class="fa fa-check" /> Submit
        </fvButton>
      </div>
    </fvForm>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  props: {
    poll: {
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
    voteForm: {
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
      return this.poll.choices.filter((choice, index) => {
        return this.poll.answers[index] > 0
      })
    },
    votesPercetange() {
      const totalVotes = this.totalVotes
      totalVotes
      return this.poll.answers.map(vote => (vote * 100) / totalVotes)
    }
  },
  methods: {
    async remove() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to delete this poll?'
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
  & .choices {
    & .choice {
      align-items: center;
    }
  }

  & .choices-chart {
    height: 3em;
    overflow: hidden;
    line-height: 1.3;
    display: flex;
    font-size: 0.88em;

    & .choice {
      background: rgba(255, 255, 255, 0.8);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      width: 0;
      border-left: solid 1px #e0e0e0;
      overflow: hidden;

      &.open {
        text-decoration: underline;
      }

      &:first-child {
        border-left: none;
      }

      &:nth-child(odd) {
        background: rgba(255, 255, 255, 0.9);
      }

      & b {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        padding: 0 1em;
      }
    }
  }
}
</style>
