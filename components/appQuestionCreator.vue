<template>
  <div class="app-poll-creator fv-border">
    <fvForm 
      method="POST"
      class="fv-row"
      @submit="submit">
      <fvFormElement 
        label="Question body" 
        class="fv-col-12">
        <fvInput 
          ref="input" 
          :value="text"
          placeholder="Enter your question"
          autofocus
          required
          @input="setInputDirection($event); $emit('update:text', $event);"/>
      </fvFormElement>
      <fvFormElement class="fv-col-12">
        <div class="fv-text-center">
          <no-ssr>
            <appRecaptcha v-model="recaptcha" />
          </no-ssr>
        </div>
      </fvFormElement>
      <!-- <div class="fv-col-12 fv-text-light">
        <p> <appIcon icon="info" /> You can deactive this poll anytime you want! </p>
      </div> -->
      <div class="fv-flex fv-col-12">
        <fvButton 
          type="submit" 
          class="fv-primary fv-grow">
          <appIcon icon="check" /> Create
        </fvButton>
      </div>

    </fvform>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appAccountLink,
    appIcon
  },
  props: {
    user: {
      type: String,
      default: undefined
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      recaptcha: undefined
    }
  },
  methods: {
    setInputDirection(str) {
      const direction = this.$calcDirection(str)
      this.$refs.input.$el.style.direction = direction
    },
    async submit() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$post(
          `${process.env.BASE_URL}/users/${this.user}/questions`,
          {
            text: this.text,
            recaptcha: this.recaptcha
          }
        )
        this.$root.$loading.finish()
        this.$emit('created', response.data)
        this.$alerts.toast(`Your question has been created!`, 'success')
      } catch (e) {
        console.log(e)
        this.form.recaptcha = false
        this.$root.$loading.finish()
        this.$emit('error', e.response)
        this.$alerts.toast(e.response.data.message, 'failed')
      }
    }
  }
}
</script>
