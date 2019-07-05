<template>
  <appInnerContent 
    class="fv-padding-sm" 
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-border-top fv-border-start fv-border-end" />
    <div>
      <appPollCreator 
        :user="$route.params.username"
        :title.sync="poll.title" 
        :choices.sync="poll.choices"
        @created="done" />
    </div>
  </appInnerContent>
</template>

<script>
import appPollCreator from '~/components/appPollCreator.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'

export default {
  components: {
    appPollCreator,
    appAccountLink,
    appAccountAccessLinks
  },
  data() {
    return {
      poll: {
        choices: ['', '', ''],
        title: ''
      }
    }
  },
  methods: {
    done(poll) {
      this.$router.push(`/${this.$route.params.username}/polls`)
    }
  },
  asyncData({ store, params }) {
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: 'Create new poll'
    })
  }
}
</script>
