import React from 'react'  //eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router'

import Root from './components/Root'
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'


export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Home}/>

    <Route path="/about" component={About}/>
    <Route path="/contact" component={Contact}/>

  </Route>
)