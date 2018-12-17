<template>
  <div>
    <fvToast 
      :value="toastVisible" 
      :timeout="toastTimeout"
      class="app-toast fv-no-wrap"
      @input="$emit('toastClose', false)">
      <i 
        :class="{'fa-check-circle': toastType === 'success', 'fa-exclamation-circle': toastType === 'error', 'fa-commenting-o': toastType === 'message'}" 
        class="fa fv-font-lg" />
      <span> {{ toastContent }} </span>
    </fvToast>
    <fvDialog 
      :value="confirmVisible"
      class="fv-col-xs-10 fv-col-sm-8 fv-col-md-6 fv-col-xl-4 fv-no-padding"
      @input="$emit('confirmClose', false)">
      <p class="fv-padding"> {{ confirmContent }} </p>
      <div class="fv-padding fv-flex fv-grow">
        <div class="fv-grow"/>
        <fvButton 
          class="fv-default" 
          @click="$emit('confirmClose', false)">
          <i class="fa fa-ban"/> {{ confirmCancel }}
        </fvButton>
        <span class="fv-padding-start" />
        <fvButton 
          class="fv-primary" 
          @click="$emit('confirmClose', true)">
          <i class="fa fa-check"/> {{ confirmOk }}
        </fvButton>
      </div>
    </fvDialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    validation: {
      type: String,
      default: 'username'
    }
  },
  data() {
    return {
      toastVisible: false,
      toastTimeout: 3500,
      toastType: 'success',
      toastContent: '',
      confirmVisible: false,
      confirmContent: '',
      confirmOk: 'OK',
      confirmCancel: 'Cancel'
    }
  },
  methods: {
    checkMount() {
      if (!this.$parent) {
        this.$mount()
        window.document.body.appendChild(this.$el)
      }
    },
    toast(msg, type = 'success', timeout = 3500) {
      this.checkMount()
      this.toastContent = msg
      this.toastTimeout = timeout
      this.toastType = type
      this.toastVisible = true
      return new Promise(resolve => {
        this.$once('toastClose', () => {
          this.toastVisible = false
          resolve()
        })
      })
    },
    confirm(msg, ok = 'OK', cancel = 'Cancel') {
      this.checkMount()
      this.confirmContent = msg
      this.confirmOk = ok
      this.confirmCancel = cancel
      this.confirmVisible = true
      return new Promise(resolve => {
        this.$once('confirmClose', btn => {
          this.confirmVisible = false
          resolve(btn)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-toast {
  z-index: 1000;
  & > i {
    vertical-align: middle;
  }
}
</style>
