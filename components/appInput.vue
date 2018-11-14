<template>
  <fvInput 
    :required="validityCheck"
    :value="value"
    @input="onInput" />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    validation: {
      type: String,
      default: 'username'
    }
  },
  fvValidate() {
    return this.validityCheck()
  },
  methods: {
    validityCheck() {
      if (!this.value) {
        return !this.required
      }
      if (typeof this[`${this.validation}Checker`] !== 'function') {
        return true
      }
      return this[`${this.validation}Checker`](this.value)
    },
    numberReplace(v) {
      return v
        ? v.toString().replace(/[۰-۹]/g, pn => {
            return {
              '۰': '0',
              '۱': '1',
              '۲': '2',
              '۳': '3',
              '۴': '4',
              '۵': '5',
              '۶': '6',
              '۷': '7',
              '۸': '8',
              '۹': '9'
            }[pn]
          })
        : ''
    },
    onInput(value) {
      let filtered = this.numberReplace(value)
      this.$emit('input', filtered)
    },
    otpChecker(value) {
      const regex = /^[0-9]*$/
      return regex.test(value) && value.length === 4
    },
    numberChecker(value) {
      const regex = /^[0-9]*$/
      return regex.test(value)
    },
    usernameChecker(value) {
      const regex = /^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/
      return regex.test(value)
    },
    cardChecker(value) {
      var L = value.length
      if (L !== 16 && L !== 20) {
        return false
      }
      if (
        L < 16 ||
        parseInt(value.substr(1, 10), 10) == 0 ||
        parseInt(value.substr(10, 6), 10) == 0
      )
        return false
      var c = parseInt(value.substr(15, 1), 10)
      var s = 0
      var k, d
      for (var i = 0; i < 16; i++) {
        k = i % 2 == 0 ? 2 : 1
        d = parseInt(value.substr(i, 1), 10) * k
        s += d > 9 ? d - 9 : d
      }
      return s % 10 == 0
    },
    shebaChecker(value) {
      // https://fa.wikipedia.org/wiki/%D8%A7%D9%84%DA%AF%D9%88%D8%B1%DB%8C%D8%AA%D9%85_%DA%A9%D8%AF_%D8%B4%D8%A8%D8%A7
      // sample: IR062960000000100324200001
      const replaceCode = c => {
        const cc = c.charCodeAt(0)
        return (cc >= 65 && cc <= 90
          ? cc - 55
          : cc >= 97 && cc <= 122
            ? cc - 87
            : c
        ).toString()
      }
      const mod97 = s => {
        let checksum = s.slice(0, 2),
          fragment
        for (var offset = 2; offset < s.length; offset += 7) {
          fragment = String(checksum) + s.substring(offset, offset + 7)
          checksum = parseInt(fragment, 10) % 97
        }
        return checksum
      }
      const iban = (value.substr(4) + value.substr(0, 4))
        .split('')
        .map(replaceCode)
        .join('')
      return mod97(iban) === 1
    },
    mobileChecker(v) {
      return v.indexOf('09') === 0 && v.length === 11 && this.numberChecker(v)
    },
    emailChecker(v) {
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        v
      )
    }
  }
}
</script>

<style scoped>
.loading-page {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
