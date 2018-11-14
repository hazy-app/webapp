import axios from '../plugins/axios'

export const state = () => {
  return {
    accessToken: null,
    tokenType: null,
    refreshToken: null,
    me: null,
    sidebarVisibility: true // if mobile set it to false by default
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
    console.log('initing app')
    const accessToken = this.$cookies.get('accessToken')
    const tokenType = this.$cookies.get('tokenType')
    const refreshToken = this.$cookies.get('refreshToken')
    if (accessToken && tokenType) {
      await dispatch('setAccessToken', {
        tokenType,
        accessToken,
        refreshToken,
        setCookies: false
      })
    }
  },
  async setAccessToken(
    { commit },
    { tokenType, accessToken, refreshToken, setCookies = true }
  ) {
    const me = {}
    const parseToken = token => {
      if (token.indexOf(' ') !== -1) {
        token = token.split(' ')[1]
      }
      return JSON.parse(
        require('base-64').decode(
          token
            .split('.')[1]
            .replace('-', '+')
            .replace('_', '/')
        )
      )
    }
    const parsed = parseToken(accessToken)
    me.isZeus = parsed.role && parsed.role.indexOf('zeus') !== -1
    me.isAgent = parsed.role && parsed.role.indexOf('agent') !== -1
    me.isMarketer = parsed.role && parsed.role.indexOf('marketer') !== -1

    if (setCookies) {
      this.$cookies.set('accessToken', accessToken)
      this.$cookies.set('tokenType', tokenType)
      this.$cookies.set('refreshToken', refreshToken)
    }

    this.$axios.setHeader('Authorization', `${tokenType} ${accessToken}`)
    me.id = parsed.id
    me.data = (await this.$axios.get(
      `${process.env.accountUrl}/v3/accounts/${parsed.id}`
    )).data
    commit('SET', {
      key: 'me',
      value: me
    })
  },
  async clearAccessToken({ commit }) {
    this.$cookies.remove('accessToken')
    this.$cookies.remove('tokenType')
    this.$cookies.remove('refreshToken')
    this.$axios.setHeader('Authorization', '')

    commit('SET', {
      key: 'me',
      value: null
    })
  },
  async setSidebarVisibility({ commit, state }, value) {
    commit('SET', {
      key: 'sidebarVisibility',
      value: value
    })
  }
}
