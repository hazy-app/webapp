<template>
  <appInnerContent 
    xs 
    class="fv-padding-sm">
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <fvForm 
      method="POST"
      class="fv-border fv-row" 
      @submit="register">
      <fvFormElement 
        class="fv-col-12" 
        label="Username*">
        <fvInput 
          v-model="form.username"
          :required="usernameChecker"
          name="username" 
          autofocus 
          placeholder="Enter your username" />
        <small class="fv-text-light fv-block fv-padding-sm"> Username only can contain any letters from a to z and any numbers from 0 through 9. plus <i>-</i> and <i>_</i>. </small>
      </fvFormElement>
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
      <fvFormElement
        class="fv-col-12">
        <div class="fv-text-center">
          <no-ssr>
            <appRecaptcha v-model="form.recaptcha" />
          </no-ssr>
        </div>
      </fvFormElement>
      <div class="fv-col-12 fv-text-light">
        <p> <appIcon icon="info" /> We never save your information when you sending messages! </p>
        <p> <appIcon icon="info" /> You already have an account? <nuxt-link 
          class="fv-link" 
          to="/login">Click here</nuxt-link> to login! </p>
      </div>
      <div class="fv-flex fv-col-12">
        <fvButton 
          type="submit" 
          class="fv-primary fv-grow">
          <appIcon icon="check" /> Register
        </fvButton>
      </div>
    </fvForm>
  </appInnerContent>
</template>

<script>
import twitterCard from '~/utils/twitter-card.js'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        password2: '',
        password_hint: '',
        recaptcha: false
      }
    }
  },
  methods: {
    passwordAgainChecker(pass) {
      return pass && pass === this.form.password
    },
    usernameChecker(uname) {
      return /^[a-zA-Z0-9\_\-]+$/.test(uname)
    },
    async register() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$post(
          `${process.env.BASE_URL}/users`,
          {
            username: this.form.username,
            password: this.form.password,
            password_hint: this.form.password_hint,
            recaptcha: this.form.recaptcha
          }
        )
        this.$root.$loading.finish()
        this.$alerts.toast(
          'Your account successfully created on Hazy!',
          'success'
        )
        document.location = '/login'
      } catch (e) {
        this.form.recaptcha = false
        this.$root.$loading.finish()
        this.$alerts.toast(
          (((e || {}).response || {}).data || {}).message || 'Unhandled Error!',
          'failed'
        )
      }
    }
  },
  head() {
    return twitterCard(
      undefined,
      undefined,
      'Register a new account',
      `Hazy - Register`
    )
  },
  asyncData({ store }) {
    store.commit('ui/setHeader', {
      title: 'Hazy',
      description: 'Create new account'
    })
  }
}
</script>

<style>
</style>
