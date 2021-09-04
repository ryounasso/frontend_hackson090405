import { firebaseContext } from '../firebase/context'
import { auth } from '../firebase/firebase'
import { useHistory } from 'react-router'
import { useEffect } from 'react'

const Home = () => {
  const history = useHistory()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('/signin')
      }
    })
  })
  return <h1>home Page</h1>
}

export default Home
