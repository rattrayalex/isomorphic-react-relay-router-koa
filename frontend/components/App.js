import React from 'react'


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
    return (
      <div onClick={this.handleClick.bind(this)}>
        Hello World! The time is now {time.toString()}
      </div>
    )
  }
}
