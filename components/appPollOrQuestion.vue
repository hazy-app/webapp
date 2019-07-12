<template>
  <appPoll 
    v-if="item.type === 'poll'" 
    :poll="item"
    :is-mine="isMine" 
    :open-button="openButton" 
    :edit-buttons="editButtons" 
    :watch-as="watchAs"/>
  <appQuestion 
    v-else-if="item.type === 'question'" 
    :question="item"
    :is-mine="isMine" 
    :open-button="openButton" 
    :edit-buttons="editButtons" 
    :watch-as="watchAs"/>
</template>

<script>
import appPoll from '@/components/appPoll.vue'
import appQuestion from '@/components/appQuestion.vue'

export default {
  components: {
    appPoll,
    appQuestion
  },
  props: {
    item: {
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
    isMine: {
      type: Boolean,
      default: false
    },
    watchAs: {
      type: String,
      validator: v => ['creator', 'user'].indexOf(v) > -1,
      default: 'creator'
    }
  }
}
</script>
