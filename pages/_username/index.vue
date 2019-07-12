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
      class="fv-border fv-padding fv-text-center fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your created items to your friends and let them to answer your question/poll anonymously! </p>
      <div class="fv-margin-top">
        <nuxt-link 
          :to="'/' + $store.state.parsedToken.username + '/questions/new'" 
          class="fv-button fv-primary fv-margin-sm"> <appIcon icon="plus-circle" /> Ask New Question </nuxt-link>
        <nuxt-link 
          :to="'/' + $store.state.parsedToken.username + '/polls/new'" 
          class="fv-button fv-primary fv-margin-sm"> <appIcon icon="plus-circle" /> Create New Poll </nuxt-link>
      </div>
    </div>
    <appPollOrQuestion 
      v-for="item in items"
      :key="'item' + item._id" 
      :item="item"
      :edit-buttons="false"
      :open-button="true"
      :watch-as="isMine ? 'creator' : 'user'"
      class="fv-border fv-margin-bottom" />
  </appInnerContent>
</template>

<script>
import twitterCard from '~/utils/twitter-card.js'
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appPollOrQuestion from '~/components/appPollOrQuestion.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appPollOrQuestion,
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
      items: []
    }
  },
  methods: {
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
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
        `${process.env.BASE_URL}/users/${params.username}/all`
      )
      ret.items = response
    } catch (e) {
      return redirect('/login')
    }
    ret.isMine = store.state.parsedToken.username === params.username
    // if (!ret.isMine && ret.questions.length === 1) {
    //   return redirect(`/${params.username}/questions/${ret.questions[0]._id}`)
    // }
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `List of created questions/polls by @${params.username}`
    })
    return ret
  }
}
</script>
