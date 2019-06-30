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
        v-if="!editButtons && isMine" 
        :to="'/' + poll.creator + '/polls/' + poll.uuid" 
        class="fv-margin-start fv-link"> <i class="fa fa-commenting-o" /> Open </nuxt-link>
    </div>
    <div class="fv-padding">
      <p :style="{'direction': $calcDirection(poll.title)}">
        {{ poll.title }}
      </p>
    </div>
    <div class="fv-padding fv-border-top choices">
      <fvFormElement 
        label="Choices" 
        inline>
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
    poll: {
      type: Object,
      default: () => ({})
    },
    editButtons: {
      type: Boolean,
      default: false
    },
    isMine: {
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
  data() {
    return {
      selectedChoice: undefined
    }
  },
  methods: {
    async remove() {
      const check = await this.$alerts.confirm(
        'Are you sure you want to delete this message?'
      )
      if (check) {
        console.log(this.poll)
        this.$emit('remove', this.poll)
      }
    },
    reply() {
      this.$emit('reply', this.message)
    },
    privacyChange() {
      this.$emit('privacyChange', this.poll)
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
}
</style>
