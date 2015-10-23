import Router from 'koa-router'
import passport from 'koa-passport'

import '.'  // activate passport strategies

let authRouter = new Router()

authRouter.post('/custom', function * (next) {
  var ctx = this
  yield passport.authenticate('local', function * (err, user, info) {
    if (err) throw err
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      yield ctx.login(user)
      ctx.body = { success: true }
    }
  }).call(this, next)
})

// POST /login
authRouter.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)

authRouter.get('/logout', function * () {
  this.logout()
  this.redirect('/')
})

authRouter.get('/auth/facebook',
  passport.authenticate('facebook')
)

authRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)

authRouter.get('/auth/twitter',
  passport.authenticate('twitter')
)

authRouter.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)

authRouter.get('/auth/google',
  passport.authenticate('google')
)

authRouter.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
)


export default authRouter
