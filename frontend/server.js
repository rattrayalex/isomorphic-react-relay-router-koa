/* eslint-env node */
import React from 'react' //eslint-disable-line no-unused-vars
import ReactDomServer from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import { match } from 'react-router'
import { RelayRouterContext } from 'react-router-relay'
import IsomorphicRouter from 'isomorphic-relay-router';
import Helmet from 'react-helmet'
import co from 'co'

import routes from './routes'

const assets_path = `/${process.env.npm_package_version}`


const htmlPage = ({ title, assets_path, body, data }) => (`
<!DOCTYPE html>
<html>
  <head>
    ${title}
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <script async src='${assets_path}/app.js'></script>
  </head>
  <body>
    <div id="app">
      ` + body + /* string concat fast: stackoverflow.com/a/29083467 */ `
      <script>window.__preloaded_data__ = ` + JSON.stringify(data) + `;</script>
    </div>
  </body>
</html>
`)

export function renderHtmlPage(children, data) {
  // unfortunately, we must render the body before the html/head/etc
  // because Helmet, the provider of the document.title,
  // must have a recently-rendered document to extract the title from.
  let body = ReactDomServer.renderToStaticMarkup(children)
  let { title } = Helmet.rewind()

  return htmlPage({ body, title, assets_path, data })
}

const _prepareData = co.wrap(function* (renderProps) {
  return yield IsomorphicRouter.prepareData(renderProps)
})

const _match = co.wrap(function* ({ routes, location }) {
  return yield new Promise( (resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      resolve({ error, redirectLocation, renderProps })
    })
  })
})

export default function * renderReact(next) {
  let location = this.request.originalUrl

  const { error, redirectLocation, renderProps} = yield _match({ routes, location })

  if (redirectLocation) {
    return this.redirect(redirectLocation.pathname)
  }
  if (error) {
    return this.throw(error.message)
  }
  if (renderProps === null) {
    return next
  }

  renderProps.isAuthenticated = this.isAuthenticated()

  const { props, data } = yield _prepareData(renderProps)
  // TODO: inject `data` as preloaded data
  const completeHtmlPage = renderHtmlPage(
    <IsomorphicRouter.RouterContext {...props} />,
    data
  )

  this.body = completeHtmlPage
}
