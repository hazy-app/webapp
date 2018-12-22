export default ({ app, store, router }, inject) => {
  inject(
    'sentMessages',
    new class SentMessages {
      getAll() {
        if (!window || !window.localStorage) {
          return []
        }
        const data = localStorage.getItem('sentMessages')
        if (data !== null) {
          return JSON.parse(data)
        }
        return []
      }

      save(message) {
        if (!window || !window.localStorage) {
          return false
        }
        const sentMessages = this.getAll()
        sentMessages.unshift(message)
        localStorage.setItem('sentMessages', JSON.stringify(sentMessages))
        return true
      }

      clear() {
        if (!window || !window.localStorage) {
          return false
        }
        localStorage.removeItem('sentMessages')
        return true
      }
    }()
  )
}
