import Router from './Router'
import { firebaseContext, useFirebase } from './firebase/context'

function App() {
  return (
    <firebaseContext.Provider value={useFirebase()}>
      <Router />
    </firebaseContext.Provider>
  )
}

export default App
