import {
  connectionDefinitions,
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay'

import ThingType from './ThingType'
import Thing from '../../storage/models/Thing'
import UserType from './UserType'
import User from '../../storage/models/User'


/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
export let { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { type, id } = fromGlobalId(globalId)
    if (type === 'User') {
      return User.find(id)
    } else if (type === 'Thing') {
      return Thing.find(id)
    } else {
      return null
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return UserType
    } else if (obj instanceof Thing)  {
      return ThingType
    } else {
      return null
    }
  }
)

/**
 * Define your own connection types here
 */
export let { connectionType: thingConnection } = connectionDefinitions({
  name: 'Thing',
  nodeType: ThingType,
})
