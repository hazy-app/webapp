<template>
  <appInnerContent 
    class="fv-padding-sm" 
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-border-top fv-border-start fv-border-end" />
    <div>
      <appQuestionCreator 
        :user="$route.params.username"
        :text.sync="question.text" 
        @created="done" />
    </div>
  </appInnerContent>
</template>

<script>
import appQuestionCreator from '~/components/appQuestionCreator.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'

export default {
  components: {
    appQuestionCreator,
    appAccountLink,
    appAccountAccessLinks
  },
  data() {
    return {
      question: {
        text: ''
      }
    }
  },
  methods: {
    done(poll) {
      this.$router.push(`/${this.$route.params.username}`)
    }
  },
  asyncData({ store, params }) {
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: 'Create new question'
    })
  }
}
</script>
