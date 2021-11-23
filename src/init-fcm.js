 /* eslint-disable */
import * as firebase from 'firebase/app';
// import { getMessaging } from "firebase/messaging/sw";
import * as test from 'firebase/messaging';
const initializedFirebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBy4eBIxA1GuGcK9TpcXf2FxJCAMUl3SHw',
  authDomain: 'concordpharma-9d29f.firebaseapp.com',
  projectId: 'concordpharma-9d29f',
  storageBucket: 'concordpharma-9d29f.appspot.com',
  messagingSenderId: '966861684005',
  appId: '1:966861684005:web:55829152e2973e9fa5aecc',
  measurementId: 'G-LK6DL35KQN',
});
const messaging = test.getMessaging(initializedFirebaseApp);
export { messaging, test };
