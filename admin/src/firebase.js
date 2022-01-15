import firebase from 'firebase/app'
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: 'netflix-e4f85.firebaseapp.com',
  projectId: 'netflix-e4f85',
  storageBucket: 'netflix-e4f85.appspot.com',
  messagingSenderId: '260160289205',
  appId: '1:260160289205:web:cba37def055428b5a4c1fc',
  measurementId: 'G-G1CV3H2YRR',
}

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export default storage
