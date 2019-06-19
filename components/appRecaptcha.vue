<template>
  <div>
    <fvLoading v-if="loading"/>
    <script 
      src="https://www.google.com/recaptcha/api.js" 
      async 
      defer/>
    <div 
      id="grecaptcha"
      :data-sitekey="sitekey"
      class="grecaptcha"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Object, Boolean],
      default: false
    }
  },
  data() {
    return {
      sitekey: process.env.RECAPTCHA_SITE_KEY,
      widgetId: 0,
      timer: null,
      loading: true
    }
  },
  computed: {
    fvValidate() {
      return process.env.NODE_ENV === 'developmentz' ? true : !!this.value
    }
  },
  watch: {
    value(value) {
      if (value === false) {
        this.reset()
      }
    }
  },
  created() {
    this.timer = setInterval(this.timerHandler, 100)
  },
  beforeDestroy() {
    this.$el.remove()
  },
  methods: {
    focus() {
      if (!this.fvValidate) {
        this.$el.classList.add('fv-invalid')
        setTimeout(() => {
          this.$el.classList.remove('fv-invalid')
        }, 100)
      }
    },
    timerHandler() {
      if (window.grecaptcha && window.grecaptcha.render) {
        clearInterval(this.timer)
        setTimeout(() => {
          this.render()
        }, 1000)
      }
    },
    onVerify(response) {
      this.$emit('input', response)
    },
    execute() {
      window.grecaptcha.execute(this.widgetId)
    },
    reset() {
      window.grecaptcha.reset(this.widgetId)
    },
    render() {
      this.loading = false
      this.widgetId = window.grecaptcha.render('grecaptcha', {
        sitekey: this.sitekey,
        size: window.innerWidth > 380 ? 'normal' : 'compact',
        theme: 'light',
        callback: response => {
          this.onVerify(response)
        }
      })
    }
  }
}
</script>
<style>
.grecaptcha {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
}
</style>
