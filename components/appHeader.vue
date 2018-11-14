<template>
  <fvHeader class="transparent">
    <fvButton 
      v-if="typeof $attrs.sidebar !== 'undefined'" 
      class="fv-hidden-xl fv-hidden-lg" 
      @click="$store.dispatch('setSidebarVisibility', !$store.state.sidebarVisibility)">
      <i class="fa fa-bars"/>
    </fvButton>
    <span class="fv-margin-start"/>
    <div class="fv-grow">
      <h1 class="fv-font-xl">
        {{ $attrs.title }}
      </h1>
    </div>
    <span class="fv-margin-start"/>
    <slot/>
  </fvHeader>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
