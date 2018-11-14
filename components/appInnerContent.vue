<template>
  <div>
    <section 
      v-if="typeof $attrs.small !== 'undefined'" 
      class="fv-col-xs-12 fv-col-sm-10 fv-col-offset-sm-1 fv-col-md-6 fv-col-offset-md-3 fv-col-lg-4 fv-col-offset-lg-4">
      <slot/>
    </section>
    <section 
      v-else 
      class="fv-col-xs-12 fv-col-md-10 fv-col-offset-md-1 fv-col-lg-10 fv-col-offset-lg-1 fv-col-xl-8 fv-col-offset-xl-2">
      <slot/>
    </section>
  </div>
</template>
