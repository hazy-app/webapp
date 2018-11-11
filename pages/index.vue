<template>
  <fvMain>
    <fvSidebar
      v-model="sidebar"
      class="fv-col-xs-10 fv-col-sm-6 fv-col-md-4 fv-col-lg-3 fv-col-xl-2"> Sidebar </fvSidebar>
    <fvContent>
      <fvHeader class="transparent">
        <fvButton
          class="fv-hidden-lg fv-hidden-xl"
          @click="sidebar = !sidebar"> Sidebar </fvButton>
        Salam
      </fvHeader>
      <section class="fv-padding">
        <fvForm class="fv-row fv-border">
          <fvFormElement 
            class="fv-col-md-6" 
            label="First Name">
            <fvInput 
              v-model="form.firstName" 
              placeholder="Enter First Name" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-md-6" 
            label="Last Name">
            <fvInput 
              v-model="form.lastName" 
              placeholder="Enter Last Name" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-12" 
            label="Gender">
            <fvCheck 
              v-model="form.gender" 
              content="m" 
              required> Men </fvCheck>
            <fvCheck 
              v-model="form.gender" 
              content="f" 
              required> Women </fvCheck>
            <fvCheck 
              v-model="form.gender" 
              :content="null" 
              required> Other </fvCheck>
          </fvFormElement>
          <fvFormElement 
            class="fv-col-12" 
            label="Age Range">
            <template 
              slot="label" 
              slot-scope="scope">
              {{ scope.label }}
              <span 
                v-if="scope.highlighted" 
                class="fv-margin-start-sm fv-text-primary">
                <span v-if="form.age">{{ form.age.text }}</span>
              </span>
            </template>
            <fvRange 
              v-model="form.age" 
              :data="form.ages" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-sm-4" 
            label="Is Maried?">
            <fvSwitch 
              v-model="form.married" 
              @input="form.marriageDate = undefined" />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-sm-8" 
            label="Date of Marriage">
            <fvDatepicker 
              v-model="form.marriageDate" 
              :disabled="!form.married" 
              placeholder="Enter Date of Marriage" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col" 
            label="Living Continent">
            <fvSelect 
              v-model="form.continent" 
              :options="form.continents" 
              placeholder="Enter Living Continent" 
              text-key="name" 
              value-key="name" 
              disabled-key="" 
              required />
          </fvFormElement>
          <fvFormElement 
            class="fv-col-12" 
            label="Biography">
            <fvTextarea 
              v-model="form.bio" 
              placeholder="Enter Your Biography" 
              required />
          </fvFormElement>

          <div class="fv-row">
            <div class="fv-col-12 fv-margin-top fv-margin-bottom"/>
            <div class="fv-col-12 fv-flex fv-no-padding">
              <div class="fv-grow"/>
              <fvButton 
                type="submit" 
                class="fv-primary"
                @click="$root.$loading.start()"> Submit </fvButton>
            </div>
          </div>
        </fvForm>
      </section>
      <fvFooter class="transparent">
        Created with framevuerk
      </fvFooter>
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
  }
}
</script>

<style>
</style>
