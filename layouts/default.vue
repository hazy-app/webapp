<template>
  <nuxt/>
</template>

<style>
/* normal */
@font-face {
  font-family: Sahel;
  font-style: normal;
  font-weight: normal;
  src: url('../assets/fonts/Sahel/Sahel-SMD.woff2') format('woff2');
}
/* bold */
@font-face {
  font-family: Sahel;
  font-style: normal;
  font-weight: bold;
  src: url('../assets/fonts/Sahel/Sahel-Bold-SMD.woff2') format('woff2');
}

html,
body,
#__nuxt,
#__layout {
  min-height: 100%;
  height: 100%;
  line-height: 1.6;
  font-size: 14px;
  font-family: Sahel, sans-serif;
}
</style>
