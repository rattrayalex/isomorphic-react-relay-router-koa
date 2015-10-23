/* eslint-env node */
var getBabelRelayPlugin = require('babel-relay-plugin')

var schema = require('./graphql/schema/schema.json')


module.exports = getBabelRelayPlugin(schema.data)
