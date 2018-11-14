<template>
  <div 
    :class="{'fv-invalid': !fvValidate, 'fv-border fv-shadow': fvValidate}"
    class="fv-flex fv-ltr app-sheba fv-radius">
    <fvSelect 
      :options="availablePrefixes" 
      v-model="prefix" 
      :search="false" 
      class="fv-dir-start fv-no-shadow fv-no-radius fv-no-border" 
      value-key=""
      text-key=""
      @input="onInput($event, 'prefix')" />
    <span class="fv-margin-sm"> | </span>
    <fvInput 
      v-bind="$attrs" 
      v-model="rest" 
      class="fv-grow fv-dir-start fv-no-shadow fv-no-radius fv-no-border"
      @input="onInput($event, 'rest')" />
  </div>
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
    }
  },
  data() {
    return {
      prefix: undefined,
      rest: '',
      availablePrefixes: ['IR']
    }
  },
  computed: {
    fvValidate() {
      return this.validityChecker()
    }
  },
  methods: {
    onInput(v, type) {
      let filteredRest = this.rest
      if (type === 'rest') {
        filteredRest = this.replaceChars(v)
      }
      this.$emit('input', (this.prefix || '') + filteredRest)
    },
    validityChecker() {
      // sample: IR062960000000100324200001
      // if both inputs are empty, just error when its required
      if (!this.rest && !this.prefix) {
        return !this.required
      }
      const filtered = this.replaceChars(this.rest) || ''
      return this.shebaChecker((this.prefix || '') + filtered)
    },
    replaceChars(v) {
      return v
        ? v
            .toString()
            .replace(/[۰-۹]/g, pn => {
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
            .replace(/[^0-9۰-۹]./g, '')
        : ''
    },
    shebaChecker(value) {
      // https://fa.wikipedia.org/wiki/%D8%A7%D9%84%DA%AF%D9%88%D8%B1%DB%8C%D8%AA%D9%85_%DA%A9%D8%AF_%D8%B4%D8%A8%D8%A7
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
    }
  }
}
</script>

<style lang="scss" scoped>
.app-sheba {
  & > .fv-select {
    min-width: 10em !important;
  }
  & > .fv-input:focus {
    direction: ltr !important;
  }
}
</style>
