<template>
  <span> {{ localNumber }} </span>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      localNumber: 0
    }
  },
  watch: {
    number() {
      this.startAnimation()
    }
  },
  mounted() {
    this.startAnimation()
  },
  methods: {
    setRandom(ts = 50) {
      return new Promise(resolve => {
        const availableChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '%', '$', '#']
        const charLen = this.number.toString().length
        const gen = () =>
          availableChars[Math.floor(Math.random() * availableChars.length)]
        setTimeout(() => {
          this.localNumber = ''
          for (let i = 0; i < charLen; i++) {
            this.localNumber += gen()
          }
          resolve()
        }, ts)
      })
    },
    async startAnimation() {
      const repeatTimes = 15 + Math.floor(Math.random() * 15)
      for (let i = 0; i <= repeatTimes; i++) {
        await this.setRandom(50 + Math.floor(Math.random() * 50))
      }
      this.localNumber = this.number
    }
  }
}
</script>
