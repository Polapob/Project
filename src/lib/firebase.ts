import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA78X4U6PR45BF3Yu9xJ_imG5AoQGRDhAs",
  authDomain: "project-1e973.firebaseapp.com",
  databaseURL: "https://project-1e973.firebaseio.com",
  projectId: "project-1e973",
  storageBucket: "project-1e973.appspot.com",
  messagingSenderId: "417126162107",
  appId: "1:417126162107:web:f8836371084fc7e81e939e",
  measurementId: "G-FLL6JGBBYT"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
  firebase.app().functions('asia-southeast2')
}

export default firebase