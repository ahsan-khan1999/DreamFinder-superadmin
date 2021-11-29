importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');
const firebaseConfig = {
  apiKey: 'AIzaSyBy4eBIxA1GuGcK9TpcXf2FxJCAMUl3SHw',
  authDomain: 'concordpharma-9d29f.firebaseapp.com',
  projectId: 'concordpharma-9d29f',
  storageBucket: 'concordpharma-9d29f.appspot.com',
  messagingSenderId: '966861684005',
  appId: '1:966861684005:web:55829152e2973e9fa5aecc',
  measurementId: 'G-LK6DL35KQN',
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
self.addEventListener('notificationclick', function (event) {});
