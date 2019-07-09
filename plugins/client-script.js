import * as firebase from 'firebase/app'
import 'firebase/messaging'

export default async ({ store, app: { $alerts, $eventBus } }) => {
  // Firebase init
  var config = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  }
  try {
    firebase.initializeApp(config)
    const messaging = firebase.messaging()
    const fcmToken = await messaging.getToken()
    if (fcmToken) {
      window.localStorage.setItem('fcmToken', fcmToken)
      if (store.state.parsedToken.username) {
        await store.dispatch('setMyFcmToken', { fcmToken })
      }
    }

    messaging.onMessage(e => {
      $eventBus.$emit('newMessage', e.data)
      $alerts.toast(e.data.text, 'message')
    })
  } catch (e) {
    console.log('firebase initializing failed', e)
  }
}
