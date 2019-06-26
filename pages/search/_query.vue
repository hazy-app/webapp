<template>
  <fvMain>
    <fvContent>
      <appHeader>
        <template slot="title"> Search result for <i>"{{ $route.params.query }}"</i> </template>
      </appHeader>

      <appInnerContent 
        sm 
        class="fv-padding-sm">
        <div class="fv-padding" />
        <p
          v-if="users.length === 0"
          class="fv-text-center">
          <i class="fa fa-circle-o" /> There is nothing to show :)
        </p>
        <appUserCard 
          v-for="user in users" 
          :user="user" 
          :key="user.username"
          class="fv-margin-bottom" />
      </appInnerContent>

    </fvContent>
  </fvMain>
</template>

<script>
import copy from 'clipboard-copy'
import appAccountLink from '~/components/appAccountLink.vue'
import appUserCard from '~/components/appUserCard.vue'

export default {
  components: {
    appAccountLink,
    appUserCard
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
    return ret
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  margin-bottom: -4rem;
}
</style>
