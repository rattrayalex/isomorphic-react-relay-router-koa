import Relay from 'react-relay'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {})
)

export default class extends Relay.Route {
  // static path = '/graphql';
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
    // viewer: (Component) => Relay.QL`
    //   query {
    //     ${Component.getFragment('viewer')}
    //   }
    // `,
  }
  static routeName = 'ThingsRoute'
}