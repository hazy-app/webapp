<template>
  <fvMain>
    <!-- <appSidebar/> -->
    <fvContent>
      <appHeader :home="true"> Login </appHeader>
      <appInnerContent xs>
        <fvForm 
          class="fv-row fv-border fv-shadow fv-radius"
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
          <fvFormElement
            class="fv-col-12">
            <div class="fv-text-center">
              <no-ssr>
                <appRecaptcha v-model="form.recaptcha" />
              </no-ssr>
            </div>
          </fvFormElement>
          <div class="fv-col-12 fv-text-light">
            <p> <i class="fa fa-info-circle" /> We never save your information when you sending messages! </p>
            <p> <i class="fa fa-info-circle" /> You don't have an account? <nuxt-link 
              class="fv-link" 
              to="/register">Click here</nuxt-link> to register! </p>
          </div>
          <div class="fv-flex fv-col-12">
            <fvButton 
              type="submit" 
              class="fv-primary fv-grow">
              <i class="fa fa-sign-in" /> Login
            </fvButton>
          </div>
        </fvForm>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        recaptcha: false
      }
    }
  },
  methods: {
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
        this.$alerts.toast(e.response.data.message, 'failed')
      }
    }
  },
  head() {
    return {
      title: 'Hazy - Send and Receive anonymous messages'
    }
  }
}
</script>
