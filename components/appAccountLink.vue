<template>
  <div 
    :style="{width: size, height: size}" 
    class="hazy fv-border fv-shadow">
    <img 
      :src="'/avatars/'+avatarIndex+'.svg'" 
      alt="Hazy" >
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: '4rem'
    }
  },
  data() {
    return {
      avatarIndex: Math.floor(Math.random() * 5) + 1,
      username: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.hazy {
  display: inline-block;
  background-color: #fff;
  border-radius: 50%;
  overflow: visible;

  & > img {
    width: 130%;
    margin-left: -15%;
    margin-top: -25%;
  }
}
</style>
