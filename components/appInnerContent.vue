<template>
  <div class="fv-row">
    <div class="fv-grow fv-hidden-xs" />
    <section 
      v-if="typeof $attrs.xs !== 'undefined'" 
      class="fv-col-xs-12 fv-col-sm-10 fv-col-md-6 fv-col-lg-4">
      <slot/>
    </section>
    <section
      v-else-if="typeof $attrs.sm !== 'undefined'" 
      class="fv-col-xs-12 fv-col-sm-10 fv-col-md-8 fv-col-lg-6">
      <slot/>
    </section>
    <section 
      v-else-if="typeof $attrs.xl !== 'undefined'"
      class="fv-col-12">
      <slot/>
    </section>
    <section 
      v-else 
      class="fv-col-xs-12 fv-col-md-10 fv-col-lg-10 fv-col-xl-8">
      <slot/>
    </section>
    <div class="fv-grow fv-hidden-xs" />
  </div>
</template>

<style scoped>
section {
  min-width: 280px;
}
</style>
