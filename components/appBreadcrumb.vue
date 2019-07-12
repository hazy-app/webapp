<template>
  <div class="app-breadcrumb fv-border-bottom fv-padding-start fv-padding-end">
    <nuxt-link 
      v-for="route in routes" 
      :key="route.name" 
      :to="route.url"
      class="fv-link route">
      {{ route.name }}
    </nuxt-link>
  </div>

</template>

<script>
export default {
  data() {
    return {
      name: 2
    }
  },
  computed: {
    routes() {
      const routes = []
      routes.push({
        name: 'Home',
        url: '/'
      })
      if (['register', 'sent-messages', 'login'].includes(this.$route.name)) {
        // register, sent-messages, login
        const name = this.$route.name
          .split('-')
          .map(p => p.charAt(0).toLocaleUpperCase() + p.substr(1))
          .join(' ')
        routes.push({
          name,
          url: this.$route.fullPath
        })
      } else if (this.$route.name === 'search-query') {
        // search
        routes.push({
          name: `Search '${this.$route.params.query}'`,
          url: this.$route.fullPath
        })
      } else if (this.$route.name.indexOf('username') === 0) {
        // user items
        routes.push({
          name: this.$route.params.username,
          url: `/${this.$route.params.username}`
        })
        const parts = this.$route.fullPath
          .split('?')[0]
          .split('/')
          .slice(1)
        if (parts.length === 1) {
          return routes
        }
        const section = parts[1]
        const sectionName = section
          .split('-')
          .map(p => p.charAt(0).toLocaleUpperCase() + p.substr(1))
          .join(' ')
        routes.push({
          name: sectionName,
          url: `/${this.$route.params.username}/${section}`
        })
        if (parts.length > 2) {
          const item = parts[2]
          if (item === 'new') {
            routes.push({
              name: `New ${sectionName.substr(0, sectionName.length - 1)}`,
              url: this.$route.fullPath
            })
          } else {
            routes.push({
              name: `Single ${sectionName.substr(
                0,
                sectionName.length - 1
              )} Item`,
              url: this.$route.fullPath
            })
          }
        }
      }
      return routes
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb {
  & > .route {
    font-weight: bold;

    &:not(:last-child)::after {
      content: ' > ';
      display: inline;
      padding: 0 0.5em;
      font-weight: normal;
    }
  }
}
</style>
