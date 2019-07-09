<template>
  <appInnerContent 
    class="fv-padding-sm"
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-margin-bottom" />
    <div
      v-if="isMine" 
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your created questions to your friends and let them to answer your question anonymously! </p>
      <div class="fv-margin-top">
        <nuxt-link 
          :to="'/' + $store.state.parsedToken.username + '/questions/new'" 
          class="fv-button fv-primary"> <appIcon icon="plus-circle" /> Ask New Question </nuxt-link>
      </div>
    </div>
    <appNothingToShow 
      v-if="questions.length === 0" 
    />
    <appQuestion 
      v-for="question in questions"
      :key="'question' + question._id" 
      :question="question"
      :edit-buttons="false"
      :open-button="true"
      :send-form="false"
      :watch-as="isMine ? 'creator' : 'user'"
      class="fv-border fv-margin-bottom" />
    <div class="fv-text-center">
      <fvButton 
        v-if="hasNext && !loading" 
        @click="loadMore">
        <appIcon icon="more-horizontal" /> Load More
      </fvButton>
      <fvLoading v-if="loading" />
    </div>
  </appInnerContent>
</template>

<script>
import twitterCard from '~/utils/twitter-card.js'
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appQuestion from '~/components/appQuestion.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appQuestion,
    appNothingToShow,
    appAccountAccessLinks,
    appIcon
  },
  data() {
    return {
      isMine: false,
      page: 1,
      hasNext: true,
      loading: false,
      questions: []
    }
  },
  methods: {
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    },
    async loadMore() {
      this.loading = true
      this.page++
      const response = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${
          this.$store.state.parsedToken.username
        }/questions?per_page=10&page=${this.page}`
      )
      this.questions = this.questions.concat(response.result)
      this.hasNext = response.hasNext

      this.loading = false
    }
  },
  head() {
    return twitterCard(this.$route.params.username, 'Questions')
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    ret.page = query.page ? parseInt(query.page) : 1
    try {
      const response = await $axios.$get(
        `${process.env.BASE_URL}/users/${
          params.username
        }/questions?per_page=10&page=${ret.page}`
      )
      ret.hasNext = response.hasNext
      ret.totalPages = response.totalPages
      ret.questions = response.result
    } catch (e) {
      return redirect('/login')
    }
    ret.isMine = store.state.parsedToken.username === params.username
    // if (!ret.isMine && ret.questions.length === 1) {
    //   return redirect(`/${params.username}/questions/${ret.questions[0]._id}`)
    // }
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `List of created questions by @${params.username}`
    })
    return ret
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  margin-bottom: -4rem;
}
.form {
  padding-top: 4rem;
}
</style>
