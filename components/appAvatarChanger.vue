<template>
  <fvForm 
    method="POST"
    class="fv-row"
    @submit="save">
    <div class="fv-col-12 fv-text-center">
      <appAvatar 
        :username="username" 
        :avatar="syncedGravatarUrl"
        size="96px" />
    </div>
    <fvFormElement 
      class="fv-col-12" 
      label="Email address">
      <fvInput 
        v-model="email"
        type="email"
        placeholder="Enter your email address"
        required/>
    </fvFormElement>

    <div class="fv-text-light fv-padding-start-sm fv-padding-end-sm">
      <p> <appIcon icon="info" /> Put your <a 
        class="fv-link" 
        target="_blank" 
        rel="noreferrer" 
        href="https://en.gravatar.com">Gravatar</a> registred email address! </p>
      <p> <appIcon icon="info" /> Your email address don't save anywhere! We hash it locally on your machine and then save hashed version to find your Gravatar avatar! </p> 
    </div>
    <div class="fv-flex fv-col-12">
      <fvButton 
        type="submit" 
        class="fv-primary fv-grow">
        <appIcon icon="image" /> Update
      </fvButton>
    </div>
  </fvForm>
</template>

<script>
import appIcon from '@/components/appIcon.vue'
import appAvatar from '@/components/appAvatar.vue'

export default {
  components: {
    appIcon,
    appAvatar
  },
  props: {
    username: {
      type: String,
      required: true
    }
  },
  data: () => ({
    email: undefined,
    syncedGravatarUrl: '',
    syncingTimer: undefined
  }),
  computed: {
    hashedEmail() {
      return this.$md5(this.email || '')
    },
    gravatarUrl() {
      if (!this.email) {
        return undefined
      }
      return `https://www.gravatar.com/avatar/${this.hashedEmail}?size=96`
    }
  },
  watch: {
    email(email) {
      clearTimeout(this.syncingTimer)
      this.syncingTimer = setTimeout(() => {
        if (this.gravatarUrl) {
          this.syncedGravatarUrl = this.gravatarUrl
        }
      }, 500)
    }
  },
  methods: {
    async save() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$patch(
          `${process.env.BASE_URL}/users/${this.username}`,
          {
            gravatar: this.hashedEmail
          }
        )
        this.$store.dispatch('setAuthorization', {
          authorization: response
        })
        this.email = ''
        this.$root.$loading.finish()
        this.$emit('changed', response)
        this.$alerts.toast(
          `Your avatar has been updated successfully!`,
          'success'
        )
      } catch (e) {
        console.log(e)
        this.$emit('error', e.response)
        this.$alerts.toast(
          (((e || {}).response || {}).data || {}).message || 'Unhandled Error!',
          'failed'
        )
      }
    }
  }
}
</script>
