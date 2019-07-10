import firebase from 'firebase/app'
import 'firebase/messaging'
import { decode as base64Decode } from 'base-64'

export const state = () => {
  return {
    /* original access token keeping in cookie, not here */
    parsedToken: {},
    isMobile: false,
    sidebarVisibility: true
  }
}

export const mutations = {
  SET(state, { key, value }) {
    state[key] = value
  },
  APPEND(state, { key, value }) {
    state[key].push(value)
  }
}

export const actions = {
  async nuxtServerInit({ dispatch, commit, state }) {
    dispatch('calcUserAgent')
    const authorization = this.$cookies.get('authorization')
    if (authorization) {
      await dispatch('setAuthorization', {})
    }
  },
  // set access token. if params passed, it will read them and  set to local and also cookie
  // but if params not passed, it will read from cookie and set to local
  async setAuthorization({ commit }, { authorization = '' }) {
    const auth = authorization || this.$cookies.get('authorization')

    if (authorization) {
      console.log('setAuthorization() => setting cookie from passed params.')
      this.$cookies.set('authorization', auth, {
        maxAge: 1872000 // 30 days
      })
    }

    console.log('setAuthorization() => setting tokens to $axios.')
    this.$axios.setHeader('authorization', authorization)

    console.log('setAuthorization() => parsing token.')
    const parsedToken = (token => {
      if (token.indexOf(' ') !== -1) {
        token = token.split(' ')[1]
      }
      const parsed = JSON.parse(
        base64Decode(
          token
            .split('.')[1]
            .replace('-', '+')
            .replace('_', '/')
        )
      )
      if (!parsed.role) {
        parsed.role = []
      }
      return parsed
    })(auth)

    commit('SET', {
      key: 'parsedToken',
      value: parsedToken
    })
  },
  async clearAuthorization({ commit }) {
    this.$cookies.remove('authorization')
    this.$axios.setHeader('authorization', '')

    commit('SET', {
      key: 'me',
      value: null
    })
    commit('SET', {
      key: 'parsedToken',
      value: {}
    })
  },
  async login({ dispatch }, { username, password, recaptcha }) {
    try {
      const response = await this.$axios.post(`${process.env.BASE_URL}/auth`, {
        username,
        password,
        recaptcha
      })
      console.log('login() => passed. so setting accestoken.')
      await dispatch('setAuthorization', {
        authorization: response.data
      })
      this.$sentMessages.clear()
      if (window && window.localStorage.fcmToken) {
        if ('Notification' in window) {
          await Notification.requestPermission()
        }
        await dispatch('setMyFcmToken', {
          fcmToken: window.localStorage.fcmToken
        })
      }
    } catch (e) {
      console.log('login() => failed. so clearing accestoken.')
      await dispatch('clearAuthorization')
      throw e
    }
  },
  async setMyFcmToken({ state }, { fcmToken }) {
    try {
      await this.$axios.delete(
        `${process.env.BASE_URL}/users/${
          state.parsedToken.username
        }/fcm-tokens/${fcmToken}`
      )
      await this.$axios.post(
        `${process.env.BASE_URL}/users/${
          state.parsedToken.username
        }/fcm-tokens`,
        {
          fcmToken
        }
      )
    } catch (e) {
      throw e
    }
  },
  logout({ dispatch }) {
    this.$sentMessages.clear()
    dispatch('clearAuthorization')
  },
  calcUserAgent({ commit }) {
    if (this.$ua.deviceType() === 'pc') {
      commit('SET', {
        key: 'isMobile',
        value: false
      })
      commit('SET', {
        key: 'sidebarVisibility',
        value: true
      })
    } else {
      commit('SET', {
        key: 'isMobile',
        value: true
      })
      commit('SET', {
        key: 'sidebarVisibility',
        value: false
      })
    }
  },
  setSidebarVisibility({ commit }, value) {
    commit('SET', {
      key: 'sidebarVisibility',
      value: value
    })
  }
}
