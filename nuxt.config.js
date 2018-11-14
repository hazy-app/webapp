const pkg = require('./package')
const fs = require('fs')
const path = require('path')

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
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~~/components/AppLoading.vue',

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/index',
    '~/plugins/axios',
    '~/plugins/app',
    '~/plugins/alerts'
  ],

  env: {
    direction: process.env.direction,
    lang: process.env.lang,
    clientId: process.env.clientId,
    apiKey: process.env.apiKey,
    appId: process.env.appId,
    accountUrl: process.env.accountUrl,
    productUrl: process.env.productUrl,
    filemanagerUrl: process.env.filemanagerUrl,
    searchUrl: process.env.searchUrl,
    paymentUrl: process.env.paymentUrl,
    geoUrl: process.env.geoUrl,
    clubUrl: process.env.clubUrl,
    cashoutUrl: process.env.cashoutUrl,
    creditUrl: process.env.creditUrl,
    socialUrl: process.env.socialUrl,
    qrUrl: process.env.qrUrl,
    appUrl: process.env.appUrl,
    transportUrl: process.env.transportUrl
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
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

try {
  const defaultEnvs = require(path.resolve(__dirname, './.default.env.json'))
  Object.keys(defaultEnvs).forEach(envKey => {
    ret.env[envKey] = ret.env[envKey] || defaultEnvs[envKey]
  })
} catch (e) {}

module.exports = ret
