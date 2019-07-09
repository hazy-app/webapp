<template>
  <appInnerContent 
    xs 
    class="fv-padding-sm">
    <div class="fv-padding-sm fv-hidden-xs fv-hidden-sm" />
    <fvForm 
      method="POST"
      class="fv-border fv-row" 
      @submit="login">
      <fvFormElement 
        class="fv-col-12" 
        label="Username">
        <fvInput 
          v-model="form.username"
          name="username"
          autofocus 
          placeholder="Enter your username" 
          required />
      </fvFormElement>
      <fvFormElement 
        class="fv-col-12" 
        label="Password">
        <fvInput 
          v-model="form.password"
          type="password"
          name="password"
          placeholder="Enter your password" 
          required />
      </fvFormElement>
      <div class="fv-col-12 fv-text-light">
        <p v-if="password_hint"> <appIcon icon="key" /> Your password hint was "{{ password_hint }}"! </p>
      </div>
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
        <p> <appIcon icon="info" /> You don't have an account? <nuxt-link 
          class="fv-link" 
          to="/register">Click here</nuxt-link> to register! </p>
      </div>
      <div class="fv-flex fv-col-12">
        <fvButton 
          type="submit" 
          class="fv-primary fv-grow">
          <appIcon icon="log-in" /> Login
        </fvButton>
      </div>
    </fvForm>
  </appInnerContent>
</template>

<script>
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
        recaptcha: false
      },
      password_hint: null
    }
  },
  watch: {
    'form.username'() {
      this.password_hint = null
    }
  },
  methods: {
    async loadPasswordHint() {
      const user = await this.$axios.$get(
        `${process.env.BASE_URL}/users/${this.form.username}`
      )
      return user.password_hint
    },
    async login() {
      this.$root.$loading.start()
      try {
        await this.$store.dispatch('login', {
          username: this.form.username,
          password: this.form.password,
          recaptcha: this.form.recaptcha
        })
        const redirect = decodeURIComponent(
          this.$route.query.redirect || `/${this.form.username}`
        )
        this.$root.$loading.finish()
        this.$alerts.toast('Welcome to Hazy!', 'success')
        this.$router.push(redirect)
      } catch (e) {
        this.form.recaptcha = false
        this.$root.$loading.finish()
        if (e.response.status === 401) {
          this.form.password = ''
          this.password_hint = await this.loadPasswordHint()
        }
        this.$alerts.toast(
          (((e || {}).response || {}).data || {}).message || 'Unhandled Error!',
          'failed'
        )
      }
    }
  },
  head() {
    return {
      title: 'Hazy'
    }
  },
  asyncData({ store }) {
    store.commit('ui/setHeader', {
      title: 'Hazy',
      description: 'Login to your account'
    })
  }
}
</script>
