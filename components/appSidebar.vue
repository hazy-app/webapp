<template>
  <fvSidebar 
    :value="$store.state.sidebarVisibility" 
    class="app-sidebar fv-col-xs-9 fv-col-sm-5 fv-col-md-4 fv-col-lg-3 fv-col-xl-2 fv-no-padding" 
    @input="$store.dispatch('setSidebarVisibility', $event)">
    <div 
      v-if="$store.state.me"
      :style="{ backgroundImage: 'url(' + $getFileUrl($store.state.me.data.profile_picture) + ')' }" 
      class="app-sidebar__user">
      <div class="app-sidebar__user-cover" />
      <div class="app-sidebar__inner">
        <div class="app-sidebar__circles">
          <i 
            v-if="$store.state.me.isZeus" 
            class="fa fa-star zeus"/>
          <i 
            v-if="$store.state.me.isAgent" 
            class="fa fa-star agent"/>
          <i 
            v-if="$store.state.me.isMarketer" 
            class="fa fa-star marketer"/>
        </div>
        <h2 class="app-sidebar__user-name">
          {{ $store.state.me.data.name }}
        </h2>
        <div class="app-sidebar__buttons">
          <i 
            class="fa fa-user-circle" 
            tabindex="0" />
          <i 
            class="fa fa-power-off" 
            tabindex="0"
            @click="logout" />
        </div>
      </div>
    </div>
    <div class="app-sidebar__search-container">
      <fvList>
        <fvListItem>
          <nuxt-link to="/"> کاربران </nuxt-link>
        </fvListItem>
        <fvListItem>
          <nuxt-link to="/index.1"> تراکنش‌ها </nuxt-link>
        </fvListItem>
      </fvList>
    </div>

  </fvSidebar>
</template>

<script>
export default {
  data() {
    return {
      userMenuVisible: false,
      searchQuery: undefined
    }
  },
  methods: {
    async logout() {
      const answer = await this.$alerts.confirm(
        'آیا از خروج از برنامه مطمئنید؟',
        'بله',
        'خیر'
      )
      if (answer) {
        await this.$store.dispatch('clearAccessToken')
        console.log('here')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  & .app-sidebar__user {
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    padding: 3em 0;
    z-index: 0;
  }

  & .app-sidebar__user-cover {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(22, 33, 45, 0.75);
    z-index: -1;
  }

  & .app-sidebar__inner {
    color: #fff;
    text-align: center;
    bottom: 0.6em;
    width: 100%;
  }

  & .app-sidebar__circles {
    & > * {
      color: #fff;
    }

    & .zeus {
      color: #f1bc00;
    }

    & .agent {
      color: #afafaf;
    }

    & .marketer {
      color: #378032;
    }
  }

  & .app-sidebar__buttons {
    font-size: 1.8em;
    & > * {
      margin: 0 0.2em;
      cursor: pointer;
      &:hover {
        color: #c5c5c5;
      }
    }
  }

  & .app-sidebar__search-container {
    padding: 1em;
    & .fv-input {
      width: 100%;
    }
  }
}
</style>
