import Relay from 'react-relay'

import ViewerQuery from '../queries/ViewerQuery'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {})
)

export default class extends Relay.Route {
  // static path = '/graphql';
  static queries = ViewerQuery;
    // viewer: (Component) => Relay.QL`
    //   query {
    //     ${Component.getFragment('viewer')}
    //   }
    // `,
  static routeName = 'ThingsRoute'
}