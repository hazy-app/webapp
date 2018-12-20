<template>
  <div class="fv-row app-inner-content">
    <div class="fv-grow fv-hidden-xs" />
    <section 
      v-if="typeof $attrs.xs !== 'undefined'" 
      class="fv-col-xs-12 fv-col-sm-10 fv-col-md-6 fv-col-lg-4 fv-no-padding">
      <slot/>
    </section>
    <section
      v-else-if="typeof $attrs.sm !== 'undefined'" 
      class="fv-col-xs-12 fv-col-sm-10 fv-col-md-8 fv-col-lg-6 fv-no-padding">
      <slot/>
    </section>
    <section 
      v-else-if="typeof $attrs.xl !== 'undefined'"
      class="fv-col-12">
      <slot/>
    </section>
    <section 
      v-else 
      class="fv-col-xs-12 fv-col-md-10 fv-col-lg-10 fv-col-xl-8 fv-no-padding">
      <slot/>
    </section>
    <div class="fv-grow fv-hidden-xs" />
  </div>
</template>

<style scoped>
.app-inner-content {
  padding: 0;
}

section {
  min-width: 280px;
}
</style>
