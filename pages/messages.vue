<template>
  <fvMain>
    <!-- <appSidebar/> -->
    <fvContent>
      <appHeader
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"> Incomming Messages </appHeader>
      <appInnerContent sm>
        <div
          v-if="messages.length === 0"
          class="fv-text-center">
          You dont have an any messages yet!
        </div>
        <div 
          v-for="message in messages"
          v-else
          :key="message.id" 
          class="fv-margin-bottom fv-flex">
          <div class="fv-margin-end-sm fv-padding-top-sm">
            <i class="fa fa-user-secret fv-size-xl" />
          </div>
          <div class="fv-border fv-shadow fv-radius fv-grow">
            <p class="fv-padding-sm fv-font-lg message-text">{{ message.text }}</p>
            <div class="fv-flex fv-padding-sm">
              <div class="fv-grow" />
              <div 
                :title="message.create_date" 
                class="fv-margin-end-sm fa-text-gray">
                <i class="fa fa-calendar" /> {{ message.create_date | dateFromNow }}
              </div>
              <!-- <div>
                <a class="fv-link fv-text-danger">
                  <i class="fa fa-trash" /> Delete
                </a>
              </div> -->
            </div>
          </div>
        </div>
        <div class="fv-text-center">
          <fvButton 
            v-if="hasNext && !loading" 
            @click="loadMore">
            <i class="fa fa-ellipsis-h" /> Load More
          </fvButton>
          <fvLoading v-if="loading" />
        </div>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      page: 1,
      hasNext: true,
      loading: false,
      messages: []
    }
  },
  methods: {
    async loadMore() {
      this.loading = true
      this.page++
      const response = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${
          this.$store.state.parsedToken.username
        }/messages?per_page=10&page=${this.page}`
      )
      this.messages = this.messages.concat(response.result)
      this.hasNext = response.hasNext

      this.loading = false
    }
  },
  async asyncData({ store, query, $axios }) {
    const ret = {}
    ret.page = query.page ? parseInt(query.page) : 1
    const response = await $axios.$get(
      `${process.env.BASE_URL}/users/${
        store.state.parsedToken.username
      }/messages?per_page=10&page=${ret.page}`
    )
    ret.hasNext = response.hasNext
    ret.totalPages = response.totalPages
    ret.messages = response.result
    return ret
  },
  middleware: 'auth'
}
</script>

<style scoped>
.message-text {
  white-space: pre-line;
}
</style>
