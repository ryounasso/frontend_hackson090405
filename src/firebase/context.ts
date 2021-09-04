import { createContext, useEffect, useState } from 'react'
import { auth } from './firebase'
import firebase from "firebase/app"


type AuthContextProps = {
  currentUser: firebase.User | null | undefined;
  initilize: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  currentUser: undefined,
  initilize: true
})

export const UseFirebase = () => {
  const [initilize, setInitilize] = useState<boolean>(true)
  const [currentUser, setCurrentUser] = useState<firebase.User | null | undefined>(undefined)
  
  useEffect(() => {
    //userがサインインしているか
    auth.onAuthStateChanged((user) => {
      //user情報の確認が取れたらinitilizeをfalseにする
      setCurrentUser(user)
      setInitilize(false)
    })
  }, [])

  return {
    initilize,
    currentUser
  }
}
