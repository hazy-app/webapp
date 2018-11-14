import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'

// Initializing Framevuerk
const Framevuerk = require(`framevuerk/dist/framevuerk-${
  process.env.direction
}.js`)
require(`framevuerk/dist/framevuerk-${process.env.direction}.css`)
Vue.use(Framevuerk)
