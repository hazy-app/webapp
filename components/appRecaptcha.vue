<template>
  <div>
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
      timer: null
    }
  },
  computed: {
    fvValidate() {
      return process.env.NODE_ENV === 'development' ? true : !!this.value
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
    timerHandler() {
      if (window.grecaptcha && window.grecaptcha.render) {
        clearInterval(this.timer)
        setTimeout(() => {
          this.render()
        }, 100)
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
