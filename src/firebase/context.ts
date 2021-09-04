import { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from './firebase'

export const firebaseContext = createContext<any>(null)

export const UseFirebase = () => {
  const [initilize, setInitilize] = useState<boolean>(true)
  useEffect(() => {
    //userがサインインしているか
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setInitilize(false)
      }
      console.log('signin', user?.email)
      //user情報の確認が取れたらinitilizeをfalseにする
      setInitilize(false)
    })
  }, [])

  return {
    initilize,
  }
}
