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
      widgetId: 0
    }
  },
  computed: {
    fvValidate() {
      console.log(this.value)
      return !!this.value
    }
  },
  mounted() {
    // render the recaptcha widget when the component is mounted
    setTimeout(() => {
      this.render()
    }, 1000)
  },
  methods: {
    onVerify(response) {
      console.log(response)
      this.$emit('input', response)
    },
    execute() {
      window.grecaptcha.execute(this.widgetId)
    },
    reset() {
      window.grecaptcha.reset(this.widgetId)
    },
    render() {
      if (window.grecaptcha) {
        this.widgetId = window.grecaptcha.render('grecaptcha', {
          sitekey: this.sitekey,
          size: 'normal',
          theme: 'light',
          // the callback executed when the user solve the recaptcha
          callback: response => {
            // emit an event called verify with the response as payload
            console.log('cb', response)
            this.onVerify(response)
            // reset the recaptcha widget so you can execute it again
            // this.reset()
          }
        })
      }
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
