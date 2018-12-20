<template>
  <span v-html="localNumber"/>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      localNumber: '1$7',
      animating: true
    }
  },
  watch: {
    number() {
      this.start()
    }
  },
  created() {
    this.start()
  },
  methods: {
    setRandom(ts = 50) {
      return new Promise(resolve => {
        const availableChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '%', '$', '#']
        const charLen = (this.number || '012').toString().length
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
    async setLocalNumber() {
      const repeatTimes = 10
      this.animating = false
      for (let i = 0; i <= repeatTimes; i++) {
        await this.setRandom(200)
      }
      this.localNumber = this.number
    },
    async infiniteAnimation() {
      this.animating = true
      setTimeout(async () => {
        while (this.animating) {
          await this.setRandom(200)
        }
      })
    },
    start() {
      if (typeof this.number !== 'undefined') {
        this.setLocalNumber()
      } else {
        this.infiniteAnimation()
      }
    }
  }
}
</script>
