import React from 'react' //eslint-disable-line no-unused-vars
import ReactDomServer from 'react-dom/server'
import Helmet from 'react-helmet'

const RootHtml = ({ body, assets_path, title }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <script async
        type='application/javascript'
        src={`${assets_path}/app.js`}
      />
    </head>
    <body>
      <div id="app"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </body>
  </html>
)

export function renderHtmlPage(children, htmlProps) {
  let body = ReactDomServer.renderToStaticMarkup(children)
  let helmet = Helmet.rewind()

  let html = ReactDomServer.renderToStaticMarkup(
    <RootHtml
      {...htmlProps}
      title={helmet.title}
      body={body}
    />
  )
  Helmet.rewind() // b/c renderToStaticMarkup called again.

  return ( '<!DOCTYPE html>' + html )
}