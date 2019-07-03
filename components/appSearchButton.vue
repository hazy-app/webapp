<template>
  <a 
    :class="{'searching': searchQuery !== null }"
    class="fv-button search-btn"
    tabindex="0"
    @click="enterSearch"> <i class="fa fa-search" /> <span 
      v-if="searchQuery === null" 
      ref="searchBox"
      class="fv-hidden-sm fv-hidden-xs"> Search </span><input 
        v-else 
        ref="searchBox"
        v-model="searchQuery"
        placeholder="Start typing" 
        class="search-query"
        minlength="3"
        @blur="cancelSearch"
        @keyup.enter="startSearch"> </a>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: null
    }
  },
  methods: {
    enterSearch() {
      this.searchQuery = ''
      this.$nextTick(() => {
        this.$refs.searchBox.focus()
      })
    },
    cancelSearch() {
      this.searchQuery = null
    },
    startSearch() {
      this.$router.push(`/search/${this.searchQuery}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  &.searching {
    background: #f5f5f5;
    @media screen {
    }
  }
  & .search-query {
    border: none;
    box-shadow: none;
    background: transparent;
    max-width: 80px;
  }
}
</style>
