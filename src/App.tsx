import Router from './Router'
import { firebaseContext, UseFirebase } from './firebase/context'
import { FC, useContext } from 'react'
import Header from './components/Header'

const FirebaseInWrppwer = ({ children }: { children: any }) => {
  const { initilize } = useContext(firebaseContext)
  //initilize=>ユーザー情報を取得できたかどうか
  if (initilize) {
    return <p>loading...</p>
  }
  return children
}

function App() {
  return (
    <firebaseContext.Provider value={UseFirebase()}>
      <Header />
      <FirebaseInWrppwer>
        <Router />
      </FirebaseInWrppwer>
    </firebaseContext.Provider>
  )
}

export default App
