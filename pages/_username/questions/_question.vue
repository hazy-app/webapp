<template>
  <appInnerContent 
    class="fv-padding-sm" 
    sm>
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <appAccountAccessLinks 
      :username="$route.params.username" 
      only-profile
      class="fv-margin-bottom" />
    <div 
      v-if="isMine"
      class="fv-padding fv-text-center fv-border fv-margin-bottom">
      <p> <appIcon icon="info" /> Share your question link to your friends to receive anonymous answers! </p>
      <div  
        class="fv-margin-top">
        <fvButton 
          class="fv-primary" 
          @click="copyLink"> <appIcon icon="copy" /> Copy Link </fvButton>
      </div>
    </div>
    <appQuestion 
      :question="question"
      :edit-buttons="isMine"
      :watch-as="isMine ? 'creator' : 'user'"
      :open-button="false"
      :send-form="!isMine"
      :view-replies-button="true"
      class="fv-border"
      @remove="remove"
      @answered="$router.push('/' + question.creator + '/messages?question=' + question._id)" />
  </appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appQuestion from '~/components/appQuestion.vue'
import appAccountLink from '~/components/appAccountLink.vue'
import appAccountAccessLinks from '@/components/appAccountAccessLinks.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appQuestion,
    appAccountLink,
    appAccountAccessLinks,
    appIcon
  },
  data() {
    return {
      isMine: false,
      question: {}
    }
  },
  head() {
    return {
      title: 'Hazy',
      meta: [
        {
          property: 'twitter:description',
          content: `Look at created question by @${
            this.$route.params.username
          }!`
        }
      ]
    }
  },
  methods: {
    async remove(question) {
      this.$root.$loading.start()
      try {
        await this.$axios.$delete(
          `${process.env.BASE_URL}/users/${
            this.$store.state.parsedToken.username
          }/questions/${question._id}`
        )
        this.$alerts.toast(
          'Your question has been successfully deleted!',
          'success'
        )
        this.$root.$loading.finish()
        this.$router.push(`/${this.$route.params.username}/questions`)
      } catch (e) {
        console.log(e)
        this.$root.$loading.finish()
      }
    },
    copyLink() {
      copy(window.document.location.href)
      this.$alerts.toast('Link copied to clipboard!')
    }
  },
  async asyncData({ params, query, store, $axios, redirect }) {
    const ret = {}
    try {
      ret.question = await $axios.$get(
        `${process.env.BASE_URL}/users/${params.username}/questions/${
          params.question
        }`
      )
      if (store.state.parsedToken.username === params.username) {
        ret.isMine = true
      }
    } catch (e) {
      console.log(e)
      // 404 error. other errors not handled yet :(
      if (!ret.isMine) {
        return redirect(`/${params.username}/questions/default`)
      } else {
        throw {
          statusCode: 404,
          message: 'Question not found!'
        }
      }
    }
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `Vote to created question by @${params.username}`
    })
    return ret
  }
}
</script>
