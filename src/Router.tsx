import React, { FC } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signin' component={Signin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
