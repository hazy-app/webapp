const pkg = require('./package')

const ret = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8' },
      { hid: 'description', name: 'description', content: pkg.description },
      // standard
      {
        name: 'description',
        content: pkg.description
      },
      // schema.org
      {
        itemprop: 'name',
        content: 'Hazy'
      },
      {
        itemprop: 'description',
        content: pkg.description
      },
      {
        itemprop: 'image',
        content: 'https://hazy.herokuapp.com/hazy.jpg'
      },
      // Open Graph
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: 'Hazy'
      },
      {
        property: 'og:description',
        content: pkg.description
      },
      {
        property: 'og:site_name',
        content: 'Hazy'
      },
      {
        property: 'og:image',
        content: 'https://hazy.herokuapp.com/hazy.jpg'
      },
      // twitter
      {
        property: 'twitter:title',
        content: 'Hazy'
      },
      {
        property: 'twitter:description',
        content: pkg.description
      },
      {
        property: 'twitter:site',
        content: '@nainemom'
      },
      {
        property: 'twitter:creator',
        content: '@nainemom'
      },
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        property: 'twitter:image:src',
        content: 'https://hazy.herokuapp.com/hazy_card.png'
      },
      // facebook
      {
        property: 'fb:admins',
        content: '100005486080043'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://hazy.herokuapp.com/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lobster'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lato'
      }
    ]
  },
  // pwa meta
  meta: {
    mobileApp: true,
    mobileAppIOS: true,
    appleStatusBarStyle: 'default',
    author: 'Nainemom',
    theme_color: '#000000',
    nativeUI: true
  },
  // pwa icon
  icon: {
    iconSrc: './static/hazy.jpg'
  },
  // pwa manifest
  manifest: {
    lang: 'en',
    /* Do not change this id. it's static and is not current app id */
    gcm_sender_id: '103953800507'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~~/components/appLoading.vue',

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/index',
    '~/plugins/app',
    '~/plugins/axios',
    {
      src: '~/plugins/client-script',
      ssr: false
    },
    {
      src: '~/plugins/sent-messages',
      ssr: false
    }
  ],

  env: {
    BASE_URL: process.env.BASE_URL || 'http://127.0.0.1:3002',
    DIRECTION: process.env.DIRECTION || 'ltr',
    LANG: process.env.LANG || 'en',
    RECAPTCHA_SITE_KEY:
      process.env.RECAPTCHA_SITE_KEY ||
      '6Lfj3HwUAAAAAGKohyJRasw6EsMoQGu2i0dOw1Ti',
    FIREBASE_API_KEY:
      process.env.FIREBASE_API_KEY || 'AIzaSyCpRi2Rbkb-JNyXjaQTT_3YoN-1FdzkmwA',
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || 'hazy-223207',
    FIREBASE_MESSAGING_SENDER_ID:
      process.env.FIREBASE_MESSAGING_SENDER_ID || '432488206155'
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-user-agent',
    ['cookie-universal-nuxt', { parseJSON: false }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

module.exports = ret
