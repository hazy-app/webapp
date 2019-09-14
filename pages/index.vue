<template>
  <appInnerContent 
    class="fv-padding-sm fv-text-center" 
    xs>
    <div class="fv-text-center logo-container">

      <svg 
        ref="logo" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1000 1000"
        class="logo-container__logo">
        <g class="hat">
          <path d="M431.64 127.59c46.83-21.72 93.72-43.3 140.53-65.05 23.24 32.25 45.98 64.87 69.02 97.27 15.3 21.42 30.24 43.11 45.77 64.36 40.71-15.89 82.07-30.31 124.26-41.78 21.23-5.44 42.77-10.86 64.8-11.28 12.05-.56 23.11 5 33.71 10 16.64 8.37 32.73 17.82 48.27 28.06-80.48 39.2-161.5 77.33-243.1 114.16 13.6 69.96 26.51 140.25 32.24 211.38 1.76 24.68 2.99 49.56.32 74.22-1.7 16.66-7.22 32.62-13.24 48.15-11.51 29-26.17 56.72-43.31 82.78-17.13 25.9-36.95 50.17-60.14 70.9-22.84 20.35-49.24 37.25-78.53 46.58-32.22 10.47-67.57 10.98-100.08 1.42-33.09-9.58-62.7-28.79-87.74-52.16-26.49-24.74-48.53-53.93-67.04-85-10.89-18.38-20.63-37.46-28.87-57.17-6.06-14.72-11.7-29.74-14.75-45.41-3.67-21.13-3.33-42.7-2.42-64.05 1.38-28.45 4.52-56.78 8.31-84.99.37-3.25 1.19-6.46 1.01-9.74-45.44 8.58-91.06 16.24-136.65 23.98-27.02 4.49-54.04 9.04-81.11 13.21 4.19-10.75 8.97-21.27 13.86-31.72 5.87-12.09 11.87-24.23 19.74-35.17 6.57-9.39 16.98-14.91 26.81-20.23 25.27-12.87 52.23-21.98 79.16-30.68 30.17-9.58 60.77-17.75 91.45-25.5.18-65.99.62-131.98 1.07-197.97 49.03-8.7 98.04-17.55 147.07-26.28 3.21-.64 6.58-.86 9.58-2.29m174.21 243.27c-37.06 15.22-74.24 30.59-113.07 40.78-19.21 5.21-38.62 9.65-58 14.17 13.5 10.88 27.15 21.58 40.71 32.38-6.3 7.79-12.87 15.37-19.41 22.96-19.4-16.73-39.2-33.27-61.2-46.52-11.87 1.83-23.61 4.79-35.45 6.96-25.85 5.19-51.78 10.02-77.69 14.96-3.75 26.1-7.03 52.28-9.11 78.58-1.71 23.29-2.93 46.76-.64 70.06 1.48 16 6.95 31.25 12.8 46.09 8.5 21.25 18.87 41.73 30.59 61.37 18.49 30.75 40.58 59.62 67.42 83.57 22.38 19.76 48.46 36.39 77.61 43.87 2.08-14.44 4.55-28.82 7.45-43.12 3.38-16.3 7.01-32.64 12.91-48.24 2.23-5.38 4.42-11.12 8.76-15.19 4.88-3.26 11.33-3.2 16.84-1.85 5.24 1.28 7.74 6.56 9.98 10.95 6.03 13.12 9.43 27.25 12.73 41.25 4.22 18.6 7.46 37.41 10.3 56.27 25.48-6.66 48.71-20.25 69.07-36.74 22.05-17.93 40.97-39.46 57.45-62.55 17.77-24.98 32.85-51.88 45.08-79.99 6.04-14.25 11.71-28.77 15.02-43.93 3.6-19.43 3.27-39.33 2.52-59-1.41-30.8-4.97-61.45-9.19-91.98-6.36-44.93-14.25-89.64-23.37-134.09-29.93 13.25-59.88 26.43-90.11 38.98z"/>
          <path d="M524.2 458.25c36.21-28.73 72.34-57.54 108.6-86.2 23.79 25.18 47.71 50.24 71.38 75.53-18.6-7.7-37.46-15.01-57.04-19.81-9.05-2-18.91-4.25-27.8-.41-15.53 6.36-29.09 16.55-42.47 26.5-11.55 8.59-22.31 18.22-33.51 27.23-6.18-7.78-12.88-15.14-19.16-22.84z"/>
        </g>
        <g class="eyes">
          <path 
            class="left" 
            d="M363.79 472.04c17.57-4.12 36.67-4.55 53.54 2.61 8.35 3.49 16.03 8.45 22.92 14.3-6.85 6.66-15.85 10.43-24.71 13.6-14.01 4.71-28.72 7.67-43.53 7.81-14.07-.22-28.72-3.54-40.03-12.31-2.41-1.98-4.76-4.15-6.29-6.91 10.14-10.41 24.25-15.72 38.1-19.1z"/>
          <path 
            class="right" 
            d="M559.52 488.97c12.89-11.2 29.2-18.85 46.39-19.72 18.19-.91 36.65 2.94 53 10.96 5.64 2.81 10.85 6.49 15.24 11.03-4.84 7.1-12.6 11.57-20.48 14.55-13.54 5.06-28.38 5.48-42.54 3.27-10.88-1.63-21.62-4.33-31.87-8.34-7.12-2.86-14.2-6.33-19.74-11.75z"/>
        </g>
        <g class="face">
          <path d="M652.54 631.56c17.24-13.96 33.59-28.97 49.54-44.37-7.09 19.93-15.26 39.49-24.21 58.67-7.91 16.51-16.22 33.02-27.42 47.59-5.53 7.23-12.54 13.96-21.65 16.14-17.69 4.61-36.33 3.41-54.22.72-9.7-1.71-19.54-3.82-28.32-8.44-12.49-6.95-23.07-17.05-36.21-22.86-7.79-2.65-16.91-2.36-24.15 1.78-10.9 5.8-20.29 13.95-30.9 20.23-7.74 4.52-16.56 6.67-25.26 8.47-15.04 2.83-30.49 3.98-45.75 2.52-9.8-1.07-20.3-3.26-27.49-10.54-10.69-10.49-18.1-23.73-25.23-36.76-12.96-24.84-23.98-50.7-33.41-77.08 22.28 20.65 44.35 41.82 69.56 58.94 6.33 4.12 12.94 8.21 20.44 9.78 9.53 2.07 19.36 2.46 29.09 2 7.87-.54 16.28-1.64 22.59-6.82 12.64-9.99 21.77-23.58 33.97-34.05 7.99-7.86 19.83-8.47 30.39-8.04 6.89.34 14.17 1.43 19.69 5.93 12.7 9.91 21.84 23.52 33.98 34.03 3.37 2.89 7.1 5.53 11.43 6.76 8.74 2.49 17.94 2.55 26.95 2.22 9.02-.59 18.38-1.53 26.47-5.91 10.83-5.74 20.55-13.31 30.12-20.91z"/>
        </g>
      </svg>

      <div class="logo-container__text">
        <h1> Hazy </h1>
        <p> Send and Receive anonymous messages </p>
      </div>
      <br>
      <div class="logo-container__buttons fv-row">
        <a 
          href="https://github.com/hazy-app"
          class="fv-button fv-col"
          rel="noreferrer"
          target="_blank"> <appIcon icon="github" /> Github </a>
        <nuxt-link 
          to="/sent-messages"
          class="fv-button fv-col"> <appIcon icon="lock" /> Sent Messages </nuxt-link>
        <nuxt-link 
          v-if="!$store.state.parsedToken.username" 
          to="/login"
          class="fv-button fv-col"> <appIcon icon="log-in" /> Login </nuxt-link>
        <fvButton 
          v-if="$store.state.parsedToken.username"
          @click="$logout"> <appIcon icon="log-out" /> Logout </fvButton>
        <nuxt-link 
          v-if="!$store.state.parsedToken.username"
          to="/register"
          class="fv-button fv-primary fv-col"> <appIcon icon="user-plus" /> Register </nuxt-link>
        <nuxt-link 
          v-if="$store.state.parsedToken.username" 
          :to="'/' + $store.state.parsedToken.username"
          class="fv-button fv-primary fv-col"> <appIcon icon="user" /> My Profile </nuxt-link>
      </div>
    </div>
  </appInnerContent>
