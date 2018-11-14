<template>
  <fvMain>
    <appSidebar/>
    <fvContent>
      <appHeader 
        title="صفحه اصلی"
        sidebar />
      <appInnerContent>
        salam
        <nuxt-link to="/">/</nuxt-link>
      </appInnerContent>
    </fvContent>
  </fvMain>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      sidebar: false,
      form: {
        ages: [
          {
            value: 1,
            text: '17 and Below '
          },
          {
            value: 2,
            text: 'From 18 to 23'
          },
          {
            value: 3,
            text: 'From 23 to 30'
          },
          {
            value: 4,
            text: 'From 30 to 40'
          },
          {
            value: 5,
            text: '40 and Above '
          }
        ],
        continents: [
          {
            name: 'Africa'
          },
          {
            name: 'Antarctica'
          },
          {
            name: 'Asia'
          },
          {
            name: 'Europe'
          },
          {
            name: 'North America'
          },
          {
            name: 'Australia/Oceania'
          },
          {
            name: 'South America'
          }
        ],
        firstName: undefined,
        lastName: undefined,
        gender: undefined,
        age: undefined,
        continent: undefined,
        married: undefined,
        marriageDate: undefined,
        bio: undefined
      }
    }
  },
  created() {
    console.log('home created')
  },
  middleware: 'auth'
}
</script>

<style>
</style>
