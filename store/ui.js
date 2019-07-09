export const state = () => {
  return {
    userPopup: false,
    userPopupData: undefined,
    loggedInUserPopup: false,
    headerTitle: 'Hazy',
    headerDescription: '',
    avatarChangerModal: false
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
  setHeader(state, { title, description = undefined }) {
    state['headerTitle'] = title
    state['headerDescription'] = description
  }
}
