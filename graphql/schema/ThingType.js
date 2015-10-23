import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/type'
import {
  globalIdField,
} from 'graphql-relay'

import { nodeInterface } from './relay-bs'


export default new GraphQLObjectType({
  name: 'Thing',
  description: 'Idk, a thing!',
  fields: {
    id: globalIdField('Thing'),
    name: { type: GraphQLString },
  },
  interfaces: [nodeInterface],
})
