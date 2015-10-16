/*eslint-env node */
import koa from 'koa'
import koaStatic from 'koa-static'

import { renderHtmlPage } from './utils'
import App from '../components/App'

const env = process.env
// const assets_path = `http://localhost:8080/${env.npm_package_version}`
const assets_path = `/${env.npm_package_version}`

const app = koa()
// app.set('trust proxy', 'loopback')  // not sure why this is here...

app.use(koaStatic(__dirname + '/../public'))

app.use(function * () {
  this.body = renderHtmlPage(App, assets_path)
})

export default app