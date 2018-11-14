<template>
  <fvMain>
    <!-- <appSidebar/> -->
    <fvContent>
      <appHeader 
        title="ورود" />
      <appInnerContent small>
        <br>
        <fvForm 
          v-if="otpSent === false" 
          class="fv-row fv-border"
          @submit="sendOtp(false)">
          <fvFormElement 
            class="fv-col-12" 
            label="شماره موبایل">
            <appInput 
              v-model="form.phone"
              autofocus 
              class="fv-ltr fv-text-center"
              placeholder="شماره موبایل خود را وارد کنید" 
              validation="mobile"
              required />
          </fvFormElement>

          <div class="fv-flex fv-col-12">
            <fvButton 
              type="submit" 
              class="fv-primary fv-grow"> ارسال کد </fvButton>
          </div>
        </fvForm>
        <fvForm 
          v-else 
          class="fv-row fv-border"
          @submit="verifyOtp()">
          <fvFormElement 
            class="fv-col-12" 
            label="کد دریافتی">
            <appInput 
              v-model="form.otp"
              autofocus 
              class="fv-ltr fv-text-center"
              placeholder="کد دریافتی از طریق موبایل خود را وارد کنید" 
              validation="otp"
              required />
          </fvFormElement>

          <div class="fv-flex fv-col-12">
            <fvButton 
              type="submit" 
              class="fv-primary fv-grow"> ورود </fvButton>
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
        phone: '',
        otp: ''
      },
      otpSent: false,
      lastUsedCall: undefined
    }
  },
  created() {
    console.log('login created')
  },
  methods: {
    async sendOtp(call_to = false) {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.post(
          `${process.env.accountUrl}/v3/auth/otp`,
          {
            phone: this.form.phone,
            call_to
          }
        )
        this.otpSent = true
        this.$root.$loading.finish()
        this.$alerts.toast('کد OTP برای شماره موبایل شما ارسال شد.', 'success')
        this.$nextTick(() => {
          window.document.querySelector('[autofocus]').focus()
        })
      } catch (e) {
        this.$root.$loading.finish()
        this.$alerts.toast('ارسال کد با مشکل مواجه شد.', 'failed')
      }
    },
    async verifyOtp() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.post(
          `${process.env.accountUrl}/v3/auth/otp/verify`,
          {
            phone: this.form.phone,
            otp: this.form.otp,
            appid: process.env.appId
          }
        )
        await this.$store.dispatch('setAccessToken', {
          accessToken: response.headers['x-access-token'],
          tokenType: response.headers['x-token-type'],
          refreshToken: response.headers['x-refresh-token']
        })
        const redirect = decodeURIComponent(this.$route.query.redirect || '/')
        this.$root.$loading.finish()
        this.$alerts.toast('خوش‌آمدید!', 'success')
        console.log('redirecting to ' + redirect)
        this.$router.push(redirect)
      } catch (e) {
        this.$root.$loading.finish()
        this.$alerts.toast(e.response.data.message, 'failed')
      }
    }
  },
  middleware: 'auth'
}
</script>

<style>
</style>
