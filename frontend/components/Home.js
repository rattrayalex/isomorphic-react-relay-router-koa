import React from 'react'  //eslint-disable-line no-unused-vars
import Helmet from 'react-helmet'


export default class Home extends React.Component {
  state = {
    time: new Date(),
  };

  handleClick() {
    let time = new Date()
    this.setState({ time })
  }

  render() {
    let { time } = this.state
    return (
      <div>
        <Helmet title="Home" />

        <div onClick={this.handleClick.bind(this)}>
          Welcome home! The time is now {time.toString()}.
        </div>

      </div>
    )
  }
}
