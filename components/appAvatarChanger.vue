<template>
  <fvForm 
    method="POST"
    class="fv-row"
    @submit="save">
    <div class="fv-col-12 fv-text-center">
      <appAvatar 
        :username="username" 
        :avatar="syncedHashedEmail"
        size="96px" />
    </div>
    <fvFormElement 
      class="fv-col-12" 
      label="Email address or Gravatar hash">
      <fvInput 
        v-model="email"
        placeholder="Enter your email address or just Gravatar hash"
        required/>
    </fvFormElement>
    <div class="fv-text-light fv-padding-start-sm fv-padding-end-sm">
      <p> <appIcon icon="info" /> Put your <a 
        class="fv-link" 
        target="_blank" 
        rel="noreferrer" 
        href="https://en.gravatar.com">Gravatar</a> registred email address! </p>
      <p> <appIcon icon="info" /> We hash your email address it localy on your machine and just save hashed version to find your Gravatar avatar! </p> 
      <p> <appIcon icon="info" /> Also you can put your MD5 hashed email address if you feel better. </p> 
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
      default: undefined
    }
  },
  data: () => ({
    email: undefined,
    syncedHashedEmail: '',
    syncingTimer: undefined
  }),
  computed: {
    hashedEmail() {
      if (this.email && this.email.indexOf('@') !== -1) {
        return this.$md5(this.email || '')
      }
      return this.email || ''
    }
  },
  watch: {
    email(email) {
      clearTimeout(this.syncingTimer)
      this.syncingTimer = setTimeout(() => {
        if (this.email) {
          this.syncedHashedEmail = this.hashedEmail
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
        this.$store.commit('ui/resetAvatarRefreshHash', this.username)
        this.$eventBus.$emit('avatarChange', this.username)
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
