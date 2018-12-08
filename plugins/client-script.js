import firebase from 'firebase'

export default async ({ store, app: { $alerts, $eventBus } }) => {
  if ('Notification' in window) {
    await Notification.requestPermission()
  }

  // Firebase init
  var config = {
    apiKey: 'AIzaSyCpRi2Rbkb-JNyXjaQTT_3YoN-1FdzkmwA',
    projectId: 'hazy-223207',
    messagingSenderId: '432488206155'
  }
  try {
    firebase.initializeApp(config)
    const messaging = firebase.messaging()
    const fcmToken = await messaging.getToken()
    window.localStorage.setItem('fcmToken', fcmToken)
    if (store.state.parsedToken.username) {
      await store.dispatch('setMyFcmToken', { fcmToken })
    }

    messaging.onMessage(e => {
      $eventBus.$emit('newMessage', e.data)
      $alerts.toast(e.data.text, 'message')
    })
  } catch (e) {
    console.log('firebase initializing failed', e)
  }
}
