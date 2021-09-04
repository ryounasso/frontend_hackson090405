import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAoo7lpfZZS7DBx1Tqb-Cy50O9otWH-4Ck',
  authDomain: 'hackathon-fa48c.firebaseapp.com',
  projectId: 'hackathon-fa48c',
  storageBucket: 'hackathon-fa48c.appspot.com',
  messagingSenderId: '699491963854',
  appId: '1:699491963854:web:9a6bd2d3e9f5ff5b07919f',
  measurementId: 'G-PQ3GX794L5',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const auth = firebase.auth()
export const db = firebase.firestore()
