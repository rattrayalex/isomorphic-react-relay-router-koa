import Relay from 'react-relay'

import Base from '../components/Base'


export default Relay.createContainer(Base, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        username,
        things(first: 10) {
          edges {
            node {
              name,
              id
            }
          }
        }
      }
    `,
  },
})
