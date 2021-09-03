import React, { FC } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Home from './templates/Home'
import Signin from './templates/Signin'
import Signup from './templates/Signup'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
