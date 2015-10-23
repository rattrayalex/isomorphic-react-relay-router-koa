/* eslint-env node */
import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as GoogleStrategy } from 'passport-google-auth'


const BASE_URL = `http://localhost:${(process.env.PORT || 3000)}`

let user = { id: 1, email: 'rattray.alex@gmail.com' }


passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})


passport.use(new LocalStrategy(function(email, password, done) {
  // retrieve user ...
  if (email === 'rattray.alex@gmail.com' && password === 'password') {
    done(null, user)
  } else {
    done(null, false)
  }
}))

passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: `${BASE_URL}/auth/facebook/callback`,
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))

passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: `${BASE_URL}/auth/twitter/callback`,
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))

passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: `${BASE_URL}/auth/google/callback`,
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))
