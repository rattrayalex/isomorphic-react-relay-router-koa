import React from 'react'  //eslint-disable-line no-unused-vars
import Relay from 'react-relay'
import { Route, IndexRoute } from 'react-router'

import Base from './components/Base'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'

import Application from './containers/Application'
import ViewerQuery from './queries/ViewerQuery'
import ThingsRoute from './relay-routes/ThingsRoute'


export default (
  <Route
    path="/"
    component={Application}
    queries={ViewerQuery}
    renderLoading={() => (<div>Relay Root Container is Loading...</div>)}
    renderFailure={(error) => (<div>Error: {JSON.stringify(error)}</div>)}
  >
    <IndexRoute component={Home} />

    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />

  </Route>
)
