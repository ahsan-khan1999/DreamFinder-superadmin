importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');
const firebaseConfig = {
  apiKey: 'AIzaSyDlHdMHt8VvlufMuzFW8TaZXPlO6yylsZY',
  authDomain: 'dmfr-7d776.firebaseapp.com',
  projectId: 'dmfr-7d776',
  storageBucket: 'dmfr-7d776.appspot.com',
  messagingSenderId: '883082489982',
  appId: '1:883082489982:web:a624329759c54a7ee4682f',
  measurementId: 'G-K4WLK8ZL9M',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification('my notification title');
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
  console.log(event);
});
