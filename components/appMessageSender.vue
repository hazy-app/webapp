<template>
  <fvForm 
    method="POST"
    class="fv-row"
    @submit="send">
    <fvFormElement 
      :label="messageLabel" 
      class="fv-col-12">
      <fvTextarea 
        ref="input" 
        v-model="form.text"
        placeholder="Enter your message"
        autofocus
        auto-height
        required
        @input="setInputDirection"/>
    </fvFormElement>
    <fvFormElement 
      v-if="saveButton"
      label="Save to Local Storage" 
      class="fv-col-12"
      inline>
      <fvSwitch 
        v-model="saveToLocalStorage" />
    </fvFormElement>
    <fvFormElement
      v-if="recaptcha"
      class="fv-col-12">
      <div class="fv-text-center">
        <no-ssr>
          <appRecaptcha v-model="form.recaptcha" />
        </no-ssr>
      </div>
    </fvFormElement>
    <div class="fv-text-light fv-padding-start-sm fv-padding-end-sm">
      <p v-if="saveButton"> <i class="fa fa-info-circle" /> Saving message to Local Storage only save the message to your local machine storage and not related to your account. We dont sent even a single byte of this private data to server and you can clear it anytime you want. </p>
      <p v-if="typeof message === 'undefined'"> <i class="fa fa-info-circle" /> @{{ user }} never understand who you are! </p>
      <p v-if="!$store.state.parsedToken.username"> <i class="fa fa-info-circle" /> You can receive anonymous messages too! <nuxt-link 
        class="fv-link" 
        to="/register"> Click here </nuxt-link> to register! </p>
    </div>
    <div class="fv-flex fv-col-12">
      <fvButton 
        type="submit" 
        class="fv-primary fv-grow">
        <i :class="buttonIcon" /> {{ buttonText }}
      </fvButton>
    </div>
  </fvForm>
</template>

<script>
export default {
  props: {
    user: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: undefined
    },
    messageLabel: {
      type: String,
      default: 'Message'
    },
    buttonText: {
      type: String,
      default: 'Send'
    },
    buttonIcon: {
      type: String,
      default: 'fa fa-send'
    },
    saveButton: {
      type: Boolean,
      default: false
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
      return `${process.env.BASE_URL}/users/${this.user}/messages`
    }
  },
  methods: {
    async send() {
      this.$root.$loading.start()

      try {
        const response = await this.$axios[this.isReply ? '$put' : '$post'](
          this.apiUrl,
          {
            [this.isReply ? 'reply' : 'text']: this.form.text,
            recaptcha: this.form.recaptcha || undefined
          }
        )
        if (this.saveButton && this.saveToLocalStorage && this.$sentMessages) {
          this.$sentMessages.save(response)
        }
        this.$root.$loading.finish()
        this.$emit('sent', response)
        if (this.isReply) {
          this.$alerts.toast(
            `Your reply has been set to that message!`,
            'success'
          )
        } else {
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
        this.$alerts.toast(e.response.data.message, 'failed')
      }
    },
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    }
  }
}
</script>
