import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type'
import {
  globalIdField,
  connectionArgs,
  connectionFromArray,
} from 'graphql-relay'

import { nodeInterface, thingConnection } from './relay-bs'
import Thing from '../../storage/models/Thing'


export default new GraphQLObjectType({
  name: 'UserType',
  description: 'Just a user',
  fields: {
    id: globalIdField('User'),
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    things: {
      type: thingConnection,
      description: 'A users personal collection of things',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(Thing.all(), args),
    },
  },
  interfaces: [nodeInterface],
})
