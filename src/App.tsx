import Router from './Router'
import { AuthContext, UseFirebase } from './firebase/context'
import { useContext } from 'react'
import Header from './components/Header'

const FirebaseInWrppwer = ({ children }: { children: any }) => {
  const { initilize } = useContext(AuthContext)
  //initilize=>ユーザー情報を取得できたかどうか
  if (initilize) {
    return <p>loading...</p>
  }
  return children
}

function App() {
  return (
    <AuthContext.Provider value={UseFirebase()}>
      <Header />
      <FirebaseInWrppwer>
        <Router />
      </FirebaseInWrppwer>
    </AuthContext.Provider>
  )
}

export default App
