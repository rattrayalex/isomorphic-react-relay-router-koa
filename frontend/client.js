import React from 'react'
import ReactDom from 'react-dom'
import Router from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'

import routes from './routes'

let history = createHistory()

ReactDom.render(
  <Router history={history}>
    {routes}
  </Router>,
  document.getElementById('app')
)