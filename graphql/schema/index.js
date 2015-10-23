import {
  GraphQLString,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
} from 'graphql/type'
import {
  globalIdField,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  nodeDefinitions,
} from 'graphql-relay'
import { resolver } from 'graphql-sequelize'

// import ThingType from './ThingType'
import Thing from '../../storage/models/Thing'
// import UserType from './UserType'
import User from '../../storage/models/User'

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
let { nodeInterface, nodeField } = nodeDefinitions(
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

let ThingType = new GraphQLObjectType({
  name: 'Thing',
  description: 'Idk, a thing!',
  fields: {
    id: globalIdField('Thing'),
    name: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
})

/**
 * Define your own connection types here
 */
export let { connectionType: thingConnection } = connectionDefinitions({
  name: 'Thing',
  nodeType: ThingType,
})

let UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Just a user',
  fields: {
    id: globalIdField('User'),
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    things: {
      type: thingConnection,
      description: 'A users personal collection of things',
      args: connectionArgs,
      resolve: async (_, args) =>
        connectionFromArray(await Thing.all(), args),
    },
  },
  interfaces: [nodeInterface],
})


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootType',
    fields: {
      node: nodeField,
      things: {
        type: new GraphQLList(ThingType),
        resolve: resolver(Thing),
      },
      // users: {
      //   type: new GraphQLList(UserType),
      //   resolve: resolver(User, {
      //     only: ['id', 'username', 'email'],
      //   }),
      // },
      viewer: {
        type: UserType,
        // resolve: async () => await User.findOne({
        //   where: { username: 'rattray.alex@gmail.com' },
        // }),
        resolve: async () => await User.findById(1),
      },
    },
  }),
})
