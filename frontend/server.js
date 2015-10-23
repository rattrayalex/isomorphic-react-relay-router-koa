/*eslint-env node */
import React from 'react' //eslint-disable-line no-unused-vars
import ReactDomServer from 'react-dom/server'
import createLocation from 'history/lib/createLocation'
import { RoutingContext, match } from 'react-router'
import Helmet from 'react-helmet'

import routes from '../frontend/routes'

const assets_path = `/${process.env.npm_package_version}`


/** string concatenation is fastest =(
  see: http://stackoverflow.com/a/29083467
  */
let htmlPage = ({ title, assets_path, body }) => (
  `<!DOCTYPE html>` +
  `<html>` +
    `<head>` +
      `<title>${title}</title>` +
      `<meta charSet='utf-8' />` +
      `<meta name='viewport' content='width=device-width, initial-scale=1.0' />` +
      `<script async src='${assets_path}/app.js'></script>` +
    `</head>` +
    `<body>` +
      `<div id="app">` +
        body +
      `</div>` +
    `</body>` +
  `</html>`
)

export function renderHtmlPage(children) {
  // unfortunately, we must render the body before the html/head/etc
  // because Helmet, the provider of the document.title,
  // must have a recently-rendered document to extract the title from.
  let body = ReactDomServer.renderToStaticMarkup(children)
  let { title } = { title: 'hello world' }
  // let { title } = Helmet.rewind()

  return htmlPage({ body, title, assets_path })
}


export default function * (next) {
  let location = createLocation(this.request.originalUrl)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      return this.redirect(redirectLocation.pathname)
    }
    if (error) {
      return this.throw(error.message)
    }
    if (renderProps == null) {
      return next
    }

    renderProps.isAuthenticated = this.isAuthenticated()

    this.body = renderHtmlPage(
      <RoutingContext {...renderProps}/>,
    )
  })
}
