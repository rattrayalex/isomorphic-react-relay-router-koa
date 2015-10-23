/* eslint-env node */
/* eslint-disable no-console */
import fs from 'fs'
import { graphql } from 'graphql'
import { introspectionQuery } from 'graphql/utilities'

import schema from '../graphql/schema'

async function reloadSchema() {
  try {
    let schemaJSON = await graphql(schema, introspectionQuery)
    console.log({ schemaJSON })
    await fs.writeFileSync(
      __dirname + '/../graphql/schema/schema.json',
      JSON.stringify(schemaJSON, null, 2)
    )
    console.log('wrote schema')
    return schemaJSON

  } catch (e) {
    console.error(e)
  }
}
export default reloadSchema


if (require.main === module) {
  reloadSchema()
}
