/*eslint-env node */
import React from 'react' //eslint-disable-line
import koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import compose from 'koa-compose'
import compress from 'koa-compress'
import session from 'koa-generic-session'
import passport from 'koa-passport'
import onerror from 'koa-onerror'

import { protect } from '../auth/utils'

import renderReact from '../frontend/server'
import graphql from '../graphql'
import authRouter from '../auth/authRouter'


let app = koa()

onerror(app)

app.proxy = true  // recommended by passport
app.keys = ['some-secret', 'another-secret']

app.use(logger())
app.use(compress())
app.use(helmet())
app.use(session())

app.use(passport.initialize())
app.use(passport.session())
app.use(authRouter.middleware())

app.use(serve(__dirname + '/../frontend/public'))

app.use(mount('/graphql', compose([
  // protect,
  function * (next) {
    console.log(this.request)
    try {
      yield next
    } catch (e) {
      console.error(e)
    }
  },
  graphql,
])))

app.use(compose([
  function * (next) {
    console.log(this.request)
    try {
      yield next
    } catch (e) {
      console.error(e)
    }
  },
  renderReact
]))


export default app
