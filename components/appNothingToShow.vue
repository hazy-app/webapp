<template>
  <div class="fv-text-center app-nothing-to-show fv-border fv-padding">
    <appIcon icon="thumbs-down" /> 
    <div> Nothing to show! </div>
    <p class="fv-text-light"> This isn't a 404 error, just there are no items yet. </p>
  </div>
</template>

<script>
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  }
}
</script>

<style lang="scss" scoped>
.app-nothing-to-show {
  & > .app-icon {
    font-size: 3.4em;
  }
  & > div {
    font-size: 2em;
    font-weight: bold;
  }
}
</style>
