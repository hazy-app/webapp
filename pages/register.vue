<template>
  <fvMain>
    <!-- <appSidebar/> -->
    <fvContent>
      <appHeader> Login </appHeader>
      <appInnerContent xs>
        <br>
        <fvForm 
          class="fv-row fv-border fv-shadow fv-radius"
          @submit="login">
          <fvFormElement 
            class="fv-col-12" 
            label="Username">
            <fvInput 
              v-model="form.username"
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
              placeholder="Enter your password" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-12" 
            label="Password Again">
            <fvInput 
              v-model="form.password2"
              type="password"
              placeholder="Enter your password again" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-12" 
            label="Password Hint">
            <fvInput 
              v-model="form.password_hint"
              placeholder="Enter your password hint" />
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
            <p> <i class="fa fa-info-circle" /> You already have an account? <nuxt-link 
              class="fv-link" 
              to="/login">Click here</nuxt-link> to login! </p>
          </div>
          <div class="fv-flex fv-col-12">
            <fvButton 
              type="submit" 
              class="fv-primary fv-grow">
              <i class="fa fa-check" /> Register
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
        password2: '',
        password_hint: '',
        recaptcha: false
      }
    }
  },
  methods: {
    async login() {
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
        await this.$store.dispatch('login', {
          username: this.form.username,
          password: this.form.password,
          recaptcha: this.form.recaptcha
        })
        const redirect = decodeURIComponent(this.$route.query.redirect || '/')
        this.$root.$loading.finish()
        this.$alerts.toast(
          'Your account successfully created on Hazy!',
          'success'
        )
        this.$router.push(redirect)
      } catch (e) {
        this.$root.$loading.finish()
        console.log(e.response)
        // console.log(Object.keys(e))
        this.$alerts.toast(e.data.message, 'failed')
      }
    }
  }
}
</script>

<style>
</style>
