import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'

export default class App extends React.Component {
  //$FlowIgnore
  state = {
    time: new Date(),
  };

  handleClick() {
    let time = new Date()
    this.setState({ time })
  }

  render() {
    let { time } = this.state
    let { children } = this.props
    return (
      <div onClick={this.handleClick.bind(this)}>
        <Helmet title="An App" />
        <Helmet titleTemplate="%s | An App" />
        <div>
          Hello World! The time is now {time.toString()}
        </div>
        <div>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          {children}
        </div>
      </div>
    )
  }
}
