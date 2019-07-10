import Vue from 'vue'

// Initializing Framevuerk
const Framevuerk = require(`framevuerk/dist/framevuerk-${
  process.env.DIRECTION
}.min.js`)
require(`framevuerk/dist/framevuerk-${process.env.DIRECTION}.min.css`)
Vue.use(Framevuerk)
