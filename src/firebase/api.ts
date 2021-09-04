import firebase from 'firebase/app'
import { auth, db } from './firebase'

//グーグルでのサインアップ/イン機能
export const GoogleSignin = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    const result = await auth.signInWithPopup(provider)
    const user = result.user
    await db.collection('users').doc(user?.uid).set({ uid: user?.uid })
  } catch (err) {
    console.log(err)
  }
}

export const signout = () => {
  try {
    auth.signOut()
    console.log('signout')
  } catch (err) {
    console.log(err)
  }
}
