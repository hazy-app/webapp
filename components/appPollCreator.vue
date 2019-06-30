<template>
  <div class="app-poll-creator fv-border fv-radius fv-shadow">
    <fvForm 
      method="POST"
      class="fv-row"
      @submit="submit">
      <fvFormElement 
        label="Title" 
        class="fv-col-12">
        <fvInput 
          ref="input" 
          :value="title"
          placeholder="Enter your question"
          autofocus
          required
          @input="setInputDirection($event); $emit('update:title', $event);"/>
      </fvFormElement>
      <fvFormElement 
        label="Choices" 
        inline
        class="fv-col-12">
        <div 
          v-for="(choice, index) in choices"
          :key="'choice' + index" 
          class="fv-flex choice fv-margin-bottom">
          <fvCheck 
            value="a"
            content="a"
            class="fv-margin-end"
            tabindex="-1" />
          <fvInput 
            :value="choices[index]" 
            :placeholder="'Choice #' + (index + 1)"
            required
            class="fv-grow fv-margin-end"
            @input="updateChoice(index, $event)"/>
          <span>
            <fvButton 
              :disabled="index < 2" 
              class="fv-text-danger"
              @click.prevent="removeChoice(index)"> <i class="fa fa-trash" /> </fvButton>
          </span>
        </div>
        <div class="fv-flex choice">
          <div class="fv-grow" />
          <fvButton @click.prevent="addChoice"> <i class="fa fa-plus" /> </fvButton>
        </div>
      </fvFormElement>
      <fvFormElement class="fv-col-12">
        <div class="fv-text-center">
          <no-ssr>
            <appRecaptcha v-model="recaptcha" />
          </no-ssr>
        </div>
      </fvFormElement>
      <div class="fv-col-12 fv-text-light">
        <p> <i class="fa fa-info-circle" /> You can deactive this poll anytime you want! </p>
      </div>
      <div class="fv-flex fv-col-12">
        <fvButton 
          type="submit" 
          class="fv-primary fv-grow">
          <i class="fa fa-check" /> Create
        </fvButton>
      </div>

    </fvform>
  </div>
</template>

<script>
import appAccountLink from '~/components/appAccountLink.vue'

export default {
  components: {
    appAccountLink
  },
  props: {
    user: {
      type: String,
      default: undefined
    },
    choices: {
      type: Array,
      default: () => []
    },
    title: {
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
    addChoice() {
      const choices = [...this.choices, '']
      this.$emit('update:choices', choices)
    },
    removeChoice(index) {
      const choices = [
        ...this.choices.slice(0, index),
        ...this.choices.slice(index + 1)
      ]
      this.$emit('update:choices', choices)
    },
    updateChoice(index, newValue) {
      const choices = [...this.choices]
      choices[index] = newValue
      this.$emit('update:choices', choices)
    },
    async submit() {
      this.$root.$loading.start()
      try {
        const response = await this.$axios.$post(
          `${process.env.BASE_URL}/users/${this.user}/polls`,
          {
            choices: this.choices,
            title: this.title,
            recaptcha: this.recaptcha
          }
        )
        this.$root.$loading.finish()
        this.$emit('created', response.data)
        this.$alerts.toast(`Your poll has been created!`, 'success')
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

<style lang="scss" scoped>
.app-poll-creator {
  overflow: hidden;

  & .choice {
    align-items: center;
  }
}
</style>
