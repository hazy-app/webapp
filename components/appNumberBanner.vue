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
      localNumber: this.randomStr(3),
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
    randomStr(len = 1) {
      let ret = ''
      const availableChars = ['@', '&', '%', '$', '#']
      const gen = () =>
        availableChars[Math.floor(Math.random() * availableChars.length)]
      for (let i = 0; i < len; i++) {
        ret += gen()
      }
      return ret
    },
    setRandom(ts = 50) {
      return new Promise(resolve => {
        setTimeout(() => {
          const charLen = (this.number || '012').toString().length
          this.localNumber = this.randomStr(charLen)
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
