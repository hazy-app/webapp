<template>
  <fvForm 
    method="POST"
    class="fv-row"
    @submit="send">
    <fvFormElement class="fv-col-12">
      <fvTextarea 
        ref="input" 
        v-model="form.text"
        placeholder="Enter your message"
        auto-height
        required
        @focus.native="recaptchaVisibility = true"
        @input="setInputDirection"/>
    </fvFormElement>
    <!-- <fvFormElement 
      v-if="saveButton"
      label="Save to Local Storage" 
      class="fv-col-12"
      inline>
      <fvSwitch 
        v-model="saveToLocalStorage" />
    </fvFormElement> -->
    <fvFormElement
      v-if="recaptcha"
      v-show="recaptchaVisibility"
      class="fv-col-12">
      <div class="fv-text-center">
        <no-ssr>
          <appRecaptcha v-model="form.recaptcha" />
        </no-ssr>
      </div>
    </fvFormElement>
    <div class="fv-text-light fv-padding-start-sm fv-padding-end-sm">
      <p v-if="typeof message === 'undefined'"> <appIcon icon="info" /> @{{ user }} never understand who you are! </p>
      <p v-if="!$store.state.parsedToken.username"> <appIcon icon="info" /> You can receive anonymous messages too! <nuxt-link 
        class="fv-link" 
        to="/register"> Click here </nuxt-link> to register! </p>
    </div>
    <div class="fv-flex fv-col-12">
      <fvButton 
        type="submit" 
        class="fv-primary fv-grow">
        <appIcon icon="send" /> {{ buttonText }}
      </fvButton>
    </div>
  </fvForm>
</template>

<script>
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  },
  props: {
    user: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: undefined
    },
    question: {
      type: String,
      default: undefined
    },
    buttonText: {
      type: String,
      default: 'Send'
    },
    saveButton: {
      type: Boolean,
      default: true
    },
    recaptcha: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    form: {
      text: '',
      recaptcha: false
    },
    recaptchaVisibility: false,
    saveToLocalStorage: true
  }),
  computed: {
    isReply() {
      return typeof this.message !== 'undefined'
    },
    apiUrl() {
      if (this.isReply) {
        return `${process.env.BASE_URL}/users/${this.user}/messages/${
          this.message
        }`
      }
      return `${process.env.BASE_URL}/users/${this.user}/messages?question=${
        this.question
      }`
    }
  },
  methods: {
    async send() {
      this.$root.$loading.start()
      try {
        const requestConfig = {
          method: this.isReply ? 'put' : 'post',
          url: this.apiUrl,
          headers: {},
          data: {
            [this.isReply ? 'reply' : 'text']: this.form.text,
            recaptcha: this.form.recaptcha || undefined
          }
        }
        if (!this.isReply) {
          requestConfig.headers.authorization = ':D'
        }
        const response = await this.$axios(requestConfig)
        this.$root.$loading.finish()
        this.$emit('sent', response.data)
        this.form.text = undefined
        this.form.recaptcha = undefined
        if (this.isReply) {
          this.$alerts.toast(
            `Your reply has been set to that message!`,
            'success'
          )
        } else {
          if (
            this.saveButton &&
            this.saveToLocalStorage &&
            this.$sentMessages
          ) {
            this.$sentMessages.save(response.data)
          }
          this.$alerts.toast(
            `Your message has been sent to ${this.user} successfully!`,
            'success'
          )
        }
      } catch (e) {
        console.log(e)
        this.form.recaptcha = false
        this.$root.$loading.finish()
        this.$emit('error', e.response)
        this.$alerts.toast(
          (((e || {}).response || {}).data || {}).message || 'Unhandled Error!',
          'failed'
        )
      }
    },
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    }
  }
}
</script>
