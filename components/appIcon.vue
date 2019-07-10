<template>
  <!-- <span 
    :style="{ backgroundImage: 'url(\'/icons/' + icon + '.svg\')' }" 
    class="app-icon">#</span> -->
  <span class="app-icon">
    <!-- <no-ssr> -->
    <component
      :is="iconComponent" 
      stroke-width="1.4"
      width="1.5em" 
      height="1.4em"
      viewBox="0 0 24 24" />
      <!-- </no-ssr> -->
  </span>
</template>

<script>
// import home from '@/static/icons/send.svg'

export default {
  props: {
    icon: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      iconComponent: require('@/static/icons/' + this.icon + '.svg').default
    }
  }
}
</script>

<style lang="scss" scoped>
.app-icon {
  display: inline-block;
  position: relative;

  & > svg {
    vertical-align: middle;
    width: 1.4em;
    width: 1.4em;
  }
}
</style>