</template>

<script>
import twitterCard from '~/utils/twitter-card.js'
import appIcon from '@/components/appIcon.vue'

export default {
  components: {
    appIcon
  },
  data() {
    return {
      report: {},
      eyesBlinkTimer: undefined
    }
  },
  head() {
    return twitterCard(
      undefined,
      undefined,
      'Send and Receive anonymous messages',
      `Hazy`
    )
  },
  mounted() {
    const handler = async () => {
      await this.eyesBlink()
      this.eyesBlinkTimer = setTimeout(handler, Math.random() * 3000)
    }
    handler()
  },
  beforeDestroy() {
    clearTimeout(this.eyesBlinkTimer)
  },
  methods: {
    eyesBlink() {
      const eyes = this.$refs.logo.querySelector('.eyes')
      const className = [
        'blink',
        'blink',
        'blink',
        'blink',
        'blink',
        'blink',
        'wink-left',
        'wink-right'
      ][parseInt(Math.random() * 8)]
      eyes.classList.add(className)
      return new Promise(resolve => {
        setTimeout(() => {
          eyes.classList.remove(className)
          resolve()
        }, 150)
      })
    }
  },
  asyncData({ store }) {
    store.commit('ui/setHeader', {
      title: 'Hazy',
      description: 'Send and Receive anonymous messages',
      hideBackButton: true
    })
  }
}
</script>

<style lang="scss" scoped>
.logo-container__logo {
  // height: 340px;
  // max-width: 290px;
  margin: 0 auto -20px auto;

  & .eyes {
    &,
    & .left,
    & .right {
      transform: scale(1, 1);
      transform-origin: 50%;
      transition: transform 0.1s;
    }

    &.blink {
      transform: scale(1, 0.2);
    }
    &.wink-left {
      & .left {
        transform: scale(1, 0.2);
      }
    }
    &.wink-right {
      & .right {
        transform: scale(1, 0.2);
      }
    }
  }
}

.logo-container__text {
  line-height: 1.2;

  & > h1 {
    font-size: 3.5em;
    margin: 0;
    padding: 0;
  }
  & > p {
    font-size: 1.3em;
  }
}

.logo-container__buttons > * {
  margin: 0.25em;
}

.report-container {
  max-width: calc(100% - 1.5em);
  margin: 0 auto;
}
</style>
