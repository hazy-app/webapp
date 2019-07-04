<template>
  <appInnerContent 
    class="fv-padding-sm" 
    xs>
    <div class="fv-padding-sm" />
    <fvForm 
      method="POST"
      class="fv-row fv-border fv-shadow fv-radius"
      @submit="submit">
      <fvFormElement 
        class="fv-col-12" 
        label="Password*">
        <fvInput 
          v-model="form.password"
          type="password" 
          name="password"
          placeholder="Enter your password"
          required />
      </fvFormElement>
      <fvFormElement 
        class="fv-col-12" 
        label="Password Again*">
        <fvInput 
          v-model="form.password2"
          :required="passwordAgainChecker"
          type="password"
          placeholder="Enter your password again" 
        />
      </fvFormElement>
      <fvFormElement 
        class="fv-col-12" 
        label="Password Hint">
        <fvInput 
          v-model="form.password_hint"
          placeholder="Enter your password hint" />
      </fvFormElement>
      <small class="fv-col-12 fv-text-light"> Password hint can help you to recover your password if you forgot it. </small>
      <div class="fv-flex fv-col-12">
        <fvButton 
          type="submit" 
          class="fv-primary fv-grow">
          <appIcon icon="check" /> Submit
        </fvButton>
      </div>
    </fvForm>
  </appInnerContent>
</template>

<script>
import copy from 'clipboard-copy'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  },
  data() {
    return {
      form: {
        password: '',
        password2: '',
        password_hint: ''
      }
    }
  },
  methods: {
    passwordAgainChecker(pass) {
      return pass && pass === this.form.password
    },
    async submit() {
      this.$root.$loading.start()
      const requestConfig = {
        method: 'patch',
        url: `${process.env.BASE_URL}/users/${this.$route.params.username}`,
        headers: {},
        data: {
          password: this.form.password,
          password_hint: this.form.password_hint
        }
      }
      if (this.$route.query.token) {
        requestConfig.headers.authorization = decodeURIComponent(
          this.$route.query.token
        )
      }
      try {
        const response = await this.$axios(requestConfig)
        this.$root.$loading.finish()
        if (this.$route.query.action === 'copy') {
          const tempUrl = `https://hazyapp.com/${
            this.$route.params.username
          }/reset-password?token=${encodeURIComponent(
            response.data
          )}&action=redirect`
          copy(tempUrl)
          this.$alerts.toast('Link copied to clipboard!')
        } else {
          this.$alerts.toast(
            'Your account has been successfully updated!',
            'success'
          )
          this.$router.push('/login')
        }
      } catch (e) {
        this.$root.$loading.finish()
        this.$alerts.toast(e.response.data.message, 'failed')
      }
    }
  },
  head() {
    return {
      title: 'Hazy'
    }
  },
  asyncData({ store, params }) {
    store.commit('ui/setHeader', {
      title: `@${params.username}`,
      description: `Reset password`
    })
  }
}
</script>

<style>
</style>
