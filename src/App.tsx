import React, { useEffect } from 'react'
import Router from './Router'
import { auth } from './firebase/firebase'
import { withRouter, useHistory } from 'react-router'

function App() {
  return (
    <div>
      <Router />
    </div>
  )
}

export default App
