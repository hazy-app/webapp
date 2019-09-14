<template>
  <a 
    :class="{'searching': searchQuery !== null }"
    class="fv-button search-btn"
    tabindex="0"
    @click="enterSearch"> <appIcon 
      icon="search" /> <span 
        v-if="searchQuery === null" 
        ref="searchBox"
        class="fv-hidden-sm fv-hidden-xs"> Search </span><input 
          v-else 
          ref="searchBox"
          v-model="searchQuery"
          placeholder="Start typing" 
          class="search-query"
          minlength="3"
          type="search"
          @blur="cancelSearch"
          @keyup.enter="startSearch"> </a>
</template>

<script>
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  },
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
      this.$emit('startSearch')
    },
    cancelSearch() {
      this.searchQuery = null
      this.$emit('endSearch')
    },
    startSearch() {
      if (this.searchQuery.length < 3) {
        return this.$alerts.toast(
          'Enter 3 or more than 3 characters to search!',
          'failed'
        )
      }
      this.$router.push(`/search/${this.searchQuery}`)
      this.cancelSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.searching {
    background: #f5f5f5;
    @media screen and (max-width: 960px) {
      flex-grow: 2;
    }
  }
  & .search-query {
    border: none;
    box-shadow: none;
    background: transparent;
    width: 100%;
  }
}
</style>
