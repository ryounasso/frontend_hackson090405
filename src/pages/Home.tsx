import React, { useContext, useEffect } from 'react'
import { firebaseContext } from '../firebase/context'
import { useHistory } from 'react-router'
import { auth } from '../firebase/firebase'

const Home = () => {
  const history = useHistory()
  return <h1>home Page</h1>
}

export default Home
