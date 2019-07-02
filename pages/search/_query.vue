<template>
  <appInnerContent 
    sm 
    class="fv-padding-sm">
    <div class="fv-padding-sm" />
    <appNothingToShow 
      v-if="users.length === 0" 
    />
    <appUserCard 
      v-for="user in users" 
      :user="user" 
      :key="user.username"
      class="fv-margin-bottom" />
  </appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appUserCard from '~/components/appUserCard.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'

export default {
  components: {
    appAccountLink,
    appUserCard,
    appNothingToShow
  },
  data() {
    return {
      users: []
    }
  },
  head() {
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Searching for ${this.$route.params.query}`
        }
      ]
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    try {
      ret.users = await $axios.$get(
        `${process.env.BASE_URL}/search?q=${params.query}`
      )
    } catch (e) {
      ret.users = []
    }
    store.commit('ui/setHeader', {
      title: 'Search',
      description: `Search result for '${params}'`
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
