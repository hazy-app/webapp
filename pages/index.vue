<template>
  <fvMain>
    <fvContent>
      <appHeader
        :my-messages="$store.state.parsedToken.username"
        :login="!$store.state.parsedToken.username"
        :logout="$store.state.parsedToken.username"> Hazy </appHeader>
      <appInnerContent xs>
        Hazy APP
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
