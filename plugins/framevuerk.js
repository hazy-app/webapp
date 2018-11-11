import Vue from 'vue'

const Framevuerk = require(`framevuerk/dist/framevuerk-${
  process.env.direction
}.js`)

require(`framevuerk/dist/framevuerk-${process.env.direction}.css`)

Vue.use(Framevuerk)
