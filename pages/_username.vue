<template>
  <fvMain>
    <!-- <appSidebar/> -->
    <fvContent>
      <appHeader back>
        <fvAvatar 
          :name="user.username" 
          size="2rem" /> Sending message to "{{ user.username }}"
      </appHeader>
      <appInnerContent sm>
        <br>
        <fvForm 
          class="fv-row fv-border fv-shadow fv-radius"
          @submit="send">
          <fvFormElement 
            class="fv-col-12" 
            label="Message">
            <fvTextarea 
              v-model="form.text" 
              placeholder="Enter your message"
              autofocus
              auto-height
              required/>
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
            <p> <i class="fa fa-info-circle" /> {{ user.username }} never understand who you are! </p>
            <p> <i class="fa fa-info-circle" /> You can receive incognito messages too! <nuxt-link 
              class="fv-link" 
              to="/login"> Click here </nuxt-link> to register! </p>
          </div>
          <div class="fv-flex fv-col-12">
            <fvButton 
              type="submit" 
              class="fv-primary fv-grow">
              <i class="fa fa-send" /> Send
            </fvButton>
          </div>
        </fvForm>
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
      user: {},
      form: {
        text: '',
        recaptcha: false
      }
    }
  },
  methods: {
    async send() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$post(
          `${process.env.BASE_URL}/users/${
            this.$route.params.username
          }/messages`,
          {
            text: this.form.text,
            recaptcha: this.form.recaptcha
          }
        )
        this.$root.$loading.finish()
        this.$alerts.toast(
          'Your message has been sent successfully!',
          'success'
        )
        this.$router.push('/')
      } catch (e) {
        this.$root.$loading.finish()
        console.log(e.response)
        // console.log(Object.keys(e))
        this.$alerts.toast(e.data.message, 'failed')
      }
    }
  },
  async asyncData({ params, query, $axios }) {
    const user = await $axios.$get(
      `${process.env.BASE_URL}/users/${params.username}`
    )
    return {
      user
    }
  }
}
</script>

<style>
</style>
