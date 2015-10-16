/*eslint-env node */
import React from 'react' //eslint-disable-line
import koa from 'koa'
import serve from 'koa-static'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'

import { renderHtmlPage } from './utils'
import routes from '../routes'

const env = process.env
// const assets_path = `http://localhost:8080/${env.npm_package_version}`
const assets_path = `/${env.npm_package_version}`

const app = koa()
// app.set('trust proxy', 'loopback')  // not sure why this is here...

app.use(serve(__dirname + '/../public'))

app.use(function * () {
  let location = createLocation(this.request.originalUrl)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return this.redirect(redirectLocation.pathname)
    }
    if (error) {
      return this.throw(error.message)
    }
    if (renderProps == null) {
      return this.throw(error)
    }

    this.body = renderHtmlPage(
      <RoutingContext {...renderProps}/>,
      { assets_path }
    )
  })

})

export default app