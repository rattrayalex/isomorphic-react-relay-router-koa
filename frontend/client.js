import React from 'react'
import ReactDom from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { RelayRouter } from 'react-router-relay'
import IsomorphicRelay from 'isomorphic-relay'
import IsomorphicRelayRouter from 'isomorphic-relay-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import routes from './routes'
import reducers from './reducers'


function init() {
  if (typeof window.__preloaded_data__ !== 'undefined') {
    IsomorphicRelay.injectPreparedData(window.__preloaded_data__);
  }

  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer
    })
  )

  const history = syncHistoryWithStore(browserHistory, store)

  ReactDom.render(
    <Provider store={store} >
      <IsomorphicRelayRouter.Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
  )
}

init()
