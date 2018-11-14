<template>
  <div 
    class="fv-app-user-link">
    <fvAvatar 
      v-if="user"
      :src="$getFileUrl(user.profile_picture)" 
      :name="user.name"
      size="3em"/>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined
    },
    object: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      user: undefined
    }
  },
  computed: {
    fvValidate() {
      return this.validityChecker()
    }
  },
  async created() {
    if (!this.object && !this.id) {
      throw new Error('Component user-link need atleast one of props to works.')
    }
    if (this.object) {
      this.user = this.object
    } else {
      try {
        this.user = (await this.$axios.get(
          `${process.env.accountUrl}/v3/accounts/${this.id}`
        )).data
      } catch (e) {}
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.app-user-link {
  display: inline-block;
  & > .fv-select {
    min-width: 10em !important;
  }
  & > .fv-input:focus {
    direction: ltr !important;
  }
}
</style>
