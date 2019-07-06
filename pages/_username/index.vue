<template>
  <appInnerContent 
    sm 
    class="fv-padding-sm">
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-border-top fv-border-start fv-border-end" />
    <!-- <div 
      v-if="isMine"
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your profile link to your friends to receive anonymous messages! </p>
      <div  
        class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="copyLink"> <appIcon icon="copy" /> Copy Link </fvButton>
      </div>
    </div> -->
    <div
      v-if="isMine" 
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your created questions to your friends and let them to answer it anonymously! </p>
      <div class="fv-margin-top">
        <nuxt-link 
          :to="'/' + $store.state.parsedToken.username + '/questions/new'" 
          class="fv-button fv-primary"> <appIcon icon="plus-circle" /> Create New Question </nuxt-link>
      </div>
    </div>

    <appQuestion 
      v-for="question in questions"
      :key="'question' + question._id" 
      :question="question"
      :edit-buttons="false"
      :open-button="true"
      :watch-as="isMine ? 'creator' : 'user'"
      class="fv-margin-bottom" />
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
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'
import appQuestion from '@/components/appQuestion.vue'

export default {
  components: {
    appAccountLink,
    appAccountAccessLinks,
    appIcon,
    appQuestion
  },
  data() {
    return {
      isMine: false,
      loading: false,
      questions: [],
      form: {
        text: '',
        recaptcha: false
      }
    }
  },
  methods: {
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    },
    copyLink() {
      const url = `${document.location.protocol}//${document.location.host}/${
        this.$route.params.username
      }`
      copy(url)
      this.$alerts.toast('Link copied to clipboard!')
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
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Send anonymous message to @${this.$route.params.username}`
        }
      ]
    }
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
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `Send anonymous message to @${params.username}`
    })
    return ret
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  margin-bottom: -4rem;
}
</style>
