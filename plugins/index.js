import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'

// Initializing Framevuerk
const Framevuerk = require(`framevuerk/dist/framevuerk-${
  process.env.DIRECTION
}.js`)
require(`framevuerk/dist/framevuerk-${process.env.DIRECTION}.css`)
Vue.use(Framevuerk)
