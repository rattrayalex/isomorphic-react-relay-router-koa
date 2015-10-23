import graphQLHTTP from 'koa-graphql'

import schema from './schema'

export default graphQLHTTP({
  schema,
  pretty: true,
})
