export const state = () => {
  return {
    userPopup: false,
    userPopupData: undefined,
    loggedInUserPopup: false,
    headerTitle: 'Hazy',
    headerDescription: '',
    hideBackButton: false,
    avatarChangerModal: false,
    avatarsCustomRefreshHash: {}
  }
}

export const mutations = {
  closeUserPopup(state) {
    state['userPopup'] = false
  },
  openUserPopup(state, username) {
    state['userPopupData'] = username
    state['userPopup'] = true
  },
  closeLoggedInUserPopup(state) {
    state['loggedInUserPopup'] = false
  },
  openLoggedInUserPopup(state) {
    state['loggedInUserPopup'] = true
  },
  closeAvatarChangerModal(state) {
    state['avatarChangerModal'] = false
  },
  openAvatarChangerModal(state) {
    state['avatarChangerModal'] = true
  },
  resetAvatarRefreshHash(state, username) {
    state['avatarsCustomRefreshHash'][username] = Date.now()
  },
  setHeader(state, { title, description = undefined, hideBackButton = false }) {
    state['headerTitle'] = title
    state['headerDescription'] = description
    state['hideBackButton'] = hideBackButton
  }
}
