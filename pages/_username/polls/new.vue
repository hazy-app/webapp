<template>
  <fvMain>
    <fvContent>
      <appHeader>
        <template slot="title"> Polls </template>
        <template slot="description"> Creating new poll </template>
      </appHeader>

      <appInnerContent 
        class="fv-padding-sm" 
        sm>
        <div class="fv-padding-sm" />

        <div class="fv-margin-top">
          <appPollCreator 
            :user="$route.params.username"
            :title.sync="poll.title" 
            :choices.sync="poll.choices"
            @created="done" />
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import appPollCreator from '~/components/appPollCreator.vue'
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appPollCreator,
    appAccountLink
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
  }
}
</script>
