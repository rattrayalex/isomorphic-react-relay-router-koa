import React from 'react' //eslint-disable-line no-unused-vars
import ReactDomServer from 'react-dom/server'


const RootHtml = ({ children, assets_path }) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    </head>
    <body>
      <div id="app">
        {children}
      </div>
      <script async
        type='application/javascript'
        src={`${assets_path}/app.js`}
      />
    </body>
  </html>
)

export function renderHtmlPage(App, assets_path) {
  return (
    '<!DOCTYPE html>' +
    ReactDomServer.renderToStaticMarkup(
      <RootHtml assets_path={assets_path}>
        <App />
      </RootHtml>
    )
  )

}