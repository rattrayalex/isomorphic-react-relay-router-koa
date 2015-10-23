import React from 'react'
import { RootContainer } from 'react-relay'

import Base from './Base'
import Application from '../containers/Application'
import ThingsRoute from '../relay-routes/ThingsRoute'

//
//           renderFetched={(data) => (
//             // Must spread `data` into <FooComponent>.
//             <Application {...data} />
//           )}


export default (
  (typeof window === 'undefined')
  ? Base
  : class Root extends React.Component {
    render() {
      console.log('IN ROOOOOOOT')
      return (
        <RootContainer
          Component={Application}
          route={new ThingsRoute()}
          onReadyStateChange={({ error }) => {
            if (error) console.error(error)
          }}
          renderLoading={() => (
            <div>Relay Root Container is Loading...</div>
          )}
          renderFailure={(error) => (
            <div>Error: {JSON.stringify(error)}</div>
          )}
        />
      )
    }
  }
)
