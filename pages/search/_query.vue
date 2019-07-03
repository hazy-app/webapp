<template>
  <appInnerContent class="fv-padding-sm">
    <div class="fv-padding-sm" />
    <appNothingToShow 
      v-if="users.length === 0" 
    />
    <div class="fv-row fv-no-padding">
      <div 
        v-for="user in users" 
        :key="user.username" 
        class="fv-col">
        <appAccountAccessLinks 
        
          :username="user.username" 
        
          class="fv-border fv-shadow fv-radius" />
      </div>
  </div></appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '~/components/appAccountAccessLinks.vue'
import appUserCard from '~/components/appUserCard.vue'
import appNothingToShow from '~/components/appNothingToShow.vue'

export default {
  components: {
    appAccountLink,
    appUserCard,
    appNothingToShow,
    appAccountAccessLinks
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
    if (ret.users.length === 1) {
      return redirect(`/${ret.users[0].username}`)
    }
    store.commit('ui/setHeader', {
      title: 'Search',
      description: `Search result for '${params.query}'`
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
