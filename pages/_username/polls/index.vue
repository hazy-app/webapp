<template>
  <appInnerContent 
    class="fv-padding-sm"
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      class="fv-border-top fv-border-start fv-border-end" />
    <div
      v-if="isMine" 
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your created polls to your friends and let them to answer your question anonymously! </p>
      <div class="fv-margin-top">
        <nuxt-link 
          :to="'/' + $store.state.parsedToken.username + '/polls/new'" 
          class="fv-button fv-primary"> <appIcon icon="plus-circle" /> Create New Poll </nuxt-link>
      </div>
    </div>
    <appNothingToShow 
      v-if="polls.length === 0" 
    />
    <appPoll 
      v-for="poll in polls"
      :key="'poll' + poll._id" 
      :poll="poll"
      :edit-buttons="false"
      :open-button="true"
      :vote-form="false"
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
import appPoll from '~/components/appPoll.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appPoll,
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
      polls: []
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
        }/polls?per_page=10&page=${this.page}`
      )
      this.polls = this.polls.concat(response.result)
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
          content: `Look at created polls by @${this.$route.params.username}!`
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
        }/polls?per_page=10&page=${ret.page}`
      )
      ret.hasNext = response.hasNext
      ret.totalPages = response.totalPages
      ret.polls = response.result
    } catch (e) {
      return redirect('/login')
    }
    ret.isMine = store.state.parsedToken.username === params.username
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `List of created polls by @${params.username}`
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
