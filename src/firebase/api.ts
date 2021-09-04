import { promises } from 'dns'
import firebase from 'firebase/app'
import { auth, db } from './firebase'

export const signout = () => {
  try {
    auth.signOut()
    console.log('signout')
  } catch (err) {
    console.log(err)
  }
}


