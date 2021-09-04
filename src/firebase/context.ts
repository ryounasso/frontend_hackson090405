import { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from './firebase'

export const firebaseContext = createContext<any>(null)

export const useFirebase = () => {
  const [initilize, setInitilize] = useState<boolean>(true)
  const history = useHistory()

  useEffect(() => {
    //userがサインインしているか
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/signin')
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
