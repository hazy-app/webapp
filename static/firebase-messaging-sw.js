importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

var config = {
  apiKey: 'AIzaSyCpRi2Rbkb-JNyXjaQTT_3YoN-1FdzkmwA',
  projectId: 'hazy-223207',
  messagingSenderId: '432488206155'
}

firebase.initializeApp(config)

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(e => {
  return self.registration.showNotification('Hazy', {
    body: e.data.text,
    icon: '/hazy.jpg',
    data: e.data
  })
})

self.addEventListener('notificationclick', function(e) {
  e.notification.close()
  e.waitUntil(() => {
    clients.matchAll().then(function(clientsArr) {
      if (clientsArr.length) {
        clientsArr[0].focus()
      } else {
        clients.openWindow(`/${e.notification.data.receiver}`)
      }
    })
  })
})
