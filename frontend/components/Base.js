import React from 'react' //eslint-disable-line
import { RootContainer } from 'react-relay'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

import Login from './Login'
import Things from './Things'


export default class Base extends React.Component {
  render() {
    console.log("in base with", { props: this.props })
    let { children, viewer, relay } = this.props
    if ( !relay ) {
      return <div>Loading...</div>
    }

    if ( !viewer ) {
      return <div>Load, relay!</div>
    }

    return (
      <div>
        <Helmet titleTemplate="%s | An App" />

        <Login viewer={viewer} />

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>

        {children}

        <Things things={viewer.things} />

      </div>
    )
  }
}
